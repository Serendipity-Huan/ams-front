<template>
  <el-dialog
    title="审核详情"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <div class="modal">
      <div class="left">
        <h2>修改前：</h2>
        <el-form :model="dataFormBasic" ref="dataFormBasic" label-width="80px">
          <el-form-item label="姓名" prop="aluName">
            <el-input
              v-model="dataFormBasic.aluName"
              placeholder="姓名"
            ></el-input>
          </el-form-item>
          <el-form-item label="学号" prop="aluId">
            <el-input
              v-model="dataFormBasic.aluId"
              placeholder="学号"
            ></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="gender">
            <el-input
              v-model="dataFormBasic.gender"
              placeholder="性别"
            ></el-input>
          </el-form-item>
          <el-form-item label="身份证号" prop="idCard">
            <el-input
              v-model="dataFormBasic.idCard"
              placeholder="身份证号"
            ></el-input>
          </el-form-item>
          <el-form-item label="民族" prop="nationality">
            <el-input
              v-model="dataFormBasic.nationality"
              placeholder="民族"
            ></el-input>
          </el-form-item>
          <el-form-item label="政治面貌" prop="politicalStatus">
            <el-input
              v-model="dataFormBasic.politicalStatus"
              placeholder="政治面貌"
            ></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input
              v-model="dataFormBasic.email"
              placeholder="邮箱"
            ></el-input>
          </el-form-item>
          <el-form-item label="籍贯" prop="nativePlace">
            <el-input
              v-model="dataFormBasic.nativePlace"
              placeholder="籍贯"
            ></el-input>
          </el-form-item>
          <el-form-item label="班级" prop="clazz">
            <el-input
              v-model="dataFormBasic.clazz"
              placeholder="班级"
            ></el-input>
          </el-form-item>
          <el-form-item label="入学时间" prop="admissionTime">
            <el-input
              v-model="dataFormBasic.admissionTime"
              placeholder="入学时间"
            ></el-input>
          </el-form-item>
          <el-form-item label="毕业时间" prop="graduationTime">
            <el-input
              v-model="dataFormBasic.graduationTime"
              placeholder="毕业时间"
            ></el-input>
          </el-form-item>
          <el-form-item label="专业" prop="major">
            <el-input
              v-model="dataFormBasic.major"
              placeholder="专业"
            ></el-input>
          </el-form-item>
          <el-form-item label="阶段" prop="degreeStage">
            <el-input
              v-model="dataFormBasic.degreeStage"
              placeholder="阶段"
            ></el-input>
          </el-form-item>
          <el-form-item label="手机" prop="phoneNum">
            <el-input
              v-model="dataFormBasic.phoneNum"
              placeholder="手机"
            ></el-input>
          </el-form-item>
          <el-form-item label="所在城市" prop="city">
            <el-input
              v-model="dataFormBasic.city"
              placeholder="所在城市"
            ></el-input>
          </el-form-item>
          <el-form-item label="工作单位" prop="workUnit">
            <el-input
              v-model="dataFormBasic.workUnit"
              placeholder="工作单位"
            ></el-input>
          </el-form-item>
          <el-form-item label="担任职务" prop="jobTitle">
            <el-input
              v-model="dataFormBasic.jobTitle"
              placeholder="担任职务"
            ></el-input>
          </el-form-item>
          <el-form-item label="企业性质" prop="enterpriseProperty">
            <el-input
              v-model="dataFormBasic.enterpriseProperty"
              placeholder="企业性质"
            ></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="note">
            <el-input
              v-model="dataFormBasic.note"
              placeholder="备注"
            ></el-input>
          </el-form-item>
          <el-form-item label="状态" prop="aluStatus">
            <el-input
              v-model="dataFormBasic.aluStatus"
              placeholder="状态"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="right">
        <h2>修改后：</h2>
        <el-form :model="dataForm" ref="dataForm" label-width="80px">
          <el-form-item prop="aluName">
            <el-input v-model="dataForm.aluName" placeholder="姓名"></el-input>
          </el-form-item>
          <el-form-item prop="aluId">
            <el-input v-model="dataForm.aluId" placeholder="学号"></el-input>
          </el-form-item>
          <el-form-item prop="gender">
            <el-input v-model="dataForm.gender" placeholder="性别"></el-input>
          </el-form-item>
          <el-form-item prop="idCard">
            <el-input
              v-model="dataForm.idCard"
              placeholder="身份证号"
            ></el-input>
          </el-form-item>
          <el-form-item prop="nationality">
            <el-input
              v-model="dataForm.nationality"
              placeholder="民族"
            ></el-input>
          </el-form-item>
          <el-form-item prop="politicalStatus">
            <el-input
              v-model="dataForm.politicalStatus"
              placeholder="政治面貌"
            ></el-input>
          </el-form-item>
          <el-form-item prop="email">
            <el-input v-model="dataForm.email" placeholder="邮箱"></el-input>
          </el-form-item>
          <el-form-item prop="nativePlace">
            <el-input
              v-model="dataForm.nativePlace"
              placeholder="籍贯"
            ></el-input>
          </el-form-item>
          <el-form-item prop="clazz">
            <el-input v-model="dataForm.clazz" placeholder="班级"></el-input>
          </el-form-item>
          <el-form-item prop="admissionTime">
            <el-input
              v-model="dataForm.admissionTime"
              placeholder="入学时间"
            ></el-input>
          </el-form-item>
          <el-form-item prop="graduationTime">
            <el-input
              v-model="dataForm.graduationTime"
              placeholder="毕业时间"
            ></el-input>
          </el-form-item>
          <el-form-item prop="major">
            <el-input v-model="dataForm.major" placeholder="专业"></el-input>
          </el-form-item>
          <el-form-item prop="degreeStage">
            <el-input
              v-model="dataForm.degreeStage"
              placeholder="阶段"
            ></el-input>
          </el-form-item>
          <el-form-item prop="phoneNum">
            <el-input v-model="dataForm.phoneNum" placeholder="手机"></el-input>
          </el-form-item>
          <el-form-item prop="city">
            <el-input v-model="dataForm.city" placeholder="所在城市"></el-input>
          </el-form-item>
          <el-form-item prop="workUnit">
            <el-input
              v-model="dataForm.workUnit"
              placeholder="工作单位"
            ></el-input>
          </el-form-item>
          <el-form-item prop="jobTitle">
            <el-input
              v-model="dataForm.jobTitle"
              placeholder="担任职务"
            ></el-input>
          </el-form-item>
          <el-form-item prop="enterpriseProperty">
            <el-input
              v-model="dataForm.enterpriseProperty"
              placeholder="企业性质"
            ></el-input>
          </el-form-item>
          <el-form-item prop="note">
            <el-input v-model="dataForm.note" placeholder="备注"></el-input>
          </el-form-item>
          <el-form-item prop="aluStatus">
            <el-input
              v-model="dataForm.aluStatus"
              placeholder="状态"
            ></el-input>
          </el-form-item>
          <el-form-item label="审核状态" prop="status">
            <el-tag size="medium" :type="showStatus[dataForm.status]">{{
              dataForm.status == 0
                ? "待审核"
                : dataForm.status == 1
                ? "通过"
                : dataForm.status == 2
                ? "未通过"
                : "已撤销"
            }}</el-tag>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button
        type="warning"
        @click="auditRepeal()"
        v-if="dataForm.status == 0"
        >撤销</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      showStatus: ["", "success", "danger", "warning"],
      // 修改前的数据
      dataFormBasic: {
        aluName: "",
        aluId: "",
        gender: "",
        idCard: "",
        nationality: "",
        politicalStatus: "",
        email: "",
        nativePlace: "",
        clazz: "",
        admissionTime: "",
        graduationTime: "",
        major: "",
        degreeStage: "",
        phoneNum: "",
        city: "",
        workUnit: "",
        jobTitle: "",
        enterpriseProperty: "",
        note: "",
        aluStatus: ""
      },
      // 修改后的数据
      dataForm: {
        id: 0, // 比修改前的数据多的一个字段，审核项的id
        aluName: "",
        aluId: "",
        gender: "",
        idCard: "",
        nationality: "",
        politicalStatus: "",
        email: "",
        nativePlace: "",
        clazz: "",
        admissionTime: "",
        graduationTime: "",
        major: "",
        degreeStage: "",
        phoneNum: "",
        city: "",
        workUnit: "",
        jobTitle: "",
        enterpriseProperty: "",
        note: "",
        aluStatus: "",
        status: "" // 比修改前的数据多的一个字段
      }
    };
  },
  methods: {
    init(id) {
      this.dataForm.id = id || 0;
      this.visible = true;
      // 获取修改前和修改后的数据
      this.$nextTick(() => {
        this.$refs["dataForm"].resetFields();
        if (this.dataForm.id) {
          this.$http({
            url: this.$http.adornUrl(
              `/basic/auditdetail/info-and-basic/${this.dataForm.id}`
            ),
            method: "get",
            params: this.$http.adornParams()
          }).then(({ data }) => {
            if (data && data.code === 0) {
              // 修改后的数据
              this.dataForm.aluName = data.auditDetail.aluName;
              this.dataForm.aluId = data.auditDetail.aluId;
              this.dataForm.gender = data.auditDetail.gender;
              this.dataForm.idCard = data.auditDetail.idCard;
              this.dataForm.nationality = data.auditDetail.nationality;
              this.dataForm.politicalStatus = data.auditDetail.politicalStatus;
              this.dataForm.email = data.auditDetail.email;
              this.dataForm.nativePlace = data.auditDetail.nativePlace;
              this.dataForm.clazz = data.auditDetail.clazz;
              this.dataForm.admissionTime = data.auditDetail.admissionTime;
              this.dataForm.graduationTime = data.auditDetail.graduationTime;
              this.dataForm.major = data.auditDetail.major;
              this.dataForm.degreeStage = data.auditDetail.degreeStage;
              this.dataForm.phoneNum = data.auditDetail.phoneNum;
              this.dataForm.city = data.auditDetail.city;
              this.dataForm.workUnit = data.auditDetail.workUnit;
              this.dataForm.jobTitle = data.auditDetail.jobTitle;
              this.dataForm.enterpriseProperty =
                data.auditDetail.enterpriseProperty;
              this.dataForm.note = data.auditDetail.note;
              this.dataForm.aluStatus = data.auditDetail.aluStatus;
              this.dataForm.status = data.auditDetail.status; // 比修改前的数据多的一个字段

              // 修改前的basic中的数据
              this.dataFormBasic.aluName = data.alumnusBasic.aluName;
              this.dataFormBasic.aluId = data.alumnusBasic.aluId;
              this.dataFormBasic.gender = data.alumnusBasic.gender;
              this.dataFormBasic.idCard = data.alumnusBasic.idCard;
              this.dataFormBasic.nationality = data.alumnusBasic.nationality;
              this.dataFormBasic.politicalStatus =
                data.alumnusBasic.politicalStatus;
              this.dataFormBasic.email = data.alumnusBasic.email;
              this.dataFormBasic.nativePlace = data.alumnusBasic.nativePlace;
              this.dataFormBasic.clazz = data.alumnusBasic.clazz;
              this.dataFormBasic.admissionTime =
                data.alumnusBasic.admissionTime;
              this.dataFormBasic.graduationTime =
                data.alumnusBasic.graduationTime;
              this.dataFormBasic.major = data.alumnusBasic.major;
              this.dataFormBasic.degreeStage = data.alumnusBasic.degreeStage;
              this.dataFormBasic.phoneNum = data.alumnusBasic.phoneNum;
              this.dataFormBasic.city = data.alumnusBasic.city;
              this.dataFormBasic.workUnit = data.alumnusBasic.workUnit;
              this.dataFormBasic.jobTitle = data.alumnusBasic.jobTitle;
              this.dataFormBasic.enterpriseProperty =
                data.alumnusBasic.enterpriseProperty;
              this.dataFormBasic.note = data.alumnusBasic.note;
              this.dataFormBasic.aluStatus = data.alumnusBasic.aluStatus;
            }
          });
        }
      });
    },
    // 审核撤销
    auditRepeal() {
      this.$http({
        url: this.$http.adornUrl(`/basic/auditdetail/audit-repeal`),
        method: "post",
        data: this.$http.adornData([this.dataForm.id], false)
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.$message({
            message: "操作成功",
            type: "success",
            duration: 1500,
            onClose: () => {
              this.visible = false;
              this.$emit("refreshAuditList");
            }
          });
        } else {
          this.$message.error(data.msg);
        }
      });
    }
  }
};
</script>

<style scoped>
.modal {
  display: flex;
  justify-content: space-between;
}

.left {
  width: 50%;
}

.right {
  width: 50%;
}
</style>
