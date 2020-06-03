<template>
<div id="bg">
  <div class="head">
    <img src="../../public/img/logo.png">
  </div>
  <div id="login">
    <div class="login-content">
      <p class="box">用户登录</p>
      <el-form :model="loginForm" ref="loginForm" :rules="rules">
        <el-form-item prop="username">
          <el-input  v-model="loginForm.username" class="inputw" prefix-icon="el-icon-user" placeholder="输入用户名"></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input class="inputw"
            v-model="loginForm.password"
            type="password"
            prefix-icon="el-icon-view"
            placeholder="密码">
          </el-input>
        </el-form-item>
        
        <el-form-item>
          <el-button type="primary" class="btn" @click="submitForm('loginForm')">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</div>
</template>


<style>

</style>
<script>
import { mapActions,mapState} from "vuex";
export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 5, max: 10, message: "长度在 5 到 10 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 5, max: 8, message: "长度在 5 到 8 个字符", trigger: "blur" }
        ]
      },
       
    };
  },
 
  computed: {
    ...mapState(['isLogin'])
  },
  methods: {
    ...mapActions(["getLogin"]),//解构出来 将getLogin映射成方法
    
      submitForm(loginForm) {
      // console.log(this.getLogin(this.$store))
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });

      
      this.$refs[loginForm].validate(valid => {//拿到当前实例  验证
        if (valid) {
          //发请求提交数据
          var params = {
            obj: this.loginForm,
            callback: (cvild) => {//cvild是从store接受的数据
              // console.log(11)
              if(cvild=='success'){
                  loading.close();//结束loading
                  this.isLogin=true;
                  this.$router.push("/home_echarts");       
                
              }else{
                  this.$message.error("密码输入有误！"); 
                  loading.close();//结束loading
                  return false;
              }             
            }
          };
           this.getLogin(params)
          // this.$store.dispatch('getLogin',this.loginForm)
        } else {
          loading.close();//结束loading       
          this.$message.error("输入格式有误！"); 
          return false;
        }
      });
    }
  }
};
</script>
<style lang="less">

 
#bg{
    background:url(../../public/img/bj2.jpg) no-repeat;
    // width: 100%;
    height: 1171px;
    background-size: 100%;
    background-attachment: fixed;
}
  .head{
    height: 80px;
    width: 100%;
    background-color: hsla(0,0%,100%,.2);
    text-align: center;
    // line-height: 80px;
    img{
      width: 300px;
      height:100%;
      vertical-align: middle;
      margin-right: 20px;
    }
  }
#login {
  display: flex;
  justify-content: center;
  width: 100%;
  height:100%;
  .box {
    font-size: 20px;
    line-height:60px;
    text-align: center;
  }
  .inputw input{
      background-color: hsla(0, 0%, 100%, 0.75);
      color:#332c1c;
   }
   .btn{
     margin-top:30px;
   }
}

#login .login-content {
  margin-top: 100px;
  height: 300px;
  width: 400px;
  background-color: hsla(0,0%,100%,.5);
  padding: 20px 40px;
  border-radius:5px;
   
}

</style>