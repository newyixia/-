<template>
  <div class="role">
    <el-row style="padding-bottom: 20px;">
      <el-col :span="18">
        <el-input v-model="name"></el-input>
      </el-col>
      <el-col :span="3" style="text-align: center">
        <el-button type="primary" @click="search">搜索</el-button>
      </el-col>
      <el-col :span="3" style="text-align: left">
        <el-button type="primary" @click="reset">重置</el-button>
      </el-col>
    </el-row>
<!--    用户管理:-->
<!--    <el-button type="primary"  @click="btn(item.code)" v-for="(item,i) in $store.state.user.menulist['/mgr']" v-if="item.statusName=='启用'">-->
<!--      &lt;!&ndash;v-if="item.statusName=='启用'"&ndash;&gt;{{item.name}}-->
<!--    </el-button>-->
    <!--      {{$store.state.user.menulist}}-->

    <div>
      <el-table @row-click="ceilclick"
                :data="tableData"
                style="width: 100%;" height="300px" :highlight-current-row="true" >
        <el-table-column
          label="昵称"
          prop="name">
        </el-table-column>
        <el-table-column
          label="账号名称"
          prop="account">
        </el-table-column>
        <el-table-column
          label="启用状态"
          prop="statusName">
        </el-table-column>
      </el-table>
    </div>
<!--    <mgr-add :type="buttonTyep.mgrAdd" :fun="showbtn" ></mgr-add>-->
<!--    <mgr-Edit :type="buttonTyep.mgrEdit" :fun="showbtn" :tablerow="tablerow" tname="mgrEdit"></mgr-Edit>-->
<!--    <mgr-delete :type="buttonTyep.mgrDelete" :fun="showbtn" :tablerow="tablerow" tname="mgrDelete"></mgr-delete>-->
<!--    <mgr-set-role :type="buttonTyep.mgrSetRole" :fun="showbtn" :tablerow="tablerow" tname="mgrSetRole"></mgr-set-role>-->
  </div>
</template>

<script>
  import {http, rolelist} from "../../api/api";
  // import MgrAdd from "./mgrAdd";
  // import MgrEdit from './mgrEdit'
  // import MgrDelete from './mgrDelete'
  // import MgrSetRole from "./mgrSetRole";
  export default {
    name: "role",
    components: {/*MgrSetRole, MgrAdd,MgrEdit,MgrDelete*/},
    mounted() {
      //获取用户的列表
      this.getUserlist();
    },
    data() {
      return {
        tableData: [],
        size: null,
        name:"",
        buttonTyep:{
          mgrAdd:false,
          mgrEdit:false,
          mgrDelete:false,
          mgrSetRole:false
        },
        tablerow:"",
      }
    },
    methods: {


      //选中某一行是：
      ceilclick(row) {
        this.tablerow=row;
      },
      showbtn(type) {
        this.buttonTyep[type]=false;
        this.getUserlist();
        this.getUserlist();
      },
      //用户的操作：
      btn(e) {
        if(e=='mgrAdd') {
          this.buttonTyep['mgrAdd']=true;
        }else {
          if(this.tablerow=='') {
            this.$message.error('请选中要操作的行');
          }else {
            if(e=='mgrFreeze') {
              if(this.tablerow.statusName=='启用') {
                this.$message.error('您选中的行已经启用');
              }else {
                console.log(2222)
              }
            }else if(e=='mgrUnfreeze') {
              if(this.tablerow.statusName=='冻结') {
                this.$message.error('您选中的行已经冻结')
              }else {
                console.log(333)
              }
            }else if(e=='mgrEdit') {
              this.buttonTyep['mgrEdit']=true;
            }else if(e=='mgrDelete') {
              this.buttonTyep['mgrDelete']=true;
            }else if(e=='mgrSetRole'){
              this.buttonTyep['mgrSetRole']=true;
            }
          }
        }
      },
      //重置数据；
      reset() {
        this.getUserlist()
        this.name="";
      },
      //搜索数据；
      search() {
        this.getUserlist();
        this.name=""
      },
      //获取用户的列表；
      getUserlist() {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        this.$http.get(http + rolelist, {
          params: {
            name: '管理员'
          }
        }, {emulateJSON: true}).then((data) => {

          // console.log(data)
          this.tableData = data.records
          setTimeout(() => {
            loading.close();
          }, 1000);
        }, (err) => {
          console.log(err)
        })
      }
    }
  }
</script>

<style scoped>
  .role {
    padding: 20px;
  }

  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
