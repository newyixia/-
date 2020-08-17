<template>
  <div class="fileMgr">
    <el-upload
      class="upload-demo"
      drag
      :action="upfile"
      :headers="headers"
      :on-success="success"
      :on-error="error"
      multiple>
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    </el-upload>
    <el-row style="padding-bottom: 20px;padding-top: 20px;">
      <el-col :span="18">
        <el-input v-model="name" placeholder="文件名字"></el-input>
      </el-col>
      <el-col :span="3" style="text-align: center">
        <el-button type="primary" @click="search">搜索</el-button>
      </el-col>
      <el-col :span="3" style="text-align: left">
        <el-button type="primary" @click="reset">重置</el-button>
      </el-col>
    </el-row>
<!--    文件管理:-->
<!--    <el-button type="primary"  @click="btn(item.code)" v-for="(item,i) in $store.state.user.menulist['/fileMgr']" v-if="item.statusName=='启用'">-->
<!--      &lt;!&ndash;v-if="item.statusName=='启用'"&ndash;&gt;{{item.name}}-->
<!--    </el-button>-->
    <!--      {{$store.state.user.menulist}}-->

    <div>
      <el-table @row-click="ceilclick"
                :data="tableData"
                style="width: 100%;" height="300px" :highlight-current-row="true" >
        <el-table-column
          label="id"
          prop="id">
        </el-table-column>
        <el-table-column
          label="创建时间"
          prop="createTime">
        </el-table-column>
        <el-table-column
          label="文件预览">
          <template slot-scope="scope">
            <img :src="publicimg+scope.row.originalFileName" alt="" style="height: 100px">
          </template>
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text">下载</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div style="padding-top: 40px">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="size"
        @current-change="changepage"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import {http, filemgr,publicimg,downloadfile,file} from "../../api/api";
  export default {
    name: "fileMgr",
    components: {},
    mounted() {
      //获取用户的列表
      this.getUserlist(this.page);
    },
    data() {
      return {
        tableData: [],
        total: null,
        size: null,
        page: 1,
        name:"",
        buttonTyep:{

        },
        tablerow:"",
        publicimg,
        headers:{
          'constnet-type':'multipart/form-data',
          'Authorization':localStorage.token
        },
        upfile:http+file
      }
    },
    methods: {
      //成功
      success() {
        this.$message.success('发送成功')
      },
      error() {
        this.$message.error('发送失败')
      },
      //下载；
      handleClick(row) {
        location.href=http+downloadfile+'?idFile='+row.id+'&fileName='+row.realFileName;
      },
      //选中某一行是：
      ceilclick(row) {
        this.tablerow=row;
      },
      showbtn(type) {
        this.buttonTyep[type]=false;
        this.getUserlist(this.page);
        this.getUserlist(this.page);
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
        this.getUserlist(1)
        this.name="";
      },
      //搜索数据；
      search() {
        this.getUserlist(1);
        this.name=""
      },
      //改变页数shi数据也随之改变；
      changepage(e) {
        this.page=e;
        this.getUserlist(e)
      },
      //获取用户的列表；
      getUserlist(page) {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });

        this.$http.get(http + filemgr, {
          params: {
            page: page,
            limit: 5,
            originalFileName: this.name
          }
        }, {emulateJSON: true}).then((data) => {

          var data = data.data.data;
          this.total = data.total;
          this.size = data.size;
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
  .fileMgr {
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
