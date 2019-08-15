<template name="basics">
	<view>
		<!-- <scroll-view scroll-y class="page"> -->
			<view class="location">
				<image class="locationImg" src="../../static/location1.png"></image>
				<text class="xue">武汉大学</text>
				<image class="locationImgxia" src="../../static/xia.png"></image>
			</view>
			<bw-swiper :swiperList="swiperList" indicatorActiveColor="#ff0000" @clickItem="clickItem" style="width:100%"
			 :textTip="true" :swiperType='true'> </bw-swiper>
			<button class="kf_button" open-type="contact" session-from="weapp">
				<image class="kf_image" src="../../static/ke.png"></image>
			</button>
			<view class="jijian">
				<view class="text">
					寄件
				</view>
				<view class="kuaidi">
					<view class="ji">
						<text class="text">寄</text>
						<view class="msg">
							请添加寄件人信息
						</view>
						<image class="jiImg" src="../../static/back.png"></image>
					</view>
					<view class="shou">
						<text class="text">收</text>
						<view class="msg">
							请添加收件人人信息
						</view>
						<image class="jiImg" src="../../static/back.png"></image>
					</view>
				</view>
				<view class="zl">
					<view class="zl1">
						<view class="zl1-z" >
							预估重量
						</view>
						<view class="jisuan">
							<image src="../../static/reduce.png" class="li"></image>
							<view class="kg">
								12<text class="zi">kg</text>
							</view>
							<image src="../../static/add.png"></image>
						</view>
					</view>
					<view class="zl1">
						<view class="zl1-z" >
							物品类型
						</view>
						<view class="msgs">
							物品类型
						</view>
						<image class="img" src="../../static/back.png"></image>
					</view>
				</view>
			</view>
		<!-- </scroll-view> -->
	</view>
</template>

<script>
	import {
		getStorageSync
	} from '@/assets/js/common';
	import bwSwiper from '@/wxcomponents/bw-swiper/bw-swiper.vue'
	export default {
		components: {
			bwSwiper
		},
		data() {
			return {
				swiperList: [{
					id: 4,
					type: 'image',
					img: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg',
					text: '加油',
				}, {
					id: 1,
					type: 'image',
					img: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg',
					text: '加油',
				}, {
					id: 2,
					type: 'image',
					img: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg',
					text: '加油',
				}]
			};
		},
		created() {
			// 			console.log(this.$store)
			// 			let token=getStorageSync('state').token
			// 			console.log(token)
		}
	};
</script>

<style scoped lang="scss">
	.page {
		height: 100vh;
		background: #f5f5f5;
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

	.location {
		// line-height: 50rpx;
		height: 40rpx;
		font-size: 30rpx;
		padding-left: 48rpx;
		display: flex;
		align-items: center;
		margin: 30rpx 0;
	}

	.locationImg {
		width: 36rpx;
		height: 40rpx;
	}

	.xue {
		margin-left: 10rpx;
	}

	.locationImgxia {
		width: 20rpx;
		height: 12rpx;
		margin-top: 5rpx;
		margin-left: 5rpx;
	}

	.jijian {
		margin: 0 24px;
		margin-top: 35px;
		font-size: 30rpx;
		padding-left: 40rpx;
		background: white;
		padding-top: 20px;
		box-shadow: 0 2px 4px 0 #C6CFD7;
		border-radius: 10px;
		padding-bottom: 30px;
	}

	.text {
		width: 50px;
		line-height: 30px;
		background: #e0e0e0;
		text-align: center;
		border-radius: 20px;
	}

	.kuaidi {
		margin-top: 40px;
		margin-bottom: 30px;
	}

	.ji {
		display: flex;
		.text {
			line-height: 45px;
			width: 45px;
			border-radius: 50%;
			text-align: center;
			background: black;
			color: white;
			display: block;
			font-size: 20px;
		}

	}

	.msg {
		border-bottom: 1px solid #ccc;
		line-height: 35px;
		margin-left: 10px;
		color: #999;
		width: 75%;
		padding-bottom: 10px;
	}

	.jiImg {
		width: 12px;
		height: 20px;
		margin-top: 15px;
		margin-left: 5px;
	}
	.shou {
		display: flex;
		margin-top:30px;
		.text {
			line-height: 45px;
			width: 45px;
			border-radius: 50%;
			text-align: center;
			background: #ffd84d;
			color: black;
			display: block;
			font-size: 20px;
		}
	}
	.zl{
		display: flex;
	}
	.zl1{
		width: 50%;
		display: flex;
		font-size: 26rpx;
		.img{
			width: 12px;
			height: 20px;
		}
	}
	.jisuan{
		display: flex;
		.li{
			margin-left: 10px;
		}
		.kg{
			margin: 0 8px;
		}
		.zi{
			font-size: 24rpx;
			color: #666;
		}
	}
	.jisuan image{
		width: 40rpx;
		height: 40rpx;
	}
	.msgs{
		border-bottom: 1px solid #ccc;
		height: 25px;
		color: #999;
		padding: 0 10px;
		margin:0 7px ;
	}
</style>
