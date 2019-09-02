<template>
	<view>
		<view class="tops">
			<view class="bg">
				<image class="bgimg" src="https://6465-dev-iey4o-1257667322.tcb.qcloud.la/income.png?sign=cae7423f6f57e4a9323d8016d18c3552&t=1567401290" mode=""></image>
				<view class='tou'>
					<view class="left">
						<view class="imgs">
							<image src="https://6465-dev-iey4o-1257667322.tcb.qcloud.la/tou.png?sign=f63098ba721c6a4a2be573ab01fcf83b&t=1567401164" mode=""></image>
						</view>
						<view class="times">
							<view class="">
								<text>李木子</text><br>
								<text class="timme">绑定时间:2019.09.08</text>
							</view>
						</view>
					</view>
					<view class="right">
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
			<view class="mains">
				<view class="main">
					<view class="count">
						188.00
					</view>
					<view class="fs">
						今日(元)
					</view>
				</view>
				<view class="main">
					<view class="count">
						288.00
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
			<view class="myfan">
				我的粉丝(3)
			</view>
			<view class="uni-list">
				<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(value,key) in list" :key="key">
					<view class="uni-media-list">
						<view class="uni-media-list-logo">
							<image :src="value.img"></image>
						</view>
						<view class="uni-media-list-body">
							<view class="uni-media-list-text-top">{{value.name}}</view>
							<view class="uni-media-list-text-bottom uni-ellipsis">绑定时间:{{value.time}}</view>
						</view>
						<view class="uni-media-list-body list-logo">
							<view class="uni-media-list-text-top">288.00</view>
							<view class="uni-media-list-text-bottom">累计消费</view>
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
				list: [{
						name: "一枚实景",
						time: "2019.09.10",
						img: "https://6465-dev-iey4o-1257667322.tcb.qcloud.la/tou.png?sign=3a51c6d5519cd48ec2281c50769aad04&t=1567401322"
					},
					{
						name: "一枚实景",
						time: "2019.09.10",
						img: "https://6465-dev-iey4o-1257667322.tcb.qcloud.la/tou.png?sign=3a51c6d5519cd48ec2281c50769aad04&t=1567401322"
					},
					{
						name: "一枚实景",
						time: "2019.09.10",
						img: "https://6465-dev-iey4o-1257667322.tcb.qcloud.la/tou.png?sign=3a51c6d5519cd48ec2281c50769aad04&t=1567401322"
					}
				]
			};
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
				}
			}

			.timme {
				font-size: 28upx;
			}
		}
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
