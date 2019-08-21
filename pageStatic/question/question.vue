<template>
	<view>
		<uni-collapse :accordion="true">
			<uni-collapse-item v-for="item in accordion" :key="item.id" :title="item.title" :show-animation="item.animation">
				<view class="content">{{ item.content }}</view>
			</uni-collapse-item>
		</uni-collapse>
	</view>
</template>

<script>
	import uniCollapse from '@/components/uni-collapse/uni-collapse.vue'
	import uniCollapseItem from '@/components/uni-collapse-item/uni-collapse-item.vue'
	export default {
		data() {
			return {
				accordion: [{
						id: 0,
						title: '标题文字',
						content: '手风琴效果',
						animation: true
					},
					{
						id: 1,
						title: '标题文字',
						content: '手风琴效果',
						animation: true
					},
					{
						id: 2,
						title: '标题文字',
						content: '手风琴效果',
						animation: true
					}
				],
			};
		}
	}
</script>

<style lang="scss">

</style>
