<template>
	<view>
		<view class="enter">
			<view class="li" v-for="(item,index) in list" :key='index' @tap="enter(item.title)">
				<image :src="item.img" mode=""></image>
			</view>
		</view>
		<!-- <button class="kf_button" open-type="contact" session-from="weapp">
			<image class="kf_image" src="https://6465-dev-iey4o-1257667322.tcb.qcloud.la/ke.png?sign=045632a510a31e7c5d5cdca367c3cfcd&t=1567394962"></image>
		</button> -->
	</view>

</template>

<script>
	import {
		getSchoolCard
	} from '@/api/api.js'
	import {
		IMG_URL
	} from '../../assets/js/const.js'
	export default {
		data() {
			return {
				list: []
			};
		},
		onLoad() {
			this.getSchoolCard()
		},
		onPullDownRefresh() {
			this.getSchoolCard()
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		methods: {
			enter(index){
				let url = ''
				switch (index) {
					case '校园兼职':
						url = '../../pageStatic/partTime/partTime'
						break;
					case '校园外卖':
						url = '../../pageStatic/takeOut/takeOut'
						break;
					case '二手交易':
						url = '../../pageStatic/transactions/transactions'
						break;
					case '校园论坛':
						url = '../../pageStatic/bbs/bbs'
						break;
				}
				uni.navigateTo({
					url: url
				})
			},
			async getSchoolCard() {
				let res = await getSchoolCard()
				if (res.code == 0) {
					let list = res.data.bannerList.map(item=>{
						item.img= IMG_URL+item.img
						return item
					})
					this.list=list
					console.log(list)
				}
			}
		}
	}
</script>

<style scoped lang='scss'>
	.enter {
		display: flex;
		flex-wrap: wrap;
		text-align: center;

		.li {
			margin-top: 40upx;
			width: 50%;

			image {
				width: 310upx;
				height: 440upx;
			}
		}
	}

	.kf_button {
		background-color: rgba(255, 255, 255, 0);
		border: 0px;
		height: 150rpx;
		right: 0;
		top: 200rpx;
		position: fixed;
	}

	.kf_button::after {
		border: 0px;
	}

	.kf_image {
		z-index: 9999;
		width: 60px;
		height: 60px;
	}
</style>
