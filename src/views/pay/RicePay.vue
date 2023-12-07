<template>
  <div style="padding: 10px">      
        <el-table stripe :data="tableData" border style="width: 100%" >
          <el-table-column label="订单ID" prop="id" />
          <el-table-column label="支付宝单号" prop="alipayNo" />
          <el-table-column label="饭卡号" prop="cardId" />
          <el-table-column label="类型" prop="type" />
          <el-table-column label="充值金额" prop="amount" />
          <el-table-column label="充值时间" prop="payTime" />
          <el-table-column label="操作">
            <template v-slot="scope">
              <el-button
                @click="payYes(scope.row)"
                type="primary"
                size="mini"
                v-if="scope.row.payTime === null"
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
      this.$axios.get("http://localhost:8080/live/getCard").then((res) => {
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
          "http://localhost:8081/ricepay"
      );
      this.$message.success("请求支付宝成功");
      this.load();
    },
  },
};
</script>

<style>

</style>