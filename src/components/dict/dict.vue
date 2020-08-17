<template>
  <div class="dict">
    <el-row style="padding-bottom: 20px;">
      <el-col :span="18">
        <el-input v-model="name" placeholder="字典名字"></el-input>
      </el-col>
      <el-col :span="3" style="text-align: center">
        <el-button type="primary" @click="search">搜索</el-button>
      </el-col>
      <el-col :span="3" style="text-align: left">
        <el-button type="primary" @click="reset">重置</el-button>
      </el-col>
    </el-row>
    字典管理:
    <el-button type="primary"  @click="btn(item.code)" v-for="(item,i) in $store.state.user.menulist['/dict']" v-if="item.statusName=='启用'">
      <!--v-if="item.statusName=='启用'"-->{{item.name}}
    </el-button>
    <!--      {{$store.state.user.menulist}}-->

    <div style="padding-top: 20px">
      <el-table @row-click="ceilclick"
                :data="tableData"
                border
                style="width: 100%;" height="300px" :highlight-current-row="true" >
        <el-table-column
          label="名称"
          prop="name">
        </el-table-column>
        <el-table-column
          label="详情"
          prop="detail">
        </el-table-column>
        <el-table-column
          label="字典id"
          prop="id">
        </el-table-column>
      </el-table>
    </div>
    <dict-add :type="buttonTyep.dictAdd" :fun="showbtn" tname="dictAdd"></dict-add>
    <dict-edit :type="buttonTyep.dictEdit" :fun="showbtn" :tablerow="tablerow" tname="dictEdit"></dict-edit>
    <dict-delete :type="buttonTyep.dictDelete" :fun="showbtn" :tablerow="tablerow" tname="dictDelete"></dict-delete>
  </div>
</template>

<script>
  import {http, dictlist} from "../../api/api";
  import DictAdd from "./dictAdd";
  import DictEdit from "./dictEdit";
  import DictDelete from "./dictDelete";
  export default {
    name: "dict",
    components: {
      DictDelete,
      DictEdit,
      DictAdd
    },
    mounted() {
      //获取用户的列表
      this.getUserlist();
    },
    data() {
      return {
        tableData: [],
        name:"",
        buttonTyep:{
          dictAdd:false,
          dictEdit:false,
          dictDelete:false,
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
        this.tablerow="";
      },
      //用户的操作：
      btn(e) {
        if(e=='dictAdd') {
          this.buttonTyep['dictAdd']=true;
        }else {
          if(this.tablerow=='') {
            this.$message.error('请选中要操作的行');
          } else if(e=='dictEdit') {
              this.buttonTyep['dictEdit']=true;
            }else if(e=='dictDelete') {
              this.buttonTyep['dictDelete']=true;
            }
        }
      },
      //重置数据；
      reset() {
        this.getUserlist(1)
        this.name="";
      },
      //搜索数据；
      search() {
        this.getUserlist(1);
        this.name=""
      },
      //获取字典的列表；
      getUserlist() {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });

        this.$http.get(http + dictlist, {
          params: {
            name: this.name
          }
        }, {emulateJSON: true}).then((data) => {

          var data = data.data.data;
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
  .dict {
    padding: 20px;
  }

  .demo-table-expand {
    font-size: 0;
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

