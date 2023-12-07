<template>
  <div class="background">
    <h1 style="margin-top: 30px;font-size: 50px">智慧校园</h1>
    <div class="login">
      <div >
        <h1 style="text-align: center">账号登录</h1>
        <el-form :rules="rules" status-icon :model="UserDTO" ref="loginform" label-width="80px"
                 style="width: 600px;margin: 0 auto;padding-top: 50px;text-align: left">
          <el-form-item label="账号" prop="uname">
            <el-input v-model="UserDTO.uname"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="UserDTO.password" show-password></el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="verify">
            <el-input v-model="UserDTO.verify" style="width: 220px;text-align: center"></el-input>
            <el-image :src="captchaImage" @click="createVerifycode" style="margin-left: 20px"></el-image>
          </el-form-item>
          <!--      <el-form-item label="邮箱验证码" prop="email">
                  <el-input v-model="UserDTO.email" style="width: 320px;margin: 0 auto"></el-input>
                  <el-button type="success" icon="el-icon-message" plain style="margin-left: 20px"
                             @click="sendCaptcha"></el-button>
                </el-form-item>-->
          <el-form-item style="text-align: center;">
            <el-button type="primary" @click="login">登录</el-button>
            <el-button type="success" @click="recoverPassword">找回密码</el-button>
            <!-- <el-button type="success" @click="scanLogin=true;getQRcodeTicket()">扫码登录</el-button> -->
          </el-form-item>
        </el-form>
      </div>
      <!-- <div v-else>
        <h1 style="text-align: center">微信扫码登录</h1>
        微信扫码登录
      <el-image :src="url+ticket"></el-image>
        <br><br><br>
        <el-button type="primary" @click="getQRcodeTicket">刷新二维码</el-button>
        <el-button type="danger" @click=" scanLogin = false;" plain>取消</el-button>
      </div> -->
    </div>


  </div>
</template>

<script>
export default {
  data() {
    var checkPassword1 = (rule, value, callback) => {
      if (value == '') {
        return callback(new Error("请输入密码"));
      }/* else if (value.length < 6) {
        return callback(new Error("密码长度至少6位！"));
      } else if (!/^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':",.<>?]).{6,}$/.test(value)) {
        return callback(new Error("至少1个大写字母和1个特殊字符！"));
      }*/ else {
        callback();
      }
    };
    // var checkPassword2 = (rule, value, callback) => {
    //   if (value == '') {
    //     return callback(new Error("请再次输入密码"));
    //   } else if (value != this.employee.password1) {
    //     return callback(new Error("两次输入密码不一致，请重新输入！"));
    //   } else {
    //     callback();
    //   }
    // };
    var checkEname = (rule, value, callback) => {
      if (value == '') {
        return callback(new Error("账号不能为空!"));
      } else if (value.length < 2 || value.length > 5) {
        return callback(new Error("账号的长度在 2 到 5 个字符!"));
      } else {
        callback();
      }
    };
    // var checkCaptcha = (rule, value, callback) => {
    //   if (value == '') {
    //     return callback(new Error("验证码不能为空!"));
    //   } else if (value.length > 4 || value.length < 4) {
    //     return callback(new Error("验证码长度为4位"));
    //   }else{

    //   }
    // };
    // var checkEmail = (rule, value, callback) => {
    //   console.log("数据校验")
    //   if (value == '') {
    //     return callback(new Error("邮箱不能为空!"));
    //   } else if (!/^\w+@\w+\.\w+$/.test(value)) {
    //     return callback(new Error("邮箱格式有误！"));
    //   } else {
    //     callback();
    //   }
    // };
    return {
       rules: {
      //   email: [
      //     {validator: checkEmail, trigger: 'blur', required: true},
      //   ],
      // verify: [
      // {validator: checkCaptcha, trigger: 'blur', required: true}
      // ],
        password: [
          {validator: checkPassword1, trigger: 'blur', required: true}
        ],
      //   password2: [
      //     {validator: checkPassword2, trigger: 'blur', required: true}
      //   ],
        uname: [
          {validator: checkEname, trigger: 'blur', required: true},
          {required: true, message: '请输入姓名', trigger: 'blur'},
          {min: 1, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur'}
        ],
       },
      UserDTO: {uname: "", password: "", verify: ""},
       captchaImage: "",
    //   uuid: "",
    //   email: "",
    //   url: "https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=",
    //   ticket: "",
    //   flag: true,
    //   scanLoginVisible: false,
    //   scanLogin: false
     }
  },
  created() {
    this.createVerifycode();
    // this.getQRcodeTicket();
  },
  methods: {
    // getQRcodeTicket() {
    //   let that = this;
    //   that.$axios.get("http://localhost:8080/wx/getqrcode?type=login").then(resp => {
    //     if (resp.data.code == 200) {
    //       that.ticket = resp.data.data.ticket;
    //       if (that.flag == true) {
    //         let timer = setInterval(() => {
    //           that.$axios.get("http://localhost:8080/wx/scan?ticket=" + that.ticket).then(resp => {
    //             console.log(resp.data.data);
    //             if (resp.data.code == 200) {
    //               this.$router.push("/");
    //               this.$message.success("登录成功！");
    //               clearInterval(timer);
    //             } else if (resp.data.code == 404) {
    //               let token = localStorage.getItem("token");
    //               if (token) {
    //                 clearInterval(timer);
    //               }
    //               this.$message.error("该微信尚未绑定任何账号，请登录后进行绑定！");
    //               this.scanLogin = false;
    //               // clearInterval(timer);
    //             }
    //           })
    //         }, 5000);
    //         that.flag = false;
    //       }
    //     }
    //   });
    // },
    recoverPassword() {
      this.$router.push("/recoverPassword");
    },
    sendCaptcha() {
    },
    /* 刷新验证码 */
     createVerifycode(){
      this.$axios
      .get("http://localhost:1001/school/verify")
      .then(resp=>{
        if(resp.data.code==200){
          this.captchaImage="data:image/png;base64,"+resp.data.data.verifycodesrc;
          this.UserDTO.uuid=resp.data.data.uuid;
        }
      });
  },
    login() {
      // this.employee.password = this.employee.password1;
      this.$refs.loginform.validate(valid => {
        if (valid) {
          this.$axios.post("http://localhost:1001/school/login", this.UserDTO).then(resp => {
            if (resp.data.code == 200) {
              this.$router.push({
                name: "workSpace",
                params: resp.data.data
              });
              this.$message.success("登陆成功！");
              // let token = resp.headers['token'];
              // localStorage.setItem("token", token);
              // console.log(token)
            } else {
               this.$message({
              message: resp.data.data,
              type: "fail",
            });
            this.createVerifycode();
            }
          })
        }
      })
    },
  }
}
</script>

<style>
.background {
  background-image: url("../../assets/cover.jpg");
  background-position: center;
  height: 100%;
  width: 100%;
  background-size: cover;
  position: fixed;
}

.login {
  background-color: rgba(255, 255, 255, 0.8); /* 半透明白色背景 */
  width: 700px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2); /* 阴影效果 */
  margin-top: 120px;
  margin-left: 600px;
}
</style>
