<template >            
        <div class="product">
          <el-card class="box-card " >
                <div slot="header" class="clearfix">
                        <el-select class="fl" v-model="searchTypeValue" >
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    <div class="keyinput fl">
                        <el-input v-model="keyInput"  placeholder="关键字"></el-input>
                    </div>

                    <el-button class="fl" @click="goodSearch" type="primary" icon="el-icon-search" >搜索</el-button>
                </div>
                <el-table id="context_center"
                      :data="tableData.slice((pageNum-1)*pageSize,pageNum*pageSize)"
                      border
                      style="width: 100%">
                      <el-table-column
                        fixed
                        prop="orderId"
                        label="订单号"
                        width="300">
                      </el-table-column>
                      <el-table-column
                        prop="recipient"
                        label="收件人"
                        width="300">
                      </el-table-column>
                      <el-table-column
                        prop="status"
                        label="订单状态"
                        width="300"> 
                      </el-table-column>
                      <el-table-column
                        prop="allPrice"
                        label="订单总价"
                        width="300">  
                      </el-table-column>
                      <el-table-column
                        prop="create_time"
                        label="创建时间"
                        width="300">
                      </el-table-column>
          <el-table-column class="operation"
            fixed="right"
            label="操作选项"
            width="200">
            <template slot-scope="scope">
            <router-link :to="{name:'orderDtail',params:{data:scope.row}}"> <el-button @click="detailClick(scope.row)"   size="small">详情</el-button></router-link>
            </template>
          </el-table-column>
          </el-table>
          <el-pagination class="breakPage"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageNum"
            :page-sizes="[5, 10, 20, 40]"  
            :page-size="pageSize"         
            layout="total, sizes, prev, pager, next, jumper"
            :total="tableData.length">                                        
          </el-pagination>
          </el-card>
        </div>
</template>

<script>
    import {getOrderList,getOrderSearch,getCategoryInfo,} from '../api/user'
  export default {
        data() {             
              return {
                options: [{
                value: 'option1',
                 label: '按照收件人搜索'
                }, {
                value: 'option2',
                 label: '按照订单号搜索'
                }, ],
                searchTypeValue:'option2',
                keyInput: '',
                searchTab:{},
                tableData: [
                  ],
                tableDataCopy:[
                  ],
                watchClass:{}, 
                pageNum:1, //初始页
                pageSize:10,    //    每页的数据
                
               }
            },
            created() {
                getOrderList({pageNum:1,pageSize:10}).then((res)=>{
               
                  var newArr = res.data.data.list
                  
                  newArr.forEach((val)=>{
                      
                      this.tableData.unshift({
                      recipient:val.recipient,create_time:val.create_time,
                      allPrice:val.allPrice+"元",status:val.status==1?"未支付":"已付款",id:val._id,
                      orderId:val.orderId,paymentMethod:val.paymentMethod,
                      details:val.details})
                      this.tableDataCopy=this.tableData
                  })
                  // console.log(newArr)
                })
                
            },
    
    methods: {
      detailClick(row){
          // console.log(1,row.caId)
          // console.log(1,row.id)
            this.watchClass.categoryId=row.id
        getCategoryInfo(this.watchClass).then(()=>{
          // console.log(res)
        })

      },
       goodSearch(){
              // console.log(1,this.searchTypeValue)
            if(this.keyInput==''){                 
               this.tableData=this.tableDataCopy
              
            }else if(this.searchTypeValue=="option1"){
              this.searchTab.type="recipient" 
              this.searchTab.value=this.keyInput
               
              // console.log('d',this.searchTab)
              this.searchTab.pageNum="1"
              this.searchTab.pageSize="10"
              // console.log(111,this.searchTab)
              getOrderSearch(this.searchTab).then((res)=>{
                 
                 this.tableData=[]
                 
                 var newArr = res.data.data.list
                  // console.log(res)
                 
                 newArr.forEach((val)=>{
                 this.tableData.unshift({
                      recipient:val.recipient,create_time:val.create_time,
                      allPrice:val.allPrice+"元",status:val.status==1?"未支付":"已付款",id:val._id,
                      orderId:val.orderId,paymentMethod:val.paymentMethod,
                      details:val.details,})
                     
                  })
              })
            }
            else{
               this.searchTab.type="orderId" 
               this.searchTab.value=this.keyInput
              //  console.log('n',this.searchTab)
               this.searchTab.pageNum="1"
               this.searchTab.pageSize ="10"
              getOrderSearch(this.searchTab).then((res)=>{
                // console.log(123,this.searchTab,res)
                 this.tableData=[]
                 var newArr = res.data.data.list
                //  console.log(213,this.tableData)   
                 newArr.forEach((val)=>{
                  this.tableData.unshift({
                      recipient:val.recipient,create_time:val.create_time,
                      allPrice:val.allPrice+"元",status:val.status==1?"未支付":"已付款",id:val._id,
                      orderId:val.orderId,paymentMethod:val.paymentMethod,
                      details:val.details,})
 
                  })
              })
              //  console.log(2,this.keyInput)
            }
             
            
        },
      
      
      // 初始页pageNum、初始每页数据数pageSize和数据data
        handleSizeChange: function (size) {
                this.pageSize = size;
                // console.log(this.pageSize)  //每页下拉显示数据
        },
        handleCurrentChange: function(pageNum){
                this.pageNum = pageNum;
                // console.log(this.pageNum)  //点击第几页
        },
       
    }
  }
</script>

<style lang="less">
  .fl{
      float:left;
      margin-left:20px;
  }
  .keyinput{
      width:100px;
      height:100%;
  } 
  .addGoods{
      
  }

</style>