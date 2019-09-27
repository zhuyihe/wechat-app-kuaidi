<template>
	<view >
		<view class="img">
			<image :src="image" mode="widthFix"></image>
		</view>
	</view>
</template>

<script>
	import {IMG_URL} from '../../assets/js/const.js'
	export default {
		data() {
			return {
				image:""
			};
		},
		onLoad(option) {
			console.log(option)
			switch (option.state) {
				case 'food':
					uni.setNavigationBarTitle({
						title: '商家详情'
					})
					this.image=IMG_URL+option.img
					break;
				case 'enter':
					uni.setNavigationBarTitle({
						title: '供应商入驻'
					})
					break;
				case 'hehuo':
					uni.setNavigationBarTitle({
						title: '校园合伙人'
					})
					break;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.img {
		width: 100%;
		height: 100%;
		position: absolute;
		z-index: -99999;
		image {
			width: 100%;
			// height: 100%;
		}
	}
</style>
