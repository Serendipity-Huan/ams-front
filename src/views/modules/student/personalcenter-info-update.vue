<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-form
      :model="dataForm"
      :rules="dataRule"
      ref="dataForm"
      @keyup.enter.native="dataFormSubmit()"
      label-width="80px"
    >
      <el-form-item label="姓名" prop="aluName">
        <el-input v-model="dataForm.aluName" placeholder="姓名"></el-input>
      </el-form-item>
      <el-form-item label="学号" prop="aluId">
        <el-input
          v-model="dataForm.aluId"
          placeholder="学号"
          :disabled="true"
        ></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-select v-model="dataForm.gender" clearable style="width: 100%;">
          <el-option
            v-for="item in genderOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="身份证号" prop="idCard">
        <el-input v-model="dataForm.idCard" placeholder="身份证号"></el-input>
      </el-form-item>
      <el-form-item label="民族" prop="nationality">
        <el-select
          v-model="dataForm.nationality"
          clearable
          style="width: 100%;"
        >
          <el-option
            v-for="item in peopleOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="政治面貌" prop="politicalStatus">
        <el-select
          v-model="dataForm.politicalStatus"
          clearable
          style="width: 100%;"
        >
          <el-option
            v-for="item in politicalStatusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="dataForm.email" placeholder="邮箱"></el-input>
      </el-form-item>
      <el-form-item label="籍贯" prop="nativePlace">
        <el-input v-model="dataForm.nativePlace" placeholder="籍贯"></el-input>
      </el-form-item>
      <el-form-item label="班级" prop="clazz">
        <el-select v-model="dataForm.clazz" clearable style="width: 100%;">
          <el-option
            v-for="item in classOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="入学时间" prop="admissionTime">
        <el-date-picker
          v-model="dataForm.admissionTime"
          type="date"
          :value-format="'yyyy-MM-dd'"
          style="width: 100%;"
          placeholder="选择日期"
          :clearable="false"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="毕业时间" prop="graduationTime">
        <el-date-picker
          v-model="dataForm.graduationTime"
          type="date"
          style="width: 100%;"
          :value-format="'yyyy-MM-dd'"
          placeholder="选择日期"
          :clearable="false"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="专业" prop="major">
        <el-select v-model="dataForm.major" clearable style="width: 100%;">
          <el-option
            v-for="item in majorOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="阶段" prop="degreeStage">
        <el-select
          v-model.number="dataForm.degreeStage"
          clearable
          style="width: 100%;"
        >
          <el-option
            v-for="item in phaseOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
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
        <el-select
          v-model="dataForm.enterpriseProperty"
          clearable
          style="width: 100%;"
        >
          <el-option
            v-for="item in enterpriseOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备注" prop="note">
        <el-input v-model="dataForm.note" placeholder="备注"></el-input>
      </el-form-item>
      <!-- <el-form-item label="状态" prop="aluStatus">
        <el-input v-model="dataForm.aluStatus" placeholder="状态"></el-input>
      </el-form-item> -->
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">提交审核</el-button>
    </span>
  </el-dialog>
</template>

