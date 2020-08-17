<template>
  <div class="channelDelete">
    <el-dialog title="删除部门" :visible.sync="thisType" @close="fun(tname)">
      <el-form ref="form" :model="form" label-width="80px" style="line-height:100px;text-align: center;">
        <div>是否要删除
          <span style="color: skyblue">{{this.tablerow.name}}</span>
          分类</div>
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
    name: "channelDelete",
    props:['type','fun','tablerow',"tname"],
    data() {
      return {
        thisType:this.type,
        form:{},
      }
    },
    methods:{

      //添加用户；
      upUser() {
        this.thisType=false;
        this.$http.delete(http+channeadd,{
          params:{
            id:this.tablerow.id
          }
        }).then((data)=>{
          if(data.data.msg="成功"){
            this.thisType=false;
            this.$message.success('删除成功')
          }
        },(error)=>{
          this.$message.success('删除失败')
        })
      },
    },
    watch:{
      type() {
        this.thisType=this.type
      },
      tablerow() {
        var json={};
        for(var i in this.tablerow) {
          this.$set(json,i,this.tablerow[i].toString())
        }
        this.form=json;
      }

    }
  }
</script>

<style scoped>

</style>


