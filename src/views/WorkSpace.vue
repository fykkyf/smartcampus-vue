<template>
  <!--首页--工作台-->
  <div>
    <div>
      <div>
        <el-carousel :interval="4000" type="card" height="200px">
          <el-carousel-item v-for="(item, index) in imgList" :key="index" style="border-radius: 10px">
            <img :src="item.url" alt="" style="height: 100%;width: 100%;">
          </el-carousel-item>
        </el-carousel>
      </div>
      <el-divider>追风赶月莫停留，平芜尽处是春山!</el-divider>
      <el-card class="background-card">
        <div style="display: inline-block;width: 620px;height: 300px">
          <h1>今日天气</h1>
          <div id="he-plugin-standard"></div>
        </div>
        <div style="display: inline-block;width: 500px;margin-bottom: 60px">
          <div class="FlipClock">
            <Flipper ref="flipperHour1"/>
            <Flipper ref="flipperHour2"/>
            <em>:</em>
            <Flipper ref="flipperMinute1"/>
            <Flipper ref="flipperMinute2"/>
            <em>:</em>
            <Flipper ref="flipperSecond1"/>
            <Flipper ref="flipperSecond2"/>
          </div>
        </div>
      </el-card>
      <el-divider>风来自很远的地方，去看看也无妨！</el-divider>
      <div>
        <el-col :span="12">
          <el-card style="width: 95%;">
            <el-calendar v-model="values">
            </el-calendar>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card>
          <div style="display: inline-block;height: 50px;margin-left: 100px">
            <el-button type="success" @click="clockIn" ref="clockInBtn" style="display: inline-block;margin-bottom: 40px">
              上班打卡
            </el-button>
            <br>
            <el-button type="success" @click="clockout" ref="clockOutBtn" style="display: inline-block;">下班打卡
            </el-button>
          </div>
          </el-card>
        </el-col>
      </div>
    </div>

  </div>
</template>

<script>
import SparkMD5 from "spark-md5";
import Flipper from '../components/Flipper.vue'

