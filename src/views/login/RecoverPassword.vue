<template>
  <div class="background">
    <div class="recoverpasswordcss">
      <h1>找回密码</h1>
      <el-tabs v-model="activeName" @tab-click="handleClick" :stretch="true">
        <el-tab-pane label="手机" name="phone">
          <div>
            <el-form
              :rules="rules"
              status-icon
              :model="UserDTO"
              ref="recover"
              label-width="95px"
              style="
                width: 600px;
                margin: 0 auto;
                padding-top: 50px;
                text-align: left;
              "
            >
              <el-form-item label="手机号" prop="phone">
                <el-input
                  v-model="UserDTO.phone"
                  style="width: 200px; text-align: center; padding-right: 50px"
                ></el-input>
                <el-button-group>
                  <el-button
                    type="success"
                    @click="sendPhoneCaptcha"
                    :disabled="sendCaptchaBtn"
                    >发送验证码</el-button
                  >
                  <el-button
                    type="success"
                    v-if="countDownBtn"
                    plain
                    disabled
                    >{{ countdown }}</el-button
                  >
                </el-button-group>
              </el-form-item>
              <el-form-item label="验证码" prop="code">
                <el-input v-model="UserDTO.code"></el-input>
              </el-form-item>
              <el-form-item label="新密码" prop="password1">
                <el-input v-model="UserDTO.password1" show-password></el-input>
              </el-form-item>
              <el-form-item label="确认新密码" prop="password2">
                <el-input v-model="UserDTO.password2" show-password></el-input>
              </el-form-item>
              <el-form-item style="text-align: center">
                <el-button type="primary" @click="backtologin"
                  >回到首页</el-button
                >
                <el-button type="success" @click="recoverPasswordBtn"
                  >找回密码</el-button
                >
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rules: {
        phone: [{ required: true, message: "请输入手机号", trigger: "blur" }],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
        password1: [
          { required: true, message: "请输入新密码", trigger: "blur" },
        ],
        password2: [
          { required: true, message: "请确认新密码", trigger: "blur" },
        ],
      },
      UserDTO: {},
      countDownBtn: false,
      countdown: 60, // 初始倒计时时间（秒）
      sendCaptchaBtn: false,
      activeName: "phone",
    };
  },
  methods: {
    backtologin() {
      this.$router.push("/login");
    },
    recoverPasswordBtn() {
      if (this.UserDTO.password1 != this.UserDTO.password2) {
        this.$message({
          message: "密码不一致！",
          type: "fail",
        });
      } else {
        let that = this;
        this.$refs.recover.validate((valid) => {
          if (valid) {
            this.$axios
              .post("http://localhost:1001/school/updatePassword", this.UserDTO)
              .then((resp) => {
                if (resp.data.code == 200) {
                  that.$message.success("修改成功！");
                } else {
                  this.$message({
                    message: resp.data.data,
                    type: "fail",
                  });
                }
              });
          }
        });
      }
    },

    sendPhoneCaptcha() {
      if (this.UserDTO.phone == null) {
        this.$message({
          message: "手机号不能为空!",
          type: "fail",
        });
      } else {
        let that = this;
        this.$axios
          .get("http://localhost:1001/school/phone/" + this.UserDTO.phone)
          .then((resp) => {
            if (resp.data.code == 200) {
              //显示倒计时
              that.countDownBtn = true;
              that.$message.success("发送成功！");
              that.sendCaptchaBtn = true;
              //倒计时效果
              const timer = setInterval(() => {
                if (that.countdown > 0) {
                  that.countdown--;
                } else {
                  that.countdown = 60;
                  clearInterval(timer);
                }
              }, 1000);
              //60秒结束后回恢复按键的点击 隐藏倒计时
              const timeout = setTimeout(() => {
                that.sendCaptchaBtn = false;
                that.countDownBtn = false;
              }, 60000);
            } else if (resp.data.code == 400) {
              // that.$message.error("邮箱格式有误！");
            }
          });
      }
    },
  },
};
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

.recoverpasswordcss {
  background-color: rgba(255, 255, 255, 0.8); /* 半透明白色背景 */
  width: 700px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2); /* 阴影效果 */
  margin-top: 120px;
  margin-left: 600px;
}
</style>
