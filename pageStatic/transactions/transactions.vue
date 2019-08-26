<template>
	<view>
		<view class="row">
			<view class="jz">
				<image src="../../static/wr.png" mode=""></image>
			</view>
			<view class="li">
				<view class="item" v-for="(item,index) of list" :key='index' @tap="toDetial">
					<view class="content">
						{{item.content}}
					</view>
					<view class="footer">
						<view class="left">
							<image :src="item.img" mode=""></image>
							<text>{{item.name}}</text>
							<text>{{item.time}}</text>
						</view>
						<view class="right">
							<text>{{item.reamrk}}</text>
							<uni-icon type="chat" size="16" color='#8d8d8d'></uni-icon>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="add" v-if='reamrk'>
			<view class="btn" @tap="fabu">
				发布闲置
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
				list: [{
					id: 1,
					content: '床头挂篮有三个，每个五块钱',
					time: '2019.08.17',
					name: "牵绊易世荣",
					img: '../../static/tou.png',
					reamrk: 12
				}, {
					id: 1,
					content: '床头挂篮有三个，每个五块钱',
					time: '2019.08.17',
					name: "牵绊易世荣",
					img: '../../static/tou.png',
					reamrk: 12
				}, {
					id: 1,
					content: '床头挂篮有三个，每个五块钱。',
					time: '2019.08.17',
					name: "牵绊易世荣",
					img: '../../static/tou.png',
					reamrk: 12
				}, {
					id: 1,
					content: '床头挂篮有三个，每个五块钱。',
					time: '2019.08.17',
					name: "牵绊易世荣",
					img: '../../static/tou.png',
					reamrk: 12
				}, {
					id: 1,
					content: '床头挂篮有三个，每个五块钱。',
					time: '2019.08.17',
					name: "牵绊易世荣",
					img: '../../static/tou.png',
					reamrk: 12
				}, {
					id: 1,
					content: '床头挂篮有三个，每个五块钱。',
					time: '2019.08.17',
					name: "牵绊易世荣",
					img: '../../static/tou.png',
					reamrk: 12
				}],
				reamrk: false
			};
		},
		onLoad(option) {
			if (option.state) {
				this.reamrk = true
			} else {
				this.reamrk = false
			}

		},
		methods: {
			toDetial() {
				uni.navigateTo({
					url: 'detail/detail'
				})
			},
			fabu() {
				uni.navigateTo({
					url: 'edit/edit'
				})
			}
		}
	}
</script>

<style lang="scss">
	.row {
		padding: 0 25upx;
		padding-bottom: 100upx;
	}

	.jz {
		margin: 20upx 0;

		image {
			width: 150upx;
			height: 45upx;
		}
	}

	.item {
		font-size: 32upx;
		color: #333;
		line-height: 50upx;
		padding: 20upx;
		border-radius: 6upx;
		margin-bottom: 30upx;
		background: #fff;
	}

	image {
		width: 50upx;
		height: 50upx;
	}

	.left,
	.right {
		display: flex;
		align-items: center;
		line-height: 40upx;
		margin: 20upx 0;
		font-size: 30upx;
	}

	.left {
		color: #999;

		image,
		text {
			margin-right: 20upx;
		}
	}

	.footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.right {
		color: #8d8d8d;

		text {
			margin-right: 5upx;
		}
	}

	.add {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		background: #ffd84d;
		text-align: center;
		color: #000;
		line-height: 50px;
	}
</style>
