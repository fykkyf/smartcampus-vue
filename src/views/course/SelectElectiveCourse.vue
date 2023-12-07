<template>
  <div class="container">
    <el-divider><i class="el-icon-sunny"></i>平安喜乐<i class="el-icon-sunny"></i></el-divider>
      <div class="section">
        <el-form :inline="true" ref="electiveCourse" :model="electiveCourse" label-width="80px" style="padding-right: 300px">
          <el-form-item label="课程名">
            <el-input v-model="electiveCourseInfo.keyword" @input="getElectiveCourse"></el-input>
          </el-form-item>
          <el-form-item label="开始时间">
            <el-date-picker v-model="electiveCourseInfo.timeFrom" @input="getElectiveCourse" type="date" value-format="yyyy-MM-dd HH:mm" placeholder="选择日期"></el-date-picker>
          </el-form-item>
          <el-form-item label="截止时间">
            <el-date-picker v-model="electiveCourseInfo.timeTo" @input="getElectiveCourse" type="date" value-format="yyyy-MM-dd HH:mm" placeholder="选择日期"></el-date-picker>
          </el-form-item>
          <el-button type="warning" plain style="margin-left: 50px" @click="electiveCourseInfo = {keyword:null,timeFrom:null,timeTo:null};getAllElectiveCourses()">清除条件
          </el-button>
          <el-button type="primary"  @click="electiveCoursePay()" >选修课付费</el-button>
        </el-form>
      </div>

    <el-divider><i class="el-icon-sunny"></i>平安喜乐<i class="el-icon-sunny"></i></el-divider>
    <el-card class="box-card">
      <div class="section">
        <el-table :data="electiveCourses" border :cell-style="{ textAlign: 'center' }" :header-cell-style="{ textAlign: 'center' }">
          <el-table-column prop="ecid" label="选修课编号"></el-table-column>
          <el-table-column prop="electiveCourseName" label="选修课名称"></el-table-column>
          <el-table-column prop="credit" label="学分"></el-table-column>
          <el-table-column prop="period" label="周期"></el-table-column>
          <el-table-column prop="amount" label="金额"></el-table-column>
          <el-table-column prop="quantity" label="数量"></el-table-column>
          <el-table-column prop="startTime" label="开始时间"></el-table-column>
          <el-table-column prop="endTime" label="截止时间"></el-table-column>
          <el-table-column label="操作" width="200" fixed="right">
            <template slot-scope="scope">
              <div v-if="now() >= new Date(scope.row.startTime).getTime() && now() <= new Date(scope.row.endTime).getTime()">
                <el-button size="mini" type="text" @click="choiceElectiveCourse(scope.row)" :disabled="false">选择</el-button>
              </div>
              <div v-else>
                <el-button size="mini" type="text" @click="choiceElectiveCourse(scope.row)" :disabled="true">选择</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>

    <!-- 查询所有分页 -->
    <div>
      <el-pagination
        v-show="getAllShow"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageIndex"
        :page-sizes="[1, 2,5, 10, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>

    <!-- 条件所有分页 -->
    <div>
      <el-pagination
        v-show="getInfoShow"
        @size-change="handleSizeChangeInfo"
        @current-change="handleCurrentChangeInfo"
        :current-page="pageIndex"
        :page-sizes="[1, 2,5, 10, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>


<script>
import { showLoading, hideLoading } from '@/views/course/loading';
import pageLoading from '../course/loading.css'
import {now} from "moment";
export default {
  data() {
    return {
      electiveCourses: [],
      electiveCourse: {},
      electiveCourseInfo:{},
      pageIndex: 1,
      pageSize: 10,
      total: 0,
      getAllShow:false,
      getInfoShow:false,
    }
  },
  mounted() {
      this.getAllElectiveCourses();
      console.log(now());
  },
  methods:{
    electiveCoursePay(){
      this.$router.push({
        name: "electiveCoursePay",
        params:'',
      })
    },
    now,
    //查询所有选修课
    getAllElectiveCourses(){
      this.$axios.get("http://localhost:8081/selectelectivecourse/get/all/?pageIndex=" + this.pageIndex + "&pageSize=" + this.pageSize)
        .then(res=>{
          if (res.data.code==200){
            this.getAllShow = true;
            this.getInfoShow = false;
            this.electiveCourses = res.data.data.records;
            this.total = res.data.data.total;
          }
        })
    },
    //条件查询选修课
    getElectiveCourse() {
      this.$axios
        .post("http://localhost:8081/selectelectivecourse/findElectiveCourse/?pageIndex=" + this.pageIndex + "&pageSize=" + this.pageSize,this.electiveCourseInfo)
        .then(resp => {
          this.getAllShow=false;
          this.getInfoShow=true;
            this.electiveCourses = resp.data.data.records;
            this.total = resp.data.data.total;
        });
    },
    //抢课
    choiceElectiveCourse(row,index){
      this.$confirm("确认选择此课程?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          showLoading();
          this.$axios
            .post("http://localhost:8081/selectelectivecourse/choiceElectiveCourse/" + row.ecid)
            .then(resp => {
              if (resp.data.code == 200) {
                this.$message({
                  message: "选择成功！",
                  type: "success",
                });
                this.getAllElectiveCourses();
              } else{
                this.$message({
                  message: "选择失败！",
                  type: "warning",
                });
              }
              hideLoading();
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消选择",
          });
        });
    },
    handleSizeChange(pageSize) {
      this.pageIndex = 1;
      this.pageSize = pageSize;
        this.getAllElectiveCourses();
    },

    handleCurrentChange(pageIndex) {
      this.pageIndex = pageIndex;
        this.getAllElectiveCourses();
    },

    handleSizeChangeInfo(pageSize) {
      this.pageIndex = 1;
      this.pageSize = pageSize;
      this.getElectiveCourse();
    },

    handleCurrentChangeInfo(pageIndex) {
      this.pageIndex = pageIndex;
      this.getElectiveCourse();
    },


  }
}
</script>

<style>
.search{
  width:80px;
  height:40px;
  border-radius:40px;
  border:2px solid lightblue;
  position: absolute;
  right:200px;
  outline:none;
  text-indent:12px;
  color:#666;
  font-size:16px;
  padding:0;
  -webkit-transition:width 0.5s;
}
.search:focus{
  width:200px;
}
</style>