export default {
  name: 'FlipClock',
  data() {
    return {
      timer: null,
      flipObjs: [],
      values: new Date(),
      titles: [],
      url: "https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=",
      ticket: "",
      flag: true,
      WXVisible: false,
      employee: {avartar: {path: ""}, department: {dname: ""}},
      imgList: [
        {id: 0, url: 'https://pic.ntimg.cn/file/20160607/13599362_102457079000_2.jpg'},
        {id: 1, url: 'https://ts1.cn.mm.bing.net/th/id/R-C.6a92c895927943d5a1c6ffdd3131529f?rik=tTUBEJYlHR7ofQ&riu=http%3a%2f%2fwww.lincolnelevator.com.cn%2fwp-content%2fuploads%2f2019%2f04%2f11.jpg&ehk=rZk4Y2Lz9398yZO6T8%2bcuJNw8Gkhpaz7cWBP6ANCz5k%3d&risl=&pid=ImgRaw&r=0'},
        {id: 2, url: 'https://tse4-mm.cn.bing.net/th/id/OIP-C.PK-tUMU7QbUbMFmfp4lUfAHaEW?rs=1&pid=ImgDetMain'},
        {id: 3, url: 'https://ts1.cn.mm.bing.net/th/id/R-C.016c56c8a40a0c592e96be4ab1e573b3?rik=f3Ebe%2b0uwfZvvw&riu=http%3a%2f%2fwww.xuexilei.com%2fupfile%2funiversity%2fphoto%2f14%2f14%2fbb2109d1b20f1dbbddea6e63df09ccab.jpg&ehk=i%2b2GRRKDNrl6p72dJyrLa%2fIzS80tYjwVEQI%2fcnVv%2bXo%3d&risl=&pid=ImgRaw&r=0'},
        {id: 4, url: 'https://gss0.baidu.com/9fo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/3801213fb80e7bec561d4a012e2eb9389a506b0e.jpg'},
      ]
    }

  }, components: {
    Flipper
  },
  mounted() {
    this.flipObjs = [
      this.$refs.flipperHour1,
      this.$refs.flipperHour2,
      this.$refs.flipperMinute1,
      this.$refs.flipperMinute2,
      this.$refs.flipperSecond1,
      this.$refs.flipperSecond2
    ]
    this.init()
    this.run()
  },
  methods: {
    // 初始化数字
    init() {
      let now = new Date()
      let nowTimeStr = this.formatDate(new Date(now.getTime()), 'hhiiss')
      for (let i = 0; i < this.flipObjs.length; i++) {
        this.flipObjs[i].setFront(nowTimeStr[i])
      }
    },
    // 开始计时
    run() {
      this.timer = setInterval(() => {
        // 获取当前时间
        let now = new Date()
        let nowTimeStr = this.formatDate(new Date(now.getTime() - 1000), 'hhiiss')
        let nextTimeStr = this.formatDate(now, 'hhiiss')
        for (let i = 0; i < this.flipObjs.length; i++) {
          if (nowTimeStr[i] === nextTimeStr[i]) {
            continue
          }
          this.flipObjs[i].flipDown(
              nowTimeStr[i],
              nextTimeStr[i]
          )
        }
      }, 1000)
    },
    // 正则格式化日期
    formatDate(date, dateFormat) {
      /* 单独格式化年份，根据y的字符数量输出年份
     * 例如：yyyy => 2019
            yy => 19
            y => 9
     */
      if (/(y+)/.test(dateFormat)) {
        dateFormat = dateFormat.replace(
            RegExp.$1,
            (date.getFullYear() + '').substr(4 - RegExp.$1.length)
        )
      }
      // 格式化月、日、时、分、秒
      let o = {
        'm+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'i+': date.getMinutes(),
        's+': date.getSeconds()
      }
      for (let k in o) {
        if (new RegExp(`(${k})`).test(dateFormat)) {
          // 取出对应的值
          let str = o[k] + ''
          /* 根据设置的格式，输出对应的字符
           * 例如: 早上8时，hh => 08，h => 8
           * 但是，当数字>=10时，无论格式为一位还是多位，不做截取，这是与年份格式化不一致的地方
           * 例如: 下午15时，hh => 15, h => 15
           */
          dateFormat = dateFormat.replace(
              RegExp.$1,
              RegExp.$1.length === 1 ? str : this.padLeftZero(str)
          )
        }
      }
      return dateFormat
    },
    // 日期时间补零
    padLeftZero(str) {
      return ('00' + str).substr(str.length)
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
    //和风天气插件调用
    window.WIDGET = {
      "CONFIG": {
        "layout": "1",
        "width": "450",
        "height": "150",
        "background": "1",
        "dataColor": "FFFFFF",
        "borderRadius": "5",
        "city": "CN101270119",
        "key": "a3618919b0a14db59e65f09e19b56591"
      }
    }
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://widget.qweather.net/standard/static/js/he-standard-common.js?v=2.0';
    document.getElementsByTagName('head')[0].appendChild(script);
    // this.getLoginEmployee();
  }

}
</script>

<style>
.clockBtn {
  background-color: rgba(255, 255, 255, 0.8); /* 半透明白色背景 */
  width: 500px;
  padding: 20px 0 20px 150px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  display: inline-block;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}

.FlipClock {
  text-align: center;
}

.FlipClock .M-Flipper {
  margin: 0 3px;
}

.FlipClock em {
  display: inline-block;
  line-height: 102px;
  font-size: 66px;
  font-style: normal;
  vertical-align: top;
}
.background-card {
  background-image: url(D:\vscode\code\web04code\stage04-smartcampus-vue\src\views\course\图书馆.jpg);
  background-size: cover; /* 背景图填充整个元素 */
}

</style>
