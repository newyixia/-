<template>
  <div class="channelAdd">
    <el-dialog title="添加栏目" :visible.sync="thisType" @close="fun(tname)">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="类型名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="类型编码">
          <el-input v-model="form.code"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="thisType=false">取消</el-button>
        <el-button type="primary" @click="upUser">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {http,channeadd} from "../../api/api";
  export default {
    name: "channelAdd",
    props:['type','fun','tname'],
    data() {
      return {
        thisType:this.type,
        form:{
          name:"",
          code:''
        },
        deptlist1:"",
        status:[]
      }
    },
    methods: {
      //添加栏目；
      upUser() {
        this.thisType = false;
        var flag=true;
        for(var i in this.form) {
          if(this.form[i]=='') {
            flag=false;
            this.$message.error('请填写完信息')
          }
        }
        if(flag) {
          this.$http.post(http + channeadd, this.form,{emulateJSON: true}).then((data) => {
            this.thisType = false;
            for (var i in this.form) {
              this.form[i] = ''
            }
            this.status=[];
            this.$message.success('添加成功')
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
    }
  }
</script>

<style scoped>

</style>


