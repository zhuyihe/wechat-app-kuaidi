<template>
	<view class="global">
		<view class="tou">
			<view class="names">
				<image src="../../static/xiang.png"></image><text>西亚</text>
			</view>
			<view class="school">
				——汉口学院的小伙伴
			</view>
		</view>
		<view class="orderList">
			<view class="myorder">
				<view class="order">
					我的订单
				</view>
				<view class="allOrder">
					<text>全部订单</text>
					<uni-icon type="arrowright" size="20" color="#7a7a7a"></uni-icon>
				</view>
			</view>
			<view class="status">
				<view class="sItem sItem1" v-for="(row,index) in orderList" :key="index" @tap="toOrderList(index)">
					<image :src="row.img" mode=""></image>
					<view class="dfk">
						{{row.text}}
					</view>
				</view>
			</view>
		</view>
		<view class="orderList fuwu">
			<view class="myorder">
				<view class="order">
					我的服务
				</view>
			</view>
			<view class="status">
				<view class="sItem" v-for='(item,index) in list' :key='index'>
					<navigator :url="item.url">
						<image :src="item.img" mode="" style="width: 46upx;"></image>
						<view class="dfk">
							{{item.text}}
						</view>
					</navigator>
				</view>
			</view>
		</view>
		<view class="orderList fensi">
			<view class="myorder">
				<view class="order">
					我的粉丝
				</view>
			</view>
			<view class="mains">
				<view class="main">
					<view class="count">
						88
					</view>
					<view class="fs">
						我的粉丝
					</view>
				</view>
				<view class="main">
					<view class="count">
						88
					</view>
					<view class="fs">
						我的访问
					</view>
				</view>
			</view>
		</view>
		<view class="orderList shouru">
			<view class="myorder">
				<view class="order">
					我的收入(元)
				</view>
				<view class="order">
					<uni-icon type="arrowright" size="20" color="#666"></uni-icon>
				</view>
			</view>
			<view class="tx">
				<view class="left">
					<view class="main main1">
						<view class="count">
							88.00
						</view>
						<view class="fs">
							今日(元)
						</view>
					</view>
					<view class="mains">
						<view class="main">
							<view class="count">
								188.00
							</view>
							<view class="fs">
								本月(元)
							</view>
						</view>
						<view class="main">
							<view class="count">
								288.00
							</view>
							<view class="fs">
								累计(元)
							</view>
						</view>
					</view>
				</view>
				<view class="mainsss">
					<view class="count red">
						188.00
					</view>
					<view class="fs">
						可提现余额
					</view>
					<view class="txs">
						提现
					</view>
				</view>
			</view>
		</view>
		<view class="orderList rz">
			<view class="status">
				<view class="sItems">
					<image src="../../static/gys.png" mode=""></image>
					<view class="dfk">
						供应商入驻
					</view>
				</view>
				<view class="sItems">
					<image src="../../static/hehuo.png" mode=""></image>
					<view class="dfk">
						校园合伙人
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniIcon from '@/components/uni-icon/uni-icon.vue'
	export default {
		components: {
			uniIcon
		},
		data() {
			return {
				// 订单类型
				orderList:[
					{text:'待付款',img:"../../static/pay.png"},
					{text:'运输中',img:"../../static/paijian.png"},
					{text:'已签收',img:"../../static/qs.png"},
				],
				list:[
					{url:'../../pageStatic/address/address',text:'收货地址',img:"../../static/dzhi.png"},
					{url:'../../pageStatic/address/address',text:'优惠券',img:"../../static/youhui.png"},
					{url:'../../pageStatic/transactions/transactions',text:'二手交易',img:"../../static/er.png"},
					{url:'../../pageStatic/bbs/bbs',text:'校园论坛',img:"../../static/xy.png"},
					{url:'../../pageStatic/address/address',text:'分享',img:"../../static/fx.png"},
					{url:'../../pageStatic/address/address',text:'常见问题',img:"../../static/cj.png"},
					{url:'../../pageStatic/address/address',text:'奖励金攻略',img:"../../static/gl.png"}
				]
			};
		},
		methods: {
			toOrderList(index){
				uni.setStorageSync('tbIndex',index);
				uni.navigateTo({url:'../../pageStatic/order_list/order_list?tbIndex='+index}) 
			},
		},
	}
