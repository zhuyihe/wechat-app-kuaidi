<template>
	<view class="quest">
		<uni-collapse :accordion="true" class="uni-collapse">
			<uni-collapse-item v-for="item in accordion" :key="item.id" :title="item.questionStr" :show-animation="true"
			 class="items">
				<view class="content">{{ item.answerStr }}</view>
			</uni-collapse-item>
		</uni-collapse>
	</view>
</template>

<script>
	import uniCollapse from '@/components/uni-collapse/uni-collapse.vue'
	import uniCollapseItem from '@/components/uni-collapse-item/uni-collapse-item.vue'
	import {
		questionList
	} from '@/api/api'
	export default {
		components: {
			uniCollapse,
			uniCollapseItem
		},
		data() {
			return {
				accordion: [],
				type:1
			};
		},
		onLoad(option){
			if(option.type==1){
				this.type=1
				uni.setNavigationBarTitle({
					title:'常见问题'
				})
			}else{
				this.type=2
				uni.setNavigationBarTitle({
					title:'奖励金攻略'
				})
			}
			this.questionList(this.type,1)
		},
		methods:{
			async questionList(type,pageNo){
				let parmas={
					type,
					pageNo
				}
				let res=await questionList(parmas)
				if(res.code==0){
					this.accordion=res.data.memberQuestionList
					console.log(res)
				}
			}
		}
	}
</script>
<style lang="scss" scoped>
	.content {
		line-height: 80upx;
		padding-right: 50upx;
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
