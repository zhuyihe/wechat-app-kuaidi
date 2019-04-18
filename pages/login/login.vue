<template>
	<view>
		<view>
			<view class="header"><image src="../../static/logo.png"></image></view>

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
	margin: 90upx 0 90upx 50upx;
	border-bottom: 1px solid #ccc;
	text-align: center;
	width: 650upx;
	height: 300upx;
	line-height: 450upx;
}

.header image {
	width: 200upx;
	height: 200upx;
}

.content {
	margin-left: 50upx;
	margin-bottom: 90upx;
}

.content text {
	display: block;
	color: #9d9d9d;
	margin-top: 40upx;
}

.bottom {
	border-radius: 80upx;
	margin: 70upx 50upx;
	font-size: 35upx;
}
</style>
