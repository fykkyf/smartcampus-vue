<template>
  <div>

    
      <div>
        <el-form ref="form" :model="StudentDTO">
          <el-col :span="5">
            <el-form-item label="学年">
              <div class="block">
                <el-date-picker
                  v-model="StudentDTO.minAcademicYear"
                  type="year"
                  placeholder="选择学年"
                >
                </el-date-picker>
              </div>
            </el-form-item>
          </el-col>

          <el-col :span="4">
            <el-form-item >
              <div class="block">
                <el-date-picker
                  v-model="StudentDTO.maxAcademicYear"
                  type="year"
                  placeholder="选择学年"
                >
                </el-date-picker>
              </div>
            </el-form-item>
          </el-col>

          <el-col :span="5">
            <el-form-item label="学期">
            <el-radio v-model="StudentDTO.semester" label="1"
              >上半学期</el-radio
            >
            <el-radio v-model="StudentDTO.semester" label="2"
              >下半学期</el-radio
            >
          </el-form-item>
          </el-col>

           <el-col :span="4">
           <el-button
              type="primary"
              icon="el-icon-search"
              @click="selectGradeByStuId"
              >查询</el-button
            >
             </el-col>

        </el-form>
      </div>

  <!-- 列表展示 -->
    <div>
      <el-table border :data="GradeVO" style="width: 100%">
        <el-table-column
          prop="courseName"
          label="课程名称"
          width="170"
          sortable
        >
        </el-table-column>
         <el-table-column prop="gradePoint" label="绩点" width="120" sortable>
        </el-table-column>
        <el-table-column
          prop="regularGrade"
          label="平时成绩"
          width="120"
          sortable
        >
        </el-table-column>
        <el-table-column prop="finalGrade" label="期末成绩" width="120" sortable>
        </el-table-column>
        <el-table-column prop="overallGrade" label="最终成绩" width="120" sortable>
        </el-table-column>
       

        <el-table-column
          prop="gradeStatus"
          label="状态"
          width="100"
          sortable
        >
          <template slot-scope="scope">
            <span v-if="scope.row.overallGrade >=60" 
              >及格</span
            >
            <span v-else-if="scope.row.overallGrade ==null" >暂无数据</span>
             <span v-else-if="scope.row.overallGrade <60" style="color: red">不及格</span>
           
          </template>
        </el-table-column>
       
      </el-table>
    </div>

    
  </div>
</template>

<script>
export default {
  data() {
    return {
      StudentDTO: {},
      GradeVO:[],
    };
  },
  created() {},
  methods: {
    selectGradeByStuId(){
       this.$axios
        .post("http://localhost:1001/grade/selectGradeByStuId", this.StudentDTO)
        .then((resp) => {
          if (resp.data.code == 200) {
            this.GradeVO = resp.data.data;
          } else {
             this.$message({
              message: resp.data.data,
              type: "error",
          });
          }
        });
    }
  },
};
</script>

<style>
</style>
