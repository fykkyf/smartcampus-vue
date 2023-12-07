<template>
  <div style="padding: 10px">
    <el-button type="primary" style="margin-left: 5px" @click="gopay"
      >前往缴费</el-button
    >
    <el-table stripe :data="tableData" border style="width: 100%">
      <el-table-column label="学号" prop="studentId" />
      <el-table-column label="饭卡号" prop="cardId" />
      <el-table-column label="饭卡余额" prop="cardBalance" />
      <el-table-column label="状态" prop="status" />
      <el-table-column label="操作">
        <template v-slot="scope">
          <el-button
            @click="pay(scope.row)"
            type="primary"
            size="mini"
            v-if="scope.row.status === '启用'"
            >充值</el-button
          >
          <el-popconfirm
            title="确定挂失吗？"
            @confirm="lost(scope.row)"
            v-if="scope.row.status === '启用'"
          >
            <template #reference>
              <el-button size="mini" type="danger">挂失</el-button>
            </template>
          </el-popconfirm>
          <el-button
            @click="reissue(scope.row)"
            type="primary"
            size="mini"
            v-if="scope.row.status === '挂失'"
            >补办</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-button type="primary" style="margin-left: 5px" @click="goback"
      >返回</el-button
    >
    <el-dialog title="充值框" :visible.sync="dialogVisible" width="30%">
      <el-form :model="form" label-width="120px">
        <el-form-item label="金额">
          <el-input v-model="form.amount" style="width: 50%"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="payNo">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      dialogVisible: false,
      form: {
        cardId: "",
        type: "",
      },
    };
  },
  created() {
    this.load();
  },
  methods: {
    load() {
      this.$axios.get("http://localhost:8080/live/getCardMoney").then((res) => {
        if (res.data.code == 200) {
          console.log("-----------------");
          this.tableData = res.data.data;
        }
      });
    },
    pay(row) {
      this.dialogVisible = true;
      this.form.cardId = row.cardId;
    },
    payNo() {
      this.form.type = "饭卡";
      console.log(this.form);
      this.$axios
        .post("http://localhost:8080/live/insert", this.form)
        .then((res) => {
          if (res.data.code == 200) {
            this.$message({
              message: "请前往缴费",
              type: "success",
            });
            this.dialogVisible = false;
          }
        });
    },
    gopay() {
      this.$router.push("/ricepay");
    },
    lost(row) {
      this.$axios.post("http://localhost:8080/live/lost", row).then((res) => {
        if (res.data.code == 200) {
          this.$message({
            message: "挂失成功",
            type: "success",
          });
          this.load();
        }
      });
    },
    reissue(row) {
      this.$confirm("补办将从饭卡扣20元", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$axios
            .post("http://localhost:8080/live/reissue", row)
            .then((res) => {
              if (res.data.code == 200) {
                this.$message({
                  message: "补办成功",
                  type: "success",
                });
                this.load();
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消补办",
          });
        });
    },
    goback(){
      this.$router.push("/livingroom");
    }
    // reissue(row) {
    //     this.$axios.post("http://localhost:8080/live/reissue", row).then((res) => {
    //     if (res.data.code == 200) {
    //       this.$message({
    //         message: "补办成功",
    //         type: "success",
    //       });
    //       this.load();
    //     }
    //   });
    // },
  },
};
</script>

<style>
</style>