<template>
  <div class="menuAdd">
    <el-dialog title="添加菜单" :visible.sync="thisType" @close="fun(tname)">
      <el-alert
        v-if="tablerow==''"
        title="当您添加的菜单是下级菜单时请先选中其上级菜单"
        type="warning" style="margin-bottom: 20px;margin-top: -20px">
      </el-alert>
      <el-alert v-else
                title="当您添加的部门是上级菜单时，请先取消您的选择"
                type="warning" style="margin-bottom: 20px;margin-top: -20px">
      </el-alert>
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
        <el-form-item label="是否是菜单" label-width="120px">
          <el-radio-group v-model="form.ismenu">
            <el-radio label="1">菜单</el-radio>
            <el-radio label="0">按钮</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="状态" label-width="120px">
          <el-radio-group v-model="form.status">
            <el-radio label="1">启用</el-radio>
            <el-radio label="0">弃用</el-radio>
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
  import {http,menuadd} from "../../api/api";
  export default {
    name: "menuAdd",
    props:['type','fun','tablerow','tname'],
    data() {
      return {
        thisType:this.type,
        form:{
          name:'',
          code:'',
          component:'',
          url:'',
          ismenu:"1",
          status:"1"
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
            this.form.pcode=0;
          }else {
            this.form.pcode=this.tablerow.code;
          }
          this.form.num=0
          this.$http.post(http + menuadd,JSON.stringify(this.form),{emulateJSON: true}).then((data) => {
            this.thisType = false;
            for (var i in this.form) {
              this.form[i] = ''
            }
            this.$message.success('添加成功')
          }, (error) => {
            this.$message.error('失败')
            console.log(error)
          })
          delete this.form.pcode;
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

