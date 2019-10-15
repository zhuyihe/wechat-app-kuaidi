<template name="basics">
	<view class="page">
		<!-- <scroll-view scroll-y class="page"> -->
		<view class="location" @tap="toLocation">
			<image class="locationImg" src="https://6465-dev-iey4o-1257667322.tcb.qcloud.la/location1.png?sign=922f5ce57a2fe8093cb9ab273e0ce7f5&t=1567400339"></image>
			<text class="xue">{{schoolMsg.schoolName}}</text>
			<image class="locationImgxia" src="https://6465-dev-iey4o-1257667322.tcb.qcloud.la/xia.png?sign=70c596069d17237b0b99b161b87a700b&t=1567400365"></image>
		</view>
		<j-swiper :swiperList='swiperList'></j-swiper>
		<!-- <bw-swiper :swiperList="swiperList" indicatorActiveColor="#ff0000" @clickItem="clickItem" style="width:100%" :textTip="true"
		 :swiperType='true'> </bw-swiper> -->
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
					<view class="msgj" v-else @tap="adress">
						<view class="top">
							<view class="name">
								{{sendItem.userName}}
							</view>
							<view class="phone">
								{{sendItem.telNumber}}
							</view>
						</view>
						<view class="bottom">
							{{sendItem.detailInfo}}
						</view>
					</view>
					<uni-icon type="arrowright" size="20" color="#7a7a7a"></uni-icon>
				</view>
				<view class="shou">
					<text class="text">收</text>
					<view class="msg" @tap="adressGet" v-if='!isAddShou'>
						请添加收件人信息
					</view>
					<view class="msgj" v-else @tap="adressGet">
						<view class="top">
							<view class="name">
								{{getItem.userName}}
							</view>
							<view class="phone">
								{{getItem.telNumber}}
							</view>
						</view>
						<view class="bottom">
							{{getItem.detailInfo}}
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
						{{sorts.c_name}}
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
					价格：<text class="mon">{{price}}</text>
				</view>
				<view class="go" @tap="order">
					立即下单
				</view>
			</view>
		</view>
		<uni-popup ref="popup" type="bottom">
			<select-sort @closePo='selectSort' @comfirmSort='comfirmSort' :goodTypeList='goodTypeList'></select-sort>
		</uni-popup>
		<uni-popup ref="popup1" type="bottom">
			<select-sort1 @close='selects' @comfirmJi='comfirmJi'></select-sort1>
		</uni-popup>
		<!-- 插屏弹窗 -->
		<uni-popup ref="image" type="center" :custom="true" :mask-click="false" >
			<view class="uni-image">
				<view class="uni-image-close"  @tap="togglePopup('image',1)">
					<uni-icon type="clear" color="#fff" size="30" />
				</view>
				<image class="image hb" src="https://6465-dev-iey4o-1257667322.tcb.qcloud.la/hb.png?sign=0dd479c3204010e6e1298e83b01977e0&t=1568940788" mode="" />
				<view class="goyou" @tap="goCoupon"></view>
			</view>
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
	import jSwiper from '@/components/jing-swiper/jing-swiper.vue'
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	import selectSort from '@/components/selectSort.vue'
	import selectSort1 from '@/components/selectSort1.vue'
	import {getHomeIndex,getMemberOrderPrice} from '@/api/api'
	import {IMG_URL} from '../../assets/js/const.js'
	export default {
		components: {
			jSwiper,
			uniPopup,
			selectSort,
			selectSort1
		},
		data() {
			return {
				swiperList: [],
				weight: 1,
				to: {
					value: '请选择寄件类型'
				},
				sorts: {
					c_name: '物品类型'
				},
				isAddJi: false, //是否添加寄件人信息
				isAddShou: false, //是否添加收件人信息
				schoolMsg:{},
				goodTypeList:[],
				sendItem:{},//寄件
				getItem:{},//收件
				price:0,
				hasCoupon:true
			};
		},
		onLoad() {
			this.hasCoupon=this.$store.state.hasCoupon
			console.log(this.hasCoupon,'hasCoupon')
			this.schoolMsg=this.$store.state.schoolMsg
			if(this.schoolMsg.schoolName=='请选择学校'){
				this.goToselectarea()
			}
			this.getHomeIndex()
		},
		onShow(){
			console.log('show')
			this.getHomeIndex()
		},
		updated(){
			if(this.schoolMsg.schoolName!=='请选择学校'){
				//第一次进入选学校 弹出优惠券以后不再弹
				if(this.$store.state.isNew){
					if(this.hasCoupon){
						// showToast('新人专享优惠券送给你！')
						this.togglePopup('image')
						this.$store.commit('IS_NEW',false)
					}
				}
			}
		},
		watch:{
			'$store.state.schoolMsg'(n){
				this.schoolMsg=n
			}
		},
		methods: {
			toLocation() {
				uni.navigateTo({
					url: '../../pageStatic/location/location?schoolName='+this.schoolMsg.schoolName
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
				this.weight <= 1 ? showToast('您的重量不符合标准') : this.weight--;
				this.getPrice(this.weight,this.to.id)
			},
			add() {
				this.weight++
				this.getPrice(this.weight,this.to.id)
			},
			getPrice(weight,sendersType){
				let parmas={
					weight:weight,
					sendersType:sendersType
				}
				if(parmas.sendersType){
					getMemberOrderPrice(parmas).then(res=>{
						if(res.code==0){
							console.log(res)
							this.price=res.data.toFixed(2)
						}else{
							showToast(res.msg)
						}
						
					}).catch(e=>{console.log(e)})
				}
			},
			adress() {
				uni.chooseAddress({
					success:res=>{
						this.sendItem=res
						this.isAddJi=true
					},
					fail:e=>{
						uni.getSetting({
							success:set=>{
								console.log()
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
			},
			comfirmSort(data) {
				// console.log(data)
				this.sorts = data
				this.$refs.popup.close()
			},
			comfirmJi(data) {
				console.log(data)
				this.to = data
				this.getPrice(this.weight,this.to.id)
				this.$refs.popup1.close()
			},
			adressGet() {
				uni.chooseAddress({
					success:res=>{
						console.log(res)
						this.getItem=res
						this.isAddShou=true
					},
					fail:e=>{
						uni.getSetting({
							success:set=>{
								console.log()
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
			},
			order() {
				if(JSON.stringify(this.sendItem)=='{}'){
					showToast('请填寄件地址')
					return;
				}else if(JSON.stringify(this.getItem)=='{}'){
					showToast('请填写收件地址')
					return;
				}else if(!this.sorts.id){
					showToast('请选择物品类型')
					return;
				}else if(!this.to.id){
					showToast('请选择寄件类型')
					return;
				}
				let parmas={
					senders_name:this.sendItem.userName,
					senders_mobile:this.sendItem.telNumber,
					senders_address:this.sendItem.provinceName+this.sendItem.cityName+this.sendItem.countyName+this.sendItem.detailInfo,
					receipt_name:this.getItem.userName,
					receipt_mobile:this.getItem.telNumber,
					receipt_address:this.getItem.provinceName+this.getItem.cityName+this.getItem.countyName+this.getItem.detailInfo,
					weight:this.weight,
					goodTypeId:this.sorts.id,
					sendersType:this.to.id,
					goodTypeName:this.sorts.c_name,
					price:this.price,
					senders_city:this.sendItem.provinceName+(this.sendItem.provinceName==this.sendItem.cityName?this.sendItem.countyName:this.sendItem.cityName),
					receipt_city:this.getItem.provinceName+(this.getItem.provinceName==this.getItem.cityName?this.getItem.countyName:this.getItem.cityName),
				}
				
				console.log(parmas)
				uni.navigateTo({
					url: '../../pageStatic/order/order?orderDetail='+JSON.stringify(parmas)
				})
			},
			goToselectarea() {
				showModal('提示', "小程序检测您还未还未选择当前院校，无法体验完整功能。", '去选择', false).then(res => {
					uni.redirectTo({
						url: '../../pageStatic/location/location?schoolName='+this.schoolMsg.schoolName
					})
				})
			},
			getHomeIndex(){
				getHomeIndex().then(res=>{
					console.log(res)
					if(res.code==0){
						for(let i of res.data.bannerList ){
							i.img=IMG_URL+i.img
						}
						this.swiperList=res.data.bannerList
						this.goodTypeList=res.data.goodTypeList
					}
				})
			},
			togglePopup(open,isClose) {
				if(isClose){
					this.$refs[open].close()
				}else{
					this.$refs[open].open()
				}
				
			},
			goCoupon(){
				uni.navigateTo({
					url:'../../pageStatic/discount/discount'
				})
				this.togglePopup('image',1)
			}
		}
	};
</script>

<style scoped lang="scss">
	@import '../../assets/css/uni.css';
	.page {
			background: #f5f5f5;
			margin-bottom: 30upx;
		}
	
		.kf_button {
			background-color: rgba(255, 255, 255, 0);
			border: 0upx;
			height: 150upx;
			right: 0;
			top: 200upx;
			position: fixed;
		}
	
		.kf_button::after {
			border: 0upx;
		}
	
		.kf_image {
			z-index: 9999;
			width: 120upx;
			height: 120upx;
		}
	
		.location {
			// line-height: 50upx;
			height: 40upx;
			font-size: 30upx;
			padding-left: 48upx;
			display: flex;
			align-items: center;
			margin-bottom: 20upx;
			padding-top: 20upx;
		}
	
		.locationImg {
			width: 36upx;
			height: 40upx;
		}
	
		.xue {
			margin-left: 10upx;
		}
	
		.locationImgxia {
			width: 20upx;
			height: 12upx;
			margin-top: 5upx;
			margin-left: 5upx;
		}
	
		.jijian {
			margin: 0 24upx;
			margin-top: 30upx;
			font-size: 30upx;
			padding-left: 40upx;
			background: white;
			padding-top: 30upx;
			box-shadow: 0 2upx 4upx 0 #C6CFD7;
			border-radius: 10upx;
			padding-bottom: 30upx;
		}
	
		.text {
			width: 95upx;
			line-height: 50upx;
			background: #e0e0e0;
			text-align: center;
			border-radius: 20upx;
		}
	
		.kuaidi {
			margin-top: 60upx;
			margin-bottom: 60upx;
		}
	
		.ji {
			align-items: center;
			display: flex;
	
			.text {
				line-height: 70upx;
				width: 70upx;
				border-radius: 50%;
				text-align: center;
				background: black;
				color: white;
				display: block;
				font-size: 32upx;
				height: 70upx;
			}
	
		}
	
		.msg {
			border-bottom: 1px solid #ccc;
			line-height: 60upx;
			margin-left: 20upx;
			color: #999;
			width: 78%;
			padding-bottom: 20upx;
		}
	
		.jiImg {
			width: 16upx;
			height: 26upx;
			margin-top: 30upx;
			margin-left: 10upx;
		}
	
		.shou {
			display: flex;
			margin-top: 60upx;
			align-items: center;
	
			.text {
				line-height: 70upx;
				width: 70upx;
				border-radius: 50%;
				text-align: center;
				background: #ffd84d;
				color: black;
				display: block;
				font-size: 32upx;
				height: 70upx;
			}
		}
	
		.zl {
			display: flex;
			margin-top: 60upx;
		}
	
		.zl1 {
			width: 50%;
			display: flex;
	
			// font-size: 26upx;
			.img {
				width: 16upx;
				height: 26upx;
				margin-top: 12upx;
			}
		}
	
		.jisuan {
			display: flex;
	
			.li {
				margin-left: 20upx;
			}
	
			.kg {
				margin: 0 16upx;
			}
	
			.zi {
				font-size: 24upx;
				color: #666;
			}
		}
	
		.jisuan image {
			width: 40upx;
			height: 40upx;
		}
	
		.msgs {
			border-bottom: 1px solid #ccc;
			height: 50upx;
			color: #999;
			padding: 0 28upx;
			// margin:0 7upx ;
		}
	
		.lx {
			font-size: 32upx;
			line-height: 60upx;
		}
	
		.ji1 {
			margin-top: 60upx;
		}
	
		.ji1 .msg {
			width: 70%;
			line-height: 60upx;
			text-align: center;
			padding-bottom: 0;
		}
	
		.ji1 .jiImg {
			margin-top: 20upx;
		}
	
		.xiadan {
			display: flex;
			justify-content: space-between;
			margin-top: 60upx;
			margin-right: 50upx;
			line-height: 70upx;
		}
	
		.go {
			width: 160upx;
			background: #b0b0b0;
			border-radius: 10upx;
			text-align: center;
		}
	
		.mon {
			color: #cf1111;
		}
	
		.msgj {
			width: 75%;
			margin-left: 20upx;
			color: #666;
			font-size: 28upx;
	
			.top {
				display: flex;
				justify-content: space-between;
				padding-right: 20upx;
			}
	
			.bottom {
				border-bottom: 1upx solid #ccc;
				line-height: 70upx;
			}
		}
</style>
<style lang="scss">
	.goyou{
		height: 50upx;
		width: 212upx;
		position: absolute;
		bottom: 88upx;
		left: 159upx;
		background: transparent;
		// background:#fff;
	}
	.hb{
		width: 507upx;
		height: 420upx;
	}
</style>
