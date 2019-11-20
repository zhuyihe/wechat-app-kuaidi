<template>
	<view class="row">
		<view class="li">
			<view class="item">
				<view class="content">
					{{partdetail.title}}
				</view>
				<view class="time">
					{{dateFtt('yyyy-MM-dd',partdetail.createTime)}}
				</view>
			</view>
			<view class="detail">
				<u-parse :content="partdetail.content"></u-parse>
			</view>
		</view>
	</view>
</template>

<script>
	import uParse from '@/components/gaoyia-parse/parse.vue'
	import {
		partDetail
	} from "@/api/api.js"
	import {
		dateFtt
	} from '@/assets/js/common.js'
	export default {
		data() {
			return {
				partdetail: {}
			}
		},
		components:{
			uParse
		},
		onLoad(option) {
			this.partDetail(option.id)
		},
		methods: {
			async partDetail(id) {
				let res = await partDetail(id)
				if (res.code == 0) {
					this.partdetail=res.data
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
</style>
