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
					<text @tap="toOrderList(-1)">全部订单</text>
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
					<template v-if='item.url'>
						<navigator :url="item.url">
							<image :src="item.img" mode="" style="width: 46upx;"></image>
							<view class="dfk">
								{{item.text}}
							</view>
						</navigator>
					</template>
					<template v-else>
						<view @tap='doSomething(item.text)'>
							<image :src="item.img" mode="" style="width: 56upx;"></image>
							<view class="dfk">
								{{item.text}}
							</view>
						</view>
					</template>

				</view>
			</view>
		</view>
		<view class="orderList fensi">
			<view class="myorder" @tap="toFans">
				<view class="order">
					我的粉丝
				</view>
				<view class="order">
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
					<image src="https://6465-dev-iey4o-1257667322.tcb.qcloud.la/gys.png?sign=7329a4585f019bf5815fc8f9414e0902&t=1567395079"
					 mode=""></image>
					<view class="dfk">
						供应商入驻
					</view>
				</view>
				<view class="sItems" @tap="gogong('hehuo')">
					<image src="https://6465-dev-iey4o-1257667322.tcb.qcloud.la/hehuo.png?sign=796ae9a52fb7f619923a66d5004e9b10&t=1567395095"
					 mode=""></image>
					<view class="dfk">
						校园合伙人
					</view>
				</view>
			</view>
		</view>
		<hchPoster ref="hchPoster" :canvasFlag.sync="canvasFlag" @cancel="canvasCancel" :posterObj.sync="posterData"/>
		<view :hidden="canvasFlag"><!-- 海报 要放外面放组件里面 会找不到 canvas-->
			<canvas class="canvas"  canvas-id="myCanvas" ></canvas><!-- 海报 -->
		</view>
	</view>
</template>

