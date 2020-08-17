<template>
  <div class="setPwd">
    <el-dialog
      title="修改密码"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose" @close="clear" >
      <el-form ref="form" :model="pass" label-width="80px">
        <el-form-item label="旧密码">
          <el-input v-model="pass.oldPwd"></el-input>
        </el-form-item>
        <el-form-item label="新密码">
          <el-input v-model="pass.newPwd"></el-input>
        </el-form-item>
        <el-form-item label="确认密码">
        <el-input v-model="pass.renewPwd"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer" >
        <el-button type="primary" @click="setPwd"> 确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {http,updatePwd} from "../../api/api";
  export default {
    name: "setPwd",
    props:['type','btn'],
    data() {
      return {
        dialogVisible: this.type,//对话框的状态
        //修改表单密码；
        pass:{
          oldPwd:'',
          newPwd:'',
          renewPwd:''
        }
      }
    },
    watch:{
      type(a,b) {
        this.dialogVisible=this.type;//监听对话框状态
      }
    },
    methods: {
      handleClose(done){
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      clear() {
        for(let i in this.pass) {
          this.pass[i]="";//清空修改密码数据
        }
        this.btn();
      },
      setPwd() {
        if(this.pass.oldPwd=="") {
          this.$message.error('旧密码不能为空');
        }else if(this.pass.newPwd==""){
          this.$message.error('新密码不能为空');
        }else if(this.pass.renewPwd=="") {
          this.$message.error('重复密码不能为空');
        }else if(this.pass.newPwd!=this.pass.renewPwd) {
          this.$message.error('两次密码不一致');
        }else {
          this.$http.post(http+updatePwd,{
              oldPassword:this.pass.oldPwd,
              password:this.pass.newPwd,
              rePassword:this.pass.renewPwd
          },{emulateJSON:true}).then((data)=>{
            this.dialogVisible=false;
            if(data.data.msg=="不能修改超级管理员密码") {
              this.$message.error(data.data.msg);
            }else {
              this.$message.success(data.data.msg);
            }
          },(err)=>{
            this.$message.error('不能修改最高管理员的密码')
          })
        }
      }
    }
  }
</script>

<style scoped>

</style>
