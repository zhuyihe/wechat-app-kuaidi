<template>
	<view>
		<view>
			<view class="header">
				<image src="https://6465-dev-iey4o-1257667322.tcb.qcloud.la/logo.png?sign=23bc5ff95f2e37a6a63a29cac9f6248c&t=1567395015"></image>
			</view>

			<view class="content">
				<view>申请获取以下权限</view>
				<text>获得你的公开信息(昵称，头像等)</text>
			</view>

			<button class="bottom" type="primary" open-type="getUserInfo" lang="zh_CN" @getuserinfo="login" v-if='!hasAuth'>授权登录</button>
			<button class="bottom" type="primary"  @tap="login" v-else>登录</button>
			<!-- <button open-type="getPhoneNumber" class="bottom" type="primary" @getphonenumber="getPhoneNumber">获取手机号</button> -->
		</view>
	</view>
</template>

<script>
	import {
		showToast,
		uniLogin,
		uniGetuserinfo
	} from '@/assets/js/common'
	import {
		userLogin,
		getOpenid
	} from '@/api/api'
	export default {
		data() {
			return {hasAuth: false};
		},
		onLoad(option) {
			if(option.hasAuth){
				this.hasAuth = Boolean(option.hasAuth)
			}
		},
		methods: {
			getPhoneNumber(e) {
				console.log(e);
				// uni.login({
				// 	provider: 'weixin',
				// 	success: function(loginRes) {
				// 		console.log(loginRes);
				// 	}
				// });
			},
			login() {
				uniLogin().then(res => {
					console.log(res)
					getOpenid({
						code: res.code
					}).then(res => {
						//判断是否授权
						//授权了,token过期
						if (this.hasAuth) {
							this.$store.commit('LOGIN_SESSIONKEY', res.data.wxMaJscode2SessionResult.sessionKey)
							this.$store.commit('SCHOOLMSG',{schoolName:res.data.member.schoolName,school_id:res.data.member.school_id})
							uni.switchTab({
								url: '../static/index'
							})
						} else {
							this.$store.commit('LOGIN_SESSIONKEY', res.data.sessionKey)
							//否则注册
							uniGetuserinfo().then(re => {
								let parmas = {
									openid: res.data.openid,
									iv: re.iv,
									encryptedData: re.encryptedData
								}
								userLogin(parmas).then(user => {
									if (user.code == 0) {
										this.$store.commit('SCHOOLMSG', {
											schoolName: '请选择学校'
										})
										uni.switchTab({
											url: '../static/index'
										})
									}
								}).catch(e => {})
							}).catch(e => {
								showToast('授权失败')
							})
						}
					})
				})
			}
		}
	};
</script>

<style scoped lang="scss">
	.header {
		margin: 90rpx 0 90rpx 50rpx;
		border-bottom: 1px solid #ccc;
		text-align: center;
		width: 650rpx;
		height: 300rpx;
		line-height: 450rpx;
	}

	.header image {
		width: 200rpx;
		height: 200rpx;
	}

	.content {
		margin-left: 50rpx;
		margin-bottom: 90rpx;
	}

	.content text {
		display: block;
		color: #9d9d9d;
		margin-top: 40rpx;
	}

	.bottom {
		border-radius: 80rpx;
		margin: 70rpx 50rpx;
		font-size: 35rpx;
	}
</style>
