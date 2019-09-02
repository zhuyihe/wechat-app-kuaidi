<template>
	<view class="global">
		<view class="icon">
			<image src="https://6465-dev-iey4o-1257667322.tcb.qcloud.la/success.png?sign=fcfb08e82c7f76a1fdc5f35e24cc3027&t=1567401618"></image>
		</view>
		<view class="tis">
			支付成功
		</view>
		<view class="pay-amount">
			￥<text class="mon">88.00</text>
		</view>
		<view class="back">
			<view class="btn" @tap="toUser">查看订单</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				amount:0
			};
		},
		onLoad(e) {
			this.amount = parseFloat(e.amount).toFixed(2);
		},
		methods: {
			toUser() {
				uni.switchTab({
					url: '/pages/tabBar/user'
				});
			}
		},
	}
</script>

<style lang="scss">
	.global{
		height: 100vh;
		background: #FFFFFF;
		text-align: center;
	}
	// view{
	// 	display: flex;
	// 	flex-wrap: wrap;
	// 	justify-content: center;
	// }
.icon{
	width: 100%;
	// margin-top: 10vw;
	image{
		width: 100upx;
		height: 100upx;
	}
	padding-top: 80rpx;
}
.tis{
	width: 100%;
	margin-top: 20upx;
	font-size: 36upx;
}
.pay-amount{
	width: 100%;
	margin-top: 10upx;
	font-size: 32upx;
	.mon{
		font-size: 70upx;
	}
}
.back{
	width: 100%;
	.btn{
		width: 180upx;
		padding: 0 50upx;
		height: 70upx;
		color: #000;
		background: #ffd84d;
		border-radius: 40upx;
		font-size: 34upx;
		text-align: center;
		line-height:70upx;
		margin: 20upx auto;
	}
}
</style>
