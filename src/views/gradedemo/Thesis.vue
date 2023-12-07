<template>
  <div>

    <!-- 列表展示 -->
    <div>
      <el-table border :data="ThesisManagementVO" style="width: 100%">
        <el-table-column
          prop="thesisId"
          label="课题编号"
          width="170"
          sortable
        >
       </el-table-column>
        <el-table-column prop="thesisTitle" label="课题" width="120" sortable>
        </el-table-column>

         
        <el-table-column
          prop="tname"
          label="导师"
          width="120"
          sortable
        >
        </el-table-column>
       

        <el-table-column
          prop="status"
          label="进度"
          width="100"
          sortable
        >
          <template slot-scope="scope">
            <span v-if="scope.row.status === 1" 
              >开题</span
            >
            <span v-else-if="scope.row.status === 2" >初期检查</span>
             <span v-else-if="scope.row.status === 3" >中期检查</span>
              <span v-else-if="scope.row.status === 4" >初稿</span>
               <span v-else-if="scope.row.status === 5" >终稿</span>
          </template>
        </el-table-column>
        
      </el-table>
     
    </div>
        <el-progress :text-inside="true" :stroke-width="24" :percentage="thmVO" status="success"></el-progress>
    <div>
       
    </div>


  </div>
</template>

<script>
export default {
 data() {
    return {
    ThesisManagementVO:[],
    thmVO:0,
    };
  },
  created() {
    this.selectThesisByStudentId();
  },
  methods: {
    selectThesisByStudentId(){
       this.$axios
        .get("http://localhost:1001/schoolroll/selectThesisByStudentId")
        .then((resp) => {
          if (resp.data.code == 200) {
            this.ThesisManagementVO.push(resp.data.data);
            this.thmVO=resp.data.data.status*20;
          } else {
             this.$message({
              message: resp.data.data,
              type: "error",
          });
          }
        });
    },
  },
}
</script>

<style>

</style>