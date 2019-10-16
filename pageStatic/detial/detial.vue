<template>
	<view >
		<view class="img" v-if='image'>
			<image :src="image" mode="widthFix"></image>
		</view>
		<u-parse v-else :content="content"></u-parse>
	</view>
</template>

<script>
	import {IMG_URL} from '../../assets/js/const.js'
	import {
		getStorageSync
	} from '@/assets/js/common'
	import uParse from '@/components/gaoyia-parse/parse.vue'
	export default {
		components:{
			uParse
		},
		data() {
			return {
				image:"",
				content:''
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
					this.image=IMG_URL+option.img
					break;
				case 'hehuo':
					uni.setNavigationBarTitle({
						title: '校园合伙人'
					})
					this.image=IMG_URL+option.img
					break;
				case "talk":
				uni.setNavigationBarTitle({
					title: '下单须知'
				})
				this.content=getStorageSync('talkContent')
				break;
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	.img {
		width: 100%;
		height: 100vh;
		position: absolute;
		z-index: -99999;
		image {
			width: 100%;
			// height: 100%;
		}
	}
</style>
