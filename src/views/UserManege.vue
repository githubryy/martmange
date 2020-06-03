<template >
  <div class="userManege">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button @click="dialogFormVisible = true" class="addGoods1" type="primary">
          <i class="el-icon-plus"></i>
          <span>创建用户</span>
        </el-button>
        <el-dialog title="创建用户" :visible.sync="dialogFormVisible">
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="用户名" prop="username">
              <el-input v-model="ruleForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="ruleForm.password"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="phoneNum">
              <el-input v-model="ruleForm.phoneNum"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="ruleForm.email"></el-input>
            </el-form-item>
            <el-form :rules="rules" ref="roleData" label-width="100px" class="demo-ruleForm">
              <el-form-item label="角色">
                <el-select placeholder="请选择角色" v-model="roleData.roleName" clearable filterable>
                  <el-option
                    v-for="item in roleData"
                    :key="item.id"
                    :label="item.roleName"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="centerAdd">确 定</el-button>
          </div>
        </el-dialog>

        <el-dialog title="修改信息" :visible.sync="dialogFormVisibleE">
          <el-form
            :model="editData"
            :rules="rules"
            ref="editData"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="用户名" prop="username">
              <el-input v-model="editData.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="editData.password"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="phoneNum">
              <el-input v-model="editData.phoneNum"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="editData.email"></el-input>
            </el-form-item>
            <el-form :rules="rules" ref="roleData" label-width="100px" class="demo-ruleForm">
              <el-form-item label="角色">
                <el-select placeholder="请选择角色" v-model="roleData.roleName" clearable filterable>
                  <el-option
                    v-for="item in roleData"
                    :key="item.id"
                    :label="item.roleName"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisibleE = false">取 消</el-button>
            <el-button type="primary" @click="centerESure">确 定</el-button>
          </div>
        </el-dialog>
      </div>

      <el-table
        id="context_center"
        :data="tableData.slice((pageNum-1)*pageSize,pageNum*pageSize)"
        border
        style="width: 100%"
      >
        <el-table-column fixed prop="username" label="用户名" width="230"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="350"></el-table-column>
        <el-table-column prop="phoneNum" label="电话" width="200"></el-table-column>
        <el-table-column prop="create_time" label="注册时间" width="300"></el-table-column>
        <el-table-column prop="id" label="权限角色" width="150"></el-table-column>
        <el-table-column class="operation" fixed="right" label="操作选项" width="220">
          <template slot-scope="scope">
            <el-button size="small" @click="centerEdit(scope.$index,scope.row)">修改</el-button>
            <el-button size="small" @click="deleteUser(scope.$index,scope.row)">删除</el-button>
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
  getUserList,
  getUserAdd,
  getUserUpdata,
  getUserDelete
} from "../api/user";
export default {
  data() {
    return {
      tableData: [],
      roleData: [],
      editData: [],

      pageNum: 1, //初始页
      pageSize: 5, //    每页的数据

      dialogFormVisible: false,
      dialogFormVisibleE: false,
      ruleForm: {
        username: "",
        password: "",
        phoneNum: "",
        email: ""
      },
      addData: {},
      userUpdata: {},
      rules: {
        username: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 5,
            max: 16,
            message: "长度在 5 到 16 个字符",
            trigger: ["blur", "change"]
          }
        ],
        phoneNum: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { min: 11, max: 11, message: "长度是 11 个字符", trigger: "blur" }
        ],
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ]
      },
      formLabelWidth: "120px"
    };
  },
  created() {
    getUserList({ pageNum: 1, pageSize: 5 }).then(res => {
      var newArr = res.data.data.list;
      var newArr2 = res.data.data.roles;

      // console.log(newArr)
      // console.log(newArr2)
      newArr.forEach(val => {
        function getMyDate(str) {
          function getzf(num) {
            if (parseInt(num) < 10) {
              num = "0" + num;
            }
            return num;
          }
          var oDate = new Date(str),
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
          username: val.username,
          password: val.password,
          phoneNum: val.phone,
          email: val.email,
          id: val._id,
          role_id: val.role_id,
          create_time: getMyDate(val.create_time),
          __v: val.__v
        });
      });
      newArr2.forEach(val => {
        this.roleData.push({
          id: val._id,
          roleName: val.name,
          create_time: val.create_time
        });
      });
      // console.log(this.roleData)
    });
  },
  methods: {
    centerAdd() {
      (this.dialogFormVisible = false),
        (this.addData.username = this.ruleForm.username);
      this.addData.password = this.ruleForm.password;
      this.addData.phone = this.ruleForm.phoneNum;
      this.addData.email = this.ruleForm.email;
      getUserAdd(this.addData).then(() => {
        //  console.log(res)
      });
      this.ruleForm.name = "";
      this.ruleForm.password = "";
      this.ruleForm.phoneNum = "";
      this.ruleForm.email = "";
      // getUserAdd(this.addData)
    },
    centerEdit(index, row) {
      // console.log(row)
      this.editData = row;
      // console.log(1,this.editData)
      this.dialogFormVisibleE = true;
    },
    centerESure() {
      this.userUpdata.username = this.editData.username;
      this.userUpdata._id = this.editData.id;
      this.userUpdata.phone = this.editData.phoneNum;
      this.userUpdata.email = this.editData.email;
      this.userUpdata.role_id = this.editData.role_id;

      getUserUpdata(this.userUpdata).then(() => {
        // console.log(res)
      }),
        (this.dialogFormVisibleE = false);
    },
    deleteUser(index, row) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          getUserDelete(row.id).then(res => {
            console.log(res)
          });
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 初始页pageNum、初始每页数据数pageSize和数据data
    handleSizeChange: function(size) {
      this.pageSize = size;
      // console.log(this.pageSize)  //每页下拉显示数据
    },
    handleCurrentChange: function(pageNum) {
      this.pageNum = pageNum;
      // console.log(this.pageNum)  //点击第几页
    }
  }
};
</script>

<style lang="less">
.clearfix {
  height: 40px;
}

.addGoods1 {
  float: left;
}
</style>