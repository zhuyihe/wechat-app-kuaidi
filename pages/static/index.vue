<template name="basics">
	<view class="page">
		<!-- <scroll-view scroll-y class="page"> -->
		<view class="location" @tap="toLocation">
			<image class="locationImg" src="https://6465-dev-iey4o-1257667322.tcb.qcloud.la/location1.png?sign=922f5ce57a2fe8093cb9ab273e0ce7f5&t=1567400339"></image>
			<text class="xue">{{schoolName}}</text>
			<image class="locationImgxia" src="https://6465-dev-iey4o-1257667322.tcb.qcloud.la/xia.png?sign=70c596069d17237b0b99b161b87a700b&t=1567400365"></image>
		</view>
		<bw-swiper :swiperList="swiperList" indicatorActiveColor="#ff0000" @clickItem="clickItem" style="width:100%" :textTip="true"
		 :swiperType='true'> </bw-swiper>
		<button class="kf_button" open-type="contact" session-from="weapp">
			<image class="kf_image" src="https://6465-dev-iey4o-1257667322.tcb.qcloud.la/ke.png?sign=edb4e8aaaf95a8ad3378d9e537a5b322&t=1567400491"></image>
		</button>
		<view class="jijian">
			<view class="text">
				寄件
			</view>
			<view class="kuaidi">
				<view class="ji">
					<view class="text">寄</view>
					<view class="msg" @tap="adress" v-if='!isAddJi'>
						请添加寄件人信息
					</view>
					<view class="msgj" v-else>
						<view class="top">
							<view class="name">
								朱依禾
							</view>
							<view class="phone">
								18186140272
							</view>
						</view>
						<view class="bottom">
							大旗网大旗网大旗网大旗网
						</view>
					</view>
					<uni-icon type="arrowright" size="20" color="#7a7a7a"></uni-icon>
				</view>
				<view class="shou">
					<text class="text">收</text>
					<view class="msg" @tap="adressEdit" v-if='!isAddShou'>
						请添加寄件人信息
					</view>
					<view class="msgj" v-else>
						<view class="top">
							<view class="name">
								朱依禾
							</view>
							<view class="phone">
								18186140272
							</view>
						</view>
						<view class="bottom">
							大旗网大旗网大旗网大旗网
						</view>
					</view>
					<uni-icon type="arrowright" size="20" color="#7a7a7a"></uni-icon>
				</view>
			</view>
			<view class="zl">
				<view class="zl1">
					<view class="zl1-z">
						预估重量
					</view>
					<view class="jisuan">
						<image src="https://6465-dev-iey4o-1257667322.tcb.qcloud.la/reduce.png?sign=431bbafe6460c79eae46b56a4a919347&t=1567400431"
						 class="li" @tap="reduce"></image>
						<view class="kg">
							{{Number(weight)}}<text class="zi">kg</text>
						</view>
						<image src="https://6465-dev-iey4o-1257667322.tcb.qcloud.la/add.png?sign=ac27fca13dfdb3d8182b70f8604ecf15&t=1567400451"
						 @tap="add"></image>
					</view>
				</view>
				<view class="zl1">
					<view class="zl1-z">
						物品类型
					</view>
					<view class="msgs" @tap="selectSort(1)">
						{{sorts.value}}
					</view>
					<uni-icon type="arrowright" size="20" color="#7a7a7a"></uni-icon>
				</view>
			</view>
			<view class="ji ji1">
				<text class="lx">寄件类型</text>
				<view class="msg" @tap="selects(1)">
					{{to.value}}
				</view>
				<uni-icon type="arrowright" size="20" color="#7a7a7a"></uni-icon>
				<!-- <image class="jiImg" src="https://6465-dev-iey4o-1257667322.tcb.qcloud.la/back.png?sign=e2ed5ca23c61802cdc29ddc98331c87f&t=1567400389"></image> -->
			</view>
			<view class="xiadan">
				<view class="yf">
					预估运费：<text class="mon">0.00</text>
				</view>
				<view class="go" @tap="order">
					立即下单
				</view>
			</view>
		</view>
		<uni-popup ref="popup" type="bottom">
			<select-sort @closePo='selectSort' @comfirmSort='comfirmSort'></select-sort>
		</uni-popup>
		<uni-popup ref="popup1" type="bottom">
			<select-sort1 @close='selects' @comfirmJi='comfirmJi'></select-sort1>
		</uni-popup>
	</view>
