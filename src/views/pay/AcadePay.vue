<template>
  <div style="padding: 10px">
        <el-table stripe :data="tableData" border style="width: 100%" >
          <el-table-column label="订单ID" prop="id" />
          <el-table-column label="支付宝单号" prop="alipayNo" />
          <el-table-column label="学生ID" prop="studentId" />
          <el-table-column label="类型" prop="type" />
          <el-table-column label="选修课ID" prop="electiveCourseId" />
          <el-table-column label="重修课ID" prop="reId" />
          <el-table-column label="金额" prop="amount" />
          <el-table-column label="生成时间" prop="createTime" />
          <el-table-column label="支付时间" prop="payTime" />
          <el-table-column label="状态" prop="status" />
          <el-table-column label="操作">
            <template v-slot="scope">
              <el-button
                @click="payYes(scope.row)"
                type="primary"
                size="mini"
                v-if="scope.row.status === '未缴费'"
                >支付</el-button
              >
            </template>
          </el-table-column>
        </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
    };
  },
  created() {
    this.load();
  },
  methods: {
    load() {
      this.$axios.get("http://localhost:8080/academicPayment/get").then((res) => {
        if (res.data.code == 200) {
          console.log("-----------------");
          this.tableData = res.data.data;
        }
      });
    },
    payYes(row) {
      window.open(
        "http://localhost:8080/alipay/pay?subject=" +
          row.type +
          "&traceNo=" +
          row.id +
          "&totalAmount=" +
          row.amount +
          "&returnUrl=" + 
          "http://localhost:8081/acadepay"
      );
      this.$message.success("请求支付宝成功");
      this.load();
    },
  },
};
</script>

<style>
/* body {
  background-image: url(D:\vscode\code\web04code\stage04-smartcampus-vue\src\views\pay\background\人民大会堂.jpg);
  background-size: cover;
} */

</style>