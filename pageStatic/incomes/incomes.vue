<template>
	<view>
		<view class="tops">
			<view class="bg">
				<image class="bgimg" src="https://6465-dev-iey4o-1257667322.tcb.qcloud.la/income.png?sign=cae7423f6f57e4a9323d8016d18c3552&t=1567401290" mode=""></image>
				<view class='tou'>
					<view class="left">
						<view class="imgs">
							<image :src="member.headImgUrl" mode=""></image>
						</view>
						<view class="times">
							<view class="">
								<text>{{member.managerNickName}}</text><br>
								<text class="timme">绑定时间:{{dateFtt('yyyy-MM-dd',member.createTime)}}</text>
							</view>
						</view>
					</view>
					<view class="right">
						<view class="count red">
							{{member.blanceMoney}}
						</view>
						<view class="fs">
							可提现余额
						</view>
						<view class="txs" @tap="tixian">
							提现
						</view>
					</view>
				</view>
			</view>
			<view class="mains">
				<view class="main">
					<view class="count">
						{{member.todayMoney}}
					</view>
					<view class="fs">
						今日(元)
					</view>
				</view>
				<view class="main">
					<view class="count">
						{{member.monthMoney}}
					</view>
					<view class="fs">
						本月(元)
					</view>
				</view>
				<view class="main">
					<view class="count">
						{{member.totalMoney}}
					</view>
					<view class="fs">
						累计(元)
					</view>
				</view>
			</view>
			<view class="myfan">
				我的粉丝({{list.length}})
			</view>
			<block v-if='list.length==0'>
				<view class="none">
					暂无粉丝，快去邀请把~~
				</view>
			</block>
			<block v-else>
				<view class="uni-list">
					<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(value,key) in list" :key="key">
						<view class="uni-media-list">
							<view class="uni-media-list-logo">
								<image :src="value.headImgUrl"></image>
							</view>
							<view class="uni-media-list-body">
								<view class="uni-media-list-text-top">{{value.wxNickName}}</view>
								<view class="uni-media-list-text-bottom uni-ellipsis">绑定时间:{{dateFtt('yyyy-MM-dd',value.createTime)}}</view>
							</view>
							<view class="uni-media-list-body list-logo">
								<view class="uni-media-list-text-top">{{value.totalConsumption}}.00</view>
								<view class="uni-media-list-text-bottom">累计消费</view>
							</view>
						</view>
					</view>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	import {memberMoney} from '@/api/api.js'
	import {IMG_URL} from '../../assets/js/const.js'
	export default {
		data() {
			return {
				list: [],
				member:{}
			};
		},
		onLoad(){
			this.memberMoney()
		},
		onShow(){
			if(uni.getStorageSync('getMoney')){
				this.memberMoney()
				uni.setStorageSync('getMoney',false)
			}
			
		},
		methods:{
			async memberMoney(){
				let res= await memberMoney()
				if(res.code==0){
					this.member=res.data.memberVo
					this.list=res.data.sonVOList
				}
			},
			tixian(){
				uni.navigateTo({
					url: '../deposit/deposit'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.bg {
		width: 100%;
		position: relative;
		color: #50370e;
		height: 225upx;

		.bgimg {
			width: 100%;
			height: 225upx;
			position: absolute;
			top: 0;
			left: 0;
		}

		.tou {
			display: flex;
			align-items: center;
			justify-content: space-between;
			position: absolute;
			z-index: 1;
			height: 225upx;
			width: 100%;

			.left {
				display: flex;
				align-items: center;
			}

			.right {
				text-align: center;
				margin-right: 74upx;
			}

			.fs {
				font-size: 28upx;
			}

			.txs {
				width: 100upx;
				font-size: 28upx;
				margin: auto;
				line-height: 40upx;
				border: 1px solid #50370e;
				border-radius: 20upx;
				margin-top: 10upx;
			}

			.imgs {
				image {
					width: 100upx;
					height: 100upx;
					margin: 0 25upx;
					border-radius:50% ;
				}
			}

			.timme {
				font-size: 28upx;
			}
		}
	}
	.none{
		width: 100%;
		text-align: center;
		line-height: 100upx;
	}
	.mains {
		// margin-top: 225upx;
		background: #fff;
		display: flex;
		align-items: center;

		.main {
			width: 33.3%;
			text-align: center;
			padding: 20upx 0;
			border-right: 1px solid #e0e0e0;

			.fs {
				font-size: 28upx;
				color: #999;
			}
		}
	}

	.myfan {
		line-height: 100upx;
		text-align: center;
		background: #fff;
		margin-top: 20upx;
	}
	.uni-list-cell{
		padding: 20upx 0;
		}
		.list-logo{
			width: 120upx !important;
			text-align: right;
			}
</style>
<style lang="scss">
	@import '../../assets/css/uni.css';

	.name {
		padding: 20upx;
	}
</style>