</template>

<script>
	import {
		getStorageSync
	} from '@/assets/js/common';
	import {
		showToast,
		showModal
	} from '@/assets/js/common'
	import bwSwiper from '@/components/bw-swiper/bw-swiper.vue'
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	import uniIcon from '@/components/uni-icon/uni-icon.vue'
	import selectSort from '@/components/selectSort.vue'
	import selectSort1 from '@/components/selectSort1.vue'
	export default {
		components: {
			bwSwiper,
			uniPopup,
			uniIcon,
			selectSort,
			selectSort1
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
				}],
				weight: 1,
				to: {
					value: '请选择寄件类型'
				},
				sorts: {
					value: '物品类型'
				},
				isAddJi: false, //是否添加寄件人信息
				isAddShou: false, //是否添加收件人信息
				schoolName:""
			};
		},
		created() {
			// this.goToselectarea()
		},
		methods: {
			toLocation() {
				uni.navigateTo({
					url: '../../pageStatic/location/location?schoolName='+this.schoolName
				})
			},
			//选择物品类型
			selectSort(value) {
				if (value == 1) {
					this.$refs.popup.open()
				} else {
					this.$refs.popup.close()
				}

			},
			selects(value) {
				console.log(value)
				if (value == 1) {
					this.$refs.popup1.open()
				} else {
					this.$refs.popup1.close()
				}
			},
			reduce() {
				this.weight <= 1 ? showToast('您的重量不符合标准') : this.weight--

			},
			add() {
				this.weight++
			},
			adress() {
				uni.navigateTo({
					url: '../../pageStatic/address/address'
				})
			},
			comfirmSort(data) {
				// console.log(data)
				this.sorts = data
				this.$refs.popup.close()
			},
			comfirmJi(data) {
				// console.log(data)
				this.to = data
				this.$refs.popup1.close()
			},
			adressEdit() {
				let isDefult = false
				let title = '添加收件人地址'
				let state = 'shou'
				uni.navigateTo({
					url: `../../pageStatic/address/edit/edit?isDefult=${isDefult}&title=${title}&state=${state}`
				})
			},
			order() {
				uni.navigateTo({
					url: '../../pageStatic/order/order'
				})
			},
			goToselectarea() {
				showModal('提示', "小程序检测您还未还未选择当前院校，无法体验完整功能。", '去选择', false).then(res => {
					uni.navigateTo({
						url: '../../pageStatic/location/location?schoolName='+this.schoolName
					})
				})
			}
		}
	};
</script>

<style scoped lang="scss">
	.page {
		background: #f5f5f5;
		padding-bottom: 30px;
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
		margin-bottom: 20px;
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
		padding-left: 30rpx;
		background: white;
		padding-top: 20px;
		box-shadow: 0 2px 4px 0 #C6CFD7;
		border-radius: 10px;
		padding-bottom: 20px;
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
		align-items: center;
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
			height: 45px;
		}

	}

	.msg {
		border-bottom: 1px solid #ccc;
		line-height: 35px;
		margin-left: 10px;
		color: #999;
		width: 76%;
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
		align-items: center;

		.text {
			line-height: 45px;
			width: 45px;
			border-radius: 50%;
			text-align: center;
			background: #ffd84d;
			color: black;
			display: block;
			font-size: 20px;
			height: 45px;
		}
	}

	.zl {
		display: flex;
		margin-top: 30px;
	}

	.zl1 {
		width: 49%;
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

	.msgj {
		width: 75%;
		margin-left: 10px;
		color: #666;
		font-size: 28upx;

		.top {
			display: flex;
			justify-content: space-between;
			padding-right: 10px;
		}

		.bottom {
			border-bottom: 1px solid #ccc;
			line-height: 70upx;
		}
	}
</style>
