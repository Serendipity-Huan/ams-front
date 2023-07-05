<template>
  <div class="mod-config">
    <el-form
      :inline="true"
      :model="dataForm"
      @keyup.enter.native="getDataList()"
    >
      <el-form-item>
        <el-input
          v-model="dataForm.key"
          placeholder="关键字"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-select v-model="filterStatus" clearable placeholder="审核状态">
          <el-option
            v-for="item in filterableStatus"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-button @click="getDataList()" type="success" style="margin-left: 100px">查询</el-button>
        <el-button
          type="primary"
          style="margin-left: 50px"
          @click="auditPass()"
          :disabled="dataListSelections.length <= 0"
          >批量通过</el-button
        >
        <el-button
          type="danger"
          @click="auditNotPass()"
          :disabled="dataListSelections.length <= 0"
          >批量不通过</el-button
        >
      </el-form-item>
    </el-form>
    <el-table
      :data="dataList"
      border
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      style="width: 100%"
    >
      <el-table-column
        type="selection"
        header-align="center"
        align="center"
        width="50"
      >
      </el-table-column>
      <el-table-column
        prop="id"
        header-align="center"
        align="center"
        label="id"
      >
      </el-table-column>
      <!-- <el-table-column
        prop="alumnusBasicId"
        header-align="center"
        align="center"
        label="校友基本信息表的id"
      >
      </el-table-column> -->
      <el-table-column
        prop="aluName"
        header-align="center"
        align="center"
        label="姓名"
      >
      </el-table-column>
      <el-table-column
        prop="aluId"
        header-align="center"
        align="center"
        label="学号"
      >
      </el-table-column>
      <el-table-column
        prop="status"
        header-align="center"
        align="center"
        label="审核状态"
      >
        <template slot-scope="scope">
          <div class="tag-group">
            <el-tag size="medium" :type="showStatus[scope.row.status]">{{
              scope.row.status == 0
                ? "待审核"
                : scope.row.status == 1
                ? "通过"
                : scope.row.status == 2
                ? "未通过"
                : "已撤销"
            }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="createTime"
        header-align="center"
        align="center"
        label="创建时间"
      >
      </el-table-column>
      <el-table-column
        prop="updateTime"
        header-align="center"
        align="center"
        label="更新时间"
      >
      </el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="checkDetail(scope.row.id)"
            >详情</el-button
          >
          <el-button
            type="text"
            size="small"
            @click="auditPass(scope.row.id)"
            v-if="scope.row.status == 0"
            >通过</el-button
          >
          <el-button
            type="text"
            size="small"
            @click="auditNotPass(scope.row.id)"
            v-if="scope.row.status == 0"
            >不通过</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      :current-page="pageIndex"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      :total="totalPage"
      layout="total, sizes, prev, pager, next, jumper"
    >
    </el-pagination>
    <!-- 弹窗, 详情 -->
    <check-detail
      v-if="checkDetailVisible"
      ref="checkDetail"
      @refreshDataList="getDataList"
    ></check-detail>
  </div>
</template>

<script>
import CheckDetail from "./auditdetail-check-detail";
export default {
  data() {
    return {
      dataForm: {
        key: ""
      },
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      dataListSelections: [],
      checkDetailVisible: false,
      showStatus: ["", "success", "danger", "warning"],
      filterStatus: "",
      filterableStatus: [
        {
          value: "0",
          label: "待审核"
        },
        {
          value: "1",
          label: "通过"
        },
        {
          value: "2",
          label: "未通过"
        },
        {
          value: "3",
          label: "已撤销"
        }
      ]
    };
  },
  components: {
    CheckDetail
  },
  activated() {
    this.getDataList();
  },
  methods: {
    // 获取数据列表
    getDataList() {
      this.dataListLoading = true;
      this.$http({
        url: this.$http.adornUrl("/sys/feign/audit-list"),
        method: "get",
        params: this.$http.adornParams({
          page: this.pageIndex,
          limit: this.pageSize,
          key: this.dataForm.key,
          status: this.filterStatus
        })
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.dataList = data.page.list;
          this.totalPage = data.page.totalCount;
        } else {
          this.dataList = [];
          this.totalPage = 0;
          this.$message.error(data.msg);
        }
        this.dataListLoading = false;
      });
    },
    // 每页数
    sizeChangeHandle(val) {
      this.pageSize = val;
      this.pageIndex = 1;
      this.getDataList();
    },
    // 当前页
    currentChangeHandle(val) {
      this.pageIndex = val;
      this.getDataList();
    },
    // 多选
    selectionChangeHandle(val) {
      this.dataListSelections = val;
    },
    // 详情
    checkDetail(id) {
      this.checkDetailVisible = true;
      this.$nextTick(() => {
        this.$refs.checkDetail.init(id);
      });
    },
    // 审核通过
    auditPass(id) {
      var ids = id
        ? [id]
        : this.dataListSelections.map(item => {
            return item.id;
          });
      this.$confirm(
        `确定对[id=${ids.join(",")}]进行[${id ? "通过" : "批量通过"}]操作?`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "success"
        }
      ).then(() => {
        this.$http({
          url: this.$http.adornUrl("/sys/feign/audit-pass"),
          method: "post",
          data: this.$http.adornData({'ids': ids})
        }).then(({ data }) => {
          if (data && data.code === 0) {
            this.$message({
              message: "操作成功",
              type: "success",
              duration: 1500,
              onClose: () => {
                this.getDataList();
              }
            });
          } else {
            this.$message.error(data.msg);
          }
        });
      });
    },
    // 审核不通过
    auditNotPass(id) {
      var ids = id
        ? [id]
        : this.dataListSelections.map(item => {
            return item.id;
          });
      this.$confirm(
        `确定对[id=${ids.join(",")}]进行[${id ? "不通过" : "批量不通过"}]操作?`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).then(() => {
        this.$http({
          url: this.$http.adornUrl("/sys/feign/audit-not-pass"),
          method: "post",
          data: this.$http.adornData({'ids': ids})
        }).then(({ data }) => {
          if (data && data.code === 0) {
            this.$message({
              message: "操作成功",
              type: "success",
              duration: 1500,
              onClose: () => {
                this.getDataList();
              }
            });
          } else {
            this.$message.error(data.msg);
          }
        });
      });
    }
  }
};
</script>
