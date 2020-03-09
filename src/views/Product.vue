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

                    <el-button class="fl" @click="goodSearch" type="info" icon="el-icon-search" >搜索</el-button>

                    <router-link to="/productAdd"><el-button  class="addGoods"  type="primary"><i class="el-icon-plus"></i><span>添加商品</span></el-button></router-link>
                </div>
                <el-table id="context_center"
                      :data="tableData.slice((pageNum-1)*pageSize,pageNum*pageSize)"
                      border
                      style="width: 100%">
                      <el-table-column
                        fixed
                        prop="name"
                        label="商品名称"
                        width="230">
                      </el-table-column>
                      <el-table-column
                        prop="desc"
                        label="商品描述"
                        width="500">
                      </el-table-column>
                      <el-table-column
                        prop="price"
                        label="商品价格"
                        width="200"> 
                      </el-table-column>
                      <el-table-column
                        fixed="right"
                        label="商品状态"
                        width="150">
                <template slot-scope="scope">
                    <el-switch
                      @change="change(scope.$index,scope.row)"
                      v-model="scope.row.status"
                      :active-value="0"
                      :inactive-value="1"
                      active-text="上架"
                      inactive-text="下架">
                    </el-switch>
                </template>
          </el-table-column>
          <el-table-column class="operation"
            fixed="right"
            label="操作选项"
            width="220">
            <template slot-scope="scope">
            <router-link :to="{name:'productDtail',params:{data:scope.row}}"> <el-button @click="detailClick(scope.row)"   size="small">详情</el-button></router-link>
            <router-link :to="{name:'productEdit',params:{data:scope.row}}"> <el-button size="small">编辑</el-button> </router-link>
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
    import {getProduct,getProSearch,getUpStatus,getProductAdd, getCategoryInfo} from '../api/user'
  export default {
        data() {             
              return {
                options: [{
                value: 'option1',
                 label: '按照描述搜索'
                }, {
                value: 'option2',              
                 label: '按照名称搜索'
                }, ],
                searchTypeValue:'option2',
                keyInput: '',
                searchTab:{},
                tableData: [
                  ],
                tableDataCopy:[
                  ],
                watchClass:{}, 
                upStatus:{},
                pageNum:1, //初始页
                pageSize:5,    //    每页的数据
                
               }
            },
            created() {
                getProduct({pageNum:1,pageSize:5}).then((res)=>{
               
                  var newArr = res.data.data.list
                  
                  newArr.forEach((val)=>{
                      
                      this.tableData.unshift({
                      name:val.name,desc:val.desc,
                      price:val.price,status:val.status,id:val._id,
                      categoryId:val.categoryId,pCategoryId:val.pCategoryId,
                      detail:val.detail,imgs:val.imgs})
                      this.tableDataCopy=this.tableData
                  })
                  // console.log(newArr)
                })
                
            },
            computed: {
               
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
               
              this.searchTab.productDesc=this.keyInput
              this.searchTab.productName=''
              // console.log('d',this.searchTab)
              this.searchTab.pageNum=1
              this.searchTab.pageSize=10
              // console.log(111,this.searchTab)
              getProSearch(this.searchTab).then((res)=>{
                 
                 this.tableData=[]
                 
                 var newArr = res.data.data.list
                  // console.log(res)
                 
                 newArr.forEach((val)=>{
                 this.tableData.unshift({name:val.name,desc:val.desc,price:val.price,status:val.status,id:val._id,detail:val.detail,imgs:val.imgs})
                     
                  })
              })
            }
            else{
               this.searchTab.productName=this.keyInput
               this.searchTab.productDesc=''
              //  console.log('n',this.searchTab)
               this.searchTab.pageNum=1
               this.searchTab.pageSize =10
              getProSearch(this.searchTab).then((res)=>{
                // console.log(123,res)
                 this.tableData=[]
                 var newArr = res.data.data.list
                //  console.log(213,this.tableData)   
                 newArr.forEach((val)=>{
                 this.tableData.unshift({name:val.name,desc:val.desc,price:val.price,status:val.status,id:val._id,detail:val.detail,imgs:val.imgs})
 
                  })
              })
              //  console.log(2,this.keyInput)
            }
             
            
        },
      change(index,row){
          // console.log(row.id)
          // this.dataRow.categoryId=row.id
                
          this.upStatus.status=row.status
          this.upStatus.productId=row.id
          getUpStatus(this.upStatus).then(()=>{
            // console.log(res)
          })
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