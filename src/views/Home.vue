<template>
  <div class="home">
    <el-container class="bigContaint">
      <el-aside width="200px" id="el-aside">
        <el-row class="tac">
          <el-col :span="12">
            <el-menu
              default-active="1"
              class="el-menu-vertical-demo"
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b"
            >
              <el-menu-item index="0" class="homeHead">
                <img
                  src="../../public/img/logo.png"
                />
              </el-menu-item>

              <router-link to="/home_echarts">
                <el-menu-item index="1">
                  <i class="el-icon-menu"></i>
                  <span slot="title">首页</span>
                </el-menu-item>
              </router-link>

              <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-goods"></i>
                  <span>商品</span>
                </template>
                <el-menu-item-group>
                  <router-link to="/category">
                    <el-menu-item index="2-1">
                      <i class="el-icon-more-outline"></i>
                      <span>品类管理</span>
                    </el-menu-item>
                  </router-link>

                  <router-link to="/product">
                    <el-menu-item index="2-2">
                      <i class="el-icon-share"></i>
                      <span>商品管理</span>
                    </el-menu-item>
                  </router-link>
                </el-menu-item-group>
              </el-submenu>

              <el-submenu index="3">
                <template slot="title">
                  <i class="el-icon-s-custom"></i>
                  <span>用户</span>
                </template>
                <el-menu-item-group>
                  <router-link to="/userManege">
                    <el-menu-item index="3-1">
                      <i class="el-icon-guide"></i>
                      <span>用户管理</span>
                    </el-menu-item>
                  </router-link>

                  <router-link to="/authorManege">
                    <el-menu-item index="3-2">
                      <i class="el-icon-mic"></i>权限管理
                    </el-menu-item>
                  </router-link>
                </el-menu-item-group>
              </el-submenu>

              <el-submenu index="4">
                <template slot="title">
                  <i class="el-icon-document"></i>
                  <span>订单</span>
                </template>
                <el-menu-item-group>
                  <router-link to="/orderManege">
                    <el-menu-item index="4-1">
                      <i class="el-icon-notebook-2"></i>
                      订单管理
                    </el-menu-item>
                  </router-link>
                </el-menu-item-group>
              </el-submenu>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>

      <el-container>
        <el-header id="header">
          <div class="adminInfo">
            <span class="a_Img">
              <img src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
            </span>
            <span>admin</span>
            <div class="v_line v"></div>
            <el-button type="text" class="btn_exit" @click="exit">
              <span>退出登录</span>
            </el-button>
          </div>
        </el-header>
        <el-main>
          <router-view v-if="isRouterAlive"></router-view>
        </el-main>
        <el-footer class="footer">Created By Ryy</el-footer>
      </el-container>
    </el-container>
  </div>
</template>
<style lang="less">
.home {
  width: 100%;
  height: 100%;
}
.el-main[data-v-fae5bece] {
  width: 100%;
  height: 772px;
  background-color: #f3f3f3;
}

.el-col-12 {
  width: 100%;
  height: 100%;
}
.bigContaint {
  height: 100%;
}
#el-aside {
  background-color: rgb(84, 92, 100);
}
.homeHead {
  img {
    width: 100%;
    height: 100%;
  }
}
#header {
  background-color: #fff;
  color: #409effab;
  text-align: center;
  height: 80px;
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.05);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  .adminInfo {
    display: flex;
    vertical-align: middle;
    align-items: center;
    width: 175px;
    font-size: 14px;
    justify-content: space-between;
    .a_Img {
      display: inline-block;
      box-sizing: border-box;
      text-align: center;
      overflow: hidden;
      color: #fff;
      background: #c0c4cc;
      width: 40px;
      height: 40px;
      line-height: 40px;
      font-size: 14px;
      border-radius: 50%;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .v_line {
      display: inline-block;
      width: 1px;
      height: 1em;
      margin: 0 8px;
      vertical-align: middle;
      position: relative;
    }
    .v {
      background-color: #dcdfe6;
      position: relative;
    }
    .btn_exit {
      background: 0 0;
      padding-left: 0;
      padding-right: 0;
      display: inline-block;
      line-height: 1;
      white-space: nowrap;
      cursor: pointer;
      background: #fff;
      border: 1px solid #dcdfe6;
      color: #606266;
      text-align: center;
      box-sizing: border-box;
      transition: 0.1s;
      font-weight: 500;
      padding: 12px 10px;
      font-size: 14px;
      border-radius: 4px;
      border: none;
      span {
        color: #409eff;
      }
    }
  }
}
</style>
<script>
import { mapState } from "vuex";

export default {
  provide(){
      return{
        reload:this.reload
      }
    },
  data() {
    return {
       isRouterAlive: true,
      dialogVisible: false
    };
  },

  mounted() {

    if (!this.isLogin) {
      this.$message.error({
        showClose: true,
        message: "请登录",
        type: "error"
      });
      this.$router.push("/login");
    }
    this.drawLine();
  },
  computed: {
    ...mapState(["isLogin"]),
    ...mapState({
      userInfo: state => state.userInfo
    })
  },
  methods: {
    reload(){
          this.isRouterAlive = false,
          this.$nextTick(function(){
            this.isRouterAlive = true;
          })
      }
,
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
    },

    exit() {
      this.$confirm(" 确认退出登录?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$store.commit("LOGINTYPE", false);

          this.$message({
            type: "success",
            message: "退出成功!"
          });
          this.$router.replace("/login");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出"
          });
        });
    }
  },
  name: "home",
  components: {}
};
</script>
<style lang="less" scoped>
.el-main {
  width: 100%;
  height: 772px;
  // border: 1px solid #000;
  .progress {
    width: 1240px;
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
    width: 1240px;
    border: 1px solid #000;
  }
}
.footer {
  height: 100px;
  width: 100%;
  line-height: 50px;
  font-size: 20px;
  background: #90939994;
  color: white;
}
</style>