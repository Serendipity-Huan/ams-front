<template>
  <div class="mod-demo-echarts">
    <!-- <el-alert
      title="提示："
      type="warning"
      :closable="false">
      <div slot-scope="description">
        <p class="el-alert__description">1. 此Demo只提供ECharts官方使用文档，入门部署和体验功能。具体使用请参考：http://echarts.baidu.com/index.html</p>
      </div>
    </el-alert> -->

    <el-form :model="dataForm">
      <el-row :gutter="20">
        <div>
        <el-col :span="4" style="display: flex; align-items: center; margin-top: 20px">
          <span style="white-space: nowrap; margin-right: 10px;">条件筛选：</span>
          <el-input v-model="dataForm.query" placeholder="关键字" clearable class="custom-input"></el-input>
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
        <el-col :span="4" style="display: flex; align-items: center;">
          <span style="white-space: nowrap; margin-right: 10px;">籍贯：</span>
          <el-cascader v-model="dataForm.nativePlace" :options="districtOptions" :props="{ expandTrigger: 'hover', checkStrictly: true}" clearable></el-cascader>
        </el-col>
        <el-col :span="4" style="display: flex; align-items: center;" class="top-margin">
          <span style="white-space: nowrap; margin-right: 10px;">班级：</span>
          <el-select v-model="dataForm.clazz" clearable>
            <el-option v-for="item in classOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="4" style="display: flex; align-items: center;" class="top-margin">
          <span style="white-space: nowrap; margin-right: 10px;">阶段：</span>
          <el-select v-model.number="dataForm.degreeStage" clearable>
            <el-option v-for="item in phaseOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="4" style="display: flex; align-items: center;" class="top-margin">
          <span style="white-space: nowrap; margin-right: 10px;">政治面貌：</span>
          <el-select v-model="dataForm.politicalStatus" clearable>
            <el-option v-for="item in politicalStatusOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="4" style="display: flex; align-items: center;" class="top-margin">
          <span style="white-space: nowrap; margin-right: 10px;">所在城市：</span>
          <el-cascader v-model="dataForm.city" :options="districtOptions" :props="{ expandTrigger: 'hover', checkStrictly: true}" clearable></el-cascader>
        </el-col>
        <el-col :span="4" style="display: flex; align-items: center;" class="top-margin">
          <span style="white-space: nowrap; margin-right: 10px;">民族：</span>
          <el-select v-model="dataForm.nationality" clearable>
            <el-option v-for="item in peopleOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        </div>
      </el-row>

      <el-form-item style="margin-top: 20px">
        <el-button type="success" @click="conditionQuery()">查询</el-button>
        <el-button type="warning" @click="exports()" style="margin-left: 50px">将勾选数据导出为excel</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="dataList"
      border
      @selection-change="selectionChangeHandle"
      style="width: 100%;"
      v-if="disable">
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
        :formatter="formatAdmissionTime">
      </el-table-column>
      <el-table-column
        prop="graduationTime"
        header-align="center"
        align="center"
        label="毕业时间"
        :formatter="formatGraduationTime">
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
        prop="email"
        header-align="center"
        align="center"
        label="邮箱">
      </el-table-column>
      <el-table-column
        prop="note"
        header-align="center"
        align="center"
        label="备注">
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
  </div>
</template>

