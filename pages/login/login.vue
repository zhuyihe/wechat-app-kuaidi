<template>
	<view>
		<view>
			<view class="header"><image src="https://6465-dev-iey4o-1257667322.tcb.qcloud.la/logo.png?sign=23bc5ff95f2e37a6a63a29cac9f6248c&t=1567395015"></image></view>

			<view class="content">
				<view>申请获取以下权限</view>
				<text>获得你的公开信息(昵称，头像等)</text>
			</view>

			<button class="bottom" type="primary" open-type="getUserInfo" lang="zh_CN" @getuserinfo="getUserInfo">授权登录</button>
		</view>
	</view>
</template>

<script>
import {showToast} from '@/assets/js/common'
export default {
	data() {
		return {
		};
	},
	methods: {
		getUserInfo(e) {
			console.log(e);
			//授权
			if(e.detail.userInfo){
				this.$store.commit('USER_INFO',e.detail)
				this.login()
				
			}else{
				showToast('拒接授权授权将无法体验完整的功能，建议用户开启授权')
			}
		},
		login(){
			uni.login({
				provider:'weixin',
				success:(res)=> {
					console.log(res)
					uni.switchTab({
						url:'../static/index'
					})
				},
				fail(err){
					console.log(err)
				}
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
