<template>
	<view>
		<view class="header">
			<!-- <view class="header1"></view> -->
			<view class="header2">请选择物品类型</view>
			<view class="header3" @tap='closePo'><uni-icon type="closeempty" size="30"  ></uni-icon></view>
		</view>
		<view class="itemBody">
			<template v-for="(item,index) in sort">
				<view class="item"  :key='index' :class="item.id===checkId?'active':''" @tap="selctItem(item)">
					{{item.value}}
				</view>
			</template>
			<view class="noAllow">
				禁寄物品：各种枪支弹药、易燃易爆、化学危险品、毒品、各种生化制品，传染性感染性物质、各种非法伪造、侵权物品
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
				sort:[{
					id:1,
					value:'文件',
				},{
					id:2,
					value:'数码产品'
				},{
					id:3,
					value:'生活用品'
				},{
					id:4,
					value:'服饰'
				},{
					id:5,
					value:'食品'
				},{
					id:6,
					value:'其他'
				}],
				checkId:1
			};
		},
		methods:{
			closePo(){
				this.$emit('closePo',0)
			},
			selctItem(item){
				this.checkId=item.id
			}
		}
	}
</script>

<style lang="scss">
	.header{
		width: 100%;
		display: flex;
		border-bottom: 1px solid #e0e0e0;
		align-items: center;
		line-height: 50px;
		.header1,.header3{
			width: 10%;
		}
		.header2{
			width: 90%;
			text-align: center;
			margin-left: 30px;
			
		}
	}
	.itemBody{
		justify-content: space-around;
		flex-wrap:wrap ;
		padding: 10px;
		display:flex;
		.item{
			width: 100px;
			text-align: center;
			background: #d1d1d1;
			line-height: 40px;
			border-radius: 20px;
			margin: 10px;
		}
		.active{
			background: #ffd84d;
		}
	}
	.noAllow{
		width: 100%;
		line-height: 25px;
		font-size: 16px;
		padding: 10px 5px;
	}
</style>
