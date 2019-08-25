<template>
	<view class="quest">
		<uni-collapse :accordion="true" class="uni-collapse">
			<uni-collapse-item v-for="item in accordion" :key="item.id" :title="item.title" :show-animation="item.animation"
			 class="items">
				<view class="content">{{ item.content }}</view>
			</uni-collapse-item>
		</uni-collapse>
	</view>
</template>

<script>
	import uniCollapse from '@/components/uni-collapse/uni-collapse.vue'
	import uniCollapseItem from '@/components/uni-collapse-item/uni-collapse-item.vue'
	export default {
		components: {
			uniCollapse,
			uniCollapseItem
		},
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
<style lang="scss" scoped>
	.content {
		line-height: 80upx;
	}

	.items {
		margin: 20upx 0;
		background: #fff;
	}

	.uni-collapse {
		// background: #f5f5f5;
	}
</style>
<style lang="scss">
	.quest {
		.uni-collapse-cell--open {
			background-color: #fff
		}


		.uni-collapse-cell__content {
			padding-left: 30upx;
			color: #666;
			font-size: 30upx;
			border-top: 1px solid transparent;
		}

		.uni-collapse {
			background-color: #f5f5f5;

			&:after {
				height: 0
			}
		}

		.uni-collapse-cell--open {
			border-bottom: 1px solid #e0e0e0;

			.uni-collapse-cell__content {
				border-top: 1px solid #e0e0e0;
			}
		}
		.uni-collapse-cell {
			&:after{
				height: 0;
			}
			
		}
	}
</style>
