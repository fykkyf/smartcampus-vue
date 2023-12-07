<template>
  <div style="padding: 10px">
    <el-button type="primary" style="margin-left: 5px" @click="lookrice"
      >查看饭卡</el-button
    >
    <el-button type="primary" style="margin-left: 5px" @click="lookmoney"
      >水电费查询</el-button
    >
    <el-button type="primary" style="margin-left: 5px" @click="lookbed"
      >查看寝室账单</el-button
    >
        <el-table stripe :data="tableData" border style="width: 100%"  v-if="showTable1">
          <el-table-column label="寝室ID" prop="bedroomId" />
          <el-table-column label="电费" prop="electricityBalance" />
          <el-table-column label="水费" prop="waterBalance" />
          <el-table-column label="操作">
            <template v-slot="scope">
              <el-button @click="pay(scope.row)" type="primary" size="mini"
                >充值</el-button
              >
            </template>
          </el-table-column>
        </el-table>

      
        <el-table stripe :data="tableDataa" border style="width: 100%"  v-if="showTable2">
          <el-table-column label="订单ID" prop="id" />
          <el-table-column label="支付宝单号" prop="alipayNo" />
          <el-table-column label="寝室ID" prop="bedroomId" />
          <el-table-column label="类型" prop="type" />
          <el-table-column label="金额" prop="amount" />
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

    <el-dialog title="充值框" :visible.sync="dialogVisible" width="30%">
      <el-form :model="form" label-width="120px">
        <el-form-item label="请选择">
          <el-select v-model="form.type" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
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
      tableDataa: [],
      dialogVisible: false,
      form: {
        bedroomId: "",
        type: "",
      },
      options: [
        { value: "水费", label: "水费" },
        { value: "电费", label: "电费" },
      ],
      showTable1: false,  
      showTable2: false, 
    };
  },
  created() {
    this.load();
    this.loadd();
  },
  methods: {
    load() {
      this.$axios.get("http://localhost:8080/live/lookToRoom").then((res) => {
        if (res.data.code == 200) {
          console.log("-----------------");
          this.tableData = res.data.data;
        }
      });
    },
    loadd() {
      this.$axios.get("http://localhost:8080/live/getLive").then((res) => {
        if (res.data.code == 200) {
          console.log("-----------------");
          this.tableDataa = res.data.data;
        }
      });
    },

    pay(row) {
      this.dialogVisible = true;
      this.form.bedroomId = row.bedroomId;
    },
    payNo() {
      console.log(this.form);
      this.$axios
        .post("http://localhost:8080/live/insert", this.form)
        .then((res) => {
          if (res.data.code == 200) {
            this.$message({
              message: "请前往缴费",
              type: "success",
            });
            this.loadd();
            this.dialogVisible = false;
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
          "http://localhost:8081/livingroom"
      );
      this.$message.success("请求支付宝成功");
      this.load();
    },
    lookmoney(){
      this.showTable1 = true;  
      this.showTable2 = false;  
    },
    lookbed() {
      this.showTable1 = false;  
      this.showTable2 = true;  
    },
    lookrice() {
      this.$router.push("/rice")
    },
  },
};
</script>

<style>
.table-container {
  margin-bottom: 100px; /* 根据需要调整间距大小 */
}

body {
  background-image: url(D:\vscode\code\web04code\stage04-smartcampus-vue\src\views\pay\background\庄严.jpg);
  background-size: cover;
}
</style>