<template name="basics">
	<view>
		<scroll-view scroll-y class="page">
			<button class="kf_button" open-type="contact" session-from="weapp"><image class="kf_image" src="../../static/tabbar/about_cur.png"></image></button>
		</scroll-view>
	</view>
</template>

<script>
import { getStorageSync } from '@/assets/js/common';
export default {
	data() {
		return {};
	},
	created() {
		// 			console.log(this.$store)
		// 			let token=getStorageSync('state').token
		// 			console.log(token)
	}
};
</script>

<style scoped lang="scss">
.page {
	height: 100vh;
}
.kf_button {
	background-color: rgba(255, 255, 255, 0);
	border: 0px;
	height: 100upx;
	right: 0;
	bottom: 20upx;
	position: fixed;
}
.kf_button::after {
	border: 0px;
}
.kf_image {
	z-index: 9999;
	width: 100upx;
	height: 100upx;
}
</style>
