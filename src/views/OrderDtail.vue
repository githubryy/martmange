<template>
    <div class="productDtail">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
       <el-page-header @back="goBack" content="订单详情">
       </el-page-header>
      </div>
    <div class="orderCol">  
        <div class="orderRow">
            <el-tag class="elTag" size="big">订单号</el-tag>       
            <div class="orderD"><span>{{this.tableData.orderId}}</span> </div>      
        </div > 
            <el-tag class="elTag" size="big">订单人</el-tag>
            <div class="orderD"><span>{{this.tableData.recipient}}</span></div>
         <div class="orderRow">    
            <el-tag class="elTag" size="big">创建时间</el-tag>
            <div class="orderD"><span>{{this.tableData.create_time}}</span></div>
         </div>    
            <el-tag class="elTag" size="big">订单总价</el-tag>
            <div class="orderD"><span>{{this.tableData.allPrice}}</span></div>
         <div class="orderRow">
            <el-tag class="elTag" size="big">支付方式</el-tag>
            <div class="orderD"><span>{{this.tableData.status}}</span></div>
         </div>   
           
            <template>
                <div class="orderDImg" v-for="(item,index) in imgSrc" :key="index">
              
                    <img :src="getImgUrl(index)">
                </div>
            </template>
            
        
          <el-divider><i class="el-icon-shopping-cart-2"></i></el-divider>  
        
         
        
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
        //  console.log(2,this.tableData)   
    },
    methods:{
        goBack() {
         this.$router.replace('/orderManege')
      },
        getImgUrl(index){
         return  "http://118.24.25.7:5000/upload/"+this.imgSrc[index]
      },
    }
}
</script>
<style lang="less">
    .elTag{    
        width:100px;
        height:50px;
        line-height:40px;
        font-size:16px;
        display:block;
        text-align:center; 
        float:left; 
        margin-right:10px;     
    }
    .productDtail{
         .orderRow{
              height:40px;
              line-height:40px;
         }
        .orderD{
             margin-top:10px ;
             width:50%;
             height:100%;
             
            .dtail{
              text-align:left;
            } 
        }
        .orderCol{
              text-align:left;

            
        }
        .orderDImg{
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