<template>
    <div class="productAdd">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
       <el-page-header @back="goBack" content="商品添加">
        </el-page-header>
      </div>
        <el-form  :model="tableData" :rules="rules" ref="tableData" label-width="100px" class="demo-ruleForm">
            <el-form-item  label="商品名称" prop="name">
                <el-input v-model="tableData.name" placeholder="请输入商品名称"></el-input>
            </el-form-item>
            <el-form-item label="商品描述" prop="desc">
                <el-input v-model="tableData.desc" 
                type="textarea"
                :rows="2"
                placeholder="请输入商品描述" >
            </el-input>
            </el-form-item>
       </el-form>
      <div class="text item">
        <span class="upName">商品价格</span>

        <el-input-number v-model="tableData.price" controls-position="right" @change="handleChange" :min="1" :max="100000">
      
        </el-input-number> <span>￥</span>
      
      </div>
      <div class="text item">
        <span class="upName">商品分类</span>
        <el-select placeholder="请选择" v-model="id" clearable filterable >
          <el-option 
            v-for="item in Category"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
      <div class="text item">
        <span class="upName">商品图片</span>
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :on-change="changeImg"
          :on-preview="handlePictureCardPreview"
          :on-success='handleSuccess'
          :on-remove="handleRemove"
          :file-list="dialogImageUrl"
          >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      
      </div>
      
      <div class="text item">
       <span class="upName">商品详情</span>
          <div class="editor">
            <div ref="toolbar" class="toolbar">
            </div>
            <div ref="editor" class="textW" v-html="tableData.detail">
                 
            </div>  
          </div>
      </div>
       <div class="btnS">
        <el-button type="primary" @click="certain">确定提交</el-button>
        <el-button>重置</el-button>
       </div>
    </el-card>
       
    </div>
