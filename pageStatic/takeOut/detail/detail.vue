<template>
	<view class="row">
		<view class="li">
			<view class="item">
				<view class="content">
					烤肉饭
				</view>
			</view>
			<view class="detail">
				<view >
					蒸肉饭:<text>15元</text>
				</view>
				<view >
					鸡腿饭:<text>14元</text>
				</view>
				<view >
					豆角茄子:<text>16元</text>
				</view>
				<view >
					鱼香肉丝:<text>22元</text>
				</view>
				<view >
					辣椒炒肉:<text>22元</text>
				</view>
				<view >
					干锅花菜:<text>20元</text>
				</view>
				<view >
					水煮肉片:<text>22元</text>
				</view>
			</view>
			<view class="bottoms">
				<view class="detai" @tap="isOpen(true)">
					查看详情
				</view>
				<view class="tel" @tap="call">
					拨号订餐
				</view>
			</view>
			
		</view>
		<uni-popup ref="popup" type="bottom">
			<view class="header">
				<!-- <view class="header1"></view> -->
				<view class="header2"></view>
				<view class="header3" @tap="isOpen(false)"><uni-icon type="closeempty" size="20"  ></uni-icon></view>
			</view>
			<view class="contents">
				<image src="../../../static/detail.png" mode=""></image>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	import uniIcon from '@/components/uni-icon/uni-icon.vue'
	export default {
		components:{
			uniPopup,
			uniIcon
		},
		data() {
			return {
				
			}
		},
		methods: {
			call(){
				uni.makePhoneCall({
				    phoneNumber: '114' //仅为示例
				});
			},
			isOpen(value){
				if(value){
					console.log(this.$refs)
					this.$refs.popup.open()
				}else{
					this.$refs.popup.close()
				}
				
			}
		}
	}
</script>

<style lang="scss" scoped>
.item{
	font-size: 30upx;
	color: #333;
	line-height: 50upx;
	padding: 20upx;
	border-radius: 6upx;
	margin-bottom: 30upx;
	background: #fff;
	
}
.header{
		width: 100%;
		display: flex;
		// border-bottom: 1px solid #e0e0e0;
		align-items: center;
		line-height: 80upx;
		font-size: 30upx;
		.header1,.header3{
			width: 10%;
		}
		.header2{
			width: 90%;
			text-align: center;
			margin-left: 30px;
			
		}
	}
.time{
	text-align: right;
	color: #999;
}
.row{
	padding:0 25upx; 
	padding-top: 30upx;
}
	
.detail{
	font-size: 30upx;
	color: #666;
	line-height: 60upx;
	border-radius: 6upx;
	background: #fff;
	padding: 20upx;
}
.bottoms{
	display: flex;
	position: absolute;
	bottom: 0;
	left: 0;
	z-index: 1;
	width: 100%;
	view{
		width: 50%;
		background: #ffd84d;
		color: #000;
		line-height: 90upx;
		text-align: center;
		&:nth-child(1){
			border-right: 1px solid #ccc;
		}
	}
	}
	.contents{
		overflow: scroll;
		height: 96vh;
		image{
			width: 100%;
			height: 100%;
		}
	}
</style>
