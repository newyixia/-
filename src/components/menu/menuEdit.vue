<template>
  <div class="menuEdit">
    <el-dialog title="修改菜单" :visible.sync="thisType" @close="fun(tname)">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="菜单名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="编码">
          <el-input v-model="form.code"></el-input>
        </el-form-item>
        <el-form-item label="组件">
          <el-input v-model="form.component"></el-input>
        </el-form-item>
        <el-form-item label="链接">
          <el-input v-model="form.url"></el-input>
        </el-form-item>
        <el-form-item label="是否是菜单" label-width="90px">
          <el-radio-group v-model="form.ismenu">
            <el-radio label="1">菜单</el-radio>
            <el-radio label="0">按钮</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="状态" label-width="80px">
          <el-radio-group v-model="form.status">
            <el-radio label="1">启用</el-radio>
            <el-radio label="0">弃用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="thisType = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {http,menuadd} from "../../api/api";
  export default {
    name: "menuEdit",
    props:['type','fun','tablerow','tname'],
    data() {
      return {
        thisType:this.type,
        form:{
        },
        deptlist1:"",
      }
    },
    methods: {
      //添加部门；
      confirm() {
        this.thisType = false;
        // var flag=true;
        /*for(var i in this.form) {
          if(this.form[i]=="") {
            flag=false
            console.log(this.form)
            this.$message.error('请输入值');
            return
          }
        }*/
        // if(flag) {
          this.$http.post(http + menuadd,JSON.stringify(this.form),{emulateJSON: true}).then((data) => {
            this.thisType = false;
            this.form={};
            this.$message.success('修改成功')
          }, (error) => {
            this.$message.error('失败')
            console.log(error)
          })
        // }
      },
    },
    watch:{
      type() {
        this.thisType=this.type
      },
      tablerow(){
        //浅拷贝变为深拷贝
        var json = {}
        for(var i in this.tablerow){
//					this.tablerow[i] = this.tablerow[i].toString()
          this.$set(json,i,this.tablerow[i].toString())
        }
        this.form = json
      }

    }
  }
</script>

<style scoped>
</style>

