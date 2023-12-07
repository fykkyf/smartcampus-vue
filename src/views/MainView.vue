<template>
  <!--顶部导航栏-->
  <div>
    <el-container>
      <el-header>
        <el-menu
          :default-active="activeIndex2"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          background-color="#90000a"
          text-color="#fff"
          active-text-color="#ffd04b"
          :router="true"
        >
          <el-menu-item index="1" disabled=""
            >欢迎登录，{{ employee.ename }}
            <!--            <el-avatar :src="'http://localhost:8080/files/' +employee.avartar.path"></el-avatar>-->
          </el-menu-item>
          <el-menu-item index="/workSpace">工作台</el-menu-item>
          <el-submenu index="2">
            <template slot="title">个人信息</template>
            <el-menu-item index="/grade">成绩查询</el-menu-item>
            <el-menu-item index="/studentInterface">个人信息</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">课程管理</template>
            <el-menu-item index="/mycourse">我的课表</el-menu-item>
            <el-menu-item index="/selectElectiveCourse">选课管理</el-menu-item>
            <el-menu-item index="/examination">考试</el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">缴费大厅</template>
            <el-menu-item index="/studypay">学费缴费</el-menu-item>
            <el-menu-item index="/acadepay">教务缴费</el-menu-item>
            <el-menu-item index="/livingroom">生活缴费</el-menu-item>
            <el-menu-item index="/skillregister"
              >技能考试报名及缴费</el-menu-item
            >
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">毕业管理</template>
            <el-menu-item index="/SchoolRollStaus">学籍变动</el-menu-item>
            <el-menu-item index="/UpdateInfor">毕业信息核对</el-menu-item>
            <el-menu-item index="/Thesis">论文进度</el-menu-item>
          </el-submenu>
          <el-button
            type="primary"
            size="mini"
            @click="getQRcodeTicket"
            style="margin-top: 15px"
            v-if="employee.wxid != null && employee.wxid !== ''"
            disabled
          >
            微信账号已绑定
          </el-button>
          <el-button
            type="success"
            size="mini"
            style="margin-top: 15px"
            @click="dialogVisible = true"
            v-else
          >
            微信账号绑定
          </el-button>
          <el-button
            type="danger"
            size="mini"
            style="margin-top: 15px; margin-left: 360px"
            @click="logout"
            >注销
          </el-button>
          <span style="color: white; float: right; padding: 20px 20px 0 0">{{
            time
          }}</span>
        </el-menu>
      </el-header>
      <el-main style="text-align: center">
        <!--        <div>-->
        <!--          <el-dialog-->
        <!--              title="绑定微信账号"-->
        <!--              :visible.sync="dialogVisible"-->
        <!--              width="30%">-->
        <!--            <el-image :src="url+ticket"></el-image>-->
        <!--            <span slot="footer" class="dialog-footer" style="text-align: center">-->
        <!--            <el-button type="primary" @click="getQRcodeTicket">刷新二维码</el-button>-->
        <!--            <el-button type="danger" @click=" dialogVisible = false;getQRcodeTicket()" plain>取消</el-button>-->
        <!--            </span>-->
        <!--          </el-dialog>-->
        <!--        </div>-->
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script>
import router from "@/router";

export default {
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
      employee: {},
      time: "",
      dialogVisible: false,
      url: "https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=",
      ticket: "",
      flag: true,
    };
  },
  methods: {
    // getQRcodeTicket() {
    //   let that = this;
    //   that.$axios.get("http://localhost:8080/wx/getqrcode?type=bind-" + this.employee.eid).then(resp => {
    //     if (resp.data.code == 200) {
    //       that.ticket = resp.data.data.ticket;
    //       if (that.flag == true) {
    //         let timer = setInterval(() => {
    //           that.$axios.get("http://localhost:8080/wx/bind?ticket=" + that.ticket).then(resp => {
    //             console.log(resp.data.data);
    //             if (resp.data.code == 200) {
    //               this.$router.push("/");
    //               this.$message.success("微信绑定成功！");
    //               this.dialogVisible = false;
    //               this.getLoginEmployee();
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
    router() {
      return router;
    },
    showTime() {
      const timer = setInterval(() => {
        this.time = new Date().toLocaleString();
      }, 1000);
    },
    logout() {
      this.$router.push("/login");
      //清除存储在localstorage里面的token
      localStorage.removeItem("token");
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    // getLoginEmployee() {
    //   this.$axios.get("http://localhost:8080/employee/getloginemployee").then(resp => {
    //     if (resp.data.code == 200) {
    //       this.employee = resp.data.data;
    //     }
    //   })
    // }
  },
  created() {
    // this.employee = this.$route.params;
    // this.getLoginEmployee();
    this.showTime();
    // this.getQRcodeTicket();
  },
};
</script>

<style>
body,
html {
  padding: 0;
  margin: 0;
}

.el-header {
  padding: 0;
}
</style>
