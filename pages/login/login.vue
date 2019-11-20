<template>
	<view>
		<view>
			<view class="header">
				<image src="../../static/logo.png"></image>
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
		uniGetuserinfo,
		getStorageSync,
		setStorageSync
	} from '@/assets/js/common'
	import {
		userLogin,
		getOpenid
	} from '@/api/api'
	export default {
		data() {
			return {
				hasAuth: false,
				pid:''
				};
		},
		onLoad(option) {
			console.log(option,option)
			if(option.hasAuth){
				this.hasAuth = Boolean(option.hasAuth)
			}
			if(getStorageSync('pid')){
				console.log()
				this.pid=getStorageSync('pid')
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
				uniLogin().then(ress => {
					console.log(ress)
					getOpenid({
						code: ress.code
					}).then(res => {
						// console.log(res)
						//判断是否授权
						//授权了,token过期
						if (this.hasAuth||res.data.member) {
							console.log(res)
							setStorageSync('token',res.data.wxMaJscode2SessionResult.sessionKey)
							if(res.data.member.school_id){
								setStorageSync('schoolMsg',{schoolName:res.data.member.schoolName,school_id:res.data.member.school_id})
							}else{
								setStorageSync('schoolMsg',{
									schoolName: '请选择学校'
								})
							}
							setStorageSync('homeFlag',res.data.member.homeFlag)
							setStorageSync('isNew',false)
							uni.switchTab({
								url: '../static/index'
							})
						} else {
							setStorageSync('token',res.data.sessionKey)
							console.log(res)
							//否则注册
							uniGetuserinfo().then(re => {
								let parmas = {
									openid: res.data.openid,
									iv: re.iv,
									encryptedData: re.encryptedData,
									pid:this.pid
								}
								userLogin(parmas).then(user => {
									if (user.code == 0) {
										setStorageSync('hasCoupon',user.data)
										setStorageSync('isNew',true)
										setStorageSync('schoolMsg',{
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
		border-radius: 50%;
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
		background: #ffd84d;
		color: black;
	}
</style>
