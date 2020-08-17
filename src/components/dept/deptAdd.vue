<template>
  <div class="deptAdd">
    <el-dialog title="添加部门" :visible.sync="thisType" @close="fun(tname)">
      <el-alert
        v-if="tablerow==''"
        title="当您添加的部门是下级部门时请先选中其上级部门"
        type="warning" style="margin-bottom: 20px;margin-top: -20px">
      </el-alert>
      <el-alert v-else
        title="当您添加的部门是上级部门时，请先取消您的选择"
        type="warning" style="margin-bottom: 20px;margin-top: -20px">
      </el-alert>
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
          fullname:"",
          simplename:""
        },
        deptlist1:"",
      }
    },
    methods: {
      //添加部门；
      upUser() {
        this.thisType = false;
        var flag=true;
        for(var i in this.form) {
          if(this.form[i]=="") {
            flag=false
            this.$message.error('请输入值');
            return
          }
        }
        if(flag) {
          if(this.tablerow=='') {
            this.form.pid=0;
          }else {
            this.form.pid=this.tablerow.id;
          }
          this.form.num=0
          this.$http.post(http + dept,JSON.stringify(this.form),{emulateJSON: true}).then((data) => {
            this.thisType = false;
            for (var i in this.form) {
              this.form[i] = ''
            }
            this.$message.success('添加成功')
          }, (error) => {
            this.$message.error('失败')
            console.log(error)
          })
          delete this.form.pid;
          delete this.form.num;
        }

      },
    },
    watch:{
      type() {
        this.thisType=this.type
      },
      tablerow() {
      }

    }
  }
</script>

<style scoped>

</style>

