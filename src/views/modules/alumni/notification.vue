<template>
  <div class="mod-config">
    <el-alert
      title="温馨提示："
      type="warning"
      :closable="false">
      <div>
        <p class="el-alert__description">发送邮件可能耗时较长，请耐心等待</p>
      </div>
    </el-alert>
    <br>
    <el-form :model="dataForm">
      <el-row :gutter="20">
        <el-col :span="4" style="display: flex; align-items: center;">
          <span style="white-space: nowrap; margin-right: 10px;">条件筛选：</span>
          <el-input v-model="dataForm.query"  clearable></el-input>
        </el-col>
        <el-col :span="4" style="display: flex; align-items: center;">
          <span style="white-space: nowrap; margin-right: 10px;">性别：</span>
          <el-select v-model="dataForm.gender" clearable>
            <el-option v-for="item in genderOptions" :key="item.value" :label="item.label" :value="item.value"/>
          </el-select>
        </el-col>
        <el-col :span="4" style="display: flex; align-items: center;">
          <span style="white-space: nowrap; margin-right: 10px;">专业：</span>
          <el-select v-model="dataForm.major" clearable>
            <el-option v-for="item in majorOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="4" style="display: flex; align-items: center;">
          <span style="white-space: nowrap; margin-right: 10px;">企业性质：</span>
          <el-select v-model="dataForm.enterpriseProperty" clearable>
            <el-option v-for="item in enterpriseOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-col>

        <el-col :span="4" style="display: flex; align-items: center;">
          <span style="white-space: nowrap; margin-right: 10px;">毕业时间：</span>
          <el-date-picker v-model="dataForm.graduationTime" type="year" :value-format="'yyyy'" placeholder="请选择"></el-date-picker>
        </el-col>
      </el-row>

      <el-form-item class="top-margin">
        <el-button @click="conditionQuery()" type="success" icon="el-icon-search">查询</el-button>
        <!-- <el-button v-if="isAuth('ams:alumnusbasic:save')" type="primary" @click="addOrUpdateHandle()">新增</el-button> -->
        <!-- <el-button v-if="isAuth('ams:alumnusbasic:delete')" type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button> -->
        <el-button type="primary" style="margin-left: 100px" icon="el-icon-message" @click="allInfoSend()" :disabled="dataListSelections.length <= 0 || unsendable">批量发送通知邮件</el-button>
      </el-form-item>
    </el-form>
    <el-col :span="22">
      <el-input
        type="textarea"
        :rows="10"
        placeholder="请输入通知内容"
        v-model="info.information">
      </el-input>
    </el-col>
    <div class="top-margin">
      <el-table
      :data="dataList"
      border
      @selection-change="selectionChangeHandle"
      style="width: 100%;">
      <el-table-column
        type="selection"
        header-align="center"
        align="center"
        width="50">
      </el-table-column>
      <el-table-column
        prop="id"
        header-align="center"
        align="center"
        label="id">
      </el-table-column>
      <el-table-column
        prop="aluName"
        header-align="center"
        align="center"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="aluId"
        header-align="center"
        align="center"
        label="学号">
      </el-table-column>
      <el-table-column
        prop="gender"
        header-align="center"
        align="center"
        label="性别">
        <template slot-scope="scope">
          {{ scope.row.gender === 0 ? '男' : '女' }}
        </template>
      </el-table-column>
      <el-table-column
        prop="idCard"
        header-align="center"
        align="center"
        label="身份证号">
      </el-table-column>
      <el-table-column
        prop="nationality"
        header-align="center"
        align="center"
        label="民族">
      </el-table-column>
      <el-table-column
        prop="politicalStatus"
        header-align="center"
        align="center"
        label="政治面貌">
      </el-table-column>
      <el-table-column
        prop="email"
        header-align="center"
        align="center"
        label="邮箱">
      </el-table-column>
      <el-table-column
        prop="nativePlace"
        header-align="center"
        align="center"
        label="籍贯">
      </el-table-column>
      <el-table-column
        prop="clazz"
        header-align="center"
        align="center"
        label="班级">
      </el-table-column>
      <el-table-column
        prop="admissionTime"
        header-align="center"
        align="center"
        label="入学时间">
      </el-table-column>
      <el-table-column
        prop="graduationTime"
        header-align="center"
        align="center"
        label="毕业时间">
      </el-table-column>
      <el-table-column
        prop="department"
        header-align="center"
        align="center"
        label="院系">
      </el-table-column>
      <el-table-column
        prop="major"
        header-align="center"
        align="center"
        label="专业">
      </el-table-column>
      <el-table-column
        prop="degreeStage"
        header-align="center"
        align="center"
        label="阶段">
      </el-table-column>
      <el-table-column
        prop="phoneNum"
        header-align="center"
        align="center"
        label="手机">
      </el-table-column>
      <el-table-column
        prop="city"
        header-align="center"
        align="center"
        label="所在城市">
      </el-table-column>
      <el-table-column
        prop="workUnit"
        header-align="center"
        align="center"
        label="工作单位">
      </el-table-column>
      <el-table-column
        prop="jobTitle"
        header-align="center"
        align="center"
        label="担任职务">
      </el-table-column>
      <el-table-column
        prop="enterpriseProperty"
        header-align="center"
        align="center"
        label="企业性质">
      </el-table-column>
      <el-table-column
        prop="note"
        header-align="center"
        align="center"
        label="备注">
      </el-table-column>
    </el-table>
    </div>
    <el-pagination
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      :current-page="pageIndex"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      :total="totalPage"
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
  </div>
