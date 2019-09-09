<template>
	<view>
		<view class="content">
			<view class="list" v-if='addressList.length>0'>
				<view class="row" v-for="(item,index) in addressList">
					<view class="top">
						<text>{{item.name}}</text>
						<text class="phone">{{item.tel}}</text>
					</view>
					<view class="middle">
						{{item.address.region.label}},{{item.address.detailed}}
					</view>
					<view class="bottom">
						<view class="bianji">
							<uni-icon type="compose" color='#9a9a9a' size="20"></uni-icon>编辑
						</view>
						<view class="delete">
							<uni-icon type="trash" size="20" color='#9a9a9a'></uni-icon>删除
						</view>
					</view>
				</view>
			</view>
			<view class="" v-else>
				暂无数据
			</view>
		</view> 
		<view class="add">
			<view class="btn" @tap="add">
				新增地址
			</view>
		</view>
	</view>
</template>
<script>
	import uniIcon from '@/components/uni-icon/uni-icon.vue'
	import {
		getUserAdress
	} from '@/api/api'
	export default {
		components:{
			uniIcon
		},
		mounted(){
			this.getUserAdress()
			console.log(1)
		},
		data() {
			return {
				isSelect:false,
				addressList:[]
			};
		},
		methods:{
			edit(row){
				uni.navigateTo({
					url:"edit/edit?type=edit"
				})
			},
			add(){
				uni.navigateTo({
					url:'edit/edit'
				})
			},
			async getUserAdress(){
				let res=await getUserAdress()
				console.log(res)
				if(res.code==0){
					this.addressList=res.data
				}
			}
		},
		
	}
</script>

<style lang="scss">
	.content{
		padding-bottom: 50px;
		font-size: 30rpx;
	}
	.row{
		background: #fff;
		width: 95%;
		margin:10px auto;
		color: #333;
	}
	.top,.middle{
		display: flex;
		justify-content: space-between;
	}
	.top{
		padding:  10px 25px;
		.phone{
			color: #666;
		}
	}
	.middle{
		padding-left: 25px;
		line-height: 40px;
		border-bottom: 1px solid #e0e0e0;
		padding-bottom: 20upx;
	}
	.bottom{
		display: flex;
		text-align: center;
		
	}
	.bianji,.delete{
		width: 50%;
		display: flex;
		align-items:center ;
		justify-content:center;
		line-height: 40px;
		color: #9a9a9a;
		font-size: 30rpx;
	}
	.add{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		background: #ffd84d;
		text-align: center;
		color: #000;
		line-height: 50px;
	}
</style>
