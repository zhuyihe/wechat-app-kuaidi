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
					编号
				</view>
				<view >
					{{orderDetail.orderCode}}
				</view>
			</view>
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
			<view class="bh" v-if='orderDetail.sendersType==1'>
				<view >
					快递放置点
				</view>
				<view class="red">
					{{orderDetail.expressAddress}}
				</view>
			</view>
			<view class="bh">
				<view >
					价格
				</view>
				<view class="red">
					{{orderDetail.payPrice}}
				</view>
			</view>
			<view class="bh" v-if='orderDetail.couponsId!=0'>
				<view >
					优惠券
				</view>
				<view class="red">
					<view>
						
					</view>
					<uni-icon type="arrowright" size="=20"></uni-icon>
				</view>
			</view>
			<view class="bh" v-if="state!='seeCode'"> 
				<view >
					剩余支付时间
				</view>
				<view class="red">
					<view>
						<uni-count-down :show-day="false" :show-hour="false"  :minute="minute" :second="second" color="#cf1111" />
						<!-- 15:00 -->
					</view>
				</view>
			</view>
		</view>
		<view class="order" v-if="state!='seeCode'">
			<view style="width: 50%;text-align: center;background: white;"  @tap='canclOrder(paycode)'>
				取消订单
			</view>
			<view class="goOrder" @tap='goOrder' style="width: 50%;">
				立即支付
			</view>
		</view>
	</view>
</template>

<script>
	import uniCountDown from '@/components/uni-countdown/uni-countdown.vue'
	import {memberOrderDetail,delmemberOrder} from '@/api/api'
	import {
		showModal,
		showToast
	} from '@/assets/js/common'
	export default {
		data() {
			return {
				orderDetail:{},
				minute:0,
				second:0,
				paycode:'',
				state:'',//进入页面的路径
			};
		},
		components:{
			uniCountDown
		},
		onLoad(option){
			console.log(option)
			this.paycode=option.paycode
			this.memberOrderDetail(this.paycode)
			this.state=option.state
		},
		methods:{
			// goOrder(){
			// 	uni.navigateTo({
			// 		url:'../paySuccess/paySuccess'
			// 	})
			// }
			memberOrderDetail(paycode){
				memberOrderDetail(paycode).then(res=>{
					console.log(res)
					if(res.code==0){
						this.orderDetail=res.data
						console.log(res.data.payTime)
						if(this.state!='seeCode'){
							this.minute=Number(res.data.payTime.split(':')[0])
							this.second=Number(res.data.payTime.split(':')[1])
						}
					}
				})
			},
			canclOrder(paycode){
				showModal('取消订单','您确认要取消订单吗？','确认',true).then(res=>{
					delmemberOrder(paycode).then(res=>{
						console.log(res)
						if(res.code==0){
							showToast('订单取消成功')
							setTimeout(()=>{
								uni.navigateBack({
									delta:2
								})
							},1000)
						}
					}).catch(e=>{
						console.log(e)
					})
				}).catch(e=>{console.log(e)})
			}
		}
	}
</script>

<style lang="scss">
		
	.detao{
		padding-bottom: 55px;
	}
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
			width: 100%;
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
