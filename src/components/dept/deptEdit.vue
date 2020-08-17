<template>
  <div class="mgrAdd">
    <el-dialog title="修改用户" :visible.sync="thisType" @close="fun(tname)">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="部门全称">
          <el-input v-model="form.fullname"></el-input>
        </el-form-item>
        <el-form-item label="部门简称">
          <el-input v-model="form.simplename"></el-input>
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
  import {http,dept} from "../../api/api";
  export default {
    name: "deptAdd",
    props:['type','fun','tablerow','tname'],
    data() {
      return {
        thisType:this.type,
        form:{
          fullname:this.tablerow.fullname,
          simplename:this.tablerow.simplename
        },
        deptlist1:"",
      }
    },
    methods: {
      //添加部门；
      upUser() {
        var flag=true;
        for(var i in this.form) {
          if(this.form[i]=="") {
            flag=false
            this.$message.error('请输入值');
            return
          }
        }
        if(flag) {
          this.form.id=this.tablerow.id;
          if(this.tablerow=='') {
            this.form.pid=0;
          }else {
            this.form.pid=this.tablerow.pid;
          }
          this.form.num=this.tablerow.num
          this.$http.post(http + dept,JSON.stringify(this.form),{emulateJSON: true}).then((data) => {
            this.thisType = false;
            for (var i in this.form) {
              this.form[i] = ''
            }
            this.$message.success('修改成功')
          }, (error) => {
            this.$message.error('失败')
            console.log(error)
          })
          delete this.form.id;
          delete this.form.num;
          delete this.form.pid;
          this.thisType = false;
        }

      },
    },
    watch:{
      type() {
        this.thisType=this.type
      },
      tablerow() {
        this.form.fullname=this.tablerow.fullname;
        this.form.simplename=this.tablerow.simplename;
      }

    }
  }
</script>

<style scoped>

</style>


