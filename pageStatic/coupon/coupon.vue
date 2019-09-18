<template>
	<view>
		<view class="list">
			<!-- 优惠券列表 -->
			<view class="sub-list valid" :class="subState">
				<view class="tis" v-if="couponValidList.length==0">暂无优惠券~</view>
				<view class="row" v-for="(row,index) in couponValidList" :key="index">
					<!-- content -->
					<view class="carrier" :class="[typeClass=='valid'?theIndex==index?'open':oldIndex==index?'close':'':'']">
						<view class="left">
							<view class="title">
								{{row.name}}<text class="reds">(剩余<text class="red">{{row.totalNum-row.makeNum}}</text>张)</text>
							</view>
							<view class="term">
								{{dateFtt("yyyy.MM.dd",row.createTime)}} - {{dateFtt("yyyy.MM.dd",row.endTime)}}
							</view>
							<view class="gap-top"></view>
							<view class="gap-bottom"></view>
						</view>
						<view class="right">
							<view class="ticket">
								<view class="num">
									{{row.amount}}
								</view>
								<view class="unit">
									元
								</view>
							</view>
							<view class="limitAmount">
								满{{row.limitAmount}}使用
							</view>
							<view class="use" @tap="getCoupon(row.code)">
								领取优惠券
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import{
		getCouponList,getCoupon
	} from '@/api/api'
	import {
		showModal,showToast
	} from '@/assets/js/common'
	export default {
		data() {
			return {
				couponValidList: [],
				couponinvalidList: [],
				headerTop: 0,
				//控制滑动效果
				typeClass: 'valid',
				subState: '',
				theIndex: null,
				oldIndex: null,
				isStop: false
			}
		},
		onPageScroll(e) {

		},
		//下拉刷新，需要自己在page.json文件中配置开启页面下拉刷新 "enablePullDownRefresh": true
		// onPullDownRefresh() {
		// 	setTimeout(function() {
		// 		uni.stopPullDownRefresh();
		// 	}, 1000);
		// },
		onLoad() {
			this.getCouponList()
		},
		methods: {
			async getCouponList(){
				let res=await getCouponList()
				if(res.code==0){
					console.log(res)
					this.couponValidList=res.data
				}
			},
			async getCoupon(code){
				let res=await getCoupon(code)
				console.log(res)
				if(res.code==0){
					console.log(res)
					showToast('优惠券领取成功')
				}else{
					showToast(res.msg)
				}
			}
		}
	}
</script>
<style lang="scss">
	view {
		display: flex;
		flex-wrap: wrap;

	}
	.red{
		color:#cf1111 ;
	}
	.reds{
		font-size: 26upx;
	}
	page {
		position: relative;
		background-color: #f5f5f5;
	}

	.hidden {
		display: none !important;
	}

	.place {
		width: 100%;
		height: 95upx;
	}

	.tabr {
		background-color: #fff;
		width: 94%;
		height: 95upx;
		padding: 0 3%;
		border-bottom: solid 1upx #dedede;
		position: fixed;
		top: 0;
		z-index: 10;

		view {
			width: 50%;
			height: 90upx;
			justify-content: center;
			align-items: center;
			font-size: 32upx;
			color: #999;
		}

		.on {
			color: #000;
		}

		.border {
			height: 4upx;
			background-color: #ffd84d;
			transition: all .3s ease-out;

			&.invalid {
				transform: translate3d(100%, 0, 0);
			}
		}

	}

	.list {
		width: 100%;
		display: block;
		position: relative;
	}

	@keyframes showValid {
		0% {
			transform: translateX(-100%);
		}

		100% {
			transform: translateX(0);
		}
	}

	@keyframes showInvalid {
		0% {
			transform: translateX(0);
		}

		100% {
			transform: translateX(-100%);
		}
	}

	.sub-list {
		&.invalid {
			position: absolute;
			top: 0;
			left: 100%;
			display: none;
		}

		&.showvalid {
			display: flex;
			animation: showValid 0.20s linear both;
		}

		&.showinvalid {
			display: flex;
			animation: showInvalid 0.20s linear both;
		}

		width: 100%;
		padding: 20upx 0 120upx 0;

		.tis {
			width: 100%;
			height: 60upx;
			justify-content: center;
			align-items: center;
			font-size: 32upx;
		}

		.row {
			width: 92%;
			height: 24vw;
			margin: 20upx auto 10upx auto;
			border-radius: 8upx;
			// box-shadow: 0upx 0 10upx rgba(0,0,0,0.1);
			align-items: center;
			position: relative;
			overflow: hidden;
			z-index: 4;
			border: 0;

			.menu {
				.icon {
					color: #fff;
					font-size: 50upx;
				}

				position: absolute;
				width: 28%;
				height: 100%;
				right: 0;
				justify-content: center;
				align-items: center;
				background-color: #fe6100;
				color: #fff;
				z-index: 2;
			}

			.carrier {
				@keyframes showMenu {
					0% {
						transform: translateX(0);
					}

					100% {
						transform: translateX(-28%);
					}
				}

				@keyframes closeMenu {
					0% {
						transform: translateX(-28%);
					}

					100% {
						transform: translateX(0);
					}
				}

				&.open {
					animation: showMenu 0.25s linear both;
				}

				&.close {
					animation: closeMenu 0.15s linear both;
				}

				background-color: #fff;
				position: absolute;
				width: 100%;
				padding: 0 0;
				height: 100%;
				z-index: 3;
				flex-wrap: nowrap;

				.left {
					width: 100%;

					.title {
						padding-top: 3vw;
						width: 90%;
						margin: 0 5%;
						font-size: 36upx;
						line-height: 40upx;
					}

					.term {
						width: 90%;
						margin: 0 5%;
						font-size: 26upx;
						color: #999;
					}

					position: relative;

					.gap-top,
					.gap-bottom {
						position: absolute;
						width: 20upx;
						height: 20upx;
						right: -10upx;
						border-radius: 100%;
						background-color: #f5f5f5;
					}

					.gap-top {
						top: -10upx;
					}

					.gap-bottom {
						bottom: -10upx;
					}

					.shixiao {
						position: absolute;
						right: 20upx;
						font-size: 150upx;
						z-index: 6;
						color: rgba(153, 153, 153, 0.2)
					}
				}

				.right {
					flex-shrink: 0;
					width: 28%;
					color: #fff;
					background: linear-gradient(to right, #fe6100, #ffd84d);

					&.invalid {
						background: linear-gradient(to right, #aaa, #999);

						.use {
							color: #aaa;
						}
					}

					justify-content: center;

					.ticket,
					.limitAmount {
						width: 100%;
					}

					.ticket {
						padding-top: 1vw;
						justify-content: center;
						align-items: baseline;
						height: 6vw;

						.num {
							font-size: 42upx;
							font-weight: 600;
						}

						.unit {
							font-size: 24upx;
						}
					}

					.limitAmount {
						justify-content: center;

						font-size: 28upx;
					}

					.use {
						width: 70%;
						height: 40upx;
						justify-content: center;
						align-items: center;
						font-size: 24upx;
						background-color: #fff;
						color: #ee827f;
						border-radius: 40upx;
						padding: 0 10upx;
					}
				}
			}
		}
	}
</style>
