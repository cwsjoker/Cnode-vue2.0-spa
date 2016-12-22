<template>
	<div>
		<nv-header></nv-header>
		<div class="login-con">
			<h2>登录</h2>
			<div>
				<p>Token:</p>
				<p><input type="text" v-model="strToken" /></p>
			</div>
			<div>
				<span @click="login">登录</span>
			</div>
		</div>
	</div>
</template>
<script>
	import axios from 'axios';
	import nvHeader from '../components/header.vue';
	// import {isLogin, setUserInfo, setNotMessageCount} from '../vuex/actions';
	// import {getLoginState, getUserInfo, getNotMessageCount} from '../vuex/getters';
	export default {
		data : function(){
			return {
				strToken : ''
			}
		},
		methods : {
			login : function() {
				const rqdata = {
					'accesstoken' : this.strToken
				}
				axios.post('https://cnodejs.org/api/v1/accesstoken?accesstoken='+ this.strToken)
				.then((response) => {
					console.log(response);
					if(response.data.success){
						console.log(1);
						const data = response.data;
						console.log(data);
						// 登入成功改变isLogin的状态为true
						this.$store.default.dispatch('isLogin');
						this.$store.default.dispatch('setUserInfo', data.loginname, data.avatar_url, data.id, this.strToken);
						// if(this.$store.default.getters.getUserInfo) {
							// 获取消息
							axios.get('https://cnodejs.org/api/v1/message/count?accesstoken='+ this.strToken)
							.then((reaponse) => {
								if(response.data.success) {
									this.$store.default.dispatch('getNotMessageCount', response.data.data);
									window.history.back();
								}
							})
							.then(function(error) {
								console.log('请求错误');
							});
							
						// }
					}else{
						// 失败
					}
				})
				// .catch(function(error) {
				// 	console.log('请求错误');
				// })
				
			}
		},
		components : {
			nvHeader
		}
	}
</script>
<style lang="sass">
	.login-con {
		margin: 20px 5px 0;
		padding-top : 3.5rem;
		background: #fff;
		border-radius: 7px;
		font-size: 14px;
		h2 {
			padding: 10px;
    		background-color: #f6f6f6;
    		border-radius: 3px 3px 0 0;
		}
		div {
			padding: 10px;
			p {
				padding: 5px 0px;
				input {
					width: 90%;
					height: 30px;
					padding: 5px 10px;
					border: 1px solid #ccc;
					border-radius: 5px;
				}
			}
			span {
				display: inline-block;
				padding: 5px;
				margin-right: 10px;
				background: #08c;
				color: #fff;
			}
		}
	}
</style>