<script>
// import SingleUpload from "@/components/upload/singleUpload";
export default {
  // components: { SingleUpload },
  data() {
    return {
      visible: false,
      dataForm: {
        id: 0,
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
      // 按性别选择的选项
      genderOptions: [
        {
          value: "",
          label: "请选择"
        },
        {
          value: 0,
          label: "男"
        },
        {
          value: 1,
          label: "女"
        }
      ],
      // 按专业选择的选项
      majorOptions: [
        {
          value: "",
          label: "请选择"
        },
        {
          value: "安全工程",
          label: "安全工程"
        },
        {
          value: "动力工程",
          label: "动力工程"
        },
        {
          value: "冶金工程",
          label: "冶金工程"
        },
        {
          value: "有色金属冶金",
          label: "有色金属冶金"
        },
        {
          value: "工业催化",
          label: "工业催化"
        },
        {
          value: "过程装备与控制工程",
          label: "过程装备与控制工程"
        },
        {
          value: "化工过程机械",
          label: "化工过程机械"
        },
        {
          value: "化学工程",
          label: "化学工程"
        },
        {
          value: "化学工程与工艺",
          label: "化学工程与工艺"
        },
        {
          value: "化学工程与技术",
          label: "化学工程与技术"
        },
        {
          value: "化学工艺",
          label: "化学工艺"
        },
        {
          value: "生物工程",
          label: "生物工程"
        },
        {
          value: "生物化工",
          label: "生物化工"
        },
        {
          value: "物理化学",
          label: "物理化学"
        },
        {
          value: "应用化学",
          label: "应用化学"
        },
        {
          value: "分析化学",
          label: "分析化学"
        },
        {
          value: "放射化学",
          label: "放射化学"
        },
        {
          value: "无机非金属材料",
          label: "无机非金属材料"
        },
        {
          value: "无机化工",
          label: "无机化工"
        },
        {
          value: "有机化工",
          label: "有机化工"
        },
        {
          value: "精细化工",
          label: "精细化工"
        },
        {
          value: "制药工程",
          label: "制药工程"
        },
        {
          value: "伦理化工",
          label: "伦理化工"
        },
        {
          value: "燃烧动力学",
          label: "燃烧动力学"
        }
      ],
      // 按民族选择的选项
      peopleOptions: [
        {
          value: "",
          label: "请选择"
        },
        {
          value: "汉族",
          label: "汉族"
        },
        {
          value: "壮族",
          label: "壮族"
        },
        {
          value: "蒙古族",
          label: "蒙古族"
        },
        {
          value: "回族",
          label: "回族"
        },
        {
          value: "藏族",
          label: "藏族"
        },
        {
          value: "维吾尔族",
          label: "维吾尔族"
        },
        {
          value: "苗族",
          label: "苗族"
        },
        {
          value: "彝族",
          label: "彝族"
        },
        {
          value: "布依族",
          label: "布依族"
        },
        {
          value: "朝鲜族",
          label: "朝鲜族"
        },
        {
          value: "满族",
          label: "满族"
        },
        {
          value: "侗族",
          label: "侗族"
        },
        {
          value: "瑶族",
          label: "瑶族"
        },
        {
          value: "白族",
          label: "白族"
        },
        {
          value: "东乡族",
          label: "东乡族"
        },
        {
          value: "锡伯族",
          label: "锡伯族"
        },
        {
          value: "土家族",
          label: "土家族"
        },
        {
          value: "哈尼族",
          label: "哈尼族"
        },
        {
          value: "哈萨克族",
          label: "哈萨克族"
        },
        {
          value: "傣族",
          label: "傣族"
        },
        {
          value: "黎族",
          label: "黎族"
        },
        {
          value: "僳僳族",
          label: "僳僳族"
        },
        {
          value: "佤族",
          label: "佤族"
        },
        {
          value: "畲族",
          label: "畲族"
        },
        {
          value: "拉祜族",
          label: "拉祜族"
        },
        {
          value: "水族",
          label: "水族"
        },
        {
          value: "纳西族",
          label: "纳西族"
        },
        {
          value: "景颇族",
          label: "景颇族"
        },
        {
          value: "柯尔克孜族",
          label: "柯尔克孜族"
        },
        {
          value: "土族",
          label: "土族"
        },
        {
          value: "高山族",
          label: "高山族"
        },
        {
          value: "达斡尔族",
          label: "达斡尔族"
        },
        {
          value: "仫佬族",
          label: "仫佬族"
        },
        {
          value: "羌族",
          label: "羌族"
        },
        {
          value: "撒拉族",
          label: "撒拉族"
        },
        {
          value: "德昂族",
          label: "德昂族"
        },
        {
          value: "仡佬族",
          label: "仡佬族"
        },
        {
          value: "阿昌族",
          label: "阿昌族"
        },
        {
          value: "普米族",
          label: "普米族"
        },
        {
          value: "布朗族",
          label: "布朗族"
        },
        {
          value: "塔吉克族",
          label: "塔吉克族"
        },
        {
          value: "怒族",
          label: "怒族"
        },
        {
          value: "乌孜别克族",
          label: "乌孜别克族"
        },
        {
          value: "俄罗斯族",
          label: "俄罗斯族"
        },
        {
          value: "鄂温克族",
          label: "鄂温克族"
        },
        {
          value: "毛南族",
          label: "毛南族"
        },
        {
          value: "保安族",
          label: "保安族"
        },
        {
          value: "裕固族",
          label: "裕固族"
        },
        {
          value: "京族",
          label: "京族"
        },
        {
          value: "塔塔尔族",
          label: "塔塔尔族"
        },
        {
          value: "独龙族",
          label: "独龙族"
        },
        {
          value: "鄂伦春族",
          label: "鄂伦春族"
        },
        {
          value: "赫哲族",
          label: "赫哲族"
        },
        {
          value: "门巴族",
          label: "门巴族"
        },
        {
          value: "珞巴族",
          label: "珞巴族"
        },
        {
          value: "基诺族",
          label: "基诺族"
        }
      ],
      // 按政治面貌选择的选项
      politicalStatusOptions: [
        {
          value: "",
          label: "请选择"
        },
        {
          value: "共青团员",
          label: "共青团员"
        },
        {
          value: "中共党员",
          label: "中共党员"
        },
        {
          value: "预备党员",
          label: "预备党员"
        },
        {
          value: "群众",
          label: "群众"
        }
      ],
      // 按班级选择的选项
      classOptions: [
        {
          value: "",
          label: "请选择"
        },
        {
          value: "工艺一班",
          label: "工艺一班"
        },
        {
          value: "工艺二班",
          label: "工艺二班"
        },
        {
          value: "工艺三班",
          label: "工艺三班"
        },
        {
          value: "工艺四班",
          label: "工艺四班"
        },
        {
          value: "工艺五班",
          label: "工艺五班"
        },
        {
          value: "工艺六班",
          label: "工艺六班"
        },
        {
          value: "工艺七班",
          label: "工艺七班"
        },
        {
          value: "工艺八班",
          label: "工艺八班"
        },
        {
          value: "工艺九班",
          label: "工艺九班"
        },
        {
          value: "工艺十班",
          label: "工艺十班"
        },
        {
          value: "制药一班",
          label: "制药一班"
        },
        {
          value: "制药二班",
          label: "制药二班"
        },
        {
          value: "制药三班",
          label: "制药三班"
        },
        {
          value: "制药四班",
          label: "制药四班"
        },
        {
          value: "制药五班",
          label: "制药五班"
        },
        {
          value: "制药六班",
          label: "制药六班"
        },
        {
          value: "制药七班",
          label: "制药七班"
        },
        {
          value: "制药八班",
          label: "制药八班"
        },
        {
          value: "制药九班",
          label: "制药九班"
        },
        {
          value: "制药十班",
          label: "制药十班"
        },
        {
          value: "安全工程一班",
          label: "安全工程一班"
        },
        {
          value: "安全工程二班",
          label: "安全工程二班"
        },
        {
          value: "安全工程三班",
          label: "安全工程三班"
        },
        {
          value: "安全工程四班",
          label: "安全工程四班"
        },
        {
          value: "安全工程五班",
          label: "安全工程五班"
        },
        {
          value: "安全工程六班",
          label: "安全工程六班"
        },
        {
          value: "安全工程七班",
          label: "安全工程七班"
        },
        {
          value: "安全工程八班",
          label: "安全工程八班"
        },
        {
          value: "安全工程九班",
          label: "安全工程九班"
        },
        {
          value: "安全工程十班",
          label: "安全工程十班"
        },
        {
          value: "生工一班",
          label: "生工一班"
        },
        {
          value: "生工二班",
          label: "生工二班"
        },
        {
          value: "生工三班",
          label: "生工三班"
        },
        {
          value: "生工四班",
          label: "生工四班"
        },
        {
          value: "生工五班",
          label: "生工五班"
        },
        {
          value: "生工六班",
          label: "生工六班"
        },
        {
          value: "生工七班",
          label: "生工七班"
        },
        {
          value: "生工八班",
          label: "生工八班"
        },
        {
          value: "生工九班",
          label: "生工九班"
        },
        {
          value: "生工十班",
          label: "生工十班"
        },
        {
          value: "冶金一班",
          label: "冶金一班"
        },
        {
          value: "冶金二班",
          label: "冶金二班"
        },
        {
          value: "冶金三班",
          label: "冶金三班"
        },
        {
          value: "冶金四班",
          label: "冶金四班"
        },
        {
          value: "冶金五班",
          label: "冶金五班"
        },
        {
          value: "冶金六班",
          label: "冶金六班"
        },
        {
          value: "冶金七班",
          label: "冶金七班"
        },
        {
          value: "冶金八班",
          label: "冶金八班"
        },
        {
          value: "冶金九班",
          label: "冶金九班"
        },
        {
          value: "冶金十班",
          label: "冶金十班"
        },
        {
          value: "过程装备与控制工程一班",
          label: "过程装备与控制工程一班"
        },
        {
          value: "过程装备与控制工程二班",
          label: "过程装备与控制工程二班"
        },
        {
          value: "过程装备与控制工程三班",
          label: "过程装备与控制工程三班"
        },
        {
          value: "过程装备与控制工程四班",
          label: "过程装备与控制工程四班"
        },
        {
          value: "过程装备与控制工程五班",
          label: "过程装备与控制工程五班"
        },
        {
          value: "过程装备与控制工程六班",
          label: "过程装备与控制工程六班"
        },
        {
          value: "过程装备与控制工程七班",
          label: "过程装备与控制工程七班"
        },
        {
          value: "过程装备与控制工程八班",
          label: "过程装备与控制工程八班"
        },
        {
          value: "过程装备与控制工程九班",
          label: "过程装备与控制工程九班"
        },
        {
          value: "过程装备与控制工程十班",
          label: "过程装备与控制工程十班"
        },
        {
          value: "化学工程与工艺一班",
          label: "化学工程与工艺一班"
        },
        {
          value: "化学工程与工艺二班",
          label: "化学工程与工艺二班"
        },
        {
          value: "化学工程与工艺三班",
          label: "化学工程与工艺三班"
        },
        {
          value: "化学工程与工艺四班",
          label: "化学工程与工艺四班"
        },
        {
          value: "化学工程与工艺五班",
          label: "化学工程与工艺五班"
        },
        {
          value: "化学工程与工艺六班",
          label: "化学工程与工艺六班"
        },
        {
          value: "化学工程与工艺七班",
          label: "化学工程与工艺七班"
        },
        {
          value: "化学工程与工艺八班",
          label: "化学工程与工艺八班"
        },
        {
          value: "化学工程与工艺九班",
          label: "化学工程与工艺九班"
        },
        {
          value: "化学工程与工艺十班",
          label: "化学工程与工艺十班"
        }
      ],
      // 按阶段选择的选项
      phaseOptions: [
        {
          value: "",
          label: "请选择"
        },
        {
          value: 0,
          label: "本科"
        },
        {
          value: 1,
          label: "硕士"
        },
        {
          value: 2,
          label: "博士"
        }
      ],
      // 按企业性质选择的选项
      enterpriseOptions: [
        {
          value: "",
          label: "请选择"
        },
        {
          value: "国有企业",
          label: "国有企业"
        },
        {
          value: "民营企业",
          label: "民营企业"
        },
        {
          value: "三资企业",
          label: "三资企业"
        },
        {
          value: "私营企业",
          label: "私营企业"
        },
        {
          value: "个体独资企业",
          label: "个体独资企业"
        },
        {
          value: "其他",
          label: "其他"
        }
      ],

      // 数据校验规则
      dataRule: {
        aluName: [{ required: true, message: "姓名不能为空", trigger: "blur" }],
        aluId: [{ required: true, message: "学号不能为空", trigger: "blur" }]
        // gender: [{ required: true, message: "性别不能为空", trigger: "blur" }],
        // idCard: [
        //   { required: true, message: "身份证号不能为空", trigger: "blur" },
        // ],
        // nationality: [
        //   { required: true, message: "民族不能为空", trigger: "blur" },
        // ],
        // politicalStatus: [
        //   { required: true, message: "政治面貌不能为空", trigger: "blur" },
        // ],
        // email: [{ required: true, message: "邮箱不能为空", trigger: "blur" }],
        // nativePlace: [
        //   { required: true, message: "籍贯不能为空", trigger: "blur" },
        // ],
        // clazz: [{ required: true, message: "班级不能为空", trigger: "blur" }],
        // admissionTime: [
        //   { required: true, message: "入学时间不能为空", trigger: "blur" },
        // ],
        // graduationTime: [
        //   { required: true, message: "毕业时间不能为空", trigger: "blur" },
        // ],
        // major: [{ required: true, message: "专业不能为空", trigger: "blur" }],
        // degreeStage: [
        //   { required: true, message: "阶段不能为空", trigger: "blur" },
        // ],
        // phoneNum: [
        //   { required: true, message: "手机不能为空", trigger: "blur" },
        // ],
        // city: [
        //   { required: true, message: "所在城市不能为空", trigger: "blur" },
        // ],
        // workUnit: [
        //   { required: true, message: "工作单位不能为空", trigger: "blur" },
        // ],
        // jobTitle: [
        //   { required: true, message: "担任职务不能为空", trigger: "blur" },
        // ],
        // enterpriseProperty: [
        //   { required: true, message: "企业性质不能为空", trigger: "blur" },
        // ],
        // note: [{ required: true, message: "备注不能为空", trigger: "blur" }],
        // aluStatus: [
        //   { required: true, message: "状态不能为空", trigger: "blur" },
        // ],
      }
    };
  },
  methods: {
    init(id) {
      this.dataForm.id = id || 0;
      this.visible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].resetFields();
        if (this.dataForm.id) {
          this.$http({
            url: this.$http.adornUrl(`/basic/alumnusbasic/info`),
            method: "get",
            params: this.$http.adornParams()
          }).then(({ data }) => {
            if (data && data.code === 0) {
              this.dataForm.aluName = data.user.aluName;
              this.dataForm.aluId = data.user.aluId;
              this.dataForm.gender = data.user.gender;
              this.dataForm.idCard = data.user.idCard;
              this.dataForm.nationality = data.user.nationality;
              this.dataForm.politicalStatus = data.user.politicalStatus;
              this.dataForm.email = data.user.email;
              this.dataForm.nativePlace = data.user.nativePlace;
              this.dataForm.clazz = data.user.clazz;
              this.dataForm.admissionTime = data.user.admissionTime;
              this.dataForm.graduationTime = data.user.graduationTime;
              this.dataForm.major = data.user.major;
              this.dataForm.degreeStage = data.user.degreeStage;
              this.dataForm.phoneNum = data.user.phoneNum;
              this.dataForm.city = data.user.city;
              this.dataForm.workUnit = data.user.workUnit;
              this.dataForm.jobTitle = data.user.jobTitle;
              this.dataForm.enterpriseProperty = data.user.enterpriseProperty;
              this.dataForm.note = data.user.note;
              this.dataForm.aluStatus = data.user.aluStatus;
            } else {
              this.$message.error(data.msg);
            }
          });
        } else {
          this.$message.error("出现错误，请刷新后重试");
        }
      });
    },
    // 表单提交，提交审核申请
    dataFormSubmit() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          this.$http({
            url: this.$http.adornUrl(`/basic/auditdetail/apply`),
            method: "post",
            data: this.$http.adornData({
              // alumnusBasicId: this.dataForm.id,  // 这里发的id实际上是校友基本信息表的id
              aluName: this.dataForm.aluName,
              // aluId: this.dataForm.aluId,
              gender: this.dataForm.gender,
              idCard: this.dataForm.idCard,
              nationality: this.dataForm.nationality,
              politicalStatus: this.dataForm.politicalStatus,
              email: this.dataForm.email,
              nativePlace: this.dataForm.nativePlace,
              clazz: this.dataForm.clazz,
              admissionTime: this.dataForm.admissionTime,
              graduationTime: this.dataForm.graduationTime,
              major: this.dataForm.major,
              degreeStage: this.dataForm.degreeStage,
              phoneNum: this.dataForm.phoneNum,
              city: this.dataForm.city,
              workUnit: this.dataForm.workUnit,
              jobTitle: this.dataForm.jobTitle,
              enterpriseProperty: this.dataForm.enterpriseProperty,
              note: this.dataForm.note
              // aluStatus: this.dataForm.aluStatus,
            })
          }).then(({ data }) => {
            if (data && data.code === 0) {
              this.$message({
                message: "操作成功",
                type: "success",
                duration: 1500,
                onClose: () => {
                  this.visible = false;
                  this.$emit("refreshDataList");
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
