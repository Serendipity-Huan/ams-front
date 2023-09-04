<template>
  <div class="mod-config">
    <el-card class="box-card">
      个人信息
    </el-card>
    <el-table
      :data="dataList"
      stripe
      border
      v-loading="dataListLoading"
      style="width: 100%"
    >
      <el-table-column
        prop="id"
        header-align="center"
        align="center"
        label="系统id"
      >
      </el-table-column>
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
        prop="gender"
        header-align="center"
        align="center"
        label="性别"
      >
        <template slot-scope="scope">
          {{ scope.row.gender === 0 ? "男" : scope.row.degreeStage === 1 ? "女": "未填写"  }}
        </template>
      </el-table-column>
      <el-table-column
        prop="idCard"
        header-align="center"
        align="center"
        label="身份证号"
      >
      </el-table-column>
      <el-table-column
        prop="nationality"
        header-align="center"
        align="center"
        label="民族"
      >
      </el-table-column>
      <el-table-column
        prop="politicalStatus"
        header-align="center"
        align="center"
        label="政治面貌"
      >
      </el-table-column>
      <el-table-column
        prop="email"
        header-align="center"
        align="center"
        label="邮箱"
      >
      </el-table-column>
      <el-table-column
        prop="nativePlace"
        header-align="center"
        align="center"
        label="籍贯"
      >
      </el-table-column>
      <el-table-column
        prop="clazz"
        header-align="center"
        align="center"
        label="班级"
      >
      </el-table-column>
      <el-table-column
        prop="admissionTime"
        header-align="center"
        align="center"
        label="入学时间"
        :formatter="formatTime"
      >
      </el-table-column>
      <el-table-column
        prop="graduationTime"
        header-align="center"
        align="center"
        label="毕业时间"
        :formatter="formatTime"
      >
      </el-table-column>
      <el-table-column
        prop="major"
        header-align="center"
        align="center"
        label="专业"
      >
      </el-table-column>
      <el-table-column
        prop="degreeStage"
        header-align="center"
        align="center"
        label="阶段"
      >
        <template slot-scope="scope">
          {{
            scope.row.degreeStage === 0
              ? "本科"
              : scope.row.degreeStage === 1
              ? "硕士"
              : scope.row.degreeStage === 2
              ? "博士"
              : "未知"
          }}
        </template>
      </el-table-column>
      <el-table-column
        prop="phoneNum"
        header-align="center"
        align="center"
        label="手机"
      >
      </el-table-column>
      <el-table-column
        prop="city"
        header-align="center"
        align="center"
        label="所在城市"
      >
      </el-table-column>
      <el-table-column
        prop="workUnit"
        header-align="center"
        align="center"
        label="工作单位"
      >
      </el-table-column>
      <el-table-column
        prop="jobTitle"
        header-align="center"
        align="center"
        label="担任职务"
      >
      </el-table-column>
      <el-table-column
        prop="enterpriseProperty"
        header-align="center"
        align="center"
        label="企业性质"
      >
      </el-table-column>
      <el-table-column
        prop="note"
        header-align="center"
        align="center"
        label="备注"
      >
      </el-table-column>
      <!-- <el-table-column
        prop="aluStatus"
        header-align="center"
        align="center"
        label="状态"
      >
      </el-table-column> -->
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
          <el-button
            type="text"
            size="small"
            @click="addOrUpdateHandle(scope.row.id)"
            >修改</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <br />
    <br />
    <el-alert title="温馨提示：" type="warning" :closable="false">
      <div>
        <p class="el-alert__description">
          只能同时持有一条待审核的记录，如果需要修改，请先撤销再重新申请审核
        </p>
        <p class="el-alert__description">
          如果数据显示不正确，可能是网络原因，请耐心等待或刷新重试
        </p>
      </div>
    </el-alert>
    <el-card class="box-card">
      修改信息的审核记录（最新记录在最下方）
    </el-card>
    <el-table
      :data="auditList"
      stripe
      border
      v-loading="auditListLoading"
      style="width: 100%"
    >
      <!-- <el-table-column
        type="selection"
        header-align="center"
        align="center"
        width="50"
      >
      </el-table-column> -->
      <el-table-column
        prop="id"
        header-align="center"
        align="center"
        label="审核id"
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
            @click="auditRepeal(scope.row.id)"
            v-if="scope.row.status == 0"
            >撤销</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 弹窗, 修改信息 -->
    <add-or-update
      v-if="addOrUpdateVisible"
      ref="addOrUpdate"
      @refreshDataList="getAuditList"
    ></add-or-update>
    <!-- 弹窗, 审核项详情 -->
    <check-detail
      v-if="checkDetailVisible"
      ref="checkDetail"
      @refreshAuditList="getAuditList"
    ></check-detail>
  </div>
</template>

<script>
import AddOrUpdate from "./personalcenter-info-update";
import CheckDetail from "./alumni-auditdetail-check-detail";
export default {
  data() {
    return {
      dataList: [],
      dataListLoading: false,
      addOrUpdateVisible: false,
      auditList: [],
      auditListLoading: false,
      checkDetailVisible: false,
      showStatus: ["", "success", "danger", "warning"]
    };
  },
  components: {
    AddOrUpdate,
    CheckDetail
  },
  activated() {
    this.getDataList();
    this.getAuditList();
  },
  methods: {
    // 前端展示date数据格式
    formatTime(row, column, cellValue, index) {
      if (typeof cellValue === "string") {
        return cellValue; // 字符串类型的日期，直接返回
      } else if (cellValue instanceof Date) {
        return formatDate(cellValue); // Date 类型的日期，调用 formatDate 方法进行格式化
      } else {
        return ""; // 其他类型的数据，返回空字符串或自定义默认值
      }
    },
    // 获取校友数据
    getDataList() {
      this.dataListLoading = true;
      this.$http({
        url: this.$http.adornUrl("/basic/alumnusbasic/info"),
        method: "get",
        params: this.$http.adornParams()
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.dataList = [data.user];
        } else {
          this.$message.error(data.msg);
        }
        this.dataListLoading = false;
      });
    },
    // 修改信息
    addOrUpdateHandle(id) {
      this.addOrUpdateVisible = true;
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(id);
      });
    },
    // 获取审核列表
    getAuditList() {
      this.auditListLoading = true;
      this.$http({
        url: this.$http.adornUrl("/basic/auditdetail/info"),
        method: "get",
        params: this.$http.adornParams()
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.auditList = data.auditList;
        } else {
          this.$message.error(data.msg);
        }
        this.auditListLoading = false;
      });
    },
    // 详情
    checkDetail(id) {
      this.checkDetailVisible = true;
      this.$nextTick(() => {
        this.$refs.checkDetail.init(id);
      });
    },
    // 审核撤销
    auditRepeal(id) {
      var ids = [id];
      this.$confirm(
        `确定对[id=${ids.join(",")}]进行[${id ? "撤销" : "批量撤销"}]操作?`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "success"
        }
      ).then(() => {
        this.$http({
          url: this.$http.adornUrl("/basic/auditdetail/audit-repeal"),
          method: "post",
          data: this.$http.adornData(ids, false)
        }).then(({ data }) => {
          if (data && data.code === 0) {
            this.$message({
              message: "操作成功",
              type: "success",
              duration: 1500,
              onClose: () => {
                this.getAuditList();
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
