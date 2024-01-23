<template>
  <div class="container">
    <el-divider><i class="el-icon-sunny"></i>Don't watch the clock; do what it does. Keep going.<i class="el-icon-sunny"></i></el-divider>
    <div class="section">
      <el-card class="box-card">
        <div class="section" style="padding-right: 1300px">
          <el-button type="primary"  @click="show=true" >Late Exam Apply</el-button>
        </div>
      </el-card>
    </div>

    <el-divider><i class="el-icon-sunny"></i>Don't watch the clock; do what it does. Keep going.<i class="el-icon-sunny"></i></el-divider>
    <el-card class="box-card">
      <div class="section">
        <el-table :data="examSchedules" border :cell-style="{ textAlign: 'center' }" :header-cell-style="{ textAlign: 'center' }">
          <el-table-column prop="examScheduleId" label="Exam#" ></el-table-column>
          <el-table-column prop="examTime" label="Exam Time" ></el-table-column>
          <el-table-column prop="classRoom" label="Classroom" ></el-table-column>
          <el-table-column prop="courseName" label="Course" ></el-table-column>
          <el-table-column prop="academicYear" label="Year" ></el-table-column>
          <el-table-column prop="semester" label="Semester" ></el-table-column>
        </el-table>
      </div>
    </el-card>

  <!--缓考免考申请-->
    <div>
      <el-dialog title="Apply Form" :visible.sync="show" class="dialog-container">
        <div class="dialog-background">
          <el-form ref="examApplication" :model="examApplication" label-width="80px" class="form-container">
            <el-form-item label="Course" prop="course">
              <el-select v-model="examApplication.courseId" placeholder="Select">
                <el-option v-for="c in courses" :key="c.courseId" :label="c.courseName" :value="c.courseId"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="type" prop="type">
              <el-select v-model="examApplication.type" placeholder="type" clearable>
                <el-option label="Extended" value="1"></el-option>
                <el-option label="Exemption" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="resetForm()" class="btn btn-primary">Cancel</el-button>
            <el-button type="primary" @click="onSubmit()" class="btn btn-success">Submit</el-button>
          </div>
        </div>
      </el-dialog>

    </div>

  </div>
</template>


<script>
import { showLoading, hideLoading } from '@/views/course/loading';
import pageLoading from '../course/loading.css'
export default {
  data() {
    return {
      examSchedules: [],
      examSchedule: {},
      examApplication:{
        courseId:null,
        type:"",
      },
      show:false,
      courses:[],
    }
  },
  mounted() {
    this.getAllExamSchedule();
    this.getAllCourse();
  },
  methods:{
    //查询考试安排
    getAllExamSchedule(){
      this.$axios.get("http://localhost:8081/examination/get/all/")
        .then(res=>{
          if (res.data.code==200){
            this.examSchedules = res.data.data;
          }
        })
    },
    //查询所有课程
    getAllCourse() {
      this.$axios
        .get("http://localhost:8081/examination/getAllCourse/")
        .then(res => {
          this.courses = res.data.data;
        });
    },

    //取消时清空表单
    resetForm() {
      this.$message({
        message: "取消成功！",
        type: "success",
      });
      this.show = false;
      this.$refs["examApplication"].resetFields();
      this.examApplication = {courseId: null};
    },

    //添加申请操作
    onSubmit() {
    this.$axios
      .post("http://localhost:8081/examination/addExamApplication/" , this.examApplication)
      .then((resp) => {
        if (resp.data.code == 200) {
          this.$message({
            message: "申请成功，请等待审批！",
            type: "success",
          });
        }else {
          this.$message({
            message: "申请失败，请稍后重试！",
            type: "error",
          });
        }
      });
      //清空表单
      this.examApplication = {courseId: null};
      this.show = false;
    },
  }
}
</script>

<style scoped>
.dialog-container {
  width: 60%;
  margin: 50px auto;
}

.dialog-background {
  background-color: #f5f7fa;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  padding: 20px;
}

.form-container {
  margin-top: 20px;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

.btn {
  margin-left: 10px;
}
</style>

