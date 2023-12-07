<template>
<div>
  <!-- 列表展示 -->
  <div>
    <el-table border :data="StudentVO" style="width: 100%">

      <el-table-column prop="studentId" label="学号" width="170" >
      </el-table-column>
      <el-table-column prop="studentName" label="姓名" width="170" >
      </el-table-column>
      <el-table-column prop="gender" label="性别" width="80" >
            <template slot-scope="scope">
               {{ scope.row.gender === 1 ? '男' : '女' }}
                        </template>
          </el-table-column>
      <el-table-column prop="age" label="年龄" width="170" >
      </el-table-column>
      <el-table-column prop="name" label="专业" width="170" >
      </el-table-column>
        <el-table-column prop="email" label="邮箱" width="170" >
      </el-table-column>
        <el-table-column
          prop="confirmationInfor"
          label="确认状态"
          width="100"
          
        >
          <template slot-scope="scope">
            <span v-if="scope.row.confirmationInfor === 1" 
            style="color: red"
              >未确认</span
            >
            <span v-else-if="scope.row.confirmationInfor === 2" >已确认</span>
          </template>
        </el-table-column>
      <el-table-column label="操作">
  <template slot-scope="scope">
    <el-button type="success" size="small"
      :disabled="scope.row.confirmationInfor === 2"
      @click="toupdateConfirmationInfor=true">确认信息</el-button>
  </template>
</el-table-column>
    </el-table>
  </div>

  <!-- 毕业生信息确认表 -->
  <div>
     <el-dialog title="核对完毕，请确认信息！" :visible.sync="toupdateConfirmationInfor">
        <el-form ref="form"  label-width="100px">

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="toupdateConfirmationInfor=false">取 消</el-button>
          <el-button type="success" @click="updateConfirmationInfor">确 认</el-button>

        </div>
      </el-dialog>
  </div>


</div>  

</template>

<script>
export default {
  data() {
    return {
      StudentVO: [],
      StudentDTO:{},
      toupdateConfirmationInfor:false,
    };
  },
  created() {
    this.selectGradeByStuId();
  },
  methods: {
    selectGradeByStuId() {
      this.$axios
        .get("http://localhost:1001/schoolroll/selectStudentAll")
        .then((resp) => {
          if (resp.data.code == 200) {
            this.StudentVO.push(resp.data.data);
            console.log(this.StudentVO);
          } else {
            this.$message({
              message: resp.data.data,
              type: "error",
            });
          }
        });
    },
     updateConfirmationInfor() {
      this.$axios
        .get("http://localhost:1001/schoolroll/updateConfirmationInfor")
        .then((resp) => {
          if (resp.data.code == 200) {
           this.$message({
              message: "信息核对完成！",
              type: "success",
            });
            this.StudentVO=[];
            this.toupdateConfirmationInfor=false;
             this.selectGradeByStuId();
          } else {
            this.$message({
              message: resp.data.data,
              type: "error",
            });
             this.StudentVO=[];
            this.toupdateConfirmationInfor=false;
             this.selectGradeByStuId();
          }
        });
    },
  },
};
</script>

<style>
</style>