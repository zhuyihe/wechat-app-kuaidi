<template>
	<view>
		<view class="enter">
			<view class="li jianzhi" @tap="partTime">
				<image src="https://6465-dev-iey4o-1257667322.tcb.qcloud.la/1.png?sign=d4b1fb9cdc01df887a6ceabde9df5380&t=1567394861" mode=""></image>
			</view>
			<view class="li waimai" @tap="takeOut">
				<image src="https://6465-dev-iey4o-1257667322.tcb.qcloud.la/2.png?sign=8d77dfb9730ff35ca8468b6b63cab647&t=1567394914" mode=""></image>
			</view>
			<view class="li ershou" @tap="secondHand">
				<image src="https://6465-dev-iey4o-1257667322.tcb.qcloud.la/3.png?sign=e4d02a2fe372b79275bcb6a1601b56f4&t=1567394926" mode=""></image>
			</view>
			<view class="li luntan" @tap="bbs">
				<image src="https://6465-dev-iey4o-1257667322.tcb.qcloud.la/4.png?sign=57ae11f141c0d9a89e1d62d139baed4a&t=1567394937" mode=""></image>
			</view>
		</view>
		<button class="kf_button" open-type="contact" session-from="weapp">
			<image class="kf_image" src="https://6465-dev-iey4o-1257667322.tcb.qcloud.la/ke.png?sign=045632a510a31e7c5d5cdca367c3cfcd&t=1567394962"></image>
		</button>
	</view>

</template>

<script>
	export default {
		data() {
			return {
			};
		},
		methods:{
			partTime(){
				uni.navigateTo({
					url:'../../pageStatic/partTime/partTime'
				})
			},
			takeOut(){
				uni.navigateTo({
					url:'../../pageStatic/takeOut/takeOut'
				})
			},
			secondHand(){
				uni.navigateTo({
					url:'../../pageStatic/transactions/transactions'
				})
			},
			bbs(){
				uni.navigateTo({
					url:'../../pageStatic/bbs/bbs'
				})
			}
		}
	}
</script>

<style scoped lang='scss'>
	.enter {
		display: flex;
		flex-wrap: wrap;
		text-align: center;

		.li {
			margin-top: 40upx;
			width: 50%;

			image {
				width: 310upx;
				height: 440upx;
			}
		}
	}

	.kf_button {
		background-color: rgba(255, 255, 255, 0);
		border: 0px;
		height: 150rpx;
		right: 0;
		top: 200rpx;
		position: fixed;
	}

	.kf_button::after {
		border: 0px;
	}

	.kf_image {
		z-index: 9999;
		width: 60px;
		height: 60px;
	}
</style>
