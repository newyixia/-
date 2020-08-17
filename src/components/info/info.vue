<template>
    <div class="info">
      <p>账户信息：{{$store.state.user.info.profile.account}}</p>
      <p>修改密码：<span style="color: deepskyblue" @click="type=true" >修改密码</span></p>
      <p>名字：{{$store.state.user.info.profile.name}}</p>
      <p>生日：{{$store.state.user.info.profile.birthday}}</p>
      <p>性别：{{$store.state.user.info.profile.sex==1?"男":"女"}}</p>
      <p>邮箱：{{$store.state.user.info.profile.email}}</p>
      <p>电话：{{$store.state.user.info.profile.phone}}</p>
      <p>部门：{{$store.state.user.info.profile.dept}}</p>
      <p><el-button type="danger" @click="toLogin">退出登录</el-button></p>
      <set-pwd :type="type" :btn="btn"></set-pwd>
    </div>
</template>

<script>
    import SetPwd from "./setPwd";
    export default {
      name: "info",
      data() {
        return {
          type:false
        }
      },
      created() {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        this.$nextTick(()=>{
          setTimeout(() => {
            loading.close();
          }, 2000);
        })
      },
      components: {SetPwd},
      methods:{
        btn() {
          this.type=false;
        },
        toLogin() {
          localStorage.clear();
          location.href='./login.html'
        }
      }
    }
</script>

<style scoped>
  .info {
    padding:20px;
    line-height: 40px;
  }
</style>
