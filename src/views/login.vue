<template>
  <div class="login-app">
    <div class="login-box no-select">
      <div class="header">{{headerTitle}}</div>
      <div class="login-form v">
        <el-form ref="form" :model="form" :rules="rules" label-position="left" size="mini" hide-required-asterisk="true" >
          <el-form-item label="用户" label-width="80px" prop="username">
            <el-input v-model.trim="form.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" label-width="80px" prop="password">
            <el-input v-model.trim="form.password"></el-input>
          </el-form-item>
          <el-form-item>
            <div class="operation h c">
              <el-checkbox v-model="form.rememberMe" label="记住密码" border></el-checkbox>
              <el-input v-model.trim="form.code" v-if="code"></el-input>
              <div class="code" v-if="code">
                <img :src="code" @click="getCode">
              </div>
            </div>
          </el-form-item>
          <div v-if="!loading" class="login-btn" @click="login">登录</div>
          <div v-else class="login-btn-loading">登录中...</div>
        </el-form>
      </div>
    </div>
    <!-- 背景特效 -->
    <main>
      <div class="stars"></div>
    </main>
  </div>
</template>
<script>
import { getCodeImg } from "@/api/login";
import settings from '../settings';
import Cookies from "js-cookie";
import { mapGetters } from "vuex";
export default {
  name: "Login",
  computed: {
    ...mapGetters(["user", "baseApi"]),
  },
  data(){
    return{
      cookiePass: "",
      code: "",
      form:{
        password: '',
        readerme: '',
        code: '',
        rememberMe: false,
      },
      loading: false,
      headerTitle: '',
      rules: {
        username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
      version: {
        api: "-",
        code: window.SYSTEM_VERSION
      },
    }
  },
  created(){
    this.headerTitle = settings.title
    // 获取验证码
    this.getCode();
    // 获取用户名密码等Cookie
    this.getCookie();
    // token 过期提示
    this.point();
  },
  methods:{
    point() {
      const point = Cookies.get("point") !== undefined;
      if (point) {
        this.$notify({
          title: "提示",
          message: "当前登录状态已过期，请重新登录！",
          type: "warning",
          duration: 5000,
        });
        Cookies.remove("point");
      }
    },
    getCookie(){
      const username = Cookies.get("username");
      let password = Cookies.get("password");
      const rememberMe = Cookies.get("rememberMe");
      // 保存cookie里面的加密后的密码
      this.cookiePass = password === undefined ? "" : password;
      password = password === undefined ? this.form.password : password;
      this.form = {
        username: username === undefined ? this.form.username : username,
        password: password,
        rememberMe: rememberMe === undefined ? false : Boolean(rememberMe),
        code: "",
      };
    },
    getCode(){
      getCodeImg().then(res => {
        this.code = window.URL.createObjectURL(res)
      })
    },
    login(){
       this.$refs.form.validate((valid) => {
        const user = {
          username: this.form.username,
          password: this.form.password,
          rememberMe: this.form.rememberMe,
          code: this.form.code,
        };
        if(valid){
          this.loading = true;
          if(user.rememberMe){
            Cookies.set("username", user.username, {
              expires: settings.passCookieExpires
            });
             Cookies.set("password", user.password, {
              expires: settings.passCookieExpires
            });
             Cookies.set("rememberMe", user.rememberMe, {
              expires: settings.passCookieExpires
            });
          }else{
              Cookies.remove("username");
              Cookies.remove("password");
              Cookies.remove("rememberMe");
          }
          this.$store.dispatch("Login",user).then(() =>{
             this.loading = false;
          }).catch(() => {
              this.loading = false;
              this.getCode();
          });
        }else{
          return false
        }
      });
    }
  }
}
</script>
<style lang="scss" scoped>
.login-app{
  background: black;
  height: 100%;
  background-image: url(../assets/images/loginBgImage.jpg);
  background-size: 100% 100%;
  
  .login-box{
    position:absolute;
    width: 600px;
    height: 450px;
    border-radius: 15px;
    top: 20%;
    left: 50%;
    margin-left: -300px;
    z-index: 999;
    overflow: hidden;
    .header{
      width: 300px;
      height: 100px;
      margin: 0 auto;
      background-image: url(../assets/images/login-header.jpg);
      background-size: 100% 100%;
      margin-bottom: 10px;
      color: #fff;
      font-size: 18px;
      line-height: 130px;
      text-align: center;
      letter-spacing: 2px;
    }
    .login-form{
      width: 600px;
      height: 350px;
      background-image: url(../assets/images/loginForm.png);
      background-size: 100% 100%;
      padding: 80px;

      .login-btn, .login-btn-loading{
        width: 240px;
        height: 30px;
        line-height: 30px;
        margin: 0 auto;
        color: rgb(81, 223, 241);
        font-weight: bolder;
        box-shadow: 0 0 10px rgba(0, 13, 37, 0.5);
        border-radius: 15px;
        
      }
      .login-btn{
          padding-left: 90px;
          letter-spacing: 30px;
          background-color: rgb(0, 56, 109);
          cursor: pointer;
          &:hover{
            background-color: rgb(0, 85, 165);
          }
      }
      .login-btn-loading{
        padding-left: 80px;
        letter-spacing: 5px;
        cursor: not-allowed;
        background-color: rgb(0, 85, 165);
      }
    }
    .code{
      width: 400px;
      height: 26px;
      background-color: #fff;
      margin-right: 11px;
      border-radius: 4px;
      background-color: rgb(0, 60, 145);
      cursor: pointer;
    }
  }
  /* star field */
.stars {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 2px;
  height: 2px;
  box-shadow: -238px 108px #f7f7f7, 193px -376px #f7f7f7, -1264px -60px #fafafa,
    145px -443px #c9c9c9, -1440px 37px #f7f7f7, 262px -136px #cfcfcf,
    212px 219px #e3e3e3, 319px 223px #c7c7c7, 1246px -51px #c9c9c9,
    308px 26px #e0e0e0, 147px 229px #e6e6e6, -1041px 450px #d1d1d1,
    671px 86px white, -921px 234px #f0f0f0, -957px 242px #e8e8e8,
    1249px -285px #d1d1d1, 741px 434px #d9d9d9, -1030px 330px #ededed,
    311px -475px #fcfcfc, -413px -105px #d4d4d4, 868px -435px #f7f7f7,
    -790px 289px #dbdbdb, 202px 427px #fcfcfc, -22px -158px #c9c9c9,
    -1294px -297px #cccccc, -63px 200px #f0f0f0, -592px -86px #f7f7f7,
    -732px 366px white, -1426px -262px #e8e8e8, 475px -400px #c9c9c9,
    -1442px -153px #f7f7f7, 1124px -219px #ededed, 701px 257px #f0f0f0,
    36px -179px #ebebeb, -937px 480px #f7f7f7, -267px -418px #f2f2f2,
    1467px 127px #cfcfcf, -1128px 274px #d1d1d1, -180px 430px #e0e0e0,
    624px 275px #fafafa, -473px 150px #e6e6e6, -537px -348px #d4d4d4,
    410px 455px #ebebeb, 497px -29px #cccccc, 416px -370px whitesmoke,
    -1405px 397px #cfcfcf, 30px -81px #e6e6e6;
  animation: fly 3s linear infinite;
  transform-style: preserve-3d;
}
.stars:before,
.stars:after {
  content: "";
  position: absolute;
  width: inherit;
  height: inherit;
  box-shadow: inherit;
}
.stars:before {
  transform: translateZ(-300px);
  animation: fade1 3s linear infinite;
}
.stars:after {
  transform: translateZ(-600px);
  animation: fade2 3s linear infinite;
}
@keyframes fly {
  from {
    transform: translateZ(0px);
  }
  to {
    transform: translateZ(300px);
  }
}
@keyframes fade1 {
  from {
    opacity: 0.5;
  }
  to {
    opacity: 1;
  }
}
@keyframes fade2 {
  from {
    opacity: 0;
  }
  to {
    opacity: 0.5;
  }
}
}
main {
  position: relative;
  overflow: hidden;
  width: 100%;
  min-height: 98vh;
  perspective: 340px;
}


</style>