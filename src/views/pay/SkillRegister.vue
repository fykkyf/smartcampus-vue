<template>
  <div style="padding: 10px">
    <div style="margin: 10px 0">
      <el-input
        v-model="search"
        placeholder="请输入技能考试名称关键字"
        style="width: 20%"
        clearable
      ></el-input>
      <el-button type="primary" style="margin-left: 5px" @click="load"
        >查询</el-button
      >
    </div>
    <el-button type="primary" style="margin-left: 5px" @click="gopay"
      >前往缴费</el-button
    >
    <el-table
      v-loading="loading"
      :data="tableData"
      border
      stripe
      style="width: 100%"
    >
      <el-table-column width="70" prop="id" label="ID" sortable>
      </el-table-column>
      <el-table-column width="150" prop="name" label="技能考试名称">
      </el-table-column>
      <el-table-column width="160" prop="amount" label="价格">
      </el-table-column>
      <el-table-column prop="time" label="考试时间"> </el-table-column>
      <el-table-column prop="place" label="考试地点"> </el-table-column>
      <el-table-column prop="quantity" label="名额"> </el-table-column>
      <el-table-column label="操作">
        <template v-slot="scope">
          <el-button
            @click="register(scope.row)"
            type="primary"
            size="small"
            v-if="scope.row.status === 1"
            >报名</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <div style="margin: 10px 0">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[1, 5, 10, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
    
    <el-dialog title="输入框" :visible.sync="dialogVisible" width="30%">
        <el-form :model="form" label-width="120px">
          <el-form-item label="学号">
            <el-input v-model="form.studentId" style="width: 80%"></el-input>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="registerYes">确 定</el-button>
          </span>
        </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading:true,
      tableData: [],
      form:{
        studentId:''
      },
      dialogVisible:false,
      search:'',
      currentPage:1,
      total:0,
      pageSize:5
    };
  },
  created() {
    this.load();
  },
  methods: {
    load() {
      this.loading=false
      this.$axios.get("http://localhost:8080/skill/getAll",{
        params:{
          pageNum:this.currentPage,
          pageSize:this.pageSize,
          search:this.search
        }
      }).then((res) => {
        if (res.data.code == 200) {
          console.log("-----------------");
          this.tableData = res.data.data.records;
          this.total=res.data.data.total
          console.log(res.data.data.records)
        }
      });
    },
    gopay(){
      this.$router.push("/skillpay")
    },
    register(row){
      this.form.studentId=""
      this.form=row;
      console.log(this.form)
      this.dialogVisible=true;
    },
    registerYes(){
      this.$axios.post("http://localhost:8080/skill/decide",this.form).then(res=>{
        if(res.data.code==200){
          this.$message({
            message:"报名成功",
            type:"success"
          })
          this.load();
          this.dialogVisible=false;
        }else if(res.data.code==409){
          this.$message({
            message:"请本人参与报名",
            type:"error"
          })
        }else if(res.data.code==408){
          this.$message({
            message:"请先通过英语四级考试",
            type:"error"
          })
        }else if(res.data.code==407){
          this.$message({
            message:"已报过名，请勿重复报名",
            type:"error"
          })
        }
      })
    },
    handleSizeChange(pageSize){
      this.pageSize = pageSize
      this.load()
    },
    handleCurrentChange(pageNum){
      this.currentPage = pageNum
      this.load()
    }
  },
};
</script>

<style>
</style>