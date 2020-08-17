<template>
  <div class="dictAdd">
    <el-dialog title="添加字典" :visible.sync="thisType" @close="fun(tname)">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="字典名称">
          <el-input v-model="form.dictName"></el-input>
        </el-form-item>
      </el-form>
      <div v-if="status.length!=0">
        <div class="title" style="padding: 10px">字典详情</div>
        <el-row v-for="(i,index) in status" >
          <el-col :span="10">
            <el-form ref="form" :model="form" label-width="80px" >
              <el-form-item label="字典状态">
                <el-input v-model="i.status"></el-input>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="10">
            <el-form ref="form" :model="form" label-width="80px">
              <el-form-item label="字典名称">
                <el-input v-model="i.content"></el-input>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="4" style="text-align: right">
            <el-button type="danger" plain @click="status.splice(index,1)">移除</el-button>
          </el-col>
        </el-row>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="statusAdd">添加字典详情</el-button>
        <el-button type="primary" @click="upUser">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {http,dictAdd} from "../../api/api";
  export default {
    name: "dictAdd",
    props:['type','fun','tname'],
    data() {
      return {
        thisType:this.type,
        form:{
          dictName:"",
        },
        deptlist1:"",
        status:[]
      }
    },
    methods: {
      //添加字典详情；
      statusAdd() {
        this.status.push({
          status: "",
          content:''
        })
      },
      //改变状态；
      strstatus(data) {
        var str='';
        for(var i in data) {
          str+=data[i].status+":"+data[i].content+';'
        }
        return str
      },
      //添加部门；
      upUser() {
        this.thisType = false;
        var flag=true;
          this.$http.post(http + dictAdd+`?dictValues=${this.strstatus(this.status)}`, {
              dictName:this.form.dictName
          },{emulateJSON: true}).then((data) => {
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


