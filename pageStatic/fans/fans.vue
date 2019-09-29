<template>
	<view class="page">
		<view class="uni-list">
			<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(value,key) in list" :key="key">
				<view class="uni-media-list">
					<view class="uni-media-list-logo">
						<image :src="value.headImgUrl"></image>
					</view>
					<view class="uni-media-list-body">
						<view class="uni-media-list-text-top">{{value.managerNickName}}</view>
						<view class="uni-media-list-text-bottom uni-ellipsis">绑定时间:{{dateFtt('yyyy-MM-dd',value.createTime)}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import {fanList} from '@/api/api.js'
	import {dateFtt} from '@/assets/js/common.js'
	export default {
		data() {
			return {
				list: []
			}
		},
		onLoad() {
			this.fanList()
		},
		methods:{
			async fanList(){
				let res=await fanList()
				if(res.code==0){
					this.list=res.data
					console.log(res)
				}
			}
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
