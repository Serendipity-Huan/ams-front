<template>
  <div class="mod-config">
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
        <!-- <el-button style="margin-left: 20px" @click="addOrUpdateHandle()" type="primary" icon="el-icon-plus">新增</el-button> -->
        <el-button style="margin-left: 20px" type="warning" @click="resetPasswordHandle()" :disabled="dataListSelections.length <= 0" icon="el-icon-refresh-left">重置密码</el-button>
        <el-button style="margin-left: 1200px" type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0" icon="el-icon-delete">彻底删除！</el-button>
      </el-form-item>
    </el-form>
    <div class="buttonBox">
      <!--
              action: 必填参数，上传的地址
              :auto-upload: 在选取文件后立即进行上传
              :show-file-list: 是否显示已上传文件列表-->
      <el-alert
      title="温馨提示："
      type="warning"
      :closable="false">
        <div>
          <p class="el-alert__description">导入时，请先点击“通过excel导入”，待下方表格读取数据完毕后，再点击“确定导入到数据库”</p>
          <p class="el-alert__description">如果数据显示不正确，可能是网络原因，请耐心等待或刷新重试</p>
        </div>
      </el-alert>
      <br>
      <el-upload
        action
        accept=".xlsx, .xls"
        :auto-upload="false"
        :show-file-list="false"
        :on-change="handle"
      >
        <el-button type="success" slot="trigger" icon="el-icon-upload2">通过excel导入</el-button>
        <el-button style="margin-left: 10px" type="primary" @click="downLoad" icon="el-icon-download">下载excel导入模板</el-button>
        <el-button type="primary" @click="submit" icon="el-icon-circle-plus-outline">全部导入到数据库（无需勾选）</el-button>
        <el-button type="warning" @click="exports" icon="el-icon-download">将勾选数据导出为excel</el-button>
      </el-upload>
    </div>
    <el-table
      :data="dataList"
      border
      @selection-change="selectionChangeHandle"
      style="width: 100%; margin-top: 20px">
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
        label="系统id">
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
        label="入学时间"
        :formatter="formatTime">
      </el-table-column>
      <el-table-column
        prop="graduationTime"
        header-align="center"
        align="center"
        label="毕业时间"
        :formatter="formatTime">
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
        <template slot-scope="scope">
          {{ scope.row.degreeStage === 0 ? '本科' :  (scope.row.degreeStage === 1 ? '硕士' : (scope.row.degreeStage === 2 ? '博士' : '未知')) }}
        </template>
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
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row)">修改</el-button>
          <el-button type="text" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      :current-page="pageIndex"
      :page-sizes="[10, 20, 50, 100, 500]"
      :page-size="pageSize"
      :total="totalPage"
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="conditionQuery"></add-or-update>
  </div>
</template>

<script>
import xlsx from 'xlsx'
import { Loading } from 'element-ui'
import {readFile, character, delay, formatDate, exGender, convertToDate, exDegree
} from '../../../assets/lib/utils.js'
import AddOrUpdate from './alumnusbasic-add-or-update'
  // import axios from 'axios'
