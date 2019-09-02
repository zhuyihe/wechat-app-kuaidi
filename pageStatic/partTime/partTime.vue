<template>
	<view class="row">
		<view class="jz">
			<image src="https://6465-dev-iey4o-1257667322.tcb.qcloud.la/jz.png?sign=e1db5f3e4f92324f98e378c7e9f24789&t=1567401576" mode=""></image>
		</view>
		<view class="li">
			<view class="item" v-for="(item,index) of list" :key='index' @tap="toDetial">
				<view class="content">
					{{item.content}}
				</view>
				<view class="time">
					{{item.time}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[{
					id:1,
					content:'3月7日，130元/天包餐下班现结,晚班盘龙城,有意者联系。',
					time:'2019.08.17'
				},{
					id:1,
					content:'3月7日，130元/天包餐下班现结,晚班盘龙城,有意者联系。',
					time:'2019.08.17'
				},{
					id:1,
					content:'3月7日，130元/天包餐下班现结,晚班盘龙城,有意者联系。',
					time:'2019.08.17'
				},{
					id:1,
					content:'3月7日，130元/天包餐下班现结,晚班盘龙城,有意者联系。',
					time:'2019.08.17'
				},{
					id:1,
					content:'3月7日，130元/天包餐下班现结,晚班盘龙城,有意者联系。',
					time:'2019.08.17'
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
}
.time{
	text-align: right;
	color: #999;
}
</style>
