<template>
	<view>
		<view class="header">
			<!-- <view class="header1"></view> -->
			<view class="header2">请选择物品类型</view>
			<view class="header3" @tap='closePo'><uni-icon type="closeempty" size="20"  ></uni-icon></view>
		</view>
		<view class="itemBody">
			<template v-for="(item,index) in sort">
				<view class="item"  :key='index' :class="item.id===checkItem.id?'active':''" @tap="selctItem(item)">
					{{item.value}}
				</view>
			</template>
			<view class="noAllow">
				禁寄物品：各种枪支弹药、易燃易爆、化学危险品、毒品、各种生化制品，传染性感染性物质、各种非法伪造、侵权物品
			</view>
		</view>
		<view class="comfirm" @tap="comfirmSort">
			确认
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
				checkItem:{}
			};
		},
		mounted(){
			this.checkItem=this.sort[0]
		},
		methods:{
			closePo(){
				this.$emit('closePo',{
					checkItem:this.checkItem,
					isClose:0
				})
			},
			selctItem(item){
				this.checkItem=item
			},
			comfirmSort(){
				this.$emit('comfirmSort',this.checkItem)
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
		line-height: 80upx;
		font-size: 30upx;
		.header1,.header3{
			width: 10%;
		}
		.header2{
			width: 90%;
			text-align: center;
			margin-left: 60upx;
			
		}
	}
	.itemBody{
		justify-content: space-around;
		flex-wrap:wrap ;
		padding: 20upx;
		display:flex;
		font-size: 30upx;
		.item{
			width: 190upx;
			text-align: center;
			background: #d1d1d1;
			line-height: 65upx;
			border-radius: 20px;
			margin: 20upx;
		}
		.active{
			background: #ffd84d;
		}
	}
	.noAllow{
		width: 100%;
		line-height: 50upx;
		font-size: 32upx;
		padding: 20upx 10upx;
	}
	 .comfirm{
		 width: 80%;
		 line-height: 70upx;
		 text-align: center;
		 // border-top:1px solid #e0e0e0 ;
		 font-size: 30upx;
		 border-radius: 20px;
		 background: #ffd84d;
		 margin: auto;
		 margin-bottom: 20upx;
	 }
</style>
