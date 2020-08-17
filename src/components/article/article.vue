<template>
  <div class="article">
    文章管理:
    <el-button type="primary" @click="btn(item.code)" v-for="(item,i) in $store.state.user.menulist['/article']"
               v-if="item.statusName=='启用'">
      <!--v-if="item.statusName=='启用'"-->{{item.name}}
    </el-button>
    <el-row style="padding-bottom: 20px;padding-top: 20px;">
      <el-col :span="6">
        <el-input v-model="title" placeholder="标题"></el-input>
      </el-col>
      <el-col :span="6" :offset="1">
        <el-input v-model="author" placeholder="作者"></el-input>
      </el-col>
      <el-col :span="6" :offset="1">
        <el-date-picker
          v-model="dates"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right"
          value-format="yyyyMMddHHmmss">
        </el-date-picker>
      </el-col>

    </el-row>
    <div style="height: 30px;">
      <el-col :span="3" style="text-align: center">
        <el-button type="primary" @click="search">搜索</el-button>
      </el-col>
      <el-col :span="3" style="text-align: left">
        <el-button type="primary" @click="reset">重置</el-button>
      </el-col>
    </div>

    <!--      {{$store.state.user.menulist}}-->

    <div style="padding-top: 30px">
      <el-table @row-click="ceilclick"
                :data="tableData"
                style="width: 100%;" height="300px" :highlight-current-row="true">
        <el-table-column
          label="id"
          prop="id">
        </el-table-column>
        <el-table-column
          label="标题"
          prop="title">
        </el-table-column>
        <el-table-column
          label="作者"
          prop="author">
        </el-table-column>
        <el-table-column
          label="创建时间"
          prop="modifyTime">
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
    <article-delete :type="buttonTyep.articleDelete" :fun="showbtn" :tablerow="tablerow" tname="articleDelete"></article-delete>
    <article-edit :type="buttonTyep.articleEdit" :fun="showbtn" :tablerow="tablerow" tname="articleEdit"></article-edit>
  </div>
</template>

<script>
  import {http, articlelist} from "../../api/api";
  import ArticleEdit from "./articleEdit";
  import ArticleDelete from "./articleDelete";
  export default {
    name: "article1",
    components: {
      ArticleDelete,
      ArticleEdit
    },
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
        name: "",
        buttonTyep: {
          articleEdit: false,
          articleDelete:false
        },
        tablerow: "",
        title: '',
        author: '',
        dates: ''
      }
    },
    methods: {


      //选中某一行是：
      ceilclick(row) {
        this.tablerow = row;
      },
      showbtn(type) {
        this.buttonTyep[type] = false;
        this.getUserlist(this.page);
        this.getUserlist(this.page);
      },
      //用户的操作：
      btn(e) {
        if (e == 'mgrAdd') {
          this.buttonTyep['mgrAdd'] = true;
        } else {
          if (this.tablerow == '') {
            this.$message.error('请选中要操作的行');
          } else if (e == 'update') {
            this.buttonTyep['articleEdit'] = true;
          } else if (e == 'deleteArticle') {
            this.buttonTyep['articleDelete'] = true;
          }
        }
      },
      //重置数据；
      reset() {
        this.getUserlist(1)
        this.title = "";
        this.author = '';
        this.dates = ''
      },
      //搜索数据；
      search() {
        this.getUserlist(1);
        this.title = "";
        this.author = '';
        this.dates = ''
      },
      //改变页数shi数据也随之改变；
      changepage(e) {
        this.page = e;
        this.getUserlist(e)
      },
      //获取用户的列表；
      getUserlist(page) {
        //拼命加载中
        const loading = this.$loading({
          lock: true,
          text: '拼命加载中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        this.$http.get(http + articlelist, {
          params: {
            page: page,
            limit: 10,
            title: this.title,
            author: this.author,
            startDate: this.dates[0],
            endDate: this.dates[1]
          }
        }, {emulateJSON: true}).then((data) => {
          var data = data.data.data;
          this.total = data.total;
          this.size = data.size;
          this.tableData = data.records
          // console.log(this.tableData)
          //加载完成
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
  .article {
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

