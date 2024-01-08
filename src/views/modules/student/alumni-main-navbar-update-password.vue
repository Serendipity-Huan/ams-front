<template>
  <el-dialog title="修改密码" :visible.sync="visible" :append-to-body="true">
    <el-form
      :model="dataForm"
      :rules="dataRule"
      ref="dataForm"
      @keyup.enter.native="dataFormSubmit()"
      label-width="80px"
    >
      <el-form-item label="姓名">
        <span>{{ userName }}</span>
      </el-form-item>
      <el-form-item label="原密码" prop="password">
        <el-input v-model="dataForm.password" show-password></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <el-input v-model="dataForm.newPassword" show-password></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input v-model="dataForm.confirmPassword" show-password></el-input>
      </el-form-item>
    </el-form>
    <el-alert title="温馨提示：" type="success" :closable="false">
      <div>
        <p class="el-alert__description">
          1、新密码长度不能低于8个字符或高于20个字符
        </p>
        <p class="el-alert__description">
          2、新密码必须由数字、大小写英文字符、特殊字符组成
        </p>
      </div>
    </el-alert>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { clearLoginInfo } from "@/utils";
export default {
  data() {
    // 校验新密码
    const validateNewPassword = (rule, value, callback) => {
      // 是否包含一位数字
      const regNumber = /(?=.*[\d])/;
      // 是否包含一位小写字母
      const regLowercase = /(?=.*[a-z])/;
      // 是否包含一位大写字母
      const regUppercase = /(?=.*[A-Z])/;
      // 是否包含一位特殊字符
      const regCharacter = /(?=.*[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、])/;
      if (value.length > 20) {
        callback(new Error("密码长度不超过20个字符"));
      } else if (value.length < 8) {
        callback(new Error("密码长度不低于8个字符"));
      } else {
        if (!regNumber.test(value)) {
          callback(new Error("密码需要包含数字"));
        } else if (!regLowercase.test(value)) {
          callback(new Error("密码需要包含小写字母"));
        } else if (!regUppercase.test(value)) {
          callback(new Error("密码需要包含大写字母"));
        } else if (!regCharacter.test(value)) {
          callback(new Error("密码需要包含特殊字符"));
        } else {
          callback();
        }
      }
    };
    const validateConfirmPassword = (rule, value, callback) => {
      if (this.dataForm.newPassword !== value) {
        callback(new Error("确认密码与新密码不一致"));
      } else {
        callback();
      }
    };
    return {
      visible: false,
      dataForm: {
        password: "",
        newPassword: "",
        confirmPassword: ""
      },
      dataRule: {
        password: [
          { required: true, message: "原密码不能为空", trigger: "blur" }
        ],
        newPassword: [
          { required: true, message: "新密码不能为空", trigger: "blur" },
          { validator: validateNewPassword, trigger: "blur" }
        ],
        confirmPassword: [
          { required: true, message: "确认密码不能为空", trigger: "blur" },
          { validator: validateConfirmPassword, trigger: "blur" }
        ]
      }
    };
  },
  computed: {
    userName: {
      get() {
        return this.$store.state.user.name;
      }
    },
    mainTabs: {
      get() {
        return this.$store.state.common.mainTabs;
      },
      set(val) {
        this.$store.commit("common/updateMainTabs", val);
      }
    }
  },
  methods: {
    // 初始化
    init() {
      this.visible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].resetFields();
      });
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          this.$http({
            url: this.$http.adornUrl("/basic/alumnusbasic/update-password"),
            method: "post",
            data: this.$http.adornData({
              password: this.dataForm.password,
              newPassword: this.dataForm.newPassword
            })
          }).then(({ data }) => {
            if (data && data.code === 0) {
              this.$message({
                message: "操作成功",
                type: "success",
                duration: 1500,
                onClose: () => {
                  this.visible = false;
                  this.$nextTick(() => {
                    this.mainTabs = [];
                    clearLoginInfo();
                    this.$router.replace({ name: "login" });
                    this.$router.go(0);
                  });
                }
              });
            } else {
              this.$message.error(data.msg);
            }
          });
        }
      });
    }
  }
};
</script>