</template>
<script>
  import E from 'wangeditor' 
  import {getCategory,getProAdd,getImgUpIoad,getImgUpDelete} from '../api/user.js'
  export default {
    name: 'editoritem',
    data() {
      return {
        urlArr:[],
        proAddata:{},
        tableData:{
          name: '',
          desc: '',
          price:'',
          detail:'',
        },
        detail:'',
        Category:[],
        id:'',
        imgSrc:[{}],
        rules: {
          name: [
            { required: true, message: '请输入商品名称', trigger: 'blur' },
          ],
          desc: [
            { required: true, message: '请输入商品描述', trigger: 'blur' }
          ]
        },
        dialogImageUrl:[],     
        dialogVisible: false,
         // uploadPath,
        editor:null,
        info_: null,
        fileList:''
      };
    },
     created() {
         
        // const data = this.$route.params.data;   
        // params传参数只能用路由名称name来传，
        // query可以用name，也可以用path,但是query不能传对象
        // this.tableData=data 
 
          
        // console.log(this.detail)    
        // for(var i in this.tableData.imgs){
        //     this.dialogImageUrl.push({url:"http://118.24.25.7:5000/upload/"+this.tableData.imgs[i]})
        // }
        // console.log(1,this.dialogImageUrl)   
        getCategory({parentId:0,pageNum:1,pageSize:10}).then((res)=>{
          let newArr = res.data.data.list;
          // console.log(newArr);
          // 循环数组
          newArr.forEach((val) => {
            // 设置数据
            this.Category.unshift({pI:val.parentId,name:val.name,id:val._id})//数组里面存对象
            
          })  
      //   //  console.log(this.Category)
      });
    },
     methods: {
         changeImg(file,fileList){
            //  console.log( file,fileList)
         },
         handleSuccess(response, file, fileList){
            //  console.log(response, file, fileList)
             this.dialogImageUrl.push(file)
            //   console.log(2,this.dialogImageUrl[0].url)
            for(var i in this.dialogImageUrl){
                this.urlArr.push(this.dialogImageUrl[i].url)
            }
                // console.log(this.urlArr)
            //   console.log(3,this.urlArr)
         },
        certain() {
        this.$confirm('确定添加商品？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            this.proAddata.name=this.tableData.name
            this.proAddata.desc=this.tableData.desc
            this.proAddata.price=this.tableData.price
            // this.proAddata.categoryId=this.tableData.categoryId
            // this.proAddata.pCategoryId=this.tableData.pCategoryId
            // this.proAddata._id=this.tableData.id
            this.proAddata.detail=this.editor.txt.html(this.valueW)         
            // this.proAddata.imgs=this.urlArr 
             getProAdd(this.proAddata)
          this.$router.replace('/product')  
          this.$message({
            type: 'success',
            message: '添加成功!',
          });
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消添加'
          });          
        });
          },
      
      goBack() { 
         this.$router.replace('/product')
      },
       handleChange(value) {
        // console.log(value);
      },
      //照片的放大和删除
      handleRemove(file, fileList) {
        // console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      }, 
      seteditor() {
        // http://192.168.2.125:8080/admin/storage/create
        this.editor = new E(this.$refs.toolbar, this.$refs.editor)
        this.editor.customConfig.uploadImgShowBase64 = false // base 64 存储图片
        this.editor.customConfig.uploadImgServer = 'http://otp.cdinfotech.top/file/upload_images'// 配置服务器端地址
        this.editor.customConfig.uploadImgHeaders = { }// 自定义 header
        this.editor.customConfig.uploadFileName = 'file' // 后端接受上传文件的参数名
        this.editor.customConfig.uploadImgMaxSize = 2 * 1024 * 1024 // 将图片大小限制为 2M
        this.editor.customConfig.uploadImgMaxLength = 6 // 限制一次最多上传 3 张图片
        this.editor.customConfig.uploadImgTimeout = 3 * 60 * 1000 // 设置超时时间

        // 配置菜单
        this.editor.customConfig.menus = [
          'head', // 标题
          'bold', // 粗体
          'fontSize', // 字号
          'fontName', // 字体
          'italic', // 斜体
          'underline', // 下划线
          'strikeThrough', // 删除线
          'foreColor', // 文字颜色
          'backColor', // 背景颜色
          'link', // 插入链接
          'list', // 列表
          'justify', // 对齐方式
          'quote', // 引用
          'emoticon', // 表情
          'image', // 插入图片
          'table', // 表格
          'video', // 插入视频
          'code', // 插入代码
          'undo', // 撤销
          'redo', // 重复
          'fullscreen' // 全屏
        ]

        this.editor.customConfig.uploadImgHooks = {
          fail: (xhr, editor, result) => {
            // 插入图片失败回调
          },
          success: (xhr, editor, result) => {
            // 图片上传成功回调
          },
          timeout: (xhr, editor) => {
            // 网络超时的回调
          },
          error: (xhr, editor) => {
            // 图片上传错误的回调
          },
          customInsert: (insertImg, result, editor) => {
            // 图片上传成功，插入图片的回调
            //result为上传图片成功的时候返回的数据，这里我打印了一下发现后台返回的是data：[{url:"路径的形式"},...]
            // console.log(result.data[0].url)
            //insertImg()为插入图片的函数
             //循环插入图片
            // for (let i = 0; i < 1; i++) {
              // console.log(result)
              let url = "http://otp.cdinfotech.top"+result.url
              insertImg(url)
            // }
          }
        }
        this.editor.customConfig.onchange = (html) => {
          this.info_ = html // 绑定当前逐渐地值
          this.$emit('change', this.info_) // 将内容同步到父组件中
        }
        // 创建富文本编辑器
        this.editor.create()
      }
    },
    model: {
      prop: 'valueW',
      event: 'change'
    },
     props: {
      valueW: {
        type: String,
        
      },
      isClear: {
        type: Boolean,
        default: false
      }
    },
    watch: {
      isClear(val) {
        // 触发清除文本域内容
        if (val) {
          this.editor.txt.clear()
          this.info_ = 'null'
          
        }
      },
      valueW: function(valueW) {
        if (valueW !== this.editor.txt.html()) {
          this.editor.txt.html(this.valueW)
        }
        
      }
      //value为编辑框输入的内容，这里我监听了一下值，当父组件调用得时候，如果给value赋值了，子组件将会显示父组件赋给的值
    },
    mounted() {
      this.seteditor()
      this.editor.txt.html(this.valueW)
    },
   
  }
</script>

<style lang="less">
 
  .text{
    display:flex;
    flex-flow: nowrap;
    justify-content: flex-start; 
    align-items: center;
    margin-bottom:10px;  
    .upName{
      width:65px;
      height:50px;
      line-height:50px;
      font-size:14px;
      margin-right:10px;
    }
  }
  .text:before{ 
        content: "*";
        color: #f56c6c;
        padding:0;
        font-size:14px;
        margin-left:22px;
  }
   .editor {
    width: 70%;
  
    position: relative;
    z-index: 0;
  }
  .toolbar {
    
    border: 1px solid #ccc;
  }
  .textW {
    border: 1px solid #ccc;
    min-height: 300px;
    padding:25px;
  }
  .btnS{
    height:80px;
    width:100%;
    line-height:80px;

  }
</style>