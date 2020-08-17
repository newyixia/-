import Vue from 'vue'
import App from './App.vue'
/*引入elementui  */
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)
// 引入ajax
import resource from "vue-resource";
Vue.use(resource);
//引入vuex;
import store from "./store/index";
//引入vue-router;
import router from './router/index'
//引入echarts;
import echarts from 'echarts';
import request from "vue-resource/src/http/request";
import response from "vue-resource/src/http/response";
Vue.prototype.$echarts=echarts;

Vue.http.interceptors.push((request,next)=>{
  //设置taken请求头
  if(!localStorage.token) {
    location.href="./login.html";
  }else {
    Vue.http.headers.common["Authorization"]=localStorage.token;
  }
  next((response)=>{
    if(response.status==401) {
      location.href='./login.html'
    }
    return response
  })
})
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
