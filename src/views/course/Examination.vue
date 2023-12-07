<template>
  <div class="container">
    <el-divider><i class="el-icon-sunny"></i>人丑就要多读书<i class="el-icon-sunny"></i></el-divider>
    <div class="section">
      <el-card class="box-card">
        <div class="section" style="padding-right: 1300px">
          <el-button type="primary"  @click="show=true" >缓考免考申请</el-button>
        </div>
      </el-card>
    </div>

    <el-divider><i class="el-icon-sunny"></i>人丑就要多读书<i class="el-icon-sunny"></i></el-divider>
    <el-card class="box-card">
      <div class="section">
        <el-table :data="examSchedules" border :cell-style="{ textAlign: 'center' }" :header-cell-style="{ textAlign: 'center' }">
          <el-table-column prop="examScheduleId" label="考试编号" ></el-table-column>
          <el-table-column prop="examTime" label="考试时间" ></el-table-column>
          <el-table-column prop="classRoom" label="考试教室" ></el-table-column>
          <el-table-column prop="courseName" label="课程" ></el-table-column>
          <el-table-column prop="academicYear" label="学年" ></el-table-column>
          <el-table-column prop="semester" label="学期" ></el-table-column>
        </el-table>
      </div>
    </el-card>

  <!--缓考免考申请-->
    <div>
      <el-dialog title="申请表" :visible.sync="show" class="dialog-container">
        <div class="dialog-background">
          <el-form ref="examApplication" :model="examApplication" label-width="80px" class="form-container">
            <el-form-item label="课程名称" prop="course">
              <el-select v-model="examApplication.courseId" placeholder="请选择课程">
                <el-option v-for="c in courses" :key="c.courseId" :label="c.courseName" :value="c.courseId"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="类型" prop="type">
              <el-select v-model="examApplication.type" placeholder="类型" clearable>
                <el-option label="缓考" value="1"></el-option>
                <el-option label="免考" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="resetForm()" class="btn btn-primary">取 消</el-button>
            <el-button type="primary" @click="onSubmit()" class="btn btn-success">确 定</el-button>
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

