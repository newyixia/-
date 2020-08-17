<template>
  <div class="mgrAdd">
    <el-dialog title="分配角色" :visible.sync="thisType" @close="fun(tname)" >
        角色的选择：
        <el-select  v-model="form.roleIds" >
          <el-option
            v-for="item in rolemsg"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      <div slot="footer" class="dialog-footer">
        <el-button @click="thisType = false">取 消</el-button>
        <el-button type="primary" @click="upUser">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {http,roleTreeListByIdUser,setRole} from "../../api/api";
  export default {
    name: "mgrSetRole",
    props:['type','fun','tablerow','tname'],
    data() {
      return {
        thisType:this.type,
        form: {
          roleIds:this.tablerow.roleid,
          userId:this.tablerow.id
        },
        rolemsg:null,
        idUser: this.$store.state.user.info.profile.id,
      }
    },
    mounted() {
      this.getrole()
    },
    methods:{
      //获取全部角色；
      getrole() {
        this.$http.get(http+roleTreeListByIdUser,{
            // idUser:this.form.userId
            params:{
              idUser:this.$store.state.user.info.profile.id
            }
            // idUser: 1
        },{emulateJSON:true}).then((data)=>{
          this.rolemsg=data.data.data.treeData;
        },(err)=>{
          console.log(err)
        })
      },
      //角色用户；
      upUser() {
        this.thisType=false;
        this.$http.get(http+setRole,
          {
            params:{
              userId:this.form.userId,
              roleIds:this.form.roleIds
            }
          }).then((data)=>{
          this.thisType=false;
          this.$message.success('注册角色成功')
        },(error)=>{
          this.$message.error('注册失败')
          console.log(error)
        })
      },
    },
    watch:{
      type() {
        this.thisType=this.type
      },
      tablerow() {
        this.form.roleIds=this.tablerow.roleid;
        this.form.userId=this.tablerow.id
      }
    }
  }
</script>

<style scoped>

</style>


