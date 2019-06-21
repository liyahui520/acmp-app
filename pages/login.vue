<template>
	<div class="login-box">
		<div class="title">登录</div>
		<div class="content">
			<div class="login-img1"><img src="../static/login/login-title.png" /></div>
			<div class="login-title">农业建设项目管理平台</div>
			<div class="login-form">
				<div class="input-box">
					<input type="text" v-model="username" placeholder="请输入账号" />
				</div>
				<div class="input-box">
					<input type="password" v-model="password" placeholder="请输入密码" />
				</div>
				<div class="input-box">
					<input type="text" v-model="code" placeholder="请输入验证码" />
					<div :class="canClick?'send-btn':'send-btns'" @click="send">{{sendText}}</div>
				</div>
			</div>
			<div class="message-text">{{messageText}}</div>
			<div class="login-btn" @click="login">登录</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				username: '', //账号
				password: '', //密码
				code: '', //验证码
				sendText: '发送',
				time: 60, //倒计时默认值
				canClick: true, //默认值为true,点击发送验证码为false
				messageText: ''
			}
		},
		onLoad() {

		},
		methods: {
			send() {
				if (this.username == "") {
					this.showToast('请输入用户名')
					return
				}
				if (!this.canClick) {
					this.showToast('请勿频繁操作')
					return
				} else {
					let that = this
					let url = '/public/loginMessageVali'
					let param = {
						name: that.username,
						typeid: 0
					}
					that.postHttp(url, param).then((res) => {
						if (res.resultcode == 100) {
							that.showToast('验证码已发送到您的手机，请注意查收')
						} else {
							that.showToast(res.data.message)
							that.time = 1
						}
					}).catch(function(error) {
						that.showToast("系统繁忙请稍后重试");
						that.time = 1
					});
				}
				this.canClick = false
				let timer = setInterval(() => {
					this.time--
					this.sendText = '重新发送(' + this.time + ')'
					if (this.time == 0) {
						clearInterval(timer)
						this.time = 60
						this.canClick = true
						this.sendText = '重新发送'
					}
				}, 1000)
			},
			login() {
				let that = this
				// if (this.username == ""){
				// 	that.showToast('请输入用户名')
				// 	return
				// }
				// if(this.password == ""){
				// 	that.showToast('请输入密码')
				// 	return
				// }
				// if(this.code == ""){
				// 	that.showToast('请发送验证码')
				// 	return
				// }
				let url = '/user/login'
				let param = {
					username: that.username,
					password: that.password,
					code: that.code
				};
				// that.postHttp(url, param).then((res) => {
				// 	if (res.resultcode == 100) {
				// 		that.setStr("islogin", true);
						uni.switchTab({
							url: '/pages/components/work/index'
						});
				// 	} else {
				// 		that.showToast(res.message)
				// 	}
				// }).catch(function(error) {
				// 	that.showToast("系统繁忙请稍后重试");
				// });
			}
		}
	}
</script>

<style scoped>
	.title {
		color: #333333;
		font-size: 38upx;
		background: #ffffff;
		text-align: center;
		line-height: 88upx;
		border-bottom: 1upx solid #e1e1e1;
	}

	.login-img1 {
		width: 70%;
		margin: 60upx auto 0;
	}

	.login-img1 img {
		width: 100%;
		height: 70upx;
	}

	.login-title {
		width: 100%;
		font-weight: 600;
		text-align: center;
		font-size: 32px;
		color: #ff0000;
		margin: 120upx 0 88upx 0;
	}

	.login-form {
		margin: 40upx 0 0 0;
	}

	.input-box {
		width: 80%;
		margin: 42upx 10%;
		display: flex;
		font-size: 36upx;
		justify-content: space-between;
	}

	.input-box input {
		width: 100%;
		height: 88upx;
		text-align: left;
		padding: 0 0 0 38upx;
		border-radius: 10upx;
		border: 1upx solid #EBEBEB;
	}

	.input-box:nth-child(3) input {
		width: 60%;
	}

	.send-btn,
	.send-btns {
		width: 160upx;
		line-height: 86upx;
		color: #FFFFFF;
		text-align: center;
		border-radius: 10upx;
		background: #225BA8;
	}

	.send-btns {
		color: #CCCCCC;
		border: 1px solid #CCCCCC;
	}

	.message-text {
		font-size: 12px;
		line-height: 32upx;
		color: #FF0000;
	}

	.login-btn {
		width: 80%;
		color: #ffffff;
		font-size: 36upx;
		line-height: 88upx;
		background: #225ba8;
		border-radius: 16upx;
		margin: 120upx 10%;
		text-align: center;
	}
</style>
