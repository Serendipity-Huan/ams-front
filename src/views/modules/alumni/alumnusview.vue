<template>
  <div class="mod-demo-echarts">
    <el-alert
      title="提示："
      type="warning"
      :closable="false">
    </el-alert>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card>
          <div id="J_chartBarBox" class="chart-box" ref="enterprise_bar_ref"></div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <div id="J_chartPieBox" class="chart-box" ref="nationality_pie_ref"></div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <div id="J_chartPieBox" class="chart-box" ref="degreeStage_pie_ref"></div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <div id="J_chartBarBox" class="chart-box" ref="nativePlace_bar_ref"></div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <div id="G_chartBarBox" class="chart-box" ref="graduation_bar_ref"></div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <div id="G_chartBarBox" class="chart-box" ref="city_bar_ref"></div>
        </el-card>
      </el-col>
      <el-col :span="24">
        <el-card>
          <div id="J_chartScatterBox" class="chart-box" ref="major_scatter_ref"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import echarts from 'echarts'
export default {
  data () {
    return {
      chartInstance: null,
      chartBar: null,
      chartPie: null,
      GraduationchartBar: null,
      majorchartScatter: null,
      nativePlacechartScatter: null,
      degreeStagechartScatter: null,
      citychartBar: null,
      major: null,
      nationality: null,
      degreeStage: null,
      nativePlace: null,
      graduation: null,
      city: null,
      dataList: [],
      chartPieData: [],
      legendData: [],
      seriesData: []
    }
  },
  mounted () {
    this.getMajor()
    this.getEnterprise()
    this.getGraduation()
    this.getNationality()
    this.getNativePlace()
    this.getDegreeStage()
    this.getCity()
    this.initGraduationChartBar()
    this.initEnterpriseChartPie()
    this.initNationalityChartBar()
    this.initMajorChartScatter()
    this.initDegreeStageChartScatter()
    this.initNativePlaceChartScatter()
    this.initCityChartBar()
  },
  methods: {
    getMajor () {
      this.$http({
        url: this.$http.adornUrl('/basic/alumnusbasic/major'),
        method: 'get'
      }).then(({ data }) => {
        this.major = data.majorVo
        this.updateMajorChartScatter()
      })
    },
    getCity () {
      this.$http({
        url: this.$http.adornUrl('/basic/alumnusbasic/city'),
        method: 'get'
      }).then(({ data }) => {
        this.city = data.cityVO
        this.updateCityChartBar()
      })
    },
    getGraduation () {
      this.$http({
        url: this.$http.adornUrl('/basic/alumnusbasic/graduation'),
        method: 'get'
      }).then(({ data }) => {
        this.graduation = data.graduationVO
        this.updateGraduationChartBar()
      })
    },
    getNationality () {
      this.$http({
        url: this.$http.adornUrl('/basic/alumnusbasic/nationality'),
        method: 'get'
      }).then(({ data }) => {
        this.nationality = data.nationalityVO
        this.updateNationalityChartPie()
      })
    },
    getDegreeStage () {
      this.$http({
        url: this.$http.adornUrl('/basic/alumnusbasic/degreeStage'),
        method: 'get'
      }).then(({ data }) => {
        this.degreeStage = data.degreeStageVO
        this.updateDegreeStageChartPie()
      })
    },
    getNativePlace () {
      this.$http({
        url: this.$http.adornUrl('/basic/alumnusbasic/nativePlace'),
        method: 'get'
      }).then(({ data }) => {
        this.nativePlace = data.nativePlaceVO
        this.updateNativePlaceChartPie()
      })
    },
    getEnterprise () {
      this.$http({
        url: this.$http.adornUrl('/basic/alumnusbasic/enterpriseChart'),
        method: 'get'
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.dataList = data.enterprisePropertyVO
        } else {
          this.dataList = []
          this.totalPage = 0
        }
        console.log(this.dataList)
        this.legendData = [] // 清空之前的数据
        this.seriesData = [] // 清空之前的数据

        for (var i = 0; i < this.dataList.length; i++) {
          var obj = this.dataList[i]
          var key = obj.enterpriseProperty
          var value = obj.count

          this.legendData.push(key)
          this.seriesData.push(value)
        }
        this.updateEnterpriseChartBar()
      })
    },
    initMajorChartScatter () {
      this.majorchartScatter = this.$echarts.init(this.$refs.major_scatter_ref)
    },
    initDegreeStageChartScatter () {
      this.degreeStagechartScatter = this.$echarts.init(this.$refs.degreeStage_pie_ref)
    },
    // 籍贯统计图
    initNativePlaceChartScatter () {
      this.nativePlacechartScatter = this.$echarts.init(this.$refs.nativePlace_bar_ref)
    },
    initCityChartBar () {
      this.citychartBar = this.$echarts.init(this.$refs.city_bar_ref)
    },
    initEnterpriseChartPie () {
      this.chartInstance = this.$echarts.init(this.$refs.enterprise_bar_ref)
    },
    // 饼状图
    initNationalityChartBar () {
      this.chartPie = this.$echarts.init(this.$refs.nationality_pie_ref)
    },
    // 毕业时间柱状图
    initGraduationChartBar () {
      this.GraduationchartBar = this.$echarts.init(this.$refs.graduation_bar_ref)
    },
    // 更新专业人数图
    updateMajorChartScatter () {
      const seriesData = this.major.map(item => {
        return {
          value: item.count,
          type: 'line'
        }
      })

      const legendData = this.major.map(item => {
        return item.major
      })

      const option = {
        title: {
          text: '专业人数统计图',
          textStyle: {
            fontSize: 30
          }
        },
        grid: {
          containLabel: true,
          left: '3%',
          right: '3%',
          bottom: '3%',
          top: '10%'
        },
        xAxis: [
          {
            type: 'category',
            data: legendData,
            axisTick: {
              alignWithLabel: true,
              interval: 0  // 设置 x 轴坐标轴刻度全部显示
            },
            axisLabel: {
              interval: 0,  // 设置 x 轴标签全部显示
              rotate: -45  // 设置 x 轴标签旋转角度
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'line',
            z: 0,
            lineStyle: {
              width: 66,
              color: '#FFFFFF'
            }
          }
        },
        series: [
          {
            type: 'line',
            data: seriesData,
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  position: 'top',
                  formatter: '{c}',
                  textStyle: {
                    color: '#ccc',
                    fontSize: 20
                  }
                }
              }
            },
            markLine: {
              lineStyle: {
                normal: {
                  type: 'dashed'
                }
              }
            }
          }
        ]
      }

      this.majorchartScatter.setOption(option)
    },

    // 毕业时间柱状图
    updateGraduationChartBar () {
      const seriesData = this.graduation.map(item => {
        return item.count
      })

      const legendData = this.graduation.map(item => {
        return item.graduation
      })

      const option = {
        title: {
          text: '毕业时间统计图',
          textStyle: {
            fontSize: 30
          }
        },
        xAxis: [
          {
            type: 'category',
            data: legendData,
            axisTick: {
              alignWithLabel: true,
              interval: 0  // 设置 x 轴坐标轴刻度全部显示
            },
            axisLabel: {
              interval: 0,  // 设置 x 轴标签全部显示
              rotate: -45  // 设置 x 轴标签旋转角度
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'line',
            z: 0,
            lineStyle: {
              width: 66,
              color: '#FFFFFF'
            }
          }
        },
        series: [
          {
            type: 'bar',
            data: seriesData,
            barWidth: '50',
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  position: 'top',
                  formatter: '{c}',
                  textStyle: {
                    color: '#ccc',
                    fontSize: 20
                  }
                },
                barBorderRadius: [33, 33, 0, 0]
              }
            },
            markLine: {
              lineStyle: {
                normal: {
                  type: 'dashed'
                }
              }
            }
          }
        ]
      }

      this.GraduationchartBar.setOption(option)
    },

    // 更新图
    updateEnterpriseChartBar () {
      const option = {
        title: {
          text: '毕业去向统计图',
          textStyle: {
            fontSize: 30
          }
        },
        xAxis: [
          {
            type: 'value'
          }
        ],
        yAxis: [
          {
            type: 'category',
            data: this.legendData
          }
        ],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'line',
            z: 0,
            lineStyle: {
              width: 66,
              color: '#FFFFFF'
            }
          }
        },
        series: [{
          type: 'bar',
          data: this.seriesData,
          barWidth: '30',
          itemStyle: {
            normal: {
              label: {
                show: true,
                position: 'right',
                formatter: '{c}',
                textStyle: {
                  color: '#ccc',
                  fontSize: 20
                }
              },
              barBorderRadius: [0, 33, 33, 0]
            }
          },
          markLine: {
            lineStyle: {
              normal: {
                type: 'dashed'
              }
            }
          }
        }]
      }
      this.chartInstance.setOption(option)
    },
    updateNativePlaceChartPie () {
      const seriesData = this.nativePlace.map(item => {
        return item.count
      })
      const legendData = this.nativePlace.map(item => {
        return item.nativePlace
      })
      const option = {
        title: {
          text: '籍贯统计图',
          textStyle: {
            fontSize: 30
          }
        },
        grid: {
          containLabel: true,
          left: '3%',
          right: '3%',
          bottom: '3%',
          top: '10%'
        },
        xAxis: [
          {
            type: 'category',
            data: legendData,
            axisTick: {
              alignWithLabel: true,
              interval: 0  // 设置 x 轴坐标轴刻度全部显示
            },
            axisLabel: {
              interval: 0,  // 设置 x 轴标签全部显示
              rotate: -45  // 设置 x 轴标签旋转角度
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'line',
            z: 0,
            lineStyle: {
              width: 66,
              color: '#FFFFFF'
            }
          }
        },
        series: [{
          type: 'bar',
          data: seriesData,
          barWidth: '60%',  // 设置柱子宽度
          itemStyle: {
            normal: {
              color: 'blue',
              label: {
                show: true,
                position: 'top',
                formatter: '{c}',
                textStyle: {
                  color: '#ccc',
                  fontSize: 20
                }
              },
              barBorderRadius: [33, 33, 0, 0]
            }
          },
          markLine: {
            lineStyle: {
              normal: {
                type: 'dashed'
              }
            }
          }
        }]
      }
      this.nativePlacechartScatter.setOption(option)
    },
    updateCityChartBar () {
      const seriesData = this.city.map(item => {
        return item.count
      })
      const legendData = this.city.map(item => {
        return item.city
      })
      const option = {
        title: {
          text: '所在城市统计图',
          textStyle: {
            fontSize: 30
          }
        },
        grid: {
          containLabel: true,
          left: '3%',
          right: '3%',
          bottom: '3%',
          top: '10%'
        },
        xAxis: [
          {
            type: 'category',
            data: legendData,
            axisTick: {
              alignWithLabel: true,
              interval: 0  // 设置 x 轴坐标轴刻度全部显示
            },
            axisLabel: {
              interval: 0,  // 设置 x 轴标签全部显示
              rotate: -45  // 设置 x 轴标签旋转角度
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'line',
            z: 0,
            lineStyle: {
              width: 66,
              color: '#FFFFFF'
            }
          }
        },
        series: [{
          type: 'bar',
          data: seriesData,
          barWidth: '60%',  // 设置柱子宽度
          itemStyle: {
            normal: {
              color: 'blue',
              label: {
                show: true,
                position: 'top',
                formatter: '{c}',
                textStyle: {
                  color: '#ccc',
                  fontSize: 20
                }
              },
              barBorderRadius: [33, 33, 0, 0]
            }
          },
          markLine: {
            lineStyle: {
              normal: {
                type: 'dashed'
              }
            }
          }
        }]
      }
      this.citychartBar.setOption(option)
    },
    // 阶段更新饼状图
    updateDegreeStageChartPie () {
      const legendData = this.degreeStage.map(item => {
        let degreeStageName = ''
        if (item.degreeStage === 0) {
          degreeStageName = '本科'
        } else if (item.degreeStage === 1) {
          degreeStageName = '硕士研究生'
        } else if (item.degreeStage === 2) {
          degreeStageName = '博士研究生'
        }
        return {
          name: degreeStageName
        }
      })

      const total = this.degreeStage.reduce((sum, item) => {
        return sum + item.count
      }, 0)

      const seriesData = this.degreeStage.map(item => {
        let degreeStageName = ''
        if (item.degreeStage === 0) {
          degreeStageName = '本科'
        } else if (item.degreeStage === 1) {
          degreeStageName = '硕士研究生'
        } else if (item.degreeStage === 2) {
          degreeStageName = '鄙视研究生'
        }
        const percent = ((item.count / total) * 100).toFixed(2)
        return {
          name: degreeStageName,
          value: item.count,
          percent: percent
        }
      })

      const dataOption = {
        title: {
          text: '阶段占比统计图',
          textStyle: {
            fontSize: 20
          }
        },
        legend: {
          top: 30,
          data: legendData
        },
        tooltip: {
          show: true,
          formatter: function (params) {
            return `${params.name}: ${params.percent}% (${params.value}人)`
          }
        },
        series: [
          {
            center: ['50%', '50%'],
            data: seriesData,
            type: 'pie'
          }
        ]
      }

      this.degreeStagechartScatter.setOption(dataOption)
    },

    // 民族更新饼状图
    updateNationalityChartPie () {
      const legendData = this.nationality.map(item => {
        return {
          name: item.nationality
        }
      })
      const total = this.nationality.reduce((sum, item) => {
        return sum + item.count
      }, 0)
      const seriesData = this.nationality.map(item => {
        const percent = ((item.count / total) * 100).toFixed(2)
        return {
          name: item.nationality,
          percent: percent,
          value: item.count
        }
      })
      const dataOption = {
        title: {
          text: '民族占比统计图',
          textStyle: {
            fontSize: 20
          }
        },
        legend: {
          top: 30,
          data: legendData
        },
        tooltip: {
          show: true,
          formatter: function (params) {
            return `${params.name}: ${params.percent}% (${params.value}人)`
          }
        },
        series: [
          {
            center: ['50%', '63%'],
            data: seriesData,
            type: 'pie'

          }
        ]
      }
      this.chartPie.setOption(dataOption)
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
}
</style>
