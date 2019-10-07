<template>
	<view class="detao">
		<view class="message">
			<view class="ji">
				<view class="zi">
					寄
				</view>
				<view class="jmsg">
					<view class="top">
						<view class="name">
							{{orderDetail.senders_name}}
						</view>
						<view class="phone">
							{{orderDetail.senders_mobile}}
						</view>
					</view>
					<view class="bottom">
						{{orderDetail.senders_address}}
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
							{{orderDetail.receipt_name}}
						</view>
						<view class="phone">
							{{orderDetail.receipt_mobile}}
						</view>
					</view>
					<view class="bottom">
						{{orderDetail.receipt_address}}
					</view>
				</view>
			</view>
		</view>
		<view class="list">
			<view class="bh">
				<view >
					规格
				</view>
				<view >
					{{orderDetail.weight}}kg
				</view>
			</view>
			<view class="bh">
				<view >
					物品类型
				</view>
				<view >
					{{orderDetail.goodTypeName}}
				</view>
			</view>
			<view class="bh">
				<view >
					寄件类型
				</view>
				<view >
					{{orderDetail.sendersType==1?'上门取件':'放置快递点'}}
				</view>
			</view>
			
			<view class="bh">
				<view >
					价格
				</view>
				<view class="red">
					{{parseInt(orderDetail.price)}}
				</view>
			</view>
			<view class="bh">
				<view >
					优惠券
				</view>
				<view class="red">
					<template  v-if='!hasCoupon'>
						<view @tap='getUseCoupon(orderDetail.price)'>
							请选择优惠券
						</view>
						<uni-icon type="arrowright" size="20" @tap='getUseCoupon(orderDetail.price)'></uni-icon>
					</template>
					<template  v-else>
						<view @tap='selsetCoupons'>
							{{selectPrice}}
						</view>
						<uni-icon type="arrowright" size="20"></uni-icon>
					</template>
				</view>
			</view>
		</view>
		<view class="order">
			<view class="shifu">
				实付金额:<text class="red">{{payPrice}}</text>
			</view>
			<view class="goOrder" @tap='goOrder'>
				去支付
			</view>
		</view>
	</view>
</template>

<script>
	import {saveMemberOrder,getUseCoupon} from '@/api/api'
	import {
		showToast
	} from '@/assets/js/common'
	export default {
		data() {
			return {
				orderDetail:{}, 
				// couponsId:0
				selectCoupon:{},
				selectPrice:"请选择优惠券",
				hasCoupon:false,
				couponList:[],
				payPrice:''
			};
		},
		onLoad(option){
			this.orderDetail=JSON.parse(option.orderDetail)
			this.payPrice=this.orderDetail.price
			// //防止页面刷新时候还保存
			// if(uni.getStorageSync('selectCoupon')){
			// 	uni.removeStorageSync('selectCoupon')
			// }
		},
		onShow(){
			if(uni.getStorageSync('selectCoupon')){
				this.selectCoupon=uni.getStorageSync('selectCoupon')
				// this.selectPrice=this.selectCoupon.amount+'元'
				// this.orderDetail.price=this.orderDetail.price-this.selectCoupon.amount
			}
		},
		watch:{
			'selectCoupon.id'(n){
				console.log(n)
				this.selectPrice=this.selectCoupon.amount+'元'
				this.payPrice=this.orderDetail.price-this.selectCoupon.amount
			}
		},
		onUnload() {
			uni.removeStorageSync('selectCoupon')
			this.hasCoupon=false
		},
		methods:{
			goOrder(){
				let orderDetail=this.orderDetail;
				orderDetail.couponsId=0
				if(JSON.stringify(this.selectCoupon)!=='{}'){
					orderDetail.couponsId=this.selectCoupon.id
				}
				saveMemberOrder(orderDetail).then(res=>{
					if(res.code==0){
						uni.setStorageSync('orderDetail',orderDetail)
						uni.navigateTo({
							url:'../order/payment?paycode='+res.data
						})
					}else{
						showToast(res.msg)
					}
				}).catch(e=>{console.log(e)})
				
			},
			async getUseCoupon(totalAmout){
				let res=await getUseCoupon(totalAmout)
				console.log(res)
				if(res.code==0){
					if(res.data.length>0){
						uni.navigateTo({
							url:'../coupon/coupon?select='+JSON.stringify(res.data)
						})
						this.couponList=res.data
						this.hasCoupon=true
					}else{
						showToast('暂无可用优惠券')
					}
				}
			},
			selsetCoupons(){
				uni.navigateTo({
					url:'../coupon/coupon?select='+JSON.stringify(this.couponList)
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
