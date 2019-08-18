<template>
	<view>
		<view class="content">
			<view class="list">
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
	export default {
		components:{
			uniIcon
		},
		mounted(){
			console.log(this.addressList)
		},
		data() {
			return {
				isSelect:false,
				addressList:[
					{id:1,name:"大黑哥",head:"大",tel:"18816881688",address:{region:{"label":"广东省-深圳市-福田区","value":[18,2,1],"cityCode":"440304"},detailed:'深南大道1111号无名摩登大厦6楼A2'},isDefault:true},
					{id:2,name:"大黑哥",head:"大",tel:"15812341234",address:{region:{"label":"广东省-深圳市-福田区","value":[18,2,1],"cityCode":"440304"},detailed:'深北小道2222号有名公寓502'},isDefault:false},
					{id:3,name:"老大哥",head:"老",tel:"18155467897",address:{region:{"label":"广东省-深圳市-福田区","value":[18,2,1],"cityCode":"440304"},detailed:'深南大道1111号无名摩登大厦6楼A2'},isDefault:false},
					{id:4,name:"王小妹",head:"王",tel:"13425654895",address:{region:{"label":"广东省-深圳市-福田区","value":[18,2,1],"cityCode":"440304"},detailed:'深南大道1111号无名摩登大厦6楼A2'},isDefault:false},
				]
			};
		},
		methods:{
			edit(row){
				uni.setStorage({
					key:'address',
					data:row,
					success() {
						uni.navigateTo({
							url:"edit/edit?type=edit"
						})
					}
				});
				
			},
			add(){
				uni.navigateTo({
					url:'edit/edit'
				})
			}
		}
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