</template>

<script>
// import axios from 'axios'
export default {
  data () {
    return {
      dataForm: {
        aluName: '',
        aluId: '',
        aluFormerName: '',
        aluStatus: '',
        gender: '',
        city: '',
        idCard: '',
        clazz: '',
        page: '',
        limit: ''
      },
      // 初始时，“不可发送”为false，即可发送，这个变量用于防止短时间重复点击发送
      unsendable: false,
      // 按性别选择的选项
      genderOptions: [{
        value: '', label: '请选择'
      }, {
        value: '0', label: '男'
      }, {
        value: '1', label: '女'
      }],
      // 按专业选择的选项
      majorOptions: [{
        value: '', label: '请选择'
      }, {
        value: '安全工程', label: '安全工程'
      }, {
        value: '动力工程', label: '动力工程'
      }, {
        value: '冶金工程', label: '冶金工程'
      }, {
        value: '有色金属冶金', label: '有色金属冶金'
      }, {
        value: '工业催化', label: '工业催化'
      }, {
        value: '过程装备与控制工程', label: '过程装备与控制工程'
      }, {
        value: '化工过程机械', label: '化工过程机械'
      }, {
        value: '化学工程', label: '化学工程'
      }, {
        value: '化学工程与工艺', label: '化学工程与工艺'
      }, {
        value: '化学工程与技术', label: '化学工程与技术'
      }, {
        value: '化学工艺', label: '化学工艺'
      }, {
        value: '生物工程', label: '生物工程'
      }, {
        value: '生物化工', label: '生物化工'
      }, {
        value: '物理化学', label: '物理化学'
      }, {
        value: '应用化学', label: '应用化学'
      }, {
        value: '分析化学', label: '分析化学'
      }, {
        value: '放射化学', label: '放射化学'
      }, {
        value: '无机非金属材料', label: '无机非金属材料'
      }, {
        value: '无机化工', label: '无机化工'
      }, {
        value: '有机化工', label: '有机化工'
      }, {
        value: '精细化工', label: '精细化工'
      }, {
        value: '制药工程', label: '制药工程'
      }, {
        value: '伦理化工', label: '伦理化工'
      }, {
        value: '燃烧动力学', label: '燃烧动力学'
      }],
      // 按企业性质选择的选项
      enterpriseOptions: [{
        value: '', label: '请选择'
      }, {
        value: '国有企业', label: '国有企业'
      }, {
        value: '民营企业', label: '民营企业'
      }, {
        value: '三资企业', label: '三资企业'
      }, {
        value: '私营企业', label: '私营企业'
      }, {
        value: '个体独资企业', label: '个体独资企业'
      }, {
        value: '其他', label: '其他'
      }],
      info: {
        ids: [],
        information: ''
      },
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListSelections: []
    }
  },
  activated () {
    this.conditionQuery()
  },
  methods: {
    // 多条件查询
    conditionQuery () {
      console.log(this.dataForm.graduationTime)
      this.dataForm.page = this.pageIndex
      this.dataForm.limit = this.pageSize
      this.$http({
        url: this.$http.adornUrl('/sys/feign/alumniData'),
        method: 'post',
        data: this.$http.adornData(this.dataForm, false)
      }).then(({data}) => {
        if (data && data.code === 0) {
          this.dataList = data.page.list
          this.totalPage = data.page.totalCount
        } else {
          this.dataList = []
          this.totalPage = 0
        }
      })
    },
    // 批量信息通知
    allInfoSend (id) {
      var ids = id ? [id] : this.dataListSelections.map(item => {
        return item.id
      })
      this.info.ids = ids
      this.$confirm(`确定对[id=${ids.join(',')}]进行[${id ? '发送' : '批量发送'}]操作?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.unsendable = true // 防止短时间重复点击发送
        this.$http({
          url: this.$http.adornUrl('/sys/feign/sendInformMail'),
          method: 'post',
          data: this.$http.adornData(this.info, false)
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1500,
              onClose: () => {
                // this.conditionQuery()
              }
            })
          } else {
            this.$message.error(data.msg)
          }
        })
        this.unsendable = false // 防止短时间重复点击发送
      })
    },
    // // 批量生日祝福通知
    // allSend (id) {
    //   var ids = id ? [id] : this.dataListSelections.map(item => {
    //     return item.id
    //   })
    //   this.$confirm(`确定对[id=${ids.join(',')}]进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(() => {
    //     this.$http({
    //       url: this.$http.adornUrl('/basic/mail/sendBirthDayMails'),
    //       method: 'post',
    //       data: this.$http.adornData(ids, false)
    //     }).then(({data}) => {
    //       if (data && data.code === 0) {
    //         this.$message({
    //           message: '操作成功',
    //           type: 'success',
    //           duration: 1500,
    //           onClose: () => {
    //             this.getDataList()
    //           }
    //         })
    //       } else {
    //         this.$message.error(data.msg)
    //       }
    //     })
    //   })
    // },
    // // 生日快乐通知
    // inform (id) {
    //   this.$confirm(`确定通知操作?`, '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(() => {
    //     console.log(id)
    //     this.$http({
    //       url: this.$http.adornUrl('/basic/mail/sendBirthDayMail'),
    //       method: 'post',
    //       data: this.$http.adornData(id, false)
    //     }).then(({data}) => {
    //       if (data && data.code === 0) {
    //         this.$message({
    //           message: '操作成功',
    //           type: 'success',
    //           duration: 1500,
    //           onClose: () => {
    //             this.getDataList()
    //           }
    //         })
    //       } else {
    //         this.$message.error(data.msg)
    //       }
    //     })
    //   })
    // },
    // // 获取数据列表
    // getDataList () {
    //   this.$http({
    //     url: this.$http.adornUrl('/basic/alumnusbasic/list'),
    //     method: 'get',
    //     params: this.$http.adornParams({
    //       'page': this.pageIndex,
    //       'limit': this.pageSize
    //       // 'key': this.dataForm.key
    //     })
    //   }).then(({data}) => {
    //     if (data && data.code === 0) {
    //       this.dataList = data.page.list
    //       this.totalPage = data.page.totalCount
    //     } else {
    //       this.dataList = []
    //       this.totalPage = 0
    //     }
    //   })
    // },
    // 每页数
    sizeChangeHandle (val) {
      this.pageSize = val
      this.pageIndex = 1
      this.conditionQuery()
    },
    // 当前页
    currentChangeHandle (val) {
      this.pageIndex = val
      this.conditionQuery()
    },
    // 多选
    selectionChangeHandle (val) {
      this.dataListSelections = val
    }
  }
}
</script>
<style>
.top-margin {
  margin-top: 20px; /* 设置上边距为 20 像素 */
}
</style>
