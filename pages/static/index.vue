<template name="basics">
	<view class="page">
		<!-- <scroll-view scroll-y class="page"> -->
		<view class="location" @tap="toLocation">
			<image class="locationImg" src="../../static/location1.png"></image>
			<text class="xue">武汉大学</text>
			<image class="locationImgxia" src="../../static/xia.png"></image>
		</view>
		<bw-swiper :swiperList="swiperList" indicatorActiveColor="#ff0000" @clickItem="clickItem" style="width:100%" :textTip="true"
		 :swiperType='true'> </bw-swiper>
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
					<view class="zl1-z">
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
					<view class="zl1-z">
						物品类型
					</view>
					<view class="msgs" @tap="selectSort(1)">
						物品类型
					</view>
					<image class="img" src="../../static/back.png"></image>
				</view>
			</view>
			<view class="ji ji1">
				<text class="lx">寄件类型</text>
				<view class="msg">
					请添加寄件人信息
				</view>
				<image class="jiImg" src="../../static/back.png"></image>
			</view>
			<view class="xiadan">
				<view class="yf">
					预估运费：<text class="mon">0.00</text>
				</view>
				<view class="go">
					立即下单
				</view>
			</view>
		</view>
		<uni-popup ref="popup" type="bottom" @change='selectPopup'>
			<select-sort @closePo='selectSort'></select-sort>
		</uni-popup>
	</view>
</template>

<script>
	import {
		getStorageSync
	} from '@/assets/js/common';
	import bwSwiper from '@/components/bw-swiper/bw-swiper.vue'
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	import uniIcon from '@/components/uni-icon/uni-icon.vue'
	import selectSort from '@/components/selectSort.vue'
	export default {
		components: {
			bwSwiper,
			uniPopup,
			uniIcon,
			selectSort
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
		},
		methods: {
			toLocation() {
				uni.navigateTo({
					url: '../../pageStatic/location/location'
				})
			},
			//选择物品类型
			selectSort(value){
				if(value==1){
					this.$refs.popup.open()
				}else{
					this.$refs.popup.close()
				}
				
			},
			selectPopup(data){
				data.show?uni.hideTabBar():uni.showTabBar()
			}
		}
	};
</script>

<style scoped lang="scss">
	.page {
		background: #f5f5f5;
		margin-bottom: 30px;
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
		margin-bottom: 20px ;
		padding-top: 20px;
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
		margin-top: 30px;
		font-size: 30rpx;
		padding-left: 40rpx;
		background: white;
		padding-top: 30px;
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
		margin-top: 30px;
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
		margin-top: 30px;

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

	.zl {
		display: flex;
		margin-top: 30px;
	}

	.zl1 {
		width: 50%;
		display: flex;

		// font-size: 26rpx;
		.img {
			width: 12px;
			height: 20px;
		}
	}

	.jisuan {
		display: flex;

		.li {
			margin-left: 10px;
		}

		.kg {
			margin: 0 8px;
		}

		.zi {
			font-size: 24rpx;
			color: #666;
		}
	}

	.jisuan image {
		width: 40rpx;
		height: 40rpx;
	}

	.msgs {
		border-bottom: 1px solid #ccc;
		height: 25px;
		color: #999;
		padding: 0 10px;
		// margin:0 7px ;
	}

	.lx {
		font-size: 16px;
		line-height: 30px;
	}

	.ji1 {
		margin-top: 30px;
	}

	.ji1 .msg {
		width: 70%;
		line-height: 30px;
		text-align: center;
		padding-bottom: 0;
	}

	.ji1 .jiImg {
		margin-top: 10px;
	}

	.xiadan {
		display: flex;
		justify-content: space-between;
		margin-top: 30px;
		margin-right: 25px;
		line-height: 35px;
	}

	.go {
		width: 80px;
		background: #b0b0b0;
		border-radius: 5px;
		text-align: center;
	}

	.mon {
		color: #cf1111;
	}
</style>
