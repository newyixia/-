<template>
	<div id="app">
		<div class="login">
			<el-form ref="form" :model="login" label-width="80px">
			  <el-form-item label="用户名">
			    <el-input v-model="login.user"></el-input>
			  </el-form-item>
			  <el-form-item label="密码">
			    <el-input v-model="login.pwd" type="password"></el-input>
			  </el-form-item>
			  <el-form-item >
			    <el-button type="primary" @click="onSubmit">登录</el-button>
			  </el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	import {login,http} from './api/api.js'
	export default {
		data() {
			return {
				login:{
					user:"",
					pwd:""
				}
			}
		},
		methods:{
			onSubmit() {
				if(this.login.user=="") {
					this.$message.error("请输入用户名")
				}else if(this.login.pwd=="") {
					this.$message.error('请输入密码');
				}else {
					this.$http.post(http+login,{
						username:this.login.user,
						password:this.login.pwd
					},{
						emulateJSON:true
					}).then(function(data) {
						if(data.data.msg=="成功"){
							localStorage.token=data.data.data.token;
							location.href='./'
						}else {
							this.$message.error("账号或密码错误")
						}
					},function(err) {
						this.$message.error("无此账户")
					});
				}
			}
		}
	}
</script>

<style>
	.login {
		width: 500px;
		margin: 0 auto;
    padding-top: 150px;
	}
  body {
    background: url('./assets/1.jpg');
    background-size: 100% auto;
  }
</style>
