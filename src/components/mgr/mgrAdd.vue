<template>
    <div class="mgrAdd">
      <el-dialog title="添加用户" :visible.sync="thisType" @close="fun('mgrAdd')">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="账户">
            <el-input v-model="form.account"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="form.password"></el-input>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="生日">
            <el-col :span="11">
              <el-date-picker type="date" placeholder="选择日期" v-model="form.birthday" style="width: 100%;"></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio-group v-model="form.sex">
              <el-radio label="1">男</el-radio>
              <el-radio label="2">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="form.email"></el-input>
          </el-form-item>
          <el-form-item label="电话">
            <el-input v-model="form.phone"></el-input>
          </el-form-item>
          <el-form-item label="部门">
            <el-cascader v-model="form.deptid" :options="deptlist1" :show-all-levels="false" :props="props"></el-cascader>
          </el-form-item>
          <el-form-item label="状态">
            <el-radio-group v-model="form.status">
              <el-radio label="1">启用</el-radio>
              <el-radio label="2">冻结</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="thisType = false">取 消</el-button>
          <el-button type="primary" @click="upUser">确 定</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
    import {http,deptlist,addUser} from "../../api/api";
    export default {
      name: "mgrAdd",
      props:['type','fun'],
      mounted() {
        //得到部门信息
        this.getDeptlist();
      },
      data() {
        return {
          thisType:this.type,
          form:{
            account:"",
            password:"",
            name:'',
            birthday:'',
            sex:"1",
            email:'',
            phone:"",
            deptid:null,
            status:"1"
          },
          deptlist1:"",
          props:{
            value:'id',
            label:'fullname',
            children:'children'
          }

        }
      },
      methods:{
        //设置时间：
        setTime(time) {
          var time=new Date(time);
          var year=time.getFullYear();
          var mouth=time.getMonth();
          var day=time.getDate();
          return year+"-"+mouth+'-'+day
        },
        //添加用户；
        upUser() {
          var flag=true;
          for(var i in this.form) {
            if(this.form[i]=="") {
              flag=false;
            }
          }
          if(flag) {
            this.setTime(this.form.birthday)
            this.thisType=false;
            this.$http.post(http+addUser,{
              account:this.form.account,
              password:this.form.password,
              name:this.form.name,
              birthday:this.setTime(this.form.birthday),
              sex:this.form.sex,
              email:this.form.email,
              phone:this.form.phone,
              deptid:this.form.deptid[this.form.deptid.length-1],
              status:this.form.status
            },{emulateJSON:true}).then((data)=>{
              this.thisType=false;
              for(var i in this.form) {
                this.form[i] = ''
              }
              this.$message.success('注册成功')
            },(error)=>{
              if(error.data.message=="该用户已经注册") {
                this.$message.error('该用户已经注册')
              }else {
                this.$message.error('注册失败')
              }
            })
          }else {
            this.$message.error('请输入完整的信息')
            this.thisType=false;
          }

        },
        // 循环部门信息空数据
        clearData(data) {
          for(let i=0;i<data.length;i++) {
            if(data[i].children.length==0) {
              data[i].children=null
            }else{
              this.clearData(data[i].children);
            }
          }
          return data
        },

        //部门信息
        getDeptlist() {
          this.$http.get(http+deptlist).then((data)=>{
            this.deptlist1 =this.clearData(data.data.data)
          },(err)=>{
            location.href='./login.html'
          })
        }
      },
      watch:{
        type() {
          this.thisType=this.type
        }
      }
    }
</script>

<style scoped>

</style>
