<template>
	<view>
		<view class="enter">
			<view class="li jianzhi" @tap="partTime">
				<image src="../../static/1.png" mode=""></image>
			</view>
			<view class="li waimai" @tap="takeOut">
				<image src="../../static/2.png" mode=""></image>
			</view>
			<view class="li ershou" @tap="secondHand">
				<image src="../../static/3.png" mode=""></image>
			</view>
			<view class="li luntan" @tap="bbs">
				<image src="../../static/4.png" mode=""></image>
			</view>
		</view>
		<button class="kf_button" open-type="contact" session-from="weapp">
			<image class="kf_image" src="../../static/ke.png"></image>
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