export default {
  data () {
    return {
      dataForm: {
        query: '',
        gender: '',
        major: '',
        graduationTime: '',
        enterpriseProperty: '',
        page: '',
        limit: ''
      },
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
      tempData: [],
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListSelections: [],
      addOrUpdateVisible: false
    }
  },
  components: {
    AddOrUpdate
  },
  activated () {
    // this.getDataList()
    this.conditionQuery()
  },
  methods: {
    // 前端展示date数据格式
    formatTime (row, column, cellValue, index) {
      if (typeof cellValue === 'string') {
        return cellValue // 字符串类型的日期，直接返回
      } else if (cellValue instanceof Date) {
        return formatDate(cellValue) // Date 类型的日期，调用 formatDate 方法进行格式化
      } else {
        return '' // 其他类型的数据，返回空字符串或自定义默认值
      }
    },
    // 采集 EXCEL 数据
    async handle (e) {
      let file = e.raw
      if (!file) return
      let loading = Loading.service({
        text: '正在上传中，请稍后...',
        background: 'rgba(0,0,0,.5)'
      })
      await delay(300)
      // 读取FILE中的数据
      let data = await readFile(file)
      let workbook = xlsx.read(data, { type: 'binary' }),
        worksheet = workbook.Sheets[workbook.SheetNames[0]],
        list = xlsx.utils.sheet_to_json(worksheet)
      // 把读取出来的数据变为可以提交为服务器的数据格式
      let arr = []
      let oldData = JSON.parse(window.localStorage.getItem('excel') || '[]')
      let index = oldData.length
      list.forEach((item, index) => {
        if (index >= 1) { // 从第二行开始遍历（index从0开始计数）
          let obj = {}
          for (let key in character) {
            if (!character.hasOwnProperty(key)) break
            let v = character[key],
              text = v.text,
              type = v.type
            v = item[text] || ''
            type === 'string' ? (v = String(v)) : null
            type === 'number' ? (v = Number(v)) : null
            obj[key] = v
          }
          obj.id = index
          if (obj.gender !== '') {
            obj.gender = exGender(obj.gender)
          }
          if (obj.admissionTime !== ' ') {
            obj.admissionTime = convertToDate(obj.admissionTime)
          }
          if (obj.graduationTime !== ' ') {
            obj.graduationTime = convertToDate(obj.graduationTime)
          }
          obj.degreeStage = exDegree(obj.degreeStage)
          arr.push(obj)
        }
      })
      await delay(300)
      // 展示到页面中
      this.tempData = arr
      this.dataList = arr
      loading.close()
    },
    // 导入数据给服务器
    submit () {
      if (this.tempData.length <= 0) {
        return this.$message({
          message: '请您先选择 EXCEL 文件！',
          type: 'warning',
          showClose: true
        })
      }
      let complate = () => {
        this.$message({
          message: '已上传完毕！',
          type: 'success',
          showClose:
          this.conditionQuery()
        })
      }
      let n = 0
      let send = async () => {
        if (n > this.tempData.length - 1) return
        let body = this.tempData[n]
        this.$http({
          url: this.$http.adornUrl('/sys/feign/selectById'),
          method: 'post',
          data: this.$http.adornData(body, false)
        }).then(({data}) => {
          console.info(data.exist)
          if (data.exist === 0) {
            this.$http({
              url: this.$http.adornUrl('/sys/feign/inport'),
              method: 'post',
              data: this.$http.adornData(body, false)
            }).then(({data}) => {
              if (data && data.code === 0) {
                complate()
                n++
              }
              send()
            })
          }
          if (data.exist === 1) {
            this.$confirm(`数据库已有相同学号，是否覆盖？`, '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$http({
                url: this.$http.adornUrl('/sys/feign/cover'),
                method: 'post',
                data: this.$http.adornData(body, false)
              }).then(({data}) => {
                if (data && data.code === 0) {
                  this.$message({
                    message: '操作成功',
                    type: 'success',
                    duration: 1500,
                    onClose: () => {
                      this.conditionQuery()
                    }
                  })
                } else {
                  this.$message.error(data.msg)
                }
              })
            })
          }
        })
      }
      send()
    },
    // 导出为excel
    exports () {
      if (this.dataListSelections.length <= 0) {
        return this.$message({
          message: '请选择要导出的数据！',
          type: 'warning',
          showClose: true
        })
      }
      let loading = Loading.service({
        text: '正在玩命导出为 EXCEL 文件中...',
        background: 'rgba(0,0,0,.5)'
      })
      let arr = this.dataListSelections.map(item => {
        return {
          // 编号: item.id,
          姓名: item.aluName,
          学号: item.aluId,
          性别: item.gender === 0 ? '男' : item.gender === 1 ? '女' : '未填写',
          身份证号: item.idCard,
          民族: item.nationality,
          政治面貌: item.politicalStatus,
          籍贯: item.nativePlace,
          班级: item.clazz,
          入学时间: this.formatExportDate(item.admissionTime), // 把yyyy-mm-dd转换为yyyy/m/d格式
          毕业时间: this.formatExportDate(item.graduationTime), // 把yyyy-mm-dd转换为yyyy/m/d格式
          专业: item.major,
          '阶段': item.degreeStage === 0 ? '本科' : item.degreeStage === 1 ? '硕士' : item.degreeStage === 2 ? '博士' : '未填写',
          手机: item.phoneNum,
          所在城市: item.city,
          工作单位: item.workUnit,
          担任职务: item.jobTitle,
          企业性质: item.enterpriseProperty,
          邮箱: item.email,
          备注: item.note
        }
      })
      let sheet = xlsx.utils.json_to_sheet(arr)
      let book = xlsx.utils.book_new()
      xlsx.utils.book_append_sheet(book, sheet, 'sheet1')
      let fileName = `user${new Date().getTime()}.xlsx`

      // 将文件保存到本地
      xlsx.writeFile(book, fileName)

      loading.close()
    },

    // 下载excel模板
    downLoad () {
      let headers = [
        '姓名',
        '学号',
        '性别',
        '身份证号',
        '民族',
        '政治面貌',
        '籍贯',
        '班级',
        '入学时间',
        '毕业时间',
        '专业',
        '阶段',
        '手机',
        '所在城市',
        '工作单位',
        '担任职务',
        '企业性质',
        '邮箱',
        '备注'
      ]

      // 创建一个包含表头的空数组
      let arr = [headers]

      // 添加表头的说明信息
      let headerDescriptions = [
        'xxx',
        'xxx',
        '男/女',
        'xxx',
        'xx族',
        '群众、共青团员、预备党员、中共党员',
        'xx省xx市',
        'xxx',
        'xxxx/xx/xx',
        'xxxx/xx/xx',
        'xxx',
        '本科/硕士/博士',
        'xxxx',
        'xx省xx市',
        '工作单位说明',
        '担任职务说明',
        '国有企业/民营企业/个体独资企业/三资企业/私营企业',
        '邮箱说明',
        '请从下一行开始填写'
      ]
      arr.push(headerDescriptions)

      let sheet = xlsx.utils.aoa_to_sheet(arr)

// 设置表头的大小和宽度
      let headerStyle = {
        font: { bold: true },
        alignment: { wrapText: true, horizontal: 'center', vertical: 'center' } // 居中显示
      }

// 设置列宽和行高
      sheet['!cols'] = [
        { width: 15 }, // 设置第一列的宽度为 15
        { width: 20 } // 设置第二列的宽度为 20
        // 添加更多列宽设置...
      ]

// 设置行高
      sheet['!rows'] = [
        { hpx: 30 } // 设置第一行的高度为 30
        // 添加更多行高设置...
      ]

// 应用样式到表头
      Object.keys(sheet).forEach(cell => {
        if (cell[0] === 'A' || cell[1] === '1') { // Assuming header starts from A1
          sheet[cell].s = headerStyle
        }
      })

// 获取“请从下一行开始填写”的单元格坐标
      let redTextCell = 'S2' // 假设是第三行的第一列

// 设置“请从下一行开始填写”单元格的样式为红色
      sheet[redTextCell].s = { font: { color: { rgb: 'FF0000FF' } } }

      let book = xlsx.utils.book_new()
      xlsx.utils.book_append_sheet(book, sheet, 'sheet1')
      let fileName = `template${new Date().getTime()}.xlsx`

// 将文件保存到本地
      xlsx.writeFile(book, fileName)
    },

    // 将导出excel的日期格式从yyyy-mm-dd转换为yyyy/m/d，注意该函数的输入输出都是字符串
    formatExportDate (dateString) {
      if (dateString === ' ') {
        return ' '
      }
      var date = new Date(dateString)
      var year = date.getFullYear()
      var month = date.getMonth() + 1
      var day = date.getDate()
      return year + '/' + month + '/' + day
    },

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
    // 获取数据列表
    // getDataList () {
    //   this.$http({
    //     url: this.$http.adornUrl('/basic/alumnusbasic/list'),
    //     method: 'get',
    //     params: this.$http.adornParams({
    //       'page': this.pageIndex,
    //       'limit': this.pageSize
    //         // 'key': this.dataForm.key
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
    },
      // 新增 / 修改
    addOrUpdateHandle (data) {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(data)
      })
    },
    resetPasswordHandle () {
      var ids = this.dataListSelections.map(item => {
        return item.id
      })
      this.$confirm(`确定对[id=${ids.join(',')}]进行[重置密码]操作?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http({
          url: this.$http.adornUrl('/sys/feign/reset-alumnus-password'),
          method: 'post',
          data: this.$http.adornData({'ids': ids})
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1500,
              onClose: () => {
                this.conditionQuery()
              }
            })
          } else {
            this.$message.error(data.msg)
          }
        })
      })
    },
    // 删除
    deleteHandle (id) {
      var ids = id ? [id] : this.dataListSelections.map(item => {
        return item.id
      })
      this.$confirm(`确定对[id=${ids.join(',')}]进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http({
          url: this.$http.adornUrl('/sys/feign/delete-alumnus'),
          method: 'post',
          data: this.$http.adornData({'ids': ids})
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1500,
              onClose: () => {
                this.conditionQuery()
              }
            })
          } else {
            this.$message.error(data.msg)
          }
        })
      })
    }
  }
}
</script>
<style>
.top-margin {
  margin-top: 20px; /* 设置上边距为 20 像素 */
}
</style>
