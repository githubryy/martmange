<template>
    <div class="productDtail">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
       <el-page-header @back="goBack" content="商品详情">
       </el-page-header>
      </div>
    <div>
        
        <el-tag class="elTag" size="big">商品名称</el-tag>       
            <div class="goodsD"><span>{{this.tableData.name}}</span> </div>      
        <el-divider><i class="el-icon-shopping-cart-2"></i></el-divider>
        <el-tag class="elTag" size="big">商品描述</el-tag>
           <div class="goodsD"><span>{{this.tableData.desc}}</span></div>
        <el-divider><i class="el-icon-notebook-1"></i></el-divider>
        <el-tag class="elTag" size="big">商品价格</el-tag>
           <div class="goodsD"><span>{{this.tableData.price}}元</span></div>
        <el-divider><i class="el-icon-money"></i></el-divider>
        <el-tag class="elTag" size="big">所属分类</el-tag>
           <div class="goodsD"><span>{{this.tableData.price}}</span></div>
        <el-divider><i class="el-icon-s-grid"></i></el-divider>
        <el-tag class="elTag" size="big">商品图片</el-tag>
           <div class="goodsD">
            <template>
                <div class="goodsDImg" v-for="(item,index) in imgSrc" :key="index">
              
                <img :src="getImgUrl(index)">
                </div>
            </template>
           </div>
        <el-divider><i class="el-icon-picture-outline"></i></el-divider>
        <el-tag class="elTag" size="big">商品详情</el-tag>
           <div class="goodsD"><span class="dtail" v-html="this.tableData.detail"></span></div>
        <el-divider><i class="el-icon-chat-dot-round"></i></el-divider>
    </div>

    </el-card>
       
    </div>
</template>
<script>
export default {
    data() {
        return {
            tableData:{},
            imgSrc:[]
        }
    },
    created() {
        const data = this.$route.params.data;   
  
        // params传参数只能用路由名称name来传，
        // query可以用name，也可以用path,但是query不能传对象
        this.tableData=data 
        this.imgSrc=this.tableData.imgs
        //  console.log(2,this.tableData.imgs)   
    },
    methods:{
        goBack() {
         this.$router.replace('/product')
      },
        getImgUrl(index){
         return  "http://118.24.25.7:5000/upload/"+this.imgSrc[index]
      },
    }
}
</script>
<style lang="less">
    .elTag{
       display:flex;
        width:100px;
        height:40px;
        line-height:40px;
        font-size:16px;
        display:block;
    }
    .productDtail{
        .goodsD{
          margin-top:10px;
             width:100%;
             height:100%;
             display:flex;
            .dtail{
                text-align:left;
            } 
        }
        .goodsDImg{
                vertical-align: middle;
                margin-left: 20px;
                position: relative;
                display: inline-block;
                overflow: hidden;
           img{
                width:100px;
                height:100px;
           }
        }
    }
    
</style>