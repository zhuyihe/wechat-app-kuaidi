<template>
	<view>
		<view class="header">
			<!-- <view class="header1"></view> -->
			<view class="header2">寄件类型</view>
			<view class="header3" @tap='close'><uni-icon type="closeempty" size="20"  ></uni-icon></view>
		</view>
		<view class="itemBody">
			<template v-for="(item,index) in sort">
				<view class="item"  :key='index' :class="item.id===checkItem.id?'active':''" @tap="selctItem(item)">
					{{item.value}}
				</view>
			</template>
		</view>
		<view class="comfirm"  @tap="comfirmJi">
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
					value:'上门取件',
				},{
					id:2,
					value:'放置快递寄放点'
				}],
				checkItem:{}
			};
		},
		mounted(){
			this.checkItem=this.sort[0]
		},
		methods:{
			close(){
				this.$emit('close',{
					checkItem:this.checkItem,
					isClose:0
				})
			},
			selctItem(item){
				this.checkItem=item
			},
			comfirmJi(){
				this.$emit('comfirmJi',this.checkItem)
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
		font-size: 30rpx;
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
		font-size: 30rpx;
		justify-content: space-around;
		flex-wrap:wrap ;
		padding: 10px;
		display:flex;
		.item{
			width: 150px;
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
