<template>
	<view>
		<!-- 顶部导航 -->
		<view class="topTabBar" :style="{position:headerPosition,top:headerTop}">
			<view class="grid" v-for="(grid,tbIndex) in orderType" :key="tbIndex" @tap="showType(tbIndex)">
				<view class="text" :class="[tbIndex==tabbarIndex?'on':'']">{{grid}}</view>
			</view>
		</view>
		<!-- 考虑非APP端长列表和复杂的DOM使用scroll-view会卡顿，所以漂浮顶部选项卡使用page本身的滑动 -->
		<view class="order-list">
			<view class="list" >
				<vi<!-- ew class="onorder" v-if="list.length==0">
					<image src="../../../static/noorder.png"></image>
					<view class="text">
						没有相关订单
					</view>
				</view> -->
				<view class="row" v-for="(row,index) in orderList" :key="index">
					<view class="top">
						<view class="bh">
							<text>编号:{{row.bh}}</text><text class="time">{{row.time}}</text>
						</view>
						<view class="orderStaus">
							{{typeText[row.type]}}
						</view>
					</view>
					<view class="middle">
						<view class="left">
							<view class="didian">
								{{row.now}}
							</view>
							<view class="name">
									{{row.nowname}}
							</view>
						</view>
						<view class="jw">
							<text class="tx">寄往</text><br>
							<image class="imgs" src="../../static/jt.png" mode=""></image>
						</view>
						<view class="right">
							<view class="didian">
								{{row.go}}
							</view>
							<view class="name">
								{{row.goname}}
							</view>
						</view>
					</view>
					<view class="bottom">
						<view class="sf">
							实付:￥{{row.pay}}.00
						</view>
						<view class="btns">
							<block v-if="row.type=='unpaid'">
								<view class="default" @tap="cancelOrder(row)">取消订单</view>
								<view class="pay" @tap="toPayment(row)" style="border: 0;background: #ffd84d;">付款</view>
							</block>
							<block v-if="row.type=='received'||row.type=='completed'">
								<view class="sf">
									快递编号:{{code}}
								</view>
							</block>
						</view>
					</view>

				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				headerPosition: "fixed",
				headerTop: "0px",
				typeText: {
					unpaid: '待付款',
					received: '运输中',
					completed: '已签收',
				},
				orderType: ['全部', '待付款', '运输中', '已签收'],
				//订单列表 演示数据
				orderList: [
					{
						type: "unpaid",
						now: '湖北武汉',
						go: '广东深圳',
						goname: 'zyh',
						nowname: 'zzz',
						pay: 16,
						code:'130024004300',
						time:"2019.06.10",
						bh:'A1'
					}
				],
				list: [],
				tabbarIndex: 0
			};
		},
		onLoad(option) {
			//option为object类型，会序列化上个页面传递的参数
			console.log("option: " + JSON.stringify(option));
			let tbIndex = parseInt(option.tbIndex) + 1;
			console.log(tbIndex)
			this.list = this.orderList[tbIndex];
			console.log(this.list)
			this.tabbarIndex = tbIndex;
		},
		onPageScroll(e) {
			return;
			//兼容iOS端下拉时顶部漂移
			this.headerPosition = e.scrollTop >= 0 ? "fixed" : "absolute";
		},
		methods: {
			showType(tbIndex) {
				this.tabbarIndex = tbIndex;
				this.list = this.orderList[tbIndex];
			},
			showLogistics(row) {

			},
			remindDeliver(row) {
				uni.showToast({
					title: '已提醒商家发货'
				})
			},
			cancelOrder(row) {
				uni.showModal({
					title: '取消订单',
					content: '确定取消此订单？',
					success: (res) => {
						if (res.confirm) {
							console.log('用户点击确定');
							this.doCancelOrder(row.ordersn);
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			doCancelOrder(ordersn) {
				let typeNum = this.orderList.length;
				for (let i = 0; i < typeNum; i++) {
					let list = this.orderList[i];
					let orderNum = list.length;
					if (orderNum > 0 && list[0].type == 'unpaid') {
						for (let j = 0; j < orderNum; j++) {
							if (this.orderList[i][j].ordersn == ordersn) {
								this.orderList[i][j].type = 'cancelled';
								break;
							}
						}
					}

				}
			},
			toPayment(row) {
				//本地模拟订单提交UI效果
				uni.showLoading({
					title: '正在获取订单...'
				})
				let paymentOrder = [];
				paymentOrder.push(row);
				setTimeout(() => {
					uni.setStorage({
						key: 'paymentOrder',
						data: paymentOrder,
						success: () => {
							uni.hideLoading();
							uni.navigateTo({
								url: '../../pay/payment/payment?amount=' + row.payment
							})
						}
					})
				}, 500)
			}
		}
	}
</script>

<style lang="scss">
	.topTabBar {
		width: 100%;
		position: fixed;
		top: 0;
		z-index: 10;
		background-color: #f8f8f8;
		height: 80upx;
		display: flex;
		justify-content: space-around;

		.grid {
			width: 25%;
			height: 80upx;
			display: flex;
			justify-content: center;
			align-items: center;
			background: #fff;
			color: #444;
			font-size: 28upx;

			.text {
				height: 76upx;
				display: flex;
				align-items: center;

				&.on {
					// color: #ffd84d;
					border-bottom: solid 4upx #ffd84d;
				}
			}

		}
	}

	.row {
		width: 700upx;
		background: #fff;
		font-size: 30upx;
		margin: 20upx auto;
		border-radius: 6px;

		.top {
			display: flex;
			justify-content: space-between;
			padding: 0 20upx;
			line-height: 80upx;
			height: 80upx;
			margin-top: 100upx;
			border-bottom: 1px solid #e0e0e0;
			align-items: center;

			.time {
				margin-left: 40upx;
				color: #666;
			}

			.orderStaus {
				color: #cc0000;
			}
		}

		.middle,
		.bottom {
			display: flex;
			justify-content: space-between;
			align-items: center;
		}

		.middle {
			border-bottom: 1px solid #e0e0e0;
			padding: 25upx 0;

			.imgs {
				width: 123upx;
				height: 13upx;
			}

			.left {
				text-align: left;
				line-height: 50upx;
				margin-left: 20upx;
			}

			.right {
				text-align: right;
				line-height: 50upx;
				margin-right: 20upx;
			}

			.didian {
				font-size: 28upx;
				color: #8f8f8f;
			}

			.jw {
				text-align: center;
				color: #666666;
			}
		}

		.bottom {
			height: 100upx;
			display: flex;
			justify-content: space-between;
			padding-left: 20upx;
			align-items: center;

			.btns {
				display: flex;
				align-items: center;
				justify-content: flex-end;

				view {
					height: 56upx;
					width: 140upx;
					text-align: center;
					margin-right: 20upx;
					line-height: 56upx;
					border: 1px solid #e0e0e0;
					border-radius: 10upx;
				}
			}
		}

	}

	// .order-list{
	// 	margin-top: 80upx;
	// 	padding-top: 20upx;
	// 	width: 100%;
	// 	.list{
	// 		width: 94%;
	// 		margin: 0 auto;
	// 		.onorder{
	// 			width: 100%;
	// 			height: 50vw;
	// 			display: flex;
	// 			justify-content: center;
	// 			align-content: center;
	// 			flex-wrap: wrap;
	// 			image{
	// 				width: 20vw;
	// 				height: 20vw;
	// 				border-radius: 100%;
	// 			}
	// 			.text{
	// 				width: 100%;
	// 				height: 60upx;
	// 				font-size: 28upx;
	// 				color: #444;
	// 				display: flex;
	// 				justify-content: center;
	// 				align-items: center;
	// 			}
	// 		}
	// 		.row{
	// 			width: calc(100% - 40upx);
	// 			padding: 10upx 20upx;
	// 			border-radius: 10upx;
	// 			background-color: #fff;
	// 			margin-bottom: 20upx;
	// 			.type{
	// 				font-size: 26upx;
	// 				color: #ec652f;
	// 				height: 50upx;
	// 				display: flex;
	// 				align-items: center;
	// 			}
	// 			.order-info{
	// 				width: 100%;
	// 				display: flex;
	// 				.left{
	// 					flex-shrink: 0;
	// 					width: 25vw;
	// 					height: 25vw;
	// 					image{
	// 						width: 25vw;
	// 						height: 25vw;
	// 						border-radius: 10upx;
	// 					}
	// 				}
	// 				.right{
	// 					width: 100%;
	// 					margin-left: 10upx;
	// 					position: relative;
	// 					.name{
	// 						width: 100%;
	// 						font-size: 28upx;
	// 						display: -webkit-box;
	// 						-webkit-box-orient: vertical;
	// 						-webkit-line-clamp: 2;
	// 						overflow: hidden;
	// 					}
	// 					.spec{
	// 						color: #a7a7a7;
	// 						font-size: 22upx;
	// 
	// 					}
	// 					.price-number{
	// 						position: absolute;
	// 						bottom: 0;
	// 						width: 100%;
	// 						display: flex;
	// 						justify-content: flex-end;
	// 						font-size: 22upx;
	// 						color: #333;
	// 						display: flex;
	// 						align-items: flex-end;
	// 						.price{
	// 							font-size: 24upx;
	// 							margin-right: 5upx;
	// 						}
	// 						
	// 					}
	// 				}
	// 			}
	// 			.detail{
	// 				display: flex;
	// 				justify-content: flex-end;
	// 				align-items: flex-end;
	// 				height: 60upx;
	// 				font-size: 26upx;
	// 				.sum{
	// 					padding: 0 8upx;
	// 					display: flex;
	// 					align-items: flex-end;
	// 					.price{
	// 						font-size: 30upx;
	// 					}
	// 				}
	// 				
	// 			}
	// 			.btns{
	// 				height: 80upx;
	// 				display: flex;
	// 				align-items: center;
	// 				justify-content: flex-end;
	// 				view{
	// 					min-width: 120upx;
	// 					height: 50upx;
	// 					padding: 0 20upx;
	// 					border-radius: 50upx;
	// 					display: flex;
	// 					justify-content: center;
	// 					align-items: center;
	// 					font-size: 28upx;
	// 					margin-left: 20upx;
	// 				}
	// 				.default{
	// 					border: solid 1upx #ccc;
	// 					color: #666;
	// 				}
	// 				.pay{
	// 					border: solid 1upx #ec652f;
	// 					color: #ec652f;
	// 				}
	// 			}
	// 		}
	// 	}
	// }
</style>
