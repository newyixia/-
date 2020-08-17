<template>
  <div id="getmenu">
    菜单管理:
    <el-button type="primary"  @click="btn(item.code)" v-for="(item,i) in $store.state.user.menulist['/menu']" v-if="item.statusName=='启用'">
      <!--v-if="item.statusName=='启用'"-->{{item.name}}
    </el-button>

    <div>
      <el-table
        :data="tableData"
        style="width: 100%;margin-top:20px;"
        border
        row-key="id"
        :highlight-current-row="true" :tree-props="{children: 'children'}" @row-click="ceilclick">
        <el-table-column
          prop="name"
          label="菜单名称"
          sortable>
        </el-table-column>
        <el-table-column
          prop="url"
          label="链接标识"
          sortable>
        </el-table-column>
        <el-table-column
          prop="isMenuName"
          label="是否是菜单">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          :formatter="change1234"
        >
        </el-table-column>
        <el-table-column
          prop="id"
          label="菜单ID">
        </el-table-column>
      </el-table>
    </div>
    <menu-add :type="buttonTyep.menuAdd" :fun="showbtn" :tablerow="tablerow" tname="menuAdd"></menu-add>
    <menu-edit :type="buttonTyep.menuEdit" :fun="showbtn" :tablerow="tablerow" tname="menuEdit"></menu-edit>
    <menu-delete :type="buttonTyep.menuDelete" :fun="showbtn" :tablerow="tablerow" tname="menuDelete"></menu-delete>
  </div>
</template>

<script>
  import {http, menuList} from "../../api/api";
  import MenuAdd from "./menuAdd";
  import MenuEdit from "./menuEdit";
  import MenuDelete from "./menuDelete";
  export default {
    name: "getmenu",
    components: {
      MenuDelete,
      MenuEdit,
      MenuAdd
    },
    mounted() {
      //获取用户的列表
      this.getUserlist();
    },
    data() {
      return {
        tableData: [],
        buttonTyep:{
          menuAdd:false,
          menuEdit:false,
          menuDelete:false,
        },
        tablerow:""
      }
    },
    methods: {
      //stutas换成中文
      change1234(row, column, cellValue) {
        if(cellValue=="0") {
          return '弃用'
        }else if(cellValue=="1") {
          return '启用'
        }else if(cellValue=="2") {
          return '禁用'
        }
      },
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
        if(e=='menuAdd') {
          this.buttonTyep['menuAdd']=true;
        }else {
          if(this.tablerow=='') {
            this.$message.error('请选中要操作的行');
          }else {
            if(e=='menuEdit') {
              this.buttonTyep['menuEdit']=true;
            }else if(e=='menuDelete') {
              this.buttonTyep['menuDelete']=true;
            }
          }
        }
      },
      //菜单的列表；
      getUserlist() {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });

        this.$http.get(http + menuList, {emulateJSON: true}).then((data) => {

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
  #getmenu {
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
