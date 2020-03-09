<template>
  <div id="classm">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button class="exitClassBtn" type="info" icon="el-icon-back" circle></el-button>
        <span>一级商品分类表</span>
        <el-button class="addClassBtn" @click="hanaleCaAdd" type="primary">
          <i class="el-icon-plus"></i>
          <span>添加分类</span>
        </el-button>
        <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
          <el-form :model="form">
            <el-form-item label="分类名称" :label-width="formLabelWidth">
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="分类层级" :label-width="formLabelWidth">
              <el-select v-model="form.region" placeholder="请选择分类">
                <el-option label="一级分类" value="0"></el-option>
                <el-option label="二级分类" value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="addSure">确 定</el-button>
          </div>
        </el-dialog>
      </div>
      <div class="text item">
        <el-table
          :data="tableData.slice((pageNum-1)*pageSize,pageNum*pageSize)"
          style="width: 100%"
        >
          <el-table-column label="商品类别" width="180">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>类别: {{ scope.row.name }}</p>
                <p>层级: {{ scope.row.pI}}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">{{ scope.row.name }}</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column class="opiton" label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index,scope.row.id,scope.row)">修改分类</el-button>
              <el-button size="mini" @click="handleWatch(scope.$index, scope.row)">查看子分类</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
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
  getCategory,
  getCategoryInfo,
  getCaUpdate,
  getCaAdd
} from "../api/user";
export default {
  data() {
    return {
      pageNum: 1, //初始页
      pageSize: 10, //    每页的数据
      tableData: [],
      updateI: {},
      addCateg: {},
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        name: ""

        // type: [],
      },
      formLabelWidth: "100px"
    };
  },
  created() {
    getCategory({ parentId: 0, pageNum: 1, pageSize: 10 }).then(res => {
      let newArr = res.data.data.list;
      // console.log(newArr);
      // 循环数组
      newArr.forEach(val => {
        // 设置数据
        this.tableData.unshift({
          pI: val.parentId,
          name: val.name,
          id: val._id
        }); //数组里面存对象
      });
    });
  },
  methods: {
    goBack() {
      // console.log('go back');
    },
    hanaleCaAdd(index, id, row) {
      this.dialogFormVisible = true;
    },
    addSure(index, id, row) {
      this.addCateg.categoryName = this.form.name;
      this.addCateg.parentId = 0;
      getCaAdd(this.addCateg);
      this.$message({
        type: "success",
        message: "添加成功"
      });
      this.tableData.unshift({
        pI: this.addCateg.parentId,
        name: this.addCateg.categoryName
      });
      this.dialogFormVisible = false;
      this.form.name = "";
    },
    handleDelete(index, row) {
      // console.log(row.name);
      this.$confirm("此操作将永久删除该类别, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
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
    handleWatch(index, id, row) {
      // console.log(index, row);
      getCategoryInfo(id);
    },
    handleEdit(index, id, row) {
      this.updateI.categoryId = id;
      this.$prompt("请输入修改内容", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          this.$message({
            type: "success",
            message: "已修改为:" + row.name
          });
          this.updateI.categoryName = value; //更改数据

          // 发请求
          getCaUpdate(this.updateI);
          //  console.log(index, this.val.name);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
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
#classm {
  width: 100%;
  height: 100%;
  .exitClassBtn {
    float: left;
    padding: 3px 0;
    width: 30px;
    height: 30px;
  }
  .addClassBtn {
    width: 100px;
    height: 25px;
    float: right;
    padding: 3px 0;
  }
  .opiton {
    float: right;
  }
  .breakPage {
    margin-top: 25px;
  }
}
</style>