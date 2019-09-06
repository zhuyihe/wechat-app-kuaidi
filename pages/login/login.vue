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

			<button class="bottom" type="primary" open-type="getUserInfo" lang="zh_CN" @getuserinfo="login">授权登录</button>
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
	import {login} from '@/api/api'
	export default {
		data() {
			return {};
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
				console.log(1)
				uniLogin().then(res => {
					console.log(res)
					uniGetuserinfo().then(re=>{
						console.log(re)
						console.log(encodeURIComponent(re.iv))
						console.log(encodeURIComponent(re.encryptedData))
						let parmas={
							code:res.code,
							iv:encodeURIComponent(re.iv),
							encryptedData:encodeURIComponent(re.encryptedData)
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
