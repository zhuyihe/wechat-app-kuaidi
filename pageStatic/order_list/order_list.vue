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
			<view class="list">
				<view class="onorder" v-if="orderList.length==0||!orderList">
					<image src="https://6465-dev-iey4o-1257667322.tcb.qcloud.la/noorder.png?sign=053b745ab238f7558c57ddc8ef71f5e4&t=1568446821"></image>
				</view>
				<template v-else>
					<view class="row" v-for="(row,index) in orderList" :key="index">
						<view class="top">
							<view class="bh">
								<text>编号:{{row.orderCode}}</text><text class="time">{{row.time}}</text>
							</view>
							<view class="orderStaus">
								{{orderType[row.orderStatus+1]}}
							</view>
						</view>
						<view class="middle">
							<view class="left">
								<view class="didian">
									{{row.senders_city}}
								</view>
								<view class="name">
									{{row.senders_name}}
								</view>
							</view>
							<view class="jw">
								<text class="tx">寄往</text><br>
								<image class="imgs" src="../../static/jt.png" mode=""></image>
							</view>
							<view class="right">
								<view class="didian">
									{{row.receipt_city}}
								</view>
								<view class="name">
									{{row.receipt_name}}
								</view>
							</view>
						</view>
						<view class="bottom">
							<view class="sf" v-if='!row.otherPrice'>
								实付:￥{{row.payPrice.toFixed(2)}}
							</view>
							<view class="sf chaji" v-else>
								补差价:￥{{row.payPrice.toFixed(2)}}
							</view>
							<view class="btns">
								<block v-if="row.orderStatus+1==1">
									<block  v-if='!row.otherPrice'>
										<view class="pay default" @tap="cancelOrder(row)">取消订单</view>
										<view class="pay" @tap="toPayment(row)" style="border: 0;background: #ffd84d;">去付款</view>
									</block>
									<block  v-else>
										<!-- <view class="default" @tap="cancelOrder(row)">取消订单</view> -->
										<view class="sf expressCode">
											{{row.expressName}}:{{row.expressCode}}
										</view>
										<view class="pay" @tap="toPayment(row,'repay')" style="border: 0;background: #ffd84d;">去补差价</view>
									</block>
									
								</block>
								<block v-if="row.orderStatus+1==2">
									<view class="pay" @tap="toPayment(row,'seeCode')" >查看详情</view>
								</block>
								<block v-if="row.orderStatus+1==3||row.orderStatus+1==4||row.orderStatus+1==5">
									<block  v-if='row.orderStatus+1!=5'>
										<view class="sf expressCode">
											{{row.expressName}}:{{row.expressCode}}
										</view>
										<view class="pay" @tap="toPayment(row,'seeCode')" style="border: 0;background: #ffd84d;">查看详情</view>
									</block>
									<block v-else>
										<view class="pay" @tap="toPayment(row,'seeCode')" >查看详情</view>
									</block>
								</block>
							</view>
						</view>
					</view>
					<view class="uni-loadmore" v-if="showLoadMore">{{loadMoreText}}</view>
				</template>
			</view>
		</view>
	</view>
</template>
<script>
	import {
		getOrderList,
		delmemberOrderById
	} from '@/api/api'
	import {
		showModal,
		showToast
	} from '@/assets/js/common'
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
				orderType: ['全部', '待付款','待发货','运输中', '已签收', '已取消'],
				//订单列表 演示数据
				orderList: [],
				tabbarIndex: 0,
				pageNo: 1,
				loadMoreText: "加载中...",
				showLoadMore: false,
			};
		},
		onLoad(option) {
			//option为object类型，会序列化上个页面传递的参数
			console.log("option: " + JSON.stringify(option));
			let tbIndex = parseInt(option.tbIndex) + 1;
			this.tabbarIndex = tbIndex;
			this.loadMoreText = "",
			this.showLoadMore = true;
			this.getOrderList(this.tabbarIndex)
		},
		onPullDownRefresh() {
			this.getOrderList(this.tabbarIndex)
			setTimeout(function () {
			            uni.stopPullDownRefresh();
			        }, 1000);
		},
		onShow(){
			uni.startPullDownRefresh({
				success() {
					setTimeout(function () {
					            uni.stopPullDownRefresh();
					        }, 1000);
				}
			})
		},
		onPageScroll(e) {
			return;
			//兼容iOS端下拉时顶部漂移
			this.headerPosition = e.scrollTop >= 0 ? "fixed" : "absolute";
		},
		onReachBottom() {
			console.log("onReachBottom");
			if(this.showLoadMore){
				this.pageNo++
				setTimeout(() => {
					this.getOrderList(this.tabbarIndex, this.pageNo)
				}, 300)
			}
		},
		methods: {
			showType(tbIndex) {
				this.tabbarIndex = tbIndex;
				this.orderList=[]
				this.loadMoreText = "",
				this.pageNo=1
				this.showLoadMore = true;
				this.getOrderList(this.tabbarIndex)
			},
			showLogistics(row) {

			},
			async getOrderList(tbIndex, pageNo = 1,isReset=false) {
				try {
					let status = tbIndex - 1;
					let parmas = {
						status: status,
						pageNo: pageNo
					}
					let res = await getOrderList(parmas)
					console.log(res)
					if (res.code == 0) {
						if(!isReset){
							if (res.data.memberOrderList) {
								if(res.data.memberOrderList.length<10){
									this.loadMoreText='没有更多数据了'
									this.showLoadMore=false
								}else{
									this.loadMoreText='正在加载中...'
									this.showLoadMore=true
								}
								this.orderList = this.orderList.concat(res.data.memberOrderList)
							} else {
								console.log(2)
								this.loadMoreText = "没有更多数据了!"
								this.showLoadMore=false
								return;
							}
						}else{
							this.orderList=res.data.memberOrderList
						}
						
					}
				} catch (e) {
					//TODO handle the exception
				}

			},
			cancelOrder(row) {
				console.log(this.tabbarIndex)
				showModal('取消订单', '确定取消此订单？', '确定', true).then(re => {
					delmemberOrderById(row.id).then(res => {
						console.log(res)
						if (res.code == 0) {
							this.getOrderList(this.tabbarIndex,1,true)
							showToast('订单取消成功')
						} else {
							showToast(res.msg)
						}
					}).catch(e => {
						console.log(e)
					})
				}).catch(e => console.log(e))
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
			toPayment(row,state) {
				//本地模拟订单提交UI效果
				uni.showLoading({
					title: '正在获取订单...'
				})
				console.log(row.id)
				setTimeout(() => {
					uni.hideLoading()
					uni.navigateTo({
						url: '../order/payment?id='+row.id+'&state='+state
					})
				}, 500)
			}
		}
	}
</script>

<style lang="scss">
	@import '../../assets/css/uni.css';
	.topTabBar {
		width: 100%;
		position: fixed;
		top: 0;
		z-index: 0;
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
	.chaji{
		color: #cc0000;
	}
	.expressCode{
		margin-right: 10upx;
	}
	.row {
		width: 700upx;
		background: #fff;
		font-size: 30upx;
		margin: 20upx auto;
		border-radius: 6px;
		margin-top: 30upx;

		&:nth-child(1) {
			margin-top: 100upx;
		}

		.top {
			display: flex;
			justify-content: space-between;
			padding: 0 20upx;
			line-height: 80upx;
			height: 80upx;

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

				.pay {
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

	.onorder {
		text-align: center;
		margin-top: 160upx;

		image {
			width: 282upx;
			height: 462upx;
		}
	}
</style>
