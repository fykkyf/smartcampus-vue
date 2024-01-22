<template>
  <div class="container">
      <div style="padding-right: 1400px">
    <button class="niceButton5" @click="toSelectElectiveCourse()"><span>Return</span></button>
      </div>
    <el-divider><i class="el-icon-sunny"></i>Believe you can and you're halfway there.<i class="el-icon-sunny"></i></el-divider>
    <el-card class="box-card">
      <div class="section">
        <el-table :data="electiveCourses" border :cell-style="{ textAlign: 'center' }" :header-cell-style="{ textAlign: 'center' }">
          <el-table-column prop="id" label="ID"></el-table-column>
          <el-table-column prop="alipayNo" label="Order#"></el-table-column>
          <el-table-column prop="type" label="Type"></el-table-column>
          <el-table-column prop="amount" label="Amount"></el-table-column>
          <el-table-column prop="createTime" label="Order Date"></el-table-column>
          <el-table-column prop="payTime" label="Paid Date"></el-table-column>
          <el-table-column prop="status" label="Status"></el-table-column>
          <el-table-column label="Operations" width="200" fixed="right">
            <template slot-scope="scope">
              <div v-if="scope.row.status === 'Paid'">
                <el-button size="mini" type="text" @click="pay(scope.row)" disabled>Pay</el-button>
              </div>
              <div v-else>
                <el-button size="mini" type="text" @click="pay(scope.row)">Pay</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>

  </div>
</template>


<script>
import { showLoading, hideLoading } from '@/views/course/loading';
import pageLoading from '../course/loading.css'
export default {
  data() {
    return {
      electiveCourses: [],
      examSchedule: {},
    }
  },
  mounted() {
    this.getAllElectiveCoursePay();
  },
  methods:{
    toSelectElectiveCourse(){
      this.$router.push({
        name: "selectElectiveCourse",
        params:'',
      })
    },
    pay(row){
      window.open("http://localhost:8081/alipay/pay?subject="+row.type+"&traceNo="+row.id+"&totalAmount=" + row.amount)
    },
    //查询所有选择的选修课
    getAllElectiveCoursePay(){
      this.$axios.get("http://localhost:8081/selectelectivecourse/get/allElectiveCoursePay/")
        .then(res=>{
          if (res.data.code==200){
            this.electiveCourses = res.data.data;
          }
        })
    },
  }
}
</script>

<style scoped>
.dialog-container {
  width: 60%;
  margin: 50px auto;
}

.dialog-background {
  background-color: #f5f7fa;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  padding: 20px;
}

.form-container {
  margin-top: 20px;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

.btn {
  margin-left: 10px;
}
/* 悬停添加箭头图标 */
.niceButton5 {
    display: inline-block;
    border-radius: 20px;
    background-color: #f4511e;
    border: none;
    color: #ffff;
    text-align: center;
    font-size: 14px; /* 修改为原来的一半 */
    font-weight: 400;
    padding: 7px; /* 修改为原来的一半 */
    width: 100px; /* 修改为原来的一半 */
    transition: all 0.5s;
    cursor: pointer;
    margin: 5px;
    vertical-align: middle;
}
.niceButton5 span {
    cursor: pointer;
    display: inline-block;
    position: relative;
    transition: 0.5s;
}
.niceButton5 span::before {
    content: "<";
    position: absolute;
    opacity: 0;
    top: 0;
    left: -25px; /* 修改为原来的一半 */
    transition: 0.5s;
}
.niceButton5:hover span {
    padding-left: 40px; /* 修改为原来的一半 */
}
.niceButton5:hover span::before {
    opacity: 1;
    left: 0;
}


</style>