</script>

<style lang="scss" scoped>
	.global {
		margin-bottom: 100upx;
	}

	.tou {
		height: 240upx;
		background: #ffd84d;
		// display: flex;
		align-items: center;
		padding-left: 55upx;
		padding-right: 25upx;

		.names {
			align-items: center;
			font-size: 36upx;
			padding-top: 40upx;
			font-weight: bold;
			display: flex;

			image {
				width: 120upx;
				height: 120upx;
				margin-right: 30upx;
			}
		}

		.school {
			text-align: right;
			font-size: 28upx;
		}
	}

	.orderList {
		width: 700upx;
		margin-left: 25upx;
		position: relative;
		top: -25upx;
		background: #fff;
		border-radius: 6px;
		padding-bottom: 30upx;
		box-shadow: 0 2px 4px 0 #C6CFD7;
		.myorder {
			display: flex;
			padding: 0 45upx;
			line-height: 100upx;
			justify-content: space-between;
			.order {
				font-size: 32upx;
				color: #333;
			}
			.allOrder {
				color: #7a7a7a;
				display: flex;
				align-items: center;
				font-size: 28upx;

			}
		}
	}
	.status {
		display: flex;
		margin-top: 20upx;
		padding: 0 25upx;

		// justify-content: space-between;
		.sItem {
			text-align: center;
			font-size: 26upx;
			color: #333;
			line-height: 40upx;
			width: 25%;
			image {
				width: 56upx;
				height: 50upx;
			}
		}
		.sItem1{
			width: 33.3%;
			}
	}
	.fuwu {
		flex-direction: row-reverse;
		top: 10upx;
		.status {
			padding: 0;
			flex-wrap: wrap;
			.sItem {
				margin-bottom: 35upx;
			}
		}
	}

	.fensi {
		top: 35upx;
		padding-bottom: 0;

		.myorder {
			border-bottom: 1px solid #e0e0e0;
		}

		.mains {
			display: flex;

			.main {
				width: 50%;
				text-align: center;
				border-right: 1px solid #e0e0e0;
				padding: 40upx 0;

				.count {
					font-size: 42upx;
				}

				.fs {
					color: #999;
					font-size: 26upx;
					line-height: 40upx;
				}
			}
		}
	}

	.shouru {
		top: 65upx;
		padding-bottom: 0;

		.myorder {
			border-bottom: 1px solid #e0e0e0;
		}
	}

	.tx {
		align-items: center;
		text-align: center;
		display: flex;
		.left {
			width: 60%;
			border-right: 1px solid #e0e0e0;
			.main1 {
				border-bottom: 1px solid #e0e0e0;
				padding:15upx 0 ;
			}
		}
		.mains {
			display: flex;
			padding:15upx 0 ;
			.main {
				text-align: center;
				width: 50%;
			}
		}
		.mainsss {
			width: 40%;
		}
		.fs {
			color: #999;
			font-size: 26upx;
			line-height: 40upx;
		}
		.txs{
			width: 100upx;
			font-size: 28upx;
			margin: auto;
			line-height: 40upx;
			border: 1px solid #d32222;
			color: #d32222;
			border-radius: 20upx;
			margin-top: 10upx;
		}
		.red{
			color: #d32222;
		}
	}
	.rz{
		top: 85upx;
		padding: 20upx 0;
		.sItems{
			text-align: center;
			font-size: 30upx;
			width: 50%;
			image{
				width: 56upx;
				height: 48upx;
			}
		}
	}
</style>
