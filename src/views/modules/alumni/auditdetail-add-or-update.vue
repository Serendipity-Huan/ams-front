<template>
  <div>该页面废弃</div>
  <!-- <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="校友基本信息表的id" prop="alumnusBasicId">
      <el-input v-model="dataForm.alumnusBasicId" placeholder="校友基本信息表的id"></el-input>
    </el-form-item>
    <el-form-item label="姓名" prop="aluName">
      <el-input v-model="dataForm.aluName" placeholder="姓名"></el-input>
    </el-form-item>
    <el-form-item label="学号" prop="aluId">
      <el-input v-model="dataForm.aluId" placeholder="学号"></el-input>
    </el-form-item>
    <el-form-item label="审核状态【0待审核，1审核通过，2审核未通过，3已撤销】" prop="status">
      <el-input v-model="dataForm.status" placeholder="审核状态【0待审核，1审核通过，2审核未通过，3已撤销】"></el-input>
    </el-form-item>
    <el-form-item label="创建时间" prop="createTime">
      <el-input v-model="dataForm.createTime" placeholder="创建时间"></el-input>
    </el-form-item>
    <el-form-item label="更新时间" prop="updateTime">
      <el-input v-model="dataForm.updateTime" placeholder="更新时间"></el-input>
    </el-form-item>
    <el-form-item label="性别" prop="gender">
      <el-input v-model="dataForm.gender" placeholder="性别"></el-input>
    </el-form-item>
    <el-form-item label="身份证号" prop="idCard">
      <el-input v-model="dataForm.idCard" placeholder="身份证号"></el-input>
    </el-form-item>
    <el-form-item label="民族" prop="nationality">
      <el-input v-model="dataForm.nationality" placeholder="民族"></el-input>
    </el-form-item>
    <el-form-item label="政治面貌" prop="politicalStatus">
      <el-input v-model="dataForm.politicalStatus" placeholder="政治面貌"></el-input>
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="dataForm.email" placeholder="邮箱"></el-input>
    </el-form-item>
    <el-form-item label="籍贯" prop="nativePlace">
      <el-input v-model="dataForm.nativePlace" placeholder="籍贯"></el-input>
    </el-form-item>
    <el-form-item label="班级" prop="clazz">
      <el-input v-model="dataForm.clazz" placeholder="班级"></el-input>
    </el-form-item>
    <el-form-item label="入学时间" prop="admissionTime">
      <el-input v-model="dataForm.admissionTime" placeholder="入学时间"></el-input>
    </el-form-item>
    <el-form-item label="毕业时间" prop="graduationTime">
      <el-input v-model="dataForm.graduationTime" placeholder="毕业时间"></el-input>
    </el-form-item>
    <el-form-item label="专业" prop="major">
      <el-input v-model="dataForm.major" placeholder="专业"></el-input>
    </el-form-item>
    <el-form-item label="阶段" prop="degreeStage">
      <el-input v-model="dataForm.degreeStage" placeholder="阶段"></el-input>
    </el-form-item>
    <el-form-item label="手机" prop="phoneNum">
      <el-input v-model="dataForm.phoneNum" placeholder="手机"></el-input>
    </el-form-item>
    <el-form-item label="所在城市" prop="city">
      <el-input v-model="dataForm.city" placeholder="所在城市"></el-input>
    </el-form-item>
    <el-form-item label="工作单位" prop="workUnit">
      <el-input v-model="dataForm.workUnit" placeholder="工作单位"></el-input>
    </el-form-item>
    <el-form-item label="担任职务" prop="jobTitle">
      <el-input v-model="dataForm.jobTitle" placeholder="担任职务"></el-input>
    </el-form-item>
    <el-form-item label="企业性质" prop="enterpriseProperty">
      <el-input v-model="dataForm.enterpriseProperty" placeholder="企业性质"></el-input>
    </el-form-item>
    <el-form-item label="备注" prop="note">
      <el-input v-model="dataForm.note" placeholder="备注"></el-input>
    </el-form-item>
    <el-form-item label="状态" prop="aluStatus">
      <el-input v-model="dataForm.aluStatus" placeholder="状态"></el-input>
    </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog> -->
</template>

