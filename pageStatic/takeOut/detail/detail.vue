<template>
	<view class="row">
		<view class="li">
			<view class="item">
				<view class="content">
					{{foodDetials.storeName}}
				</view>
			</view>
			<view class="detail">
				<u-parse :content="foodDetials.content"></u-parse>
			</view>
			<view class="bottoms">
				<view class="detai" @tap="goDetail">
					查看详情
				</view>
				<view class="tel" @tap="call">
					拨号订餐
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uParse from '@/components/gaoyia-parse/parse.vue'
	import {
		foodDetail,
		callPhone
	} from '@/api/api.js'
	export default {
		data() {
			return {
				id: null,
				foodDetials: {}
			}
		},
		components: {
			uParse
		},
		onLoad(option) {
			this.id = option.id
			this.foodDetail()
		},
		methods: {
			call() {
				callPhone(this.id).then(res => {
					if (res.code == 0) {

						uni.makePhoneCall({
							phoneNumber: this.foodDetials.storeTel
						});
					}
				}).catch(e => {
					console.log(e)
				})

			},
			goDetail() {
				console.log(foodDetail)
				uni.navigateTo({
					url: '../../detial/detial?state=food&img=' + this.foodDetials.foodImg
				})
			},
			async foodDetail() {
				let res = await foodDetail(this.id)
				if (res.code == 0) {
					this.foodDetials = res.data
					console.log(res)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.item {
		font-size: 30upx;
		color: #333;
		line-height: 50upx;
		padding: 20upx;
		border-radius: 6upx;
		margin-bottom: 30upx;
		background: #fff;

	}

	.header {
		width: 100%;
		display: flex;
		// border-bottom: 1px solid #e0e0e0;
		align-items: center;
		line-height: 80upx;
		font-size: 30upx;

		.header1,
		.header3 {
			width: 10%;
		}

		.header2 {
			width: 90%;
			text-align: center;
			margin-left: 30px;

		}
	}

	.time {
		text-align: right;
		color: #999;
	}

	.row {
		padding: 0 25upx;
		padding-top: 30upx;
	}

	.detail {
		font-size: 30upx;
		color: #666;
		line-height: 60upx;
		border-radius: 6upx;
		background: #fff;
		padding: 20upx;
	}

	.bottoms {
		display: flex;
		position: absolute;
		bottom: 0;
		left: 0;
		z-index: 1;
		width: 100%;

		view {
			width: 50%;
			background: #ffd84d;
			color: #000;
			line-height: 90upx;
			text-align: center;

			&:nth-child(1) {
				border-right: 1px solid #ccc;
			}
		}
	}

	.contents {
		overflow: scroll;
		height: 96vh;

		image {
			width: 100%;
			height: 100%;
		}
	}
</style>
