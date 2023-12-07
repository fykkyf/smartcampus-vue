<template>
  <div style="padding: 10px">
    <el-table stripe :data="tableData">
      <el-table-column label="订单编号" prop="id" />
      <el-table-column label="支付宝订单号" prop="alipayNo" />
      <el-table-column label="名称" prop="type" />
      <el-table-column label="支付金额" prop="amount" />
      <el-table-column label="创建时间" prop="createTime" />
      <el-table-column label="支付时间" prop="payTime" />
      <el-table-column label="订单状态" prop="status" />
      <el-table-column label="操作">
        <template v-slot="scope">
          <el-button
            @click="pay(scope.row)"
            type="primary"
            size="mini"
            v-if="scope.row.status === '未缴费'"
            >支付</el-button
          >
          <el-popconfirm title="确定取消吗？" @confirm="cancel(scope.row)" v-if="scope.row.status === '未缴费'">
            <template #reference>
              <el-button size="mini" type="danger">取消</el-button>
            </template>
          </el-popconfirm>
          <el-button
            @click="look(scope.row)"
            type="danger"
            size="small"
            v-if="scope.row.status === '已缴费'"
            >查看准考证</el-button
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

    <el-dialog title="准考证" :visible.sync="dialogVisible" width="30%">
      <el-form :model="form" label-width="120px">
        <el-form-item label="考生准考证号">
          <el-input
            v-model="form.testId"
            readonly
            style="width: 80%"
          ></el-input>
        </el-form-item>
        <el-form-item label="考生姓名">
          <el-input
            v-model="form.studentName"
            readonly
            style="width: 80%"
          ></el-input>
        </el-form-item>
        <el-form-item label="考生年龄">
          <el-input v-model="form.age" readonly style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="考生性别">
          <el-input
            v-model="form.gender"
            readonly
            style="width: 80%"
          ></el-input>
        </el-form-item>
        <el-form-item label="电话号码">
          <el-input
            v-model="form.phoneNumber"
            readonly
            style="width: 80%"
          ></el-input>
        </el-form-item>
        <el-form-item label="考试名称">
          <el-input
            v-model="form.skillName"
            readonly
            style="width: 80%"
          ></el-input>
        </el-form-item>
        <el-form-item label="考试时间">
          <el-input
            v-model="form.skillTime"
            readonly
            style="width: 80%"
          ></el-input>
        </el-form-item>
        <el-form-item label="考试地点">
          <el-input
            v-model="form.skillPlace"
            readonly
            style="width: 80%"
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="pdfBtn">导 出</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- <el-dialog title="准考证" :visible.sync="dialogVisible" width="30%">
        <el-form :model="form" label-width="120px">
          <el-form-item label="考生准考证号">
            <el-input v-model="form.testId" readonly style="width: 80%"></el-input>
          </el-form-item>
          <el-form-item label="考生姓名">
            <el-input v-model="form.studentName" readonly style="width: 80%"></el-input>
          </el-form-item>
          <el-form-item label="考生年龄">
            <el-input v-model="form.age" readonly style="width: 80%"></el-input>
          </el-form-item>
          <el-form-item label="考生性别">
            <el-input v-model="form.gender" readonly style="width: 80%"></el-input>
          </el-form-item>
          <el-form-item label="电话号码">
            <el-input v-model="form.phoneNumber" readonly style="width: 80%"></el-input>
          </el-form-item>
          <el-form-item label="考试名称">
            <el-input v-model="form.skillName" readonly style="width: 80%"></el-input>
          </el-form-item>
          <el-form-item label="考试时间">
            <el-input v-model="form.skillTime" readonly style="width: 80%"></el-input>
          </el-form-item>
          <el-form-item label="考试地点">
            <el-input v-model="form.skillPlace" readonly style="width: 80%"></el-input>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="exportFormToPDF">导 出</el-button>
          </span>
        </template>
      </el-dialog> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPage:1,
      total:0,
      pageSize:5,
      tableData: [],
      dialogVisible: false,
      form: {}
    };
  },
  created() {
    this.load();
  },
  methods: {
    load() {
      this.$axios.get("http://localhost:8080/skill/getMoney",{
        params:{
          pageNum:this.currentPage,
          pageSize:this.pageSize
        }
      }).then((res) => {
        if (res.data.code == 200) {
          console.log("-----------------");
          this.tableData = res.data.data.records;
          this.total=res.data.data.total
        }
      });
    },
    pay(row) {
      window.open(
        "http://localhost:8080/alipay/pay?subject=" +
          row.type +
          "&traceNo=" +
          row.id +
          "&totalAmount=" +
          row.amount +
          "&returnUrl=" + 
          "http://localhost:8081/skillpay"
      );
      this.$message.success("请求支付宝成功");
      this.load();
    },
    cancel(row) {
      this.$axios
        .post("http://localhost:8080/skill/cancel", row)
        .then((res) => {
          if (res.data.code == 200) {
            this.$message({
              message: "取消成功",
              type: "success",
            });
            this.load();
          }
        });
    },
    look(row) {
      console.log(row);
      this.$axios.post("http://localhost:8080/skill/look", row).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.data;
        }
      });
      this.dialogVisible = true;
    },
    pdfBtn(){
      console.log(this.form)
      this.$axios.post("http://localhost:8080/skill/export", this.form).then((res) => {
        if (res.data.code == 200) {
          this.$message({
            message:"导出成功",
            type:"success"
          })
          this.dialogVisible=false;
        }
      });
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