<script>
	import {
		showToast,
		showModal
	} from '@/assets/js/common'
	import hchPoster from '@/components/hch-poster/hch-poster.vue'
	export default {
		components:{
		hchPoster
		},
		data() {
			return {
				// 订单类型
				orderList: [{
						text: '待付款',
						img: "https://6465-dev-iey4o-1257667322.tcb.qcloud.la/pay.png?sign=4764662a01d7201a5ed287b4419472f7&t=1567395117"
					},
					{
						text: '运输中',
						img: "https://6465-dev-iey4o-1257667322.tcb.qcloud.la/paijian.png?sign=f5d824d5992303521d0cbcceaec1d706&t=1567395129"
					},
					{
						text: '已签收',
						img: "https://6465-dev-iey4o-1257667322.tcb.qcloud.la/qs.png?sign=6dd6c1770cbc17b4efdf714d354a8c78&t=1567395141"
					},
				],
				list: [{
						text: '收货地址',
						img: "https://6465-dev-iey4o-1257667322.tcb.qcloud.la/dzhi.png?sign=3ed3aeb9ca26eaf498a1e8dfaa529551&t=1568940353"
					},
					{
						url: '../../pageStatic/discount/discount',
						text: '优惠券',
						img: "https://6465-dev-iey4o-1257667322.tcb.qcloud.la/youhui.png?sign=7e5672f131a0b99a4d2016cd5a053fd3&t=1567395350"
					},
					{
						url: '../../pageStatic/transactions/transactions?state=my',
						text: '二手交易',
						img: "https://6465-dev-iey4o-1257667322.tcb.qcloud.la/er.png?sign=8d3e7d22db8c871bfa92a0a04d1e2407&t=1567395373"
					},
					{
						url: '../../pageStatic/bbs/bbs?state=my',
						text: '校园论坛',
						img: "https://6465-dev-iey4o-1257667322.tcb.qcloud.la/xy.png?sign=cbce07233b739b4ff59a1a0fefa475e7&t=1567395384"
					},
					{
						// url: '../../pageStatic/share/share',
						text: '分享',
						img: "https://6465-dev-iey4o-1257667322.tcb.qcloud.la/fx.png?sign=b09897ebaffa309a82a50d65c336b4fe&t=1567395421"
					},
					{
						url: '../../pageStatic/question/question?type=1',
						text: '常见问题',
						img: "https://6465-dev-iey4o-1257667322.tcb.qcloud.la/cj.png?sign=27f62b2b9bfa03a084897fea160db145&t=1567400289"
					},
					{
						url: '../../pageStatic/question/question?type=2',
						text: '奖励金攻略',
						img: "https://6465-dev-iey4o-1257667322.tcb.qcloud.la/gl.png?sign=aff994d6f96384edafe7b00bf2ee935c&t=1567400304"
					}
				],
				deliveryFlag: false,
				canvasFlag: true,
				posterData:{}
			};
		},
		methods: {
			toOrderList(index) {
				console.log(index)
				if (index == 1) {
					index = 2
				} else if (index == 2) {
					index = 3
				}
				uni.setStorageSync('tbIndex', index);
				uni.navigateTo({
					url: '../../pageStatic/order_list/order_list?tbIndex=' + index
				})
			},
			toFans() {
				uni.navigateTo({
					url: '../../pageStatic/fans/fans'
				})
			},
			income() {
				uni.navigateTo({
					url: '../../pageStatic/incomes/incomes'
				})
			},
			gogong(state) {
				uni.navigateTo({
					url: '../../pageStatic/detial/detial?state=' + state
				})
			},
			doSomething(text){
				if(text!=='分享'){
					uni.chooseAddress({
						success:res=>{
						},
						fail:e=>{
							uni.getSetting({
								success:set=>{
									if(!set.authSetting['scope.address']){
										uni.showModal({
											title:'警告',
											content:'系统无法访问您的地址,将无法享受快递寄件功能。',
											showCancel:false,
											success:res=>{
												console.log(res)
												if(res.confirm){
													uni.openSetting({
															success:re=> {
																console.log(re)
															},
															fail:e=>{
																console.log(e)
															}
														})
												}
											}
										})
									}
								},
								fail:e=>{
									
								}
							})
						}
					})
				}else{
					// 这个是固定写死的小程序码
					Object.assign(this.posterData,
					{
						url:'https://img0.zuipin.cn/mp_zuipin/poster/hch-pro.jpg',//商品主图
						icon:'https://img0.zuipin.cn/mp_zuipin/poster/hch-hyj.png',//醉品价图标
						title:"诗酒茶系列 武夷大红袍 2018年 花香型中火 一级 体验装 16g",//标题
						discountPrice:"250.00",//折后价格
						orignPrice:"300.00",//原价
						code:'https://img0.zuipin.cn/mp_zuipin/poster/hch-code.png',//小程序码
					})
					this.$forceUpdate();//强制渲染数据
					setTimeout(()=>{
						this.canvasFlag=false;//显示canvas海报
						this.deliveryFlag = false;//关闭分享弹窗
						this.$refs.hchPoster.createCanvasImage();//调用子组件的方法
					},500)
					// 这个是固定写死的小程序码 end
					// 以下是根据后端接口动态生成小程序码
					// let code="https://img0.zuipin.cn/mp_zuipin/poster/hch-code.png";
					// this.codeImg().then((res)=>{
					// 	code = res;
					// 	Object.assign(this.posterData,
					// 	{
					// 		url:'https://img0.zuipin.cn/mp_zuipin/poster/hch-pro.jpg',//商品主图
					// 		icon:'https://img0.zuipin.cn/mp_zuipin/poster/hch-hyj.png',//醉品价图标
					// 		title:"诗酒茶系列 武夷大红袍 2018年 花香型中火 一级 体验装 16g",//标题
					// 		discountPrice:"250.00",//折后价格
					// 		orignPrice:"300.00",//原价
					// 		code:code,//小程序码
					// 	})
					// 	this.$forceUpdate();//强制渲染数据
					// 	setTimeout(()=>{
					// 		this.canvasFlag=false;//显示canvas海报
					// 		this.deliveryFlag = false;//关闭分享弹窗
					// 		this.$refs.hchPoster.createCanvasImage();//调用子组件的方法
					// 	},500)
					// })
					// 以下是根据后端接口动态生成小程序码 end
				}
				
			},
			// 获取海报的小程序码
			codeImg(){
				return new Promise((resolve,reject)=>{
					wx.request({
						method: 'get',
						url:'http://javaXXXXX',//自己java接口
						header: { 'Content-Type': 'application/x-www-form-urlencoded'},
						data: {
							scene:`sku=${this.sku}`,//自己的参数
							page:"pages/product/detail",//想要生成小程序码的页面地址
							width:"128px",//小程序码大小
						},
						success: res => {
						  if(res.data.code==0){
							if (res.data.code==0) {
								const fsm = wx.getFileSystemManager();
								const FILE_BASE_NAME = 'tmp_img_src';
								let filePath = `${wx.env.USER_DATA_PATH}/${FILE_BASE_NAME}.jpg`;//图片临时地址
								fsm.writeFile({
									filePath,
									data: res.data.data,
									encoding: 'binary',
									success() {
										resolve(filePath)
									},
									fail() {
										this.canvasFlag=true;
										uni.showToast({title:'海报生成失败',duration:2000,icon:'none'});
									},
								});
							} else {
								uni.showToast({title: res.data.message, icon: 'none',duration: 2000,icon:'none'})
							}
						  }else{
							this.canvasFlag=true;
							uni.showToast({title:'海报生成失败',duration:2000,icon:'none'});
						  }
						},
						fail:res=>{
						  this.canvasFlag=true;
						  uni.showToast({title:'海报生成失败',duration:2000,icon:'none'});
						}
				  })
				})
			},
			// 分享弹窗
			shareEvn() {
				this.deliveryFlag = true;
			},
			// 关闭分享弹窗
			closeShareEvn() {
				this.deliveryFlag = false;
			},
			// 取消海报
			canvasCancel(val){
				this.canvasFlag=val;
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

		.sItem1 {
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
				padding: 15upx 0;
			}
		}

		.mains {
			display: flex;
			padding: 15upx 0;

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

		.txs {
			width: 100upx;
			font-size: 28upx;
			margin: auto;
			line-height: 40upx;
			border: 1px solid #d32222;
			color: #d32222;
			border-radius: 20upx;
			margin-top: 10upx;
		}

		.red {
			color: #d32222;
		}
	}

	.rz {
		top: 85upx;
		padding: 20upx 0;

		.sItems {
			text-align: center;
			font-size: 30upx;
			width: 50%;

			image {
				width: 56upx;
				height: 48upx;
			}
		}
	}
	.canvas{
	    position: fixed !important;
	    top: 0 !important;
	    left: 0 !important;
	    display: block !important;
	    width: 100% !important;
	    height: 100% !important;
	    z-index: 10;
	}
</style>
