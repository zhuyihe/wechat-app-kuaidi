<template name="basics">
	<view>
		<scroll-view scroll-y class="page">
			
		</scroll-view>
	</view>
</template>

<script>
	import {getStorageSync} from '@/assets/js/common'
	export default {
		data() {
			return {
				
			};
		},
		created(){
// 			console.log(this.$store)
// 			let token=getStorageSync('state').token
// 			console.log(token)
		}
	}
</script>

<style>
	.page {
		height: 100vh;
	}
</style>
