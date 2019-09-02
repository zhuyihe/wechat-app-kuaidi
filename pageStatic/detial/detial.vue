<template>
	<view >
		<view class="img">
			<image src="https://6465-dev-iey4o-1257667322.tcb.qcloud.la/detail.png?sign=c5187670bc326c6f315e334be1b9514f&t=1567401203" mode="widthFix"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		onLoad(option) {
			console.log(option)
			switch (option.state) {
				case 'detail':
					uni.setNavigationBarTitle({
						title: '详情'
					})
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
