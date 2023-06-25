<template>
  <div class="home-container">
    <el-row :gutter="10" class="first_row">
      <el-col :span="6">
        <el-card style="color: #409EFF;">
          <div>
            <i class="el-icon-user-solid" /> 用户总数
          </div>
          <div class="number">10000</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card style="color: #67C23A;">
          <div>
            <i class="el-icon-s-data" /> 销售总额
          </div>
          <div class="number">￥ 9999999</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card style="color: #F56C6C;">
          <div>
            <i class="el-icon-coin" /> 收益总额
          </div>
          <div class="number">￥ 6666666</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card style="color: #E6A23C;">
          <div>
            <i class="el-icon-s-claim" /> 订单数量
          </div>
          <div class="number">500000</div>
        </el-card>
      </el-col>
    </el-row>
    <el-row />
    <el-row class="charts">
      <el-col :span="12">
        <div id="histogram" style="width: 600px;height: 450px;" />
      </el-col>
      <el-col :span="12">
        <div id="pieChart" style="width: 600px;height: 450px;" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: 'Home',
  data() {
    return {

    }
  },
  mounted() {
    // 柱状图
    var histogramDom = document.getElementById('histogram')
    var histogram = echarts.init(histogramDom)
    var histogramOption = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          crossStyle: {
            color: '#999'
          }
        }
      },
      toolbox: {
        feature: {
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ['line', 'bar'] },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      legend: {
        data: ['Evaporation', 'Precipitation', 'Temperature']
      },
      xAxis: [
        {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisPointer: {
            type: 'shadow'
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: 'Precipitation',
          min: 0,
          max: 250,
          interval: 50,
          axisLabel: {
            formatter: '{value} ml'
          }
        },
        {
          type: 'value',
          name: 'Temperature',
          min: 0,
          max: 25,
          interval: 5,
          axisLabel: {
            formatter: '{value} °C'
          }
        }
      ],
      series: [
        {
          name: 'Evaporation',
          type: 'bar',
          tooltip: {
            valueFormatter: function(value) {
              return value + ' ml'
            }
          },
          data: [
            2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3
          ]
        },
        {
          name: 'Precipitation',
          type: 'bar',
          tooltip: {
            valueFormatter: function(value) {
              return value + ' ml'
            }
          },
          data: [
            2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3
          ]
        },
        {
          name: 'Temperature',
          type: 'line',
          yAxisIndex: 1,
          tooltip: {
            valueFormatter: function(value) {
              return value + ' °C'
            }
          },
          data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
        }
      ]
    }

    histogram.setOption(histogramOption)

    // 饼图
    var pieChartDom = document.getElementById('pieChart')
    var pieChart = echarts.init(pieChartDom)
    var pieChartOption = {
      legend: {
        top: 'bottom'
      },
      toolbox: {
        show: true,
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      series: [
        {
          name: 'Nightingale Chart',
          type: 'pie',
          radius: [50, 180],
          center: ['50%', '50%'],
          roseType: 'area',
          itemStyle: {
            borderRadius: 8
          },
          data: [
            { value: 40, name: 'rose 1' },
            { value: 38, name: 'rose 2' },
            { value: 32, name: 'rose 3' },
            { value: 30, name: 'rose 4' },
            { value: 28, name: 'rose 5' },
            { value: 26, name: 'rose 6' },
            { value: 22, name: 'rose 7' },
            { value: 18, name: 'rose 8' }
          ]
        }
      ]
    }

    pieChart.setOption(pieChartOption)
  }
}

</script>

<style lang="scss" scoped>

  .home {
    &-container {
      margin: 30px;
    }
    &-text {
      font-size: 30px;
      line-height: 46px;
    }
  }

  .charts{
    margin-top: 20px;
  }

</style>
