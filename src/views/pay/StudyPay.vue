<template>
  <div style="padding: 10px">      
        <el-table stripe :data="tableData" border style="width: 100%" >
          <el-table-column label="订单ID" prop="id" />
          <el-table-column label="支付宝单号" prop="alipayNo" />
          <el-table-column label="学号" prop="studentId" />
          <el-table-column label="学时费" prop="tuitionFee" />
          <el-table-column label="教材费" prop="textbookFee" />
          <el-table-column label="住宿费" prop="accommodationFee" />
          <el-table-column label="总金额" prop="amount" />
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
      this.$axios.get("http://localhost:8080/tuitionFee/getAll").then((res) => {
        if (res.data.code == 200) {
          console.log("-----------------");
          this.tableData = res.data.data;
        }
      });
    },
    payYes(row) {
      window.open(
        "http://localhost:8080/alipay/pay?subject=" +
          '学费' +
          "&traceNo=" +
          row.id +
          "&totalAmount=" +
          row.amount +
          "&returnUrl=" + 
          "http://localhost:8081/studypay"
      );
      this.$message.success("请求支付宝成功");
      this.load();
    },
  },
};
</script>

<style>

</style>