<script>
import {formatDate} from '../../../assets/lib/utils'
import {Loading} from 'element-ui'
import xlsx from 'xlsx'
// import echarts from 'echarts'
export default {
  data () {
    return {
      dataForm: {
        query: '',
        aluName: '',
        aluId: '',
        gender: '',
        city: '',
        idCard: '',
        clazz: '',
        major: '',
        nativePlace: '',
        degreeStage: '',
        nationality: '',
        workUnit: '',
        jobTitle: '',
        enterpriseProperty: '',
        graduationTime: null,
        politicalStatus: '',
        page: '',
        limit: ''
      },
      // 按性别选择的选项
      genderOptions: [{
        value: '', label: '请选择'
      }, {
        value: 0, label: '男'
      }, {
        value: 1, label: '女'
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
      // 按民族选择的选项
      peopleOptions: [{
        value: '', label: '请选择'
      }, {
        value: '汉族', label: '汉族'
      }, {
        value: '壮族', label: '壮族'
      }, {
        value: '蒙古族', label: '蒙古族'
      }, {
        value: '回族', label: '回族'
      }, {
        value: '藏族', label: '藏族'
      }, {
        value: '维吾尔族', label: '维吾尔族'
      }, {
        value: '苗族', label: '苗族'
      }, {
        value: '彝族', label: '彝族'
      }, {
        value: '布依族', label: '布依族'
      }, {
        value: '朝鲜族', label: '朝鲜族'
      }, {
        value: '满族', label: '满族'
      }, {
        value: '侗族', label: '侗族'
      }, {
        value: '瑶族', label: '瑶族'
      }, {
        value: '白族', label: '白族'
      }, {
        value: '东乡族', label: '东乡族'
      }, {
        value: '锡伯族', label: '锡伯族'
      }, {
        value: '土家族', label: '土家族'
      }, {
        value: '哈尼族', label: '哈尼族'
      }, {
        value: '哈萨克族', label: '哈萨克族'
      }, {
        value: '傣族', label: '傣族'
      }, {
        value: '黎族', label: '黎族'
      }, {
        value: '僳僳族', label: '僳僳族'
      }, {
        value: '佤族', label: '佤族'
      }, {
        value: '畲族', label: '畲族'
      }, {
        value: '拉祜族', label: '拉祜族'
      }, {
        value: '水族', label: '水族'
      }, {
        value: '纳西族', label: '纳西族'
      }, {
        value: '景颇族', label: '景颇族'
      }, {
        value: '柯尔克孜族', label: '柯尔克孜族'
      }, {
        value: '土族', label: '土族'
      }, {
        value: '高山族', label: '高山族'
      }, {
        value: '达斡尔族', label: '达斡尔族'
      }, {
        value: '仫佬族', label: '仫佬族'
      }, {
        value: '羌族', label: '羌族'
      }, {
        value: '撒拉族', label: '撒拉族'
      }, {
        value: '德昂族', label: '德昂族'
      }, {
        value: '仡佬族', label: '仡佬族'
      }, {
        value: '阿昌族', label: '阿昌族'
      }, {
        value: '普米族', label: '普米族'
      }, {
        value: '布朗族', label: '布朗族'
      }, {
        value: '塔吉克族', label: '塔吉克族'
      }, {
        value: '怒族', label: '怒族'
      }, {
        value: '乌孜别克族', label: '乌孜别克族'
      }, {
        value: '俄罗斯族', label: '俄罗斯族'
      }, {
        value: '鄂温克族', label: '鄂温克族'
      }, {
        value: '毛南族', label: '毛南族'
      }, {
        value: '保安族', label: '保安族'
      }, {
        value: '裕固族', label: '裕固族'
      }, {
        value: '京族', label: '京族'
      }, {
        value: '塔塔尔族', label: '塔塔尔族'
      }, {
        value: '独龙族', label: '独龙族'
      }, {
        value: '鄂伦春族', label: '鄂伦春族'
      }, {
        value: '赫哲族', label: '赫哲族'
      }, {
        value: '门巴族', label: '门巴族'
      }, {
        value: '珞巴族', label: '珞巴族'
      }, {
        value: '基诺族', label: '基诺族'
      }],
      // 按政治面貌选择的选项
      politicalStatusOptions: [{
        value: '', label: '请选择'
      }, {
        value: '共青团员', label: '共青团员'
      }, {
        value: '中共党员', label: '中共党员'
      }, {
        value: '预备党员', label: '预备党员'
      }, {
        value: '群众', label: '群众'
      }],
      // 按地区（籍贯、所在城市）选择的选项
      districtOptions: [{
        value: '北京市',
        label: '北京市',
        children: [{
          value: '北京市', label: '北京市'
        }]
      }, {
        value: '天津市',
        label: '天津市',
        children: [{
          value: '天津市', label: '天津市'
        }]
      }, {
        value: '河北省',
        label: '河北省',
        children: [{
          value: '石家庄市', label: '石家庄市'
        }, {
          value: '唐山市', label: '唐山市'
        }, {
          value: '秦皇岛市', label: '秦皇岛市'
        }, {
          value: '邯郸市', label: '邯郸市'
        }, {
          value: '邢台市', label: '邢台市'
        }, {
          value: '保定市', label: '保定市'
        }, {
          value: '张家口市', label: '张家口市'
        }, {
          value: '承德市', label: '承德市'
        }, {
          value: '沧州市', label: '沧州市'
        }, {
          value: '廊坊市', label: '廊坊市'
        }, {
          value: '衡水市', label: '衡水市'
        }]
      }, {
        value: '山西省',
        label: '山西省',
        children: [{
          value: '太原市', label: '太原市'
        }, {
          value: '大同市', label: '大同市'
        }, {
          value: '阳泉市', label: '阳泉市'
        }, {
          value: '长治市', label: '长治市'
        }, {
          value: '晋城市', label: '晋城市'
        }, {
          value: '朔州市', label: '朔州市'
        }, {
          value: '晋中市', label: '晋中市'
        }, {
          value: '运城市', label: '运城市'
        }, {
          value: '忻州市', label: '忻州市'
        }, {
          value: '临汾市', label: '临汾市'
        }, {
          value: '吕梁市', label: '吕梁市'
        }]
      }, {
        value: '内蒙古省',
        label: '内蒙古自治区',
        children: [{
          value: '呼和浩特市', label: '呼和浩特市'
        }, {
          value: '包头市', label: '包头市'
        }, {
          value: '乌海市', label: '乌海市'
        }, {
          value: '赤峰市', label: '赤峰市'
        }, {
          value: '通辽市', label: '通辽市'
        }, {
          value: '鄂尔多斯市', label: '鄂尔多斯市'
        }, {
          value: '呼伦贝尔市', label: '呼伦贝尔市'
        }, {
          value: '巴彦淖尔市', label: '巴彦淖尔市'
        }, {
          value: '乌兰察布市', label: '乌兰察布市'
        }, {
          value: '兴安市', label: '兴安盟'
        }, {
          value: '锡林郭勒市', label: '锡林郭勒盟'
        }, {
          value: '阿拉善市', label: '阿拉善盟'
        }]
      }, {
        value: '辽宁省',
        label: '辽宁省',
        children: [{
          value: '沈阳市', label: '沈阳市'
        }, {
          value: '大连市', label: '大连市'
        }, {
          value: '鞍山市', label: '鞍山市'
        }, {
          value: '抚顺市', label: '抚顺市'
        }, {
          value: '本溪市', label: '本溪市'
        }, {
          value: '丹东市', label: '丹东市'
        }, {
          value: '锦州市', label: '锦州市'
        }, {
          value: '营口市', label: '营口市'
        }, {
          value: '阜新市', label: '阜新市'
        }, {
          value: '辽阳市', label: '辽阳市'
        }, {
          value: '盘锦市', label: '盘锦市'
        }, {
          value: '铁岭市', label: '铁岭市'
        }, {
          value: '朝阳市', label: '朝阳市'
        }, {
          value: '葫芦岛市', label: '葫芦岛市'
        }]
      }, {
        value: '吉林省',
        label: '吉林省',
        children: [{
          value: '长春市', label: '长春市'
        }, {
          value: '吉林市', label: '吉林市'
        }, {
          value: '四平市', label: '四平市'
        }, {
          value: '辽源市', label: '辽源市'
        }, {
          value: '通化市', label: '通化市'
        }, {
          value: '白山市', label: '白山市'
        }, {
          value: '松原市', label: '松原市'
        }, {
          value: '白城市', label: '白城市'
        }, {
          value: '延边市', label: '延边'
        }]
      }, {
        value: '黑龙江省',
        label: '黑龙江省',
        children: [{
          value: '哈尔滨市', label: '哈尔滨市'
        }, {
          value: '齐齐哈尔市', label: '齐齐哈尔市'
        }, {
          value: '鸡西市', label: '鸡西市'
        }, {
          value: '鹤岗市', label: '鹤岗市'
        }, {
          value: '双鸭山市', label: '双鸭山市'
        }, {
          value: '大庆市', label: '大庆市'
        }, {
          value: '伊春市', label: '伊春市'
        }, {
          value: '佳木斯市', label: '佳木斯市'
        }, {
          value: '七台河市', label: '七台河市'
        }, {
          value: '牡丹江市', label: '牡丹江市'
        }, {
          value: '黑河市', label: '黑河市'
        }, {
          value: '绥化市', label: '绥化市'
        }, {
          value: '大兴安岭市', label: '大兴安岭地区'
        }]
      }, {
        value: '上海市',
        label: '上海市',
        children: [{
          value: '上海市', label: '上海市'
        }]
      }, {
        value: '江苏省',
        label: '江苏省',
        children: [{
          value: '南京市', label: '南京市'
        }, {
          value: '无锡市', label: '无锡市'
        }, {
          value: '徐州市', label: '徐州市'
        }, {
          value: '常州市', label: '常州市'
        }, {
          value: '苏州市', label: '苏州市'
        }, {
          value: '南通市', label: '南通市'
        }, {
          value: '连云港市', label: '连云港市'
        }, {
          value: '淮安市', label: '淮安市'
        }, {
          value: '盐城市', label: '盐城市'
        }, {
          value: '扬州市', label: '扬州市'
        }, {
          value: '镇江市', label: '镇江市'
        }, {
          value: '泰州市', label: '泰州市'
        }, {
          value: '宿迁市', label: '宿迁市'
        }]
      }, {
        value: '浙江省',
        label: '浙江省',
        children: [{
          value: '杭州市', label: '杭州市'
        }, {
          value: '宁波市', label: '宁波市'
        }, {
          value: '温州市', label: '温州市'
        }, {
          value: '嘉兴市', label: '嘉兴市'
        }, {
          value: '湖州市', label: '湖州市'
        }, {
          value: '绍兴市', label: '绍兴市'
        }, {
          value: '金华市', label: '金华市'
        }, {
          value: '衢州市', label: '衢州市'
        }, {
          value: '舟山市', label: '舟山市'
        }, {
          value: '台州市', label: '台州市'
        }, {
          value: '丽水市', label: '丽水市'
        }]
      }, {
        value: '安徽省',
        label: '安徽省',
        children: [{
          value: '合肥市', label: '合肥市'
        }, {
          value: '芜湖市', label: '芜湖市'
        }, {
          value: '蚌埠市', label: '蚌埠市'
        }, {
          value: '淮南市', label: '淮南市'
        }, {
          value: '马鞍山市', label: '马鞍山市'
        }, {
          value: '淮北市', label: '淮北市'
        }, {
          value: '铜陵市', label: '铜陵市'
        }, {
          value: '安庆市', label: '安庆市'
        }, {
          value: '黄山市', label: '黄山市'
        }, {
          value: '滁州市', label: '滁州市'
        }, {
          value: '阜阳市', label: '阜阳市'
        }, {
          value: '宿州市', label: '宿州市'
        }, {
          value: '巢湖市', label: '巢湖市'
        }, {
          value: '六安市', label: '六安市'
        }, {
          value: '亳州市', label: '亳州市'
        }, {
          value: '池州市', label: '池州市'
        }, {
          value: '宣城市', label: '宣城市'
        }]
      }, {
        value: '福建省',
        label: '福建省',
        children: [{
          value: '福州市', label: '福州市'
        }, {
          value: '厦门市', label: '厦门市'
        }, {
          value: '莆田市', label: '莆田市'
        }, {
          value: '三明市', label: '三明市'
        }, {
          value: '泉州市', label: '泉州市'
        }, {
          value: '漳州市', label: '漳州市'
        }, {
          value: '南平市', label: '南平市'
        }, {
          value: '龙岩市', label: '龙岩市'
        }, {
          value: '宁德市', label: '宁德市'
        }]
      }, {
        value: '江西省',
        label: '江西省',
        children: [{
          value: '南昌市', label: '南昌市'
        }, {
          value: '景德镇市', label: '景德镇市'
        }, {
          value: '萍乡市', label: '萍乡市'
        }, {
          value: '九江市', label: '九江市'
        }, {
          value: '新余市', label: '新余市'
        }, {
          value: '鹰潭市', label: '鹰潭市'
        }, {
          value: '赣州市', label: '赣州市'
        }, {
          value: '吉安市', label: '吉安市'
        }, {
          value: '宜春市', label: '宜春市'
        }, {
          value: '抚州市', label: '抚州市'
        }, {
          value: '上饶市', label: '上饶市'
        }]
      }, {
        value: '山东省',
        label: '山东省',
        children: [{
          value: '济南市', label: '济南市'
        }, {
          value: '青岛市', label: '青岛市'
        }, {
          value: '淄博市', label: '淄博市'
        }, {
          value: '枣庄市', label: '枣庄市'
        }, {
          value: '东营市', label: '东营市'
        }, {
          value: '烟台市', label: '烟台市'
        }, {
          value: '潍坊市', label: '潍坊市'
        }, {
          value: '济宁市', label: '济宁市'
        }, {
          value: '泰安市', label: '泰安市'
        }, {
          value: '威海市', label: '威海市'
        }, {
          value: '日照市', label: '日照市'
        }, {
          value: '莱芜市', label: '莱芜市'
        }, {
          value: '临沂市', label: '临沂市'
        }, {
          value: '德州市', label: '德州市'
        }, {
          value: '聊城市', label: '聊城市'
        }, {
          value: '滨州市', label: '滨州市'
        }, {
          value: '荷泽市', label: '荷泽市'
        }]
      }, {
        value: '河南省',
        label: '河南省',
        children: [{
          value: '郑州市', label: '郑州市'
        }, {
          value: '开封市', label: '开封市'
        }, {
          value: '洛阳市', label: '洛阳市'
        }, {
          value: '平顶山市', label: '平顶山市'
        }, {
          value: '安阳市', label: '安阳市'
        }, {
          value: '鹤壁市', label: '鹤壁市'
        }, {
          value: '新乡市', label: '新乡市'
        }, {
          value: '焦作市', label: '焦作市'
        }, {
          value: '濮阳市', label: '濮阳市'
        }, {
          value: '许昌市', label: '许昌市'
        }, {
          value: '漯河市', label: '漯河市'
        }, {
          value: '三门峡市', label: '三门峡市'
        }, {
          value: '南阳市', label: '南阳市'
        }, {
          value: '商丘市', label: '商丘市'
        }, {
          value: '信阳市', label: '信阳市'
        }, {
          value: '周口市', label: '周口市'
        }, {
          value: '驻马店市', label: '驻马店市'
        }]
      }, {
        value: '湖北省',
        label: '湖北省',
        children: [{
          value: '武汉市', label: '武汉市'
        }, {
          value: '黄石市', label: '黄石市'
        }, {
          value: '十堰市', label: '十堰市'
        }, {
          value: '宜昌市', label: '宜昌市'
        }, {
          value: '襄樊市', label: '襄樊市'
        }, {
          value: '鄂州市', label: '鄂州市'
        }, {
          value: '荆门市', label: '荆门市'
        }, {
          value: '孝感市', label: '孝感市'
        }, {
          value: '荆州市', label: '荆州市'
        }, {
          value: '黄冈市', label: '黄冈市'
        }, {
          value: '咸宁市', label: '咸宁市'
        }, {
          value: '随州市', label: '随州市'
        }, {
          value: '恩施市', label: '恩施'
        }, {
          value: '神农架市', label: '神农架'
        }]
      }, {
        value: '湖南省',
        label: '湖南省',
        children: [{
          value: '长沙市', label: '长沙市'
        }, {
          value: '株洲市', label: '株洲市'
        }, {
          value: '湘潭市', label: '湘潭市'
        }, {
          value: '衡阳市', label: '衡阳市'
        }, {
          value: '衡阳市', label: '衡阳市'
        }, {
          value: '常德市', label: '常德市'
        }, {
          value: '张家界市', label: '张家界市'
        }, {
          value: '益阳市', label: '益阳市'
        }, {
          value: '郴州市', label: '郴州市'
        }, {
          value: '永州市', label: '永州市'
        }, {
          value: '怀化市', label: '怀化市'
        }, {
          value: '娄底市', label: '娄底市'
        }, {
          value: '湘西市', label: '湘西市'
        }]
      }, {
        value: '广东省',
        label: '广东省',
        children: [{
          value: '广州市', label: '广州市'
        }, {
          value: '韶关市', label: '韶关市'
        }, {
          value: '深圳市', label: '深圳市'
        }, {
          value: '珠海市', label: '珠海市'
        }, {
          value: '汕头市', label: '汕头市'
        }, {
          value: '佛山市', label: '佛山市'
        }, {
          value: '江门市', label: '江门市'
        }, {
          value: '湛江市', label: '湛江市'
        }, {
          value: '茂名市', label: '茂名市'
        }, {
          value: '肇庆市', label: '肇庆市'
        }, {
          value: '惠州市', label: '惠州市'
        }, {
          value: '梅州市', label: '梅州市'
        }, {
          value: '汕尾市', label: '汕尾市'
        }, {
          value: '河源市', label: '河源市'
        }, {
          value: '阳江市', label: '阳江市'
        }, {
          value: '清远市', label: '清远市'
        }, {
          value: '东莞市', label: '东莞市'
        }, {
          value: '中山市', label: '中山市'
        }, {
          value: '潮州市', label: '潮州市'
        }, {
          value: '揭阳市', label: '揭阳市'
        }, {
          value: '云浮市', label: '云浮市'
        }]
      }, {
        value: '广西省',
        label: '广西壮族自治区',
        children: [{
          value: '南宁市', label: '南宁市'
        }, {
          value: '柳州市', label: '柳州市'
        }, {
          value: '桂林市', label: '桂林市'
        }, {
          value: '梧州市', label: '梧州市'
        }, {
          value: '北海市', label: '北海市'
        }, {
          value: '防城港市', label: '防城港市'
        }, {
          value: '钦州市', label: '钦州市'
        }, {
          value: '贵港市', label: '贵港市'
        }, {
          value: '玉林市', label: '玉林市'
        }, {
          value: '百色市', label: '百色市'
        }, {
          value: '贺州市', label: '贺州市'
        }, {
          value: '河池市', label: '河池市'
        }, {
          value: '来宾市', label: '来宾市'
        }, {
          value: '崇左市', label: '崇左市'
        }]
      }, {
        value: '海南省',
        label: '海南省',
        children: [{
          value: '海口市', label: '海口市'
        }, {
          value: '三亚市', label: '三亚市'
        }]
      }, {
        value: '重庆市',
        label: '重庆市',
        children: [{
          value: '重庆市', label: '重庆市'
        }]
      }, {
        value: '四川省',
        label: '四川省',
        children: [{
          value: '成都市', label: '成都市'
        }, {
          value: '自贡市', label: '自贡市'
        }, {
          value: '攀枝花市', label: '攀枝花市'
        }, {
          value: '泸州市', label: '泸州市'
        }, {
          value: '德阳市', label: '德阳市'
        }, {
          value: '绵阳市', label: '绵阳市'
        }, {
          value: '广元市', label: '广元市'
        }, {
          value: '遂宁市', label: '遂宁市'
        }, {
          value: '内江市', label: '内江市'
        }, {
          value: '乐山市', label: '乐山市'
        }, {
          value: '南充市', label: '南充市'
        }, {
          value: '眉山市', label: '眉山市'
        }, {
          value: '宜宾市', label: '宜宾市'
        }, {
          value: '广安市', label: '广安市'
        }, {
          value: '达州市', label: '达州市'
        }, {
          value: '雅安市', label: '雅安市'
        }, {
          value: '巴中市', label: '巴中市'
        }, {
          value: '资阳市', label: '资阳市'
        }, {
          value: '阿坝市', label: '阿坝'
        }, {
          value: '甘孜市', label: '甘孜'
        }, {
          value: '凉山市', label: '凉山'
        }]
      }, {
        value: '贵州省',
        label: '贵州省',
        children: [{
          value: '贵阳市', label: '贵阳市'
        }, {
          value: '六盘水市', label: '六盘水市'
        }, {
          value: '遵义市', label: '遵义市'
        }, {
          value: '安顺市', label: '安顺市'
        }, {
          value: '铜仁市', label: '铜仁地区'
        }, {
          value: '黔西市', label: '黔西'
        }, {
          value: '毕节市', label: '毕节地区'
        }, {
          value: '黔东市', label: '黔东'
        }, {
          value: '黔南市', label: '黔南'
        }]
      }, {
        value: '云南省',
        label: '云南省',
        children: [{
          value: '昆明市', label: '昆明市'
        }, {
          value: '曲靖市', label: '曲靖市'
        }, {
          value: '玉溪市', label: '玉溪市'
        }, {
          value: '保山市', label: '保山市'
        }, {
          value: '昭通市', label: '昭通市'
        }, {
          value: '丽江市', label: '丽江市'
        }, {
          value: '思茅市', label: '思茅市'
        }, {
          value: '临沧市', label: '临沧市'
        }, {
          value: '楚雄市', label: '楚雄'
        }, {
          value: '红河市', label: '红河'
        }, {
          value: '文山市', label: '文山'
        }, {
          value: '西双版纳市', label: '西双版纳'
        }, {
          value: '大理市', label: '大理'
        }, {
          value: '德宏市', label: '德宏'
        }, {
          value: '怒江市', label: '怒江'
        }, {
          value: '迪庆市', label: '迪庆'
        }]
      }, {
        value: '西藏省',
        label: '西藏自治区',
        children: [{
          value: '拉萨市', label: '拉萨市'
        }, {
          value: '昌都市', label: '昌都地区'
        }, {
          value: '山南市', label: '山南地区'
        }, {
          value: '日喀则市', label: '日喀则地区'
        }, {
          value: '那曲市', label: '那曲地区'
        }, {
          value: '阿里市', label: '阿里地区'
        }, {
          value: '林芝市', label: '林芝地区'
        }]
      }, {
        value: '陕西省',
        label: '陕西省',
        children: [{
          value: '西安市', label: '西安市'
        }, {
          value: '铜川市', label: '铜川市'
        }, {
          value: '宝鸡市', label: '宝鸡市'
        }, {
          value: '咸阳市', label: '咸阳市'
        }, {
          value: '渭南市', label: '渭南市'
        }, {
          value: '延安市', label: '延安市'
        }, {
          value: '汉中市', label: '汉中市'
        }, {
          value: '榆林市', label: '榆林市'
        }, {
          value: '安康市', label: '安康市'
        }, {
          value: '商洛市', label: '商洛市'
        }]
      }, {
        value: '甘肃省',
        label: '甘肃省',
        children: [{
          value: '兰州市', label: '兰州市'
        }, {
          value: '嘉峪关市', label: '嘉峪关市'
        }, {
          value: '金昌市', label: '金昌市'
        }, {
          value: '白银市', label: '白银市'
        }, {
          value: '天水市', label: '天水市'
        }, {
          value: '武威市', label: '武威市'
        }, {
          value: '张掖市', label: '张掖市'
        }, {
          value: '平凉市', label: '平凉市'
        }, {
          value: '酒泉市', label: '酒泉市'
        }, {
          value: '庆阳市', label: '庆阳市'
        }, {
          value: '定西市', label: '定西市'
        }, {
          value: '陇南市', label: '陇南市'
        }, {
          value: '临夏市', label: '临夏'
        }, {
          value: '甘南市', label: '甘南'
        }]
      }, {
        value: '青海省',
        label: '青海省',
        children: [{
          value: '西宁市', label: '西宁市'
        }, {
          value: '海东市', label: '海东地区'
        }, {
          value: '海北市', label: '海北'
        }, {
          value: '黄南市', label: '黄南'
        }, {
          value: '海南市', label: '海南'
        }, {
          value: '果洛市', label: '果洛'
        }, {
          value: '玉树市', label: '玉树'
        }, {
          value: '海西市', label: '海西'
        }]
      }, {
        value: '宁夏省',
        label: '宁夏回族自治区',
        children: [{
          value: '银川市', label: '银川市'
        }, {
          value: '石嘴山市', label: '石嘴山市'
        }, {
          value: '吴忠市', label: '吴忠市'
        }, {
          value: '固原市', label: '固原市'
        }, {
          value: '中卫市', label: '中卫市'
        }]
      }, {
        value: '新疆省',
        label: '新疆维吾尔自治区',
        children: [{
          value: '乌鲁木齐市', label: '乌鲁木齐市'
        }, {
          value: '克拉玛依市', label: '克拉玛依市'
        }, {
          value: '吐鲁番市', label: '吐鲁番地区'
        }, {
          value: '哈密地市', label: '哈密地区'
        }, {
          value: '昌吉市', label: '昌吉'
        }, {
          value: '博尔塔拉市', label: '博尔塔拉'
        }, {
          value: '巴音郭楞市', label: '巴音郭楞'
        }, {
          value: '阿克苏市', label: '阿克苏地区'
        }, {
          value: '克孜勒苏柯尔克孜市', label: '克孜勒苏柯尔克孜'
        }, {
          value: '喀什市', label: '喀什地区'
        }, {
          value: '和田市', label: '和田地区'
        }, {
          value: '伊犁哈萨克市', label: '伊犁哈萨克'
        }, {
          value: '塔城市', label: '塔城地区'
        }, {
          value: '阿勒泰市', label: '阿勒泰地区'
        }, {
          value: '石河子市', label: '石河子市'
        }, {
          value: '阿拉尔市', label: '阿拉尔市'
        }, {
          value: '图木舒克市', label: '图木舒克市'
        }, {
          value: '五家渠市', label: '五家渠市'
        }]
      }, {
        value: '香港省',
        label: '香港',
        children: [{
          value: '香港市', label: '香港特别行政区'
        }]
      }, {
        value: '澳门省',
        label: '澳门',
        children: [{
          value: '澳门市', label: '澳门特别行政区'
        }]
      }, {
        value: '台湾省',
        label: '台湾',
        children: [{
          value: '台北市', label: '台北市'
        }, {
          value: '新北市', label: '新北市'
        }, {
          value: '桃园市', label: '桃园市'
        }, {
          value: '台中市', label: '台中市'
        }, {
          value: '台南市', label: '台南市'
        }, {
          value: '高雄市', label: '高雄市'
        }, {
          value: '基隆市', label: '基隆市'
        }, {
          value: '新竹市', label: '新竹市'
        }, {
          value: '嘉义市', label: '嘉义市'
        }]
      }
      ],
      // 按班级选择的选项
      classOptions: [{
        value: '', label: '请选择'
      }, {
        value: '工艺一班', label: '工艺一班'
      }, {
        value: '工艺二班', label: '工艺二班'
      }, {
        value: '工艺三班', label: '工艺三班'
      }, {
        value: '工艺四班', label: '工艺四班'
      }, {
        value: '工艺五班', label: '工艺五班'
      }, {
        value: '工艺六班', label: '工艺六班'
      }, {
        value: '工艺七班', label: '工艺七班'
      }, {
        value: '工艺八班', label: '工艺八班'
      }, {
        value: '工艺九班', label: '工艺九班'
      }, {
        value: '工艺十班', label: '工艺十班'
      }, {
        value: '制药一班', label: '制药一班'
      }, {
        value: '制药二班', label: '制药二班'
      }, {
        value: '制药三班', label: '制药三班'
      }, {
        value: '制药四班', label: '制药四班'
      }, {
        value: '制药五班', label: '制药五班'
      }, {
        value: '制药六班', label: '制药六班'
      }, {
        value: '制药七班', label: '制药七班'
      }, {
        value: '制药八班', label: '制药八班'
      }, {
        value: '制药九班', label: '制药九班'
      }, {
        value: '制药十班', label: '制药十班'
      }, {
        value: '安全工程一班', label: '安全工程一班'
      }, {
        value: '安全工程二班', label: '安全工程二班'
      }, {
        value: '安全工程三班', label: '安全工程三班'
      }, {
        value: '安全工程四班', label: '安全工程四班'
      }, {
        value: '安全工程五班', label: '安全工程五班'
      }, {
        value: '安全工程六班', label: '安全工程六班'
      }, {
        value: '安全工程七班', label: '安全工程七班'
      }, {
        value: '安全工程八班', label: '安全工程八班'
      }, {
        value: '安全工程九班', label: '安全工程九班'
      }, {
        value: '安全工程十班', label: '安全工程十班'
      }, {
        value: '生工一班', label: '生工一班'
      }, {
        value: '生工二班', label: '生工二班'
      }, {
        value: '生工三班', label: '生工三班'
      }, {
        value: '生工四班', label: '生工四班'
      }, {
        value: '生工五班', label: '生工五班'
      }, {
        value: '生工六班', label: '生工六班'
      }, {
        value: '生工七班', label: '生工七班'
      }, {
        value: '生工八班', label: '生工八班'
      }, {
        value: '生工九班', label: '生工九班'
      }, {
        value: '生工十班', label: '生工十班'
      }, {
        value: '冶金一班', label: '冶金一班'
      }, {
        value: '冶金二班', label: '冶金二班'
      }, {
        value: '冶金三班', label: '冶金三班'
      }, {
        value: '冶金四班', label: '冶金四班'
      }, {
        value: '冶金五班', label: '冶金五班'
      }, {
        value: '冶金六班', label: '冶金六班'
      }, {
        value: '冶金七班', label: '冶金七班'
      }, {
        value: '冶金八班', label: '冶金八班'
      }, {
        value: '冶金九班', label: '冶金九班'
      }, {
        value: '冶金十班', label: '冶金十班'
      }, {
        value: '过程装备与控制工程一班', label: '过程装备与控制工程一班'
      }, {
        value: '过程装备与控制工程二班', label: '过程装备与控制工程二班'
      }, {
        value: '过程装备与控制工程三班', label: '过程装备与控制工程三班'
      }, {
        value: '过程装备与控制工程四班', label: '过程装备与控制工程四班'
      }, {
        value: '过程装备与控制工程五班', label: '过程装备与控制工程五班'
      }, {
        value: '过程装备与控制工程六班', label: '过程装备与控制工程六班'
      }, {
        value: '过程装备与控制工程七班', label: '过程装备与控制工程七班'
      }, {
        value: '过程装备与控制工程八班', label: '过程装备与控制工程八班'
      }, {
        value: '过程装备与控制工程九班', label: '过程装备与控制工程九班'
      }, {
        value: '过程装备与控制工程十班', label: '过程装备与控制工程十班'
      }, {
        value: '化学工程与工艺一班', label: '化学工程与工艺一班'
      }, {
        value: '化学工程与工艺二班', label: '化学工程与工艺二班'
      }, {
        value: '化学工程与工艺三班', label: '化学工程与工艺三班'
      }, {
        value: '化学工程与工艺四班', label: '化学工程与工艺四班'
      }, {
        value: '化学工程与工艺五班', label: '化学工程与工艺五班'
      }, {
        value: '化学工程与工艺六班', label: '化学工程与工艺六班'
      }, {
        value: '化学工程与工艺七班', label: '化学工程与工艺七班'
      }, {
        value: '化学工程与工艺八班', label: '化学工程与工艺八班'
      }, {
        value: '化学工程与工艺九班', label: '化学工程与工艺九班'
      }, {
        value: '化学工程与工艺十班', label: '化学工程与工艺十班'
      }],
      // 按阶段选择的选项
      phaseOptions: [{
        value: '', label: '请选择'
      }, {
        value: 0, label: '本科'
      }, {
        value: 1, label: '硕士'
      }, {
        value: 2, label: '博士'
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
      dataListSelections: [],
      disable: false,
      major: null,
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      nationality: null,
      graduation: null,
      dataList: []
    }
  },
  methods: {
    exports () {
      if (this.dataListSelections.length <= 0) {
        return this.$message({
          message: '请选择要导出的数据！',
          type: 'warning',
          showClose: true
        })
      }
      let loading = Loading.service({
        text: '请您稍等片刻，正在玩命处理中...',
        background: 'rgba(0,0,0,.5)'
      })
      let arr = this.dataListSelections.map(item => {
        return {
          // 编号: item.id,
          姓名: item.aluName,
          学号: item.aluId,
          性别: item.gender === 0 ? '男' : '女',
          身份证号: item.idCard,
          民族: item.nationality,
          政治面貌: item.politicalStatus,
          籍贯: item.nativePlace,
          班级: item.clazz,
          入学时间: this.formatExportDate(item.admissionTime), // 把yyyy-mm-dd转换为yyyy/m/d格式
          毕业时间: this.formatExportDate(item.graduationTime), // 把yyyy-mm-dd转换为yyyy/m/d格式
          专业: item.major,
          '阶段（本科or硕士\nor博士）': item.degreeStage === 0 ? '本科' : item.degreeStage === 1 ? '硕士' : '博士',
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
    
    // 将导出excel的日期格式从yyyy-mm-dd转换为yyyy/m/d，注意该函数的输入输出都是字符串
    formatExportDate(dateString) {
      var date = new Date(dateString);
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      return year + '/' + month + '/' + day;
    },

    concatenateNativePlace (nativePlace) {
      if (!Array.isArray(nativePlace)) {
        return ''
      }

      if (nativePlace.length === 0) {
        return ''
      }

      let concatenatedString = nativePlace[0] // 将第一个元素作为初始字符串

      for (let i = 1; i < nativePlace.length; i++) {
        const currentPlace = nativePlace[i]
        const previousPlace = nativePlace[i - 1]

        if (currentPlace !== previousPlace) {
          concatenatedString += currentPlace // 如果当前元素与前一个元素不同，则进行拼接
        }
      }

      return concatenatedString
    },
    // 多条件查询
    conditionQuery () {
      const nativeFirst = this.dataForm.nativePlace
      const cityFirst = this.dataForm.city
      this.dataForm.nativePlace = this.concatenateNativePlace(this.dataForm.nativePlace)
      this.dataForm.city = this.concatenateNativePlace(this.dataForm.city)
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
          this.disable = true
        } else {
          this.dataList = []
          this.totalPage = 0
        }
      })
      this.dataForm.nativePlace = nativeFirst
      this.dataForm.city = cityFirst
    },
    // 前端展示date数据格式
    formatAdmissionTime (row) {
      if (typeof row.admissionTime === 'string') {
        return row.admissionTime // 字符串类型的日期，直接返回
      } else if (row.admissionTime instanceof Date) {
        return formatDate(row.admissionTime) // Date 类型的日期，调用 formatDate 方法进行格式化
      } else {
        return '' // 其他类型的数据，返回空字符串或自定义默认值
      }
    },
    formatGraduationTime (row) {
      if (typeof row.graduationTime === 'string') {
        return row.graduationTime // 字符串类型的日期，直接返回
      } else if (row.graduationTime instanceof Date) {
        return formatDate(row.graduationTime) // Date 类型的日期，调用 formatDate 方法进行格式化
      } else {
        return '' // 其他类型的数据，返回空字符串或自定义默认值
      }
    },
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

<style lang="scss">
.mod-demo-echarts {
  > .el-alert {
    margin-bottom: 10px;
  }
  > .el-row {
    margin-top: -10px;
    margin-bottom: -10px;
    .el-col {
      padding-top: 10px;
      padding-bottom: 10px;
    }
  }
  .chart-box {
    min-height: 800px;
  }
  .custom-input {
    border-radius: 4px;
    padding: 10px;
    /* 添加其他样式属性 */
  }
  .top-margin {
    margin-top: 30px; /* 设置上边距为 30 像素 */
  }
}
</style>
