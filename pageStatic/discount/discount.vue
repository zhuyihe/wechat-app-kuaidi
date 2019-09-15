<template>
	<view>
		<view class="tabr" :style="{top:headerTop}">
			<view :class="{on:typeClass=='valid'}" @tap="switchType('valid')">可用({{couponValidList.length}})</view>
			<view :class="{on:typeClass=='invalid'}" @tap="switchType('invalid')">已失效</view>
			<view class="border" :class="typeClass"></view>
		</view>
		<view class="place"></view>
		<view class="list">
			<!-- 优惠券列表 -->
			<view class="sub-list valid" :class="subState">
				<view class="tis" v-if="couponValidList.length==0">暂无优惠券~</view>
				<view class="row" v-for="(row,index) in couponValidList" :key="index">
					<!-- 删除按钮 -->
					<view class="menu" @tap.stop="deleteCoupon(row.id,row.state)">
						<uni-icon type="trash" size="50" color="#fff"></uni-icon>
					</view>
					<!-- content -->
					<view class="carrier" :class="[typeClass=='valid'?theIndex==index?'open':oldIndex==index?'close':'':'']"
					 @touchstart="touchStart(index,$event)" @touchmove="touchMove(index,$event)" @touchend="touchEnd(index,$event)">
						<view class="left">
							<view class="title">
								{{row.name}}
							</view>
							<view class="term">
								{{row.createTime}} ~ {{row.endTime}}
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
							<view class="use">
								去使用
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="sub-list invalid" :class="subState">
				<view class="tis" v-if="couponinvalidList.length==0">暂无优惠券~</view>
				<view class="row" v-for="(row,index) in couponinvalidList" :key="index">
					<!-- 删除按钮 -->
					<view class="menu" @tap.stop="deleteCoupon(row.id,row.state)">
						<uni-icon type="trash" size="50" color="#fff"></uni-icon>
					</view>
					<!-- content -->
					<view class="carrier" :class="[typeClass=='invalid'?theIndex==index?'open':oldIndex==index?'close':'':'']"
					 @touchstart="touchStart(index,$event)" @touchmove="touchMove(index,$event)" @touchend="touchEnd(index,$event)">
						<view class="left">
							<view class="title">
								{{row.name}}
							</view>
							<view class="term">
								{{row.createTime}} ~ {{row.endTime}}
							</view>
							<view class="icon shixiao">

							</view>
							<view class="gap-top"></view>
							<view class="gap-bottom"></view>
						</view>
						<view class="right invalid">
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
							<view class="use">
								去查看
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
		couponMemberlist,couponDelCoupon
	} from '@/api/api'
	import {
		showModal
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
			this.couponMemberlist(0)
		},
		methods: {
			switchType(type) {
				console.log(type)
				if (this.typeClass == type) {
					return;
				}
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 0
				})
				this.typeClass = type;
				this.subState = this.typeClass == '' ? '' : 'show' + type;
				if(type=='valid'){
					this.couponMemberlist(0)
				}else{
					this.couponMemberlist(1)
				}
				setTimeout(() => {
					this.oldIndex = null;
					this.theIndex = null;
					this.subState = this.typeClass == 'valid' ? '' : this.subState;
				}, 200)
			},
			//控制左滑删除效果-begin
			touchStart(index, event) {
				//多点触控不触发
				if (event.touches.length > 1) {
					this.isStop = true;
					return;
				}
				this.oldIndex = this.theIndex;
				this.theIndex = null;
				//初始坐标
				this.initXY = [event.touches[0].pageX, event.touches[0].pageY];
			},
			touchMove(index, event) {
				//多点触控不触发
				if (event.touches.length > 1) {
					this.isStop = true;
					return;
				}
				let moveX = event.touches[0].pageX - this.initXY[0];
				let moveY = event.touches[0].pageY - this.initXY[1];

				if (this.isStop || Math.abs(moveX) < 5) {
					return;
				}
				if (Math.abs(moveY) > Math.abs(moveX)) {
					// 竖向滑动-不触发左滑效果
					this.isStop = true;
					return;
				}

				if (moveX < 0) {
					this.theIndex = index;
					this.isStop = true;
				} else if (moveX > 0) {
					if (this.theIndex != null && this.oldIndex == this.theIndex) {
						this.oldIndex = index;
						this.theIndex = null;
						this.isStop = true;
						setTimeout(() => {
							this.oldIndex = null;
						}, 150)
					}
				}
			},

			touchEnd(index, $event) {
				//解除禁止触发状态
				this.isStop = false;
			},

			//删除商品
			deleteCoupon(id,state) {
				showModal('您确定删除优惠券？','删除优惠券之后将无法再使用优惠','确认',true).then(res=>{
					couponDelCoupon(id).then(re=>{
						if(re.code==0){
							showToast('优惠券删除成功')
							this.couponMemberlist(state)
						}
					})
				}).catch(e=>{
					console.log(e)
				})
			},

			async couponMemberlist(state){
				let res=await couponMemberlist(state)
				if(state==0){
					this.couponValidList=res.data
					}else{
						this.couponinvalidList=res.data
					}
			},
		}
	}
</script>
<style lang="scss">
	view {
		display: flex;
		flex-wrap: wrap;

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
						width: 50%;
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
