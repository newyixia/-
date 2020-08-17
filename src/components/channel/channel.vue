<template>
  <div class="channel">
    字典管理:
    <el-button type="primary" @click="btn(item.code)" v-for="(item,i) in $store.state.user.menulist['/channel']"
               v-if="item.statusName=='启用'">
      <!--v-if="item.statusName=='启用'"-->{{item.name}}
    </el-button>
    <!--      {{$store.state.user.menulist}}-->

    <div style="padding-top: 20px">
      <el-table @row-click="ceilclick"
                :data="tableData"
                border
                style="width: 100%;" height="337px" :highlight-current-row="true">
        <el-table-column
          label="分类名称"
          prop="name">
        </el-table-column>
        <el-table-column
          label="类型编码"
          prop="code">
        </el-table-column>
        <el-table-column
          label="类型id"
          prop="id">
        </el-table-column>
        <el-table-column
          label="最后更新时间"
          prop="modifyTime">
        </el-table-column>
      </el-table>
    </div>
    <channel-add :type="buttonTyep.channeladd" :fun="showbtn" tname="channeladd"></channel-add>
    <channel-edit :type="buttonTyep.channelEdit" :fun="showbtn" :tablerow="tablerow" tname="channelEdit"></channel-edit>
    <channel-delete :type="buttonTyep.channelDelete" :fun="showbtn" :tablerow="tablerow" tname="channelDelete"></channel-delete>

  </div>
</template>

<script>
  import {http, list} from "../../api/api";
  import ChannelAdd from "./channelAdd";
  import ChannelEdit from "./channelEdit";
  import ChannelDelete from "./channelDelete";
  export default {
    name: "dict",
    components: {
      ChannelDelete,
      ChannelEdit,
      ChannelAdd
    },
    mounted() {
      //获取用户的列表
      this.getUserlist();
    },
    data() {
      return {
        tableData: [],
        name: "",
        buttonTyep: {
          channeladd: false,
          channelEdit: false,
          channelDelete: false,
        },
        tablerow: "",
      }
    },
    methods: {


      //选中某一行是：
      ceilclick(row) {
        this.tablerow = row;
      },
      showbtn(type) {
        this.getUserlist();
        this.tablerow = "";
        this.getUserlist();
        this.buttonTyep[type] = false;
      },
      //用户的操作：
      btn(e) {
        if (e == 'channeladd') {
          this.buttonTyep['channeladd'] = true;
        } else {
          if (this.tablerow == '') {
            this.$message.error('请选中要操作的行');
          } else if (e == 'channelEdit') {
            this.buttonTyep['channelEdit'] = true;
          } else if (e == 'channelDelete') {
            this.buttonTyep['channelDelete'] = true;
          }
        }
      },
      //重置数据；
      reset() {
        this.getUserlist(1)
        this.name = "";
      },
      //搜索数据；
      search() {
        this.getUserlist(1);
        this.name = ""
      },
      //获取字典的列表；
      getUserlist() {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        this.$http.get(http + list, {emulateJSON: true}).then((data) => {

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
  .channel {
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


