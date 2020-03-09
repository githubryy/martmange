<template>
  <div class="el-main">
    <div class="progress">
      <div class="CPU">
        <div class="el-card-body">
          <el-progress type="circle" :percentage="10"></el-progress>
          <div class="el-tag-CPU">CPU使用率</div>
        </div>
      </div>
      <div class="Memory">
        <div class="el-card-body">
          <el-progress type="circle" :percentage="35"></el-progress>
          <div class="el-tag-CPU">内存使用率</div>
        </div>
      </div>
      <div class="Fictitious">
        <div class="el-card-body">
          <el-progress type="circle" :percentage="85"></el-progress>
          <div class="el-tag-CPU">虚拟机使用率</div>
        </div>
      </div>
      <div class="Hard-disk">
        <div class="el-card-body">
          <el-progress type="circle" :percentage="20"></el-progress>
          <div class="el-tag-CPU">硬盘使用率</div>
        </div>
      </div>
    </div>

    <!-- echarts -->
    <div id="myChart" :style="{width: '100%', height: '500px',marginTop : '30px'}"></div>
  </div>
</template>
<script>
export default {
  name: "HelloWorld",
  data() {
    return {};
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        legend: {},
        tooltip: {
          trigger: "axis",
          showContent: false
        },
        dataset: {
          source: [
            ["product", "2012", "2013", "2014", "2015", "2016", "2017"],
            ["Matcha Latte", 41.1, 30.4, 65.1, 53.3, 83.8, 98.7],
            ["Milk Tea", 86.5, 92.1, 85.7, 83.1, 73.4, 55.1],
            ["Cheese Cocoa", 24.1, 67.2, 79.5, 86.4, 65.2, 82.5],
            ["Walnut Brownie", 55.2, 67.1, 69.2, 72.4, 53.9, 39.1]
          ]
        },
        xAxis: { type: "category" },
        yAxis: { gridIndex: 0 },
        grid: { top: "55%" },
        series: [
          { type: "line", smooth: true, seriesLayoutBy: "row" },
          { type: "line", smooth: true, seriesLayoutBy: "row" },
          { type: "line", smooth: true, seriesLayoutBy: "row" },
          { type: "line", smooth: true, seriesLayoutBy: "row" },
          {
            type: "pie",
            id: "pie",
            radius: "30%",
            center: ["50%", "25%"],
            label: {
              formatter: "{b}: {@2012} ({d}%)"
            },
            encode: {
              itemName: "product",
              value: "2012",
              tooltip: "2012"
            }
          }
        ]
      });
      myChart.on('updateAxisPointer', function (event) {
        var xAxisInfo = event.axesInfo[0];
        if (xAxisInfo) {
            var dimension = xAxisInfo.value + 1;
            myChart.setOption({
                series: {
                    id: 'pie',
                    label: {
                        formatter: '{b}: {@[' + dimension + ']} ({d}%)'
                    },
                    encode: {
                        value: dimension,
                        tooltip: dimension
                    }
                }
            });
        }
    });

    // myChart.setOption(option);
    }
  },
  mounted() {
    this.drawLine();
  }
};
</script>

<style lang="less" scoped>
.el-main {
  width: 100%;
  height: 772px;
  // border: 1px solid #000;
  .progress {
    width: 100%;
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    // border: 1px solid #000;
    .CPU {
      width: 224px;
      height: 200px;
      background: rgb(103, 194, 58);
      border-radius: 5px;
      .el-card-body {
        width: 126px;
        height: 200px;
        margin: 0 auto;
        position: relative;
        // border: 1px solid #000;
        .el-progress {
          margin-top: 15px;
        }
        .el-tag-CPU {
          margin-top: -60px;
          margin-left: auto;
          margin-right: auto;
          height: 34px;
          width: 100px;
          border-radius: 5px;
          line-height: 34px;
          font-size: 12px;
          color: #67c23a;
          background: rgb(240, 249, 235);
        }
      }
    }
    .Memory {
      width: 224px;
      height: 200px;
      background: rgb(230, 162, 60);
      border-radius: 5px;
      .el-card-body {
        width: 126px;
        height: 200px;
        margin: 0 auto;
        position: relative;
        // border: 1px solid #000;
        .el-progress {
          margin-top: 15px;
        }
        .el-tag-CPU {
          margin-top: -60px;
          margin-left: auto;
          margin-right: auto;
          height: 34px;
          width: 100px;
          border-radius: 5px;
          line-height: 34px;
          font-size: 12px;
          color: #67c23a;
          background: rgb(240, 249, 235);
        }
      }
    }
    .Fictitious {
      width: 224px;
      height: 200px;
      background: rgb(245, 108, 108);
      border-radius: 5px;
      .el-card-body {
        width: 126px;
        height: 200px;
        margin: 0 auto;
        position: relative;
        // border: 1px solid #000;
        .el-progress {
          margin-top: 15px;
        }
        .el-tag-CPU {
          margin-top: -60px;
          margin-left: auto;
          margin-right: auto;
          height: 34px;
          width: 100px;
          border-radius: 5px;
          line-height: 34px;
          font-size: 12px;
          color: #67c23a;
          background: rgb(240, 249, 235);
        }
      }
    }
    .Hard-disk {
      width: 224px;
      height: 200px;
      background: rgb(144, 147, 153);
      border-radius: 5px;
      .el-card-body {
        width: 126px;
        height: 200px;
        margin: 0 auto;
        position: relative;
        // border: 1px solid #000;
        .el-progress {
          margin-top: 15px;
        }
        .el-tag-CPU {
          margin-top: -60px;
          margin-left: auto;
          margin-right: auto;
          height: 34px;
          width: 100px;
          border-radius: 5px;
          line-height: 34px;
          font-size: 12px;
          color: #67c23a;
          background: rgb(240, 249, 235);
        }
      }
    }
  }
  .myChart {
    height: 500px;
    width: 100%;
    border: 1px solid #000;
  }
}
</style>