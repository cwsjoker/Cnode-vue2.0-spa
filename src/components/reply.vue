<template>
	<div class="reply-box">
		<div class="textinp">
			<!-- v-el:textarea -->
			<textarea v-model="repliescontent" placeholder="请输入留言"></textarea>
		</div>
		<div class="textsub">
			<span class="rebtn" @click="recomment">回复</span>
		</div>
	</div>
</template>
<script>
	import axios from 'axios';
	export default {
		// 本页面的评论， 回复文章id， 回复某条评论的id， 该评论id，回复某条评论的所有者
		props : ['replycontent', 'artid', 'replyid', 'replythisid', 'replyto'],
		data : function() {
			return {
				repliescontent : ''
			}
		},
		mounted : function() {
			console.log(this.replycontent);
			console.log(this.artid);
			console.log(this.replyid);
			console.log(this.replythisid);
			console.log(this.replyto);
			if(this.replythisid){
				this.repliescontent = '@' + this.replyto + ' ';
			}
			// this.$els.textarea.focus();
		},
		computed: {
			// 登陆状态
			LoginState() {
				return this.$store.default.getters.getLoginState;
			},
			// 登陆用户信息
			userInfo() {
				return this.$store.default.getters.getUserInfo;
			}
		},
		methods : {
			recomment : function() {
				if(this.replyid) {
					console.log(1);
				}else{
					console.log(2);
				}
				return;
				// 判断是否登录，如果为登录去登录页面
				if(this.LoginState){
					// 判断内容是否为空
					if(this.repliescontent.trim() !== ''){
						// 回复内容不为空
						// const arr = window.location.href.split('/');

						const url = 'https://cnodejs.org/api/v1/topic/'+ this.artid +'/replies';
						// const rqdata = {
						// 		'accesstoken' : this.userInfo.accesstoken,
						// 		'content' : this.repliescontent.trim(),
						// 		'replies' : this.replyid
						// }
						axios.post(url, {
							accesstoken : this.userInfo.accesstoken,
							content : this.repliescontent.trim(),
							replies : this.replyid
						})
						.then((response) => {
							if(response.data.success){
								// 评论成功
								const time = new Date();
								this.replycontent.push({
									'author' : {
										'avatar_url' : this.userInfo.avatar,
										'loginname' : this.userInfo.loginname
									},
									'content' : this.repliescontent,
									'create_at' : time,
									'id' : this.userInfo.id,
									'reply_id' : this.replyid,
									'ups' : []
								});
								this.$store.default.dispatch('setReplies', this.replycontent);
								this.repliescontent = '';
								if(this.replythisid){
									this.replythisid = '';
								}
							}else{
								// 提交评论失败
							}
						})
						.catch(function(error) {
							console.log(error);
						})
					}else{
						// 内容为空
						this.$store.default.dispatch('setTipShow', true);
						this.$store.default.dispatch('setTipContent', '回复内容不能为空！');
					}
				}else{
					this.$router.push({name : 'login'});
				}
			}
		}
	}
</script>
<style lang="sass">
	.reply-box {
		padding: 0.5rem 0;
		.textinp {
			position: relative;
			margin-left: 5%;
			height: 3.6rem;
			textarea {
				position: absolute;
				left:0;
				bottom: 0;
				width : 85%;
				height : 2.8rem;
				padding : 0.2rem;
				font-size : 0.8rem;
				outline : none;
				resize : none;
			}
		}
		.textsub {
			margin-left: 5%;
			.rebtn {
				display : inline-block;
				margin : 5px 0 0 0;
				color : #fff;
				padding : 5px 10px;
				font-size : 15px;
				border-radius: 3px;
				background-color: #08c
			}
		}
	}
</style>