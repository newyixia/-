<template>
  <div class="channelEdit">
    <el-dialog title="修改栏目" :visible.sync="thisType" @close="fun(tname)">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="类型名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="类型编码">
          <el-input v-model="form.code"></el-input>
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
  import {http,channeadd} from "../../api/api";
  export default {
    name: "channelEdit",
    props:['type','fun','tablerow','tname'],
    data() {
      return {
        thisType:this.type,
        form:{
          name:this.tablerow.name,
          code:this.tablerow.code
        },
        deptlist1:"",
      }
    },
    methods: {
      //添加部门；
      upUser() {
        this.thisType=false
        var flag=true;
        for(var i in this.form) {
          if(this.form[i]=="") {
            flag=false
            this.$message.error('请输入值');
            return
          }
        }
        if(flag) {
          this.$http.post(http + channeadd,{
            id:this.tablerow.id,
            name:this.form.name,
            code:this.form.code
          },{emulateJSON: true}).then((data) => {
            for (var i in this.form) {
              this.form[i] = ''
            }
            this.thisType = false;
            this.$message.success('修改成功')
          }, (error) => {
            this.$message.error('失败')
            console.log(error)
          })
        }

      },
    },
    watch:{
      type() {
        this.thisType=this.type
      },
      tablerow() {
        this.form.name=this.tablerow.name;
        this.form.code=this.tablerow.code;
      }

    }
  }
</script>

<style scoped>

</style>


