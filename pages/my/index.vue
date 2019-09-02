<template>
	<view class="global">
		<view class="tou">
			<view class="names">
				<image src="https://6465-dev-iey4o-1257667322.tcb.qcloud.la/xiang.png?sign=e2aec6f0952adc062e281a29677467a6&t=1567395046"></image><text>西亚</text>
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
			<view class="myorder" @tap="toFans">
				<view class="order">
					我的粉丝
				</view>
				<view class="order" >
					<uni-icon type="arrowright" size="20" color="#666"></uni-icon>
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
			<view class="myorder" @tap="income">
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
				<view class="sItems" @tap="gogong('enter')">
					<image src="https://6465-dev-iey4o-1257667322.tcb.qcloud.la/gys.png?sign=7329a4585f019bf5815fc8f9414e0902&t=1567395079" mode=""></image>
					<view class="dfk">
						供应商入驻
					</view>
				</view>
				<view class="sItems" @tap="gogong('hehuo')">
					<image src="https://6465-dev-iey4o-1257667322.tcb.qcloud.la/hehuo.png?sign=796ae9a52fb7f619923a66d5004e9b10&t=1567395095" mode=""></image>
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
					{text:'待付款',img:"https://6465-dev-iey4o-1257667322.tcb.qcloud.la/pay.png?sign=4764662a01d7201a5ed287b4419472f7&t=1567395117"},
					{text:'运输中',img:"https://6465-dev-iey4o-1257667322.tcb.qcloud.la/paijian.png?sign=f5d824d5992303521d0cbcceaec1d706&t=1567395129"},
					{text:'已签收',img:"https://6465-dev-iey4o-1257667322.tcb.qcloud.la/qs.png?sign=6dd6c1770cbc17b4efdf714d354a8c78&t=1567395141"},
				],
				list:[
					{url:'../../pageStatic/address/address',text:'收货地址',img:"https://6465-dev-iey4o-1257667322.tcb.qcloud.la/dzhi.png?sign=2bcc9cbd71082c0e870da85f763997b2&t=1567395331"},
					{url:'../../pageStatic/discount/discount',text:'优惠券',img:"https://6465-dev-iey4o-1257667322.tcb.qcloud.la/youhui.png?sign=7e5672f131a0b99a4d2016cd5a053fd3&t=1567395350"},
					{url:'../../pageStatic/transactions/transactions?state=my',text:'二手交易',img:"https://6465-dev-iey4o-1257667322.tcb.qcloud.la/er.png?sign=8d3e7d22db8c871bfa92a0a04d1e2407&t=1567395373"},
					{url:'../../pageStatic/bbs/bbs?state=my',text:'校园论坛',img:"https://6465-dev-iey4o-1257667322.tcb.qcloud.la/xy.png?sign=cbce07233b739b4ff59a1a0fefa475e7&t=1567395384"},
					{url:'../../pageStatic/share/share',text:'分享',img:"https://6465-dev-iey4o-1257667322.tcb.qcloud.la/fx.png?sign=b09897ebaffa309a82a50d65c336b4fe&t=1567395421"},
					{url:'../../pageStatic/question/question',text:'常见问题',img:"https://6465-dev-iey4o-1257667322.tcb.qcloud.la/cj.png?sign=27f62b2b9bfa03a084897fea160db145&t=1567400289"},
					{url:'../../pageStatic/question/question',text:'奖励金攻略',img:"https://6465-dev-iey4o-1257667322.tcb.qcloud.la/gl.png?sign=aff994d6f96384edafe7b00bf2ee935c&t=1567400304"}
				]
			};
		},
		methods: {
			toOrderList(index){
				uni.setStorageSync('tbIndex',index);
				uni.navigateTo({url:'../../pageStatic/order_list/order_list?tbIndex='+index}) 
			},
			toFans(){
				uni.navigateTo({url:'../../pageStatic/fans/fans'}) 
			},
			income(){
				uni.navigateTo({url:'../../pageStatic/incomes/incomes'}) 
			},
			gogong(state){
				uni.navigateTo({url:'../../pageStatic/detial/detial?state='+state}) 
			}
		},
	}
</script>

<style lang="scss" scoped>
	.global {
		padding-bottom: 100upx;
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
				padding: 32upx 0;
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
