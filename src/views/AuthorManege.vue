<template>
  <div class="product">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button @click="createRole" class="addGoods1" type="primary">
          <i class="el-icon-plus"></i>
          <span>创建角色</span>
        </el-button>
        <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
          <span>
            <el-tag>当前设置角色:{{ powerName.name }}</el-tag>
          </span>
          <el-tree
            :data="data"
            show-checkbox
            ref="tree"
            node-key="id"
            :default-expanded-keys="[2, 3]"
            :default-checked-keys="checked"
            :props="defaultProps"
          ></el-tree>

          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          </span>
        </el-dialog>
      </div>
      <el-table
        id="context_center"
        :data="tableData.slice((pageNum - 1) * pageSize, pageNum * pageSize)"
        border
        style="width: 100%"
      >
        <el-table-column fixed prop="name" label="角色名称" width="320"></el-table-column>
        <el-table-column prop="create_time" label="创建时间" width="320"></el-table-column>
        <el-table-column prop="auth_time" label="授权时间" width="320"></el-table-column>
        <el-table-column label="授权人" prop="auth_name" width="300"></el-table-column>
        <el-table-column class="operation" fixed="right" label="操作选项" width="320">
          <template slot-scope="scope">
            <el-button @click="editPower(scope.$index, scope.row)" size="small">设置权限</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        class="breakPage"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="[5, 10, 20, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.length"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
import {
  getRoleList,
  getUpStatus,
  getMyDate,
  getRoleCreate,
  getUserRoleUpdata
} from "../api/user";
export default {
  data() {
    return {
      dialogVisible: false,
      tableData: [],
      powerName: [],
      checked: [],
      upStatus: {},
      createRoleData: {},
      pageNum: 1, //初始页
      pageSize: 10, //每页的数据
      data: [
        {
          id: 1,
          label: "首页"
        },
        {
          id: 2,
          label: "商品",
          children: [
            {
              id: 5,
              label: "品类管理"
            },
            {
              id: 6,
              label: "商品管理"
            }
          ]
        },
        {
          id: 3,
          label: "用户",
          children: [
            {
              id: 7,
              label: "用户管理"
            },
            {
              id: 8,
              label: "权限管理"
            }
          ]
        },
        {
          id: 4,
          label: "订单",
          children: [
            {
              id: 9,
              label: "订单管理"
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  created() {
    getRoleList({ pageNum: 1, pageSize: 5 }).then(res => {
      let newArr = res.data.data.list;
      console.log('res.data.data.list',res.data.data.list);
      
      newArr.forEach(val => {
        function getMyDate(str) {
          function getzf(num) {
            if (parseInt(num) < 10) {
              num = "0" + num;
            }
            return num;
          }
          let oDate = new Date(str),
            oYear = oDate.getFullYear(),
            oMonth = oDate.getMonth() + 1,
            oDay = oDate.getDate(),
            oHour = oDate.getHours(),
            oMin = oDate.getMinutes(),
            oSen = oDate.getSeconds(),
            oTime =
              oYear +
              "-" +
              getzf(oMonth) +
              "-" +
              getzf(oDay) +
              " " +
              getzf(oHour) +
              ":" +
              getzf(oMin) +
              ":" +
              getzf(oSen); //最后拼接时间
          return oTime;
        }
        this.tableData.unshift({
          name: val.name,
          id: val._id,
          create_time:val.create_time?getMyDate(val.create_time):'未知时间',
          auth_time: val.auth_time?getMyDate(val.auth_time):'未知时间',
          auth_name: val.auth_name?val.auth_name:'无',
          __v: val.__v,
          menus: val.menus
        });
      });
      // console.log(newArr)
    });
  },
  methods: {
    editPower(index, row) {
      this.powerName = row;
      var arr2 = [];
      for (let i in row.menus) {
        var length = row.menus[i].length;
        arr2.push(row.menus[i].slice(1, length));
      }
      this.checked = arr2.map(item => {
        if (item == "home") {
          return 1;
        } else if (item == "category") {
          return 5;
        } else if (item == "product") {
          return 6;
        } else if (item == "user") {
          return 7;
        } else if (item == "role") {
          return 8;
        } else if (item == "order") {
          return 9;
        } else {
          return "";
        }
      });
      // console.log(this.checked);
      this.dialogVisible = true;
      
    },
    // 初始页pageNum、初始每页数据数pageSize和数据data
    handleSizeChange: function(size) {
      this.pageSize = size;
      // console.log(this.pageSize)  //每页下拉显示数据
    },
    handleCurrentChange: function(pageNum) {
      this.pageNum = pageNum;
      // console.log(this.pageNum)  //点击第几页
    },
    createRole() {
      this.$prompt("请输入要创建的角色名", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          this.createRoleData.roleName = value;
          // console.log( this.createRoleData.roleName)
          getRoleCreate(this.createRoleData);
          this.$message({
            type: "success",
            message: "你创建的角色是: " + value
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    }
  }
};
</script>

<style lang="less">
.el-dialog__title {
  float: left;
}
.fl {
  float: left;
  margin-left: 20px;
}
</style>
