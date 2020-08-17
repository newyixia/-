<template>
  <div class="role">
    部门管理:
    <el-button type="primary"  @click="btn(item.code)" v-for="(item,i) in $store.state.user.menulist['/dept']" v-if="item.statusName=='启用'">
      <!--v-if="item.statusName=='启用'"-->{{item.name}}
    </el-button>
    <!--      {{$store.state.user.menulist}}-->

    <div>
        <el-table
          :data="tableData"
          style="width: 100%;margin-top:20px;"
          row-key="id"
          border
          :highlight-current-row="true"
          :tree-props="{children: 'children'}" @row-click="ceilclick">
          <el-table-column
            prop="fullname"
            label="全称"
            sortable>
          </el-table-column>
          <el-table-column
            prop="simplename"
            label="简称"
            sortable>
          </el-table-column>
          <el-table-column
            prop="id"
            label="部门id">
          </el-table-column>
        </el-table>
    </div>
    <dept-add :type="buttonTyep.deptAdd" :fun="showbtn" :tablerow="tablerow" tname="deptAdd"></dept-add>
    <dept-edit :type="buttonTyep.deptEdit" :fun="showbtn" :tablerow="tablerow" tname="deptEdit"></dept-edit>
    <dept-delete :type="buttonTyep.deptDelete" :fun="showbtn" :tablerow="tablerow" tname="deptDelete"></dept-delete>
  </div>
</template>

<script>
  import {http, getdeptlist} from "../../api/api";
  import DeptAdd from "./deptAdd";
  import DeptEdit from "./deptEdit";
  import DeptDelete from "./deptDelete";
  export default {
    name: "mgr",
    components: {
      DeptDelete,
      DeptEdit,
      DeptAdd
    },
    mounted() {
      //获取用户的列表
      this.getUserlist();
    },
    data() {
      return {
        tableData: [],
        buttonTyep:{
          deptAdd:false,
          deptEdit:false,
          deptDelete:false,
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
        this.getUserlist();
        this.getUserlist();
        this.buttonTyep[type]=false;
        this.tablerow = ''
        // this.getUserlist();
      },
      //对于部门信息按钮的操作：
      btn(e) {
        if(e=='deptAdd') {
          this.buttonTyep['deptAdd']=true;
        }else {
          if(this.tablerow=='') {
            this.$message.error('请选中要操作的行');
          }else {
            if(e=='deptEdit') {
              this.buttonTyep['deptEdit']=true;
            }else if(e=='deptDelete') {
              this.buttonTyep['deptDelete']=true;
            }else if(e=='mgrSetRole'){
              this.buttonTyep['mgrSetRole']=true;
            }
          }
        }
      },
      //部门的列表；
      getUserlist() {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });

        this.$http.get(http + getdeptlist, {emulateJSON: true}).then((data) => {

          var data=data.data.data;
          this.tableData = data
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
