<template>
	<view class="row">
		<view class="jz">
			<image src="../../static/wm.png" mode=""></image>
		</view>
		<view class="li">
			<view class="item" v-for="(item,index) of list" :key='index' @tap="toDetial">
				<view class="content">
					{{item.content}}
				</view>
				<view class="go">
					<uni-icon type="arrowright" size="25" color='#ccc'></uni-icon>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniIcon from '@/components/uni-icon/uni-icon.vue'
	export default {
		components:{
			uniIcon
		},
		data() {
			return {
				list:[{
					id:1,
					content:'烤肉饭',
				},{
					id:1,
					content:'烤肉饭',
				},{
					id:1,
					content:'烤肉饭',
				},{
					id:1,
					content:'烤肉饭',
				},{
					id:1,
					content:'烤肉饭',
				}]
			};
		},
		methods:{
			toDetial(){
				uni.navigateTo({
					url:'detail/detail'
				})
			}
		}
	}
</script>

<style lang="scss">
.row{
	padding:0 25upx; 
}
.jz {
	margin:20upx 0;
	image{
		width: 150upx;
		height: 45upx;
	}
}
.item{
	font-size: 30upx;
	color: #333;
	line-height: 50upx;
	padding: 20upx;
	border-radius: 6upx;
	margin-bottom: 30upx;
	background: #fff;
	padding-left: 20upx;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.time{
	text-align: right;
	color: #999;
}
</style>
