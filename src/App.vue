<template>
  <div id="app">
    <el-container>
      <el-aside style="width: auto;" >
        <el-menu :default-active="$route.path" class="el-menu-vertical-demo" :collapse="isCollapse"
                 v-if="$store.state.menu.menu&&$store.state.user.info.permissions" router text-color="#ffeeff">
          <el-menu-item index="/" >
            <i class="el-icon-location"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-submenu v-for="item in $store.state.menu.menu" :key="item.uid" :index="item.id" >
            <template slot="title" >
              <i :class="typeIcon[item.id]"></i>
              <span slot="title">{{item.name}}</span>
            </template>
            <el-menu-item v-for="i in item.children" :key="i.uid" :index="i.path"
                          :disabled="$store.state.user.info.permissions.indexOf(i.path)==-1" >
              <i :class="typeIcon[i.id]"></i>
              {{i.name}}
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container v-if="$store.state.user.info.profile">
        <el-header style="background-color: #eeeeee;">
          <el-row type="flex" class="row-bg" justify="center" style="align-items: center">
            <el-col :span="12">
              <div class="grid-content bg-purple">
                <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
                  <el-radio-button :label="false">展开</el-radio-button>
                  <el-radio-button :label="true">收起</el-radio-button>
                </el-radio-group>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple-light" style="text-align: right;padding-right: 40px;padding-bottom: 20px">当前帐号：<router-link to="/Info" style="color: deepskyblue">{{$store.state.user.info.profile.account}}</router-link></div>
            </el-col>
          </el-row>
        </el-header>
        <el-main><div class="routerview"><router-view></router-view><!--{{ $store.state.user.info.profile}}--></div></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import {http, listForRouter, info,menuList} from "./api/api";

  export default {
    name: 'app',
    data() {
      return {
        isCollapse: false,
        typeIcon: {
          '1': 'el-icon-setting',
          '2': 'el-icon-notebook-1',
          '4': 'el-icon-s-custom',
          '12': 'el-icon-s-check',
          '21': 'el-icon-user',
          '17': 'el-icon-reading',
          '22': 'el-icon-collection',
          '41': 'el-icon-notebook-2',
          '46': 'el-icon-film',
          '42': 'el-icon-refrigerator',
          '45': 'el-icon-document-copy'
        }
      }
    },
    mounted() {
      //获取功能项的操作信息 ；
      this.getMenuList();
      this.getListForRouter();
      this.getInfo();
    },
    methods: {
      //得到menu的数据
      getListForRouter() {
        this.$http.get(http + listForRouter).then((data) => {
          // console.log(data)
          this.$store.commit('getMenu', data.data.data)
        }, (err) => {
          location.href = './login.html'
        })
      },
      //获取用户信息
      getInfo() {
        this.$http.get(http + info).then((data) => {
          this.$store.commit('setInfo', data.data.data)
        })
      },

      //获取功能项的操作信息 ；
      getMenuList() {
        this.$http.get(http+menuList).then((data)=>{
          var data=data.data.data;
          var json={};
          for(var i=0;i<data.length;i++){
            // console.log(data[i])
            var child=data[i].url;
            for(var j=0;j<data[i].children.length;j++) {
              // console.log(data[i].children[j])
              this.$set(json,data[i].children[j].url,data[i].children[j].children)
            }
          }
          this.$store.commit('setmenulist',json)
        }).catch((err)=>{
          console.log(data)
        })
      }
    }
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 220px;
    min-height: 550px;
  }

  .el-menu-vertical-demo[data-v-7ba5bd90]:not(.el-menu--collapse) {
    width: 220px;
    min-height: 550px;
  }
  .routerview {
    background: rgba(0,0,0,.3);
    min-height: 600px;
  }
  /*.el-submenu .el-menu-item {*/
  /*  height: 50px;*/
  /*  line-height: 50px;*/
  /*}*/
  .el-header {
    padding: 0;
  }

  .el-main {
    padding: 0;
  }
  .el-menu {
    height: 100%;
    border-right: none;
    background: rgba(0,0,0,.4);
  }
  body {
    background: url('./assets/1.jpg');
    background-size: 100% auto;
  }
  .el-menu-item:hover {
    background: rgba(0,0,0,.3);
  }
  .el-submenu__title:hover {
    background: rgba(0,0,0,.3);

  }
  .grid-content {
    padding-top: 10px;
  }
  /*.is-open*/
</style>
