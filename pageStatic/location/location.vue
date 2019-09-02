<template>
	<view class="location">
		<view class="nowcur">
			<text class="wei">当前定位</text>
			<view class="now">
				<image src="https://6465-dev-iey4o-1257667322.tcb.qcloud.la/location.png?sign=79d94d4b350b3f09a1736a5a7a919bdf&t=1567401419" mode=""></image>
				<text class="daxue">武汉大学</text>
			</view>
		</view>
		<view class="list">
			<view class="listItem">
				华中科技大学
			</view>
			<view class="listItem">
				武汉大学
			</view>
			<view class="listItem">
				华中科技大学
			</view>
			<view class="listItem">
				武汉大学
			</view>
			<view class="listItem">
				华中科技大学
			</view>
			<view class="listItem">
				武汉大学
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
		
	
	.location{
		background: #f5f5f5;
		padding-top: 25px;
	}
	.nowcur{
		padding-bottom: 10px;
		background: #fff;
		padding-left: 30px;
		line-height: 30px;
		image{
			width: 18px;
			height: 18px;
		}
	}
	.now{
		display: flex;
		align-items: center;
	}
	.wei{
		font-size: 14px;
		color: #999;
	}
		
	.daxue{
		margin-left: 10px;
	}
	.list{
		background: #FFFFFF;
		margin-top: 20px;
	}
	.listItem{
		line-height: 60px;
		border-bottom: 1px solid #ccc;
		margin-left: 25px;
	}
</style>
