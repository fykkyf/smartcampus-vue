<template>
  <div>

   <div>
     <el-form ref="form" :model="SchoolRollDTO" >
      <el-col :span="6">
          <el-form-item label="开始日期">
            <el-date-picker
              v-model="SchoolRollDTO.minSubmissionTime"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="申请日期"
              
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="截止日期">
            <el-date-picker
              v-model="SchoolRollDTO.maxSubmissionTime"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="申请日期"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
    <el-col :span="6">
    <el-form-item label="申请类型:">
      <el-select
        v-model="SchoolRollDTO.type"
        clearable
        placeholder="请选择类型"
      >
        <el-option label="在读" value="1"></el-option>
        <el-option label="退学" value="2"></el-option>
        <el-option label="休学" value="3"></el-option>
        <el-option label="毕业" value="4"></el-option>
      </el-select>
    </el-form-item>
    </el-col>
     <el-col :span="3">
          <el-form-item label="">
            <el-button
              type="primary"
              icon="el-icon-search"
              @click="selectSchoolRollBy"
              >查询</el-button
            >
          </el-form-item>
        </el-col>
        <el-col :span="3">
        <el-button
              type="success"
              plain
              class="el-icon-circle-plus-outline"
               @click="toaddSchoolRollStaus=true"
              >提交申请</el-button
            >
            </el-col>
    </el-form>
   </div>

   <div>
    <!-- 列表展示 -->
    <div>
      <el-table border :data="SchoolRollVO" style="width: 100%">

           <el-table-column
          prop="gradeStatus"
          label="申请类型"
          width="170"
          sortable
        >
          <template slot-scope="scope">
            <span v-if="scope.row.type === 1" >在读</span>
            <span v-else-if="scope.row.type === 2" >退学</span>
            <span v-else-if="scope.row.type === 3" >休学</span>
            <span v-else-if="scope.row.type === 4" >毕业</span>
          </template>
        </el-table-column>

        <el-table-column
          prop="status"
          label="审批状态"
          width="170"
          sortable
        >
         <template slot-scope="scope">
            <span v-if="scope.row.status === 1"  style="color: red">待审批</span >
            <span v-else-if="scope.row.status === 2" style="color: green">已审批</span>
          </template>
        </el-table-column>

        <el-table-column
          prop="submissionTime"
          label="提交日期"
          width="200"
          sortable
        >
        </el-table-column>
        <el-table-column prop="approvalTime" label="审批日期" width="200" sortable>
        </el-table-column>  
       
      </el-table>

      

    </div>
   </div>
   
   <!-- 添加申请弹出框 -->
   <div>
      <el-dialog title="申请信息" :visible.sync="toaddSchoolRollStaus">
          <el-form ref="form" :model="SchoolRollStaus"  label-width="100px">

                <el-form-item label="申请类型" prop="type">
                 <el-select v-model="SchoolRollStaus.type" clearable  placeholder="请选择类型"
                                   >
                                    <el-option label="在读" value=1></el-option>
                                    <el-option label="退学" value=2></el-option>
                                    <el-option label="休学" value=3></el-option>
                                    <el-option label="毕业" value=4></el-option>
                                </el-select>
              </el-form-item>
              
          </el-form>
          <div slot="footer" class="dialog-footer">
             <el-button @click="cancel" >取 消</el-button>
              <el-button type="primary" @click="addSchoolRollStaus('form')">确 定</el-button>
              
          </div>
      </el-dialog>
   </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      SchoolRollDTO:{},
      SchoolRollVO:[],
      SchoolRollStaus:{},
      toaddSchoolRollStaus:false,
    };
  },
  created() {},
  methods: {
    cancel(){
       this. toaddSchoolRollStaus=false;
       this.SchoolRollStaus={};
    },
        selectSchoolRollBy(){
       this.$axios
        .post("http://localhost:1001/schoolroll/selectSchoolRollBy", this.SchoolRollDTO)
        .then((resp) => {
          if (resp.data.code == 200) {
            this.SchoolRollVO = resp.data.data;
          } else {
             this.$message({
              message: resp.data.data,
              type: "error",
          });
          }
        });
    },
      addSchoolRollStaus(){
       this.$axios
        .post("http://localhost:1001/schoolroll/addSchoolRollStaus", this.SchoolRollStaus)
        .then((resp) => {
          if (resp.data.code == 200) {
             this.$message({
              message: "提交成功！",
              type: "success",
          });
           this.SchoolRollStaus={};
           this. toaddSchoolRollStaus=false;
           this.selectSchoolRollBy();
          } else {
             this.$message({
              message: resp.data.data,
              type: "error",
          });
           this.SchoolRollStaus={};
          }
        });
    },
  },
};
</script>

<style>
</style>
