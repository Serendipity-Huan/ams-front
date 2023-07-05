<template>
  <el-dialog
    title="审核详情"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-alert title="温馨提示：" type="warning" :closable="false">
      <div>
        <p class="el-alert__description">
          此页面仅供展示，直接修改数据无法生效
        </p>
      </div>
    </el-alert>
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
            <el-select
              v-model="dataFormBasic.gender"
              clearable
              style="width: 100%;"
            >
              <el-option
                v-for="item in genderOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="身份证号" prop="idCard">
            <el-input
              v-model="dataFormBasic.idCard"
              placeholder="身份证号"
            ></el-input>
          </el-form-item>
          <el-form-item label="民族" prop="nationality">
            <el-select
              v-model="dataFormBasic.nationality"
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
              v-model="dataFormBasic.politicalStatus"
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
            <el-select
              v-model="dataFormBasic.clazz"
              clearable
              style="width: 100%;"
            >
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
              v-model="dataFormBasic.admissionTime"
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
              v-model="dataFormBasic.graduationTime"
              type="date"
              style="width: 100%;"
              :value-format="'yyyy-MM-dd'"
              placeholder="选择日期"
              :clearable="false"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="专业" prop="major">
            <el-select
              v-model="dataFormBasic.major"
              clearable
              style="width: 100%;"
            >
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
              v-model.number="dataFormBasic.degreeStage"
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
            <el-select
              v-model="dataFormBasic.enterpriseProperty"
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
            <el-input
              v-model="dataFormBasic.note"
              placeholder="备注"
            ></el-input>
          </el-form-item>
          <!-- <el-form-item label="状态" prop="aluStatus">
            <el-input
              v-model="dataFormBasic.aluStatus"
              placeholder="状态"
            ></el-input>
          </el-form-item> -->
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
            <el-select v-model="dataForm.gender" clearable style="width: 100%;">
              <el-option
                v-for="item in genderOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item prop="idCard">
            <el-input
              v-model="dataForm.idCard"
              placeholder="身份证号"
            ></el-input>
          </el-form-item>
          <el-form-item prop="nationality">
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
          <el-form-item prop="politicalStatus">
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
          <el-form-item prop="admissionTime">
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
          <el-form-item prop="graduationTime">
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
          <el-form-item prop="major">
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
          <el-form-item prop="degreeStage">
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
          <el-form-item prop="note">
            <el-input v-model="dataForm.note" placeholder="备注"></el-input>
          </el-form-item>
          <!-- <el-form-item prop="aluStatus">
            <el-input
              v-model="dataForm.aluStatus"
              placeholder="状态"
            ></el-input>
          </el-form-item> -->
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
