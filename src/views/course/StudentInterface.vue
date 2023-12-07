<template>
  <div>
    <el-form>
      <el-form-item>
        姓名：{{student.name}}
      </el-form-item>
      <el-form-item>
        年龄：{{student.name}}
      </el-form-item>
      <el-form-item>
        性别：{{student.name}}
      </el-form-item>
      <el-form-item>
        电话：{{student.name}}
      </el-form-item>
      <el-form-item>
         邮箱：{{student.name}}
      </el-form-item>
      <el-form-item>
        入学时间：{{student.name}}
      </el-form-item>
      <el-form-item>
        专业：{{student.name}}
      </el-form-item>
      <el-form-item>
        宿舍：{{student.name}}
      </el-form-item>
    </el-form>
  </div>

</template>

<script>

export default {
  data() {
    return {
      student:{},
    }
  },
  mounted() {

  },
  methods: {
    //查询学生信息
    getStudent(){
      this.$axios.get("http://localhost:8081/student/get")
        .then(res=>{
          if (res.data.code==200){
            this.student = res.data.data;
          }
        })
    },
  }
}
</script>

<style>

</style>
