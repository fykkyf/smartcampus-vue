<template>
  <!--文件上传功能模版-->
  <div>
    <el-button type="primary" @click="uploadVisible=true">上传文件</el-button>
    <el-button type="primary" @click="showFile">文件预览</el-button>
    <div>
      <!--上传文件弹窗-->
      <el-dialog
          title="上传文件"
          :visible.sync="uploadVisible"
          width="400px"
          style="text-align: center">
        <el-upload class="upload-demo" drag
                   :multiple="false"
                   :limit="1"
                   ref="uploadDialog"
                   :auto-upload="false"
                   :action="'http://localhost:8080/file/upload?md5='+md5"
                   :on-change="checkMd5"
                   :on-success="uploaded">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <!--<div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>-->
        </el-upload>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import SparkMD5 from "spark-md5";

export default {
  data() {
    return {
      uploadVisible: false,
      md5: "",
      file: {}
    }
  },
  methods: {
    showFile() {
      var url = 'aHR0cDovLzEyNy4wLjAuMTo4MDEyL2RlbW8vbXliYXRpcy0zLjMuMC5wZGY%3D'; //要预览文件的访问地址
      window.open('http://127.0.0.1:8012/onlinePreview?url=' + encodeURIComponent(url));
    },
    uploaded(response) {
      if (response.code == 200) {
        this.$message({
          message: "上传成功！",
          type: "success",
          center: true
        });
        console.log(response.data)
        this.file = response.data;
        //清空文件的待选框
        this.$refs.uploadDialog.clearFiles();
      }
    },
    checkMd5(f) {
      console.log(f)
      if (f.status !== 'ready') return;
      //限制上传文件的类型
      let FileExt = f.name.replace(/.+\./, "");
      if (['jpg', 'jpeg', 'png', 'gif', 'mp3', 'wma', 'wav', 'flac', 'mp4', 'avi', 'mov', 'mkv', 'txt', 'doc', 'docx', 'pdf', 'xls', 'xlsx', 'pptx', 'html', 'md', 'zip', 'rar', 'exe', 'chm', 'jar'].indexOf(FileExt.toLowerCase()) === -1) {
        this.$message({
          type: 'warning',
          message: '不允许上传该格式的文件到网盘中！',
          center: true
        });
        return false;
      }
      let that = this;
      let file = f.raw;
      //计算Md5值
      let blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice,
          chunkSize = 2097152,                             // Read in chunks of 2MB
          chunks = Math.ceil(file.size / chunkSize),
          currentChunk = 0,
          spark = new SparkMD5.ArrayBuffer(),
          fileReader = new FileReader();

      fileReader.onload = function (e) {
        // console.log('read chunk nr', currentChunk + 1, 'of', chunks);
        spark.append(e.target.result);                   // Append array buffer
        currentChunk++;

        if (currentChunk < chunks) {
          loadNext();
        } else {
          console.log('finished loading');
          let md5 = spark.end();  // Compute hash
          let file = {
            md5: md5,
            fileName: f.name,
          }
          that.md5 = md5;
          //发送请求
          that.$axios.post("http://localhost:8080/file/checkmd5", file).then(resp => {
            that.uploadVisible = false;
            if (resp.data.code == 400) {
              console.log("没有,需要上传")
              that.$refs.uploadDialog.submit();
            } else {
              //数据库已存在 无需上传
              that.$refs.uploadDialog.clearFiles();
              that.file = resp.data.data;
            }
          })
        }
      };
      fileReader.onerror = function () {
        console.warn('oops, something went wrong.');
      };

      function loadNext() {
        var start = currentChunk * chunkSize,
            end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize;
        fileReader.readAsArrayBuffer(blobSlice.call(file, start, end));
      }

      loadNext();
    },
  }
}
</script>

<style>

</style>
