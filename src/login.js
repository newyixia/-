import Vue from 'vue'
import login from './login.vue'
/* 导入ui */
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)
/* 导入vue-resource */
import resource from 'vue-resource';
Vue.use(resource)
new Vue({
  el: '#app',
  render: h => h(login)
})
