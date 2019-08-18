<template>
	<view>
		<view class="message">
			<view class="ji">
				<view class="zi">
					寄
				</view>
				<view class="jmsg">
					<view class="top">
						<view class="name">
							朱依禾
						</view>
						<view class="phone">
							18186140272
						</view>
					</view>
					<view class="bottom">
						发了可能；里的放开我
					</view>
				</view>
			</view>
			<view class="shou">
				<view class="zi">
					收
				</view>
				<view class="jmsg">
					<view class="top">
						<view class="name">
							朱依禾
						</view>
						<view class="phone">
							18186140272
						</view>
					</view>
					<view class="bottom">
						发了可能；里的放开我
					</view>
				</view>
			</view>
		</view>
		<view class="list">
			<view class="bh" >
				<view >
					编号
				</view>
				<view>
					A1
				</view>
			</view>
			<view class="bh">
				<view >
					规格
				</view>
				<view >
					6kg
				</view>
			</view>
			<view class="bh">
				<view >
					数量
				</view>
				<view >
					1
				</view>
			</view>
			<view class="bh">
				<view >
					价格
				</view>
				<view >
					20
				</view>
			</view>
			<view class="bh">
				<view >
					优惠券
				</view>
				<view class="red">
					<view >
						2.00
					</view>
					<uni-icon type="arrowright" size="=20"></uni-icon>
				</view>
			</view>
		</view>
		<view class="order">
			<view class="shifu">
				实付金额:<text class="red">18.00</text>
			</view>
			<view class="goOrder" @tap='goOrder'>
				提交订单
			</view>
		</view>
	</view>
</template>

<script>
	import uniIcon from '@/components/uni-icon/uni-icon.vue'
	export default {
		components:{
			uniIcon
		},
		data() {
			return {
				
			};
		},
		methods:{
			goOrder(){
				uni.navigateTo({
					url:'../paySuccess/paySuccess'
				})
			}
		}
	}
</script>

<style lang="scss">
	.message,.list{
		width: 90%;
		background: #FFFFFF;
		margin: 30upx auto;
		border-radius: 20upx;
		font-size: 28upx;
		box-shadow: 0 2px 4px 0 #C6CFD7;
	}
	.zi{
		line-height: 70rpx;
		width: 70rpx;
		border-radius: 50%;
		text-align: center;
		background: black;
		color: white;
		display: block;
		// font-size: 20px;
		height: 70rpx;
		margin:  0 25upx;
		font-size: 32upx;
	}
	.jmsg{
		width: 80%;
		line-height: 50upx;
		color: #666;
	}
	.ji,.shou{
		display: flex;
		align-items: center;
		// margin:  0 30upx;
		padding: 30upx 0;
		width:100%; 
		.top{
			display: flex;
			// align-items: center;
			justify-content: space-between;
			width:100%;
		}
	}
	.shou {
		border-top: 1px solid #ccc;
		.zi{
			background: #ffd84d;
			color: black;
		}
		
	}
	.bh{
		display: flex;
		// align-items: center;
		justify-content: space-between;
		line-height: 110upx;
		padding: 0 20upx;
		border-top: 1px solid #ccc;
		font-size: 30upx;
		color: #666;
		.red{
			color: #cf1111;
			display: flex;
			align-items: center;
		}
		&:nth-child(1){
			border-top: 0;
		}
	}
	.order{
		height: 100upx;
		line-height: 100upx;
		width: 100%;
		position: fixed;
		left: 0;
		bottom: 0;
		display: flex;
		.shifu{
			width: 60%;
			background: #fff;
			padding-right: 20upx;
			text-align: right;
			.red{
				color:#cf1111 ;
			}
		}
		.goOrder{
			background: #ffd84d;
			color: #000;
			width: 40%;
			text-align: center;
		}
	}
</style>
