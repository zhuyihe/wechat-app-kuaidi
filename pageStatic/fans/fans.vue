<template>
	<view class="page">
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
						img: "../../static/tou.png"
					},
					{
						name: "一枚实景",
						time: "2019.09.10",
						img: "../../static/tou.png"
					},
					{
						name: "一枚实景",
						time: "2019.09.10",
						img: "../../static/tou.png"
					}
				]
			}
		},
		onLoad() {
			setTimeout(() => {
				this.showImg = true;
			}, 400)
		}
	}
</script>
<style lang="scss" scoped>
	.uni-media-list {
		height: 160upx;
		display: flex;
		align-items: center;
	}

	.uni-media-list-logo {
		width: 100upx;
		height: 100upx;
		image {
			width: 100upx;
			height: 100upx;
			border-radius: 50%;
		}
	}
</style>
<style lang="scss">
	@import '../../assets/css/uni.css';

	.name {
		padding: 20upx;
	}
</style>
