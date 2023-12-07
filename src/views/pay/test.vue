<template>
  <div>
    <el-button
      type="primary"
      style="margin-left: 5px; margin-top: 150px"
      @click="getCurrentPosition"
      >获取地理位置</el-button
    >
    <el-button
      type="primary"
      style="margin-left: 5px; margin-top: 150px"
      @click="playcard(sign)"
      >打卡</el-button
    >
    <div class="container">
      <div id="container"></div>
    </div>
  </div>
</template>

<script>
import AMapLoader from "@amap/amap-jsapi-loader";
window._AMapSecurityConfig = {
  securityJsCode: "b3a7eeae39de7815ba9ca53b33455d2a",
};
export default {
  data() {
    return {
      sign: {
        longitudeS: "",
        latitudeS: "",
      },
      playcards: {
        longitudeS: "",
        latitudeS: "",
      },
    };
  },
  mounted() {
    // this.initAMap();
  },
  unmounted() {
    this.map?.destroy();
  },
  methods: {
    getCurrentPosition() {
      navigator.geolocation.getCurrentPosition(this.onSuccess, this.onError);
    },
    onSuccess(position) {
      console.log("Latitude(纬度): " + position.coords.latitude);
      console.log("Longitude(经度): " + position.coords.longitude);
      this.sign.longitudeS = position.coords.longitude;
      this.sign.latitudeS = position.coords.latitude;

      //这里是演示打卡失败
      // this.sign.longitudeS = "121.4801088";
      // this.sign.latitudeS = "31.2396342";

      this.playcard.longitudeS = this.sign.longitudeS;
      this.playcard.latitudeS = this.sign.latitudeS;
      this.initAMap(this.sign);
      // console.log(this.sign.longitudeS);
      // console.log(this.sign.latitudeS);
      // this.$axios
      //   .post("http://localhost:8080/sign/sign", this.sign)
      //   .then((res) => {
      //     if (res.data.code == 200) {
      //       this.$message({
      //         message: "打卡成功",
      //         type: "success",
      //       });
      //     } else {
      //       this.$message({
      //         message: "不在范围内，打卡失败",
      //         type: "error",
      //       });
      //     }
      //   });
    },
    onError(error) {
      console.log("Error occurred: " + error.message);
    },
    initAMap(sign) {
      console.log("这里是：" + this.sign.longitudeS);
      console.log("这里是：" + this.sign.latitudeS);
      AMapLoader.load({
        key: "4bb0e6f9bb0adafe141ab0a649ae8f4a", // 申请好的Web端开发者Key，首次调用 load 时必填
        version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: [
          "AMap.ToolBar",
          "AMap.Scale",
          "AMap.HawkEye",
          "AMap.MapType",
          "AMap.Geolocation",
          "AMap.AutoComplete",
          "AMap.PlaceSearch",
        ], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      })
        .then((AMap) => {
          this.map = new AMap.Map("container", {
            // 设置地图容器id
            viewMode: "3D", // 是否为3D地图模式
            zoom: 500, // 初始化地图级别
            center: [sign.longitudeS, sign.latitudeS], // 初始化地图中心点位置
          });
          this.map.addControl(new AMap.Scale());
          this.map.addControl(new AMap.ToolBar());
          this.map.addControl(new AMap.HawkEye());
          this.map.addControl(new AMap.MapType());
          this.map.addControl(new AMap.Geolocation());
          this.auto = new AMap.AutoComplete(this.autoOptions);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    playcard(playcards) {
      console.log(playcards);
      if (playcards.longitudeS == "" || playcards.latitudeS == "") {
        this.$message({
          message: "请先获取当前位置,再进行打卡",
          type: "warning",
        });
      } else {
        this.$axios
          .post("http://localhost:8080/sign/sign", this.sign)
          .then((res) => {
            if (res.data.code == 200) {
              this.$message({
                message: "打卡成功",
                type: "success",
              });
            } else {
              this.$message({
                message: "不在范围内，打卡失败",
                type: "error",
              });
            }
          });
      }
    },
  },
};
</script>
<style scoped>
#container {
  width: 40%;
  height: 400px;
}
.container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 100vh;
}
</style>