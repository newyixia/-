import Vue from 'vue';
import router from 'vue-router';
import Index from '../components/Index'
import info from "../components/info/info";
import mgr from "../components/mgr/mgr";
import role from "../components/role/role";
import dept from "../components/dept/dept";
import menu from "../components/menu/getmenu"
import dict from "../components/dict/dict";
import channel from "../components/channel/channel";
import articleEdit from "../components/articleEdit/articleEdit";
import article from "../components/article/article";
import fileMgr from "../components/fileMgr/fileMgr";
Vue.use(router);
const routes=[{
  path:'/',
  name:'Index',
  component:Index
},{
  path:'/info',
  name:'info',
  component:info
},{
  path: '/mgr',
  name: 'mgr',
  component: mgr
},{
  path: '/role',
  name: 'role',
  component: role
},{
  path: '/dept',
  name: 'dept',
  component: dept
},{
  path: '/menu',
  name: 'menu',
  component: menu
},{
  path: '/dict',
  name: 'dict',
  component: dict
},{
  path: '/channel',
  name: 'channel',
  component: channel
},{
  path: '/cms/articleEdit',
  name: 'articleEdit',
  component: articleEdit
},{
  path: '/article',
  name:'article',
  component: article
},{
  path: '/filemgr',
  name: 'fileMgr',
  component: fileMgr
}];
export default new router({
  routes
})