<script>
  export default {
    data () {
      return {
        visible: false,
        dataForm: {
          id: 0,
          alumnusBasicId: '',
          aluName: '',
          aluId: '',
          status: '',
          createTime: '',
          updateTime: '',
          gender: '',
          idCard: '',
          nationality: '',
          politicalStatus: '',
          email: '',
          nativePlace: '',
          clazz: '',
          admissionTime: '',
          graduationTime: '',
          major: '',
          degreeStage: '',
          phoneNum: '',
          city: '',
          workUnit: '',
          jobTitle: '',
          enterpriseProperty: '',
          note: '',
          aluStatus: ''
        },
        dataRule: {
          alumnusBasicId: [
            { required: true, message: '校友基本信息表的id不能为空', trigger: 'blur' }
          ],
          aluName: [
            { required: true, message: '姓名不能为空', trigger: 'blur' }
          ],
          aluId: [
            { required: true, message: '学号不能为空', trigger: 'blur' }
          ],
          status: [
            { required: true, message: '审核状态【0待审核，1审核通过，2审核未通过，3已撤销】不能为空', trigger: 'blur' }
          ],
          createTime: [
            { required: true, message: '创建时间不能为空', trigger: 'blur' }
          ],
          updateTime: [
            { required: true, message: '更新时间不能为空', trigger: 'blur' }
          ],
          gender: [
            { required: true, message: '性别不能为空', trigger: 'blur' }
          ],
          idCard: [
            { required: true, message: '身份证号不能为空', trigger: 'blur' }
          ],
          nationality: [
            { required: true, message: '民族不能为空', trigger: 'blur' }
          ],
          politicalStatus: [
            { required: true, message: '政治面貌不能为空', trigger: 'blur' }
          ],
          email: [
            { required: true, message: '邮箱不能为空', trigger: 'blur' }
          ],
          nativePlace: [
            { required: true, message: '籍贯不能为空', trigger: 'blur' }
          ],
          clazz: [
            { required: true, message: '班级不能为空', trigger: 'blur' }
          ],
          admissionTime: [
            { required: true, message: '入学时间不能为空', trigger: 'blur' }
          ],
          graduationTime: [
            { required: true, message: '毕业时间不能为空', trigger: 'blur' }
          ],
          major: [
            { required: true, message: '专业不能为空', trigger: 'blur' }
          ],
          degreeStage: [
            { required: true, message: '阶段不能为空', trigger: 'blur' }
          ],
          phoneNum: [
            { required: true, message: '手机不能为空', trigger: 'blur' }
          ],
          city: [
            { required: true, message: '所在城市不能为空', trigger: 'blur' }
          ],
          workUnit: [
            { required: true, message: '工作单位不能为空', trigger: 'blur' }
          ],
          jobTitle: [
            { required: true, message: '担任职务不能为空', trigger: 'blur' }
          ],
          enterpriseProperty: [
            { required: true, message: '企业性质不能为空', trigger: 'blur' }
          ],
          note: [
            { required: true, message: '备注不能为空', trigger: 'blur' }
          ],
          aluStatus: [
            { required: true, message: '状态不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.id = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`/basic/auditdetail/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.alumnusBasicId = data.auditDetail.alumnusBasicId
                this.dataForm.aluName = data.auditDetail.aluName
                this.dataForm.aluId = data.auditDetail.aluId
                this.dataForm.status = data.auditDetail.status
                this.dataForm.createTime = data.auditDetail.createTime
                this.dataForm.updateTime = data.auditDetail.updateTime
                this.dataForm.gender = data.auditDetail.gender
                this.dataForm.idCard = data.auditDetail.idCard
                this.dataForm.nationality = data.auditDetail.nationality
                this.dataForm.politicalStatus = data.auditDetail.politicalStatus
                this.dataForm.email = data.auditDetail.email
                this.dataForm.nativePlace = data.auditDetail.nativePlace
                this.dataForm.clazz = data.auditDetail.clazz
                this.dataForm.admissionTime = data.auditDetail.admissionTime
                this.dataForm.graduationTime = data.auditDetail.graduationTime
                this.dataForm.major = data.auditDetail.major
                this.dataForm.degreeStage = data.auditDetail.degreeStage
                this.dataForm.phoneNum = data.auditDetail.phoneNum
                this.dataForm.city = data.auditDetail.city
                this.dataForm.workUnit = data.auditDetail.workUnit
                this.dataForm.jobTitle = data.auditDetail.jobTitle
                this.dataForm.enterpriseProperty = data.auditDetail.enterpriseProperty
                this.dataForm.note = data.auditDetail.note
                this.dataForm.aluStatus = data.auditDetail.aluStatus
              }
            })
          }
        })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/basic/auditdetail/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'alumnusBasicId': this.dataForm.alumnusBasicId,
                'aluName': this.dataForm.aluName,
                'aluId': this.dataForm.aluId,
                'status': this.dataForm.status,
                'createTime': this.dataForm.createTime,
                'updateTime': this.dataForm.updateTime,
                'gender': this.dataForm.gender,
                'idCard': this.dataForm.idCard,
                'nationality': this.dataForm.nationality,
                'politicalStatus': this.dataForm.politicalStatus,
                'email': this.dataForm.email,
                'nativePlace': this.dataForm.nativePlace,
                'clazz': this.dataForm.clazz,
                'admissionTime': this.dataForm.admissionTime,
                'graduationTime': this.dataForm.graduationTime,
                'major': this.dataForm.major,
                'degreeStage': this.dataForm.degreeStage,
                'phoneNum': this.dataForm.phoneNum,
                'city': this.dataForm.city,
                'workUnit': this.dataForm.workUnit,
                'jobTitle': this.dataForm.jobTitle,
                'enterpriseProperty': this.dataForm.enterpriseProperty,
                'note': this.dataForm.note,
                'aluStatus': this.dataForm.aluStatus
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.visible = false
                    this.$emit('refreshDataList')
                  }
                })
              } else {
                this.$message.error(data.msg)
              }
            })
          }
        })
      }
    }
  }
</script>
