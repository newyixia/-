<template>
  <div class="dictDelete">
    <el-dialog title="删除字典" :visible.sync="thisType" @close="fun(tname)">
      <el-form ref="form" :model="form" label-width="80px">
        <div style="line-height: 100px;text-align: center" >是否要删除该 <span style="color: skyblue">{{tablerow.name}}</span></div>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="thisType = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {http,dictAdd} from "../../api/api";
  export default {
    name: "dictDelete",
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
      //删除字典；
      confirm() {
        var flag=true;
        if(flag) {
          this.$http.delete(http + dictAdd,{
            params:{
              id:this.tablerow.id
            }
          },{emulateJSON: true}).then((data) => {
            this.thisType = false;
            this.$message.success('删除成功')
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


