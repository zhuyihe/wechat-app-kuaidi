<template>
	<view>
		<view class="row">
			<view class="jz">
				<image src="https://6465-dev-iey4o-1257667322.tcb.qcloud.la/bbs.png?sign=9316f53bdfc0ef61d7049ecfc425f685&t=1567401140" mode=""></image>
			</view>
			<view class="li">
				<view class="onorder" v-if="list.length==0||!list">
					<image src="https://6465-dev-iey4o-1257667322.tcb.qcloud.la/noorder.png?sign=053b745ab238f7558c57ddc8ef71f5e4&t=1568446821"></image>
				</view>
				<view class="item" v-for="(item,index) of list" :key='index' v-else>
					<view @tap="toDetial(item.id)">
						<view class="headers">
							{{item.title}}
						</view>
						<view class="content">
							{{item.simpleMessage}}
						</view>
						<view class="footer" style="text-align: right;">
							<view class="right">
								<view class="see">
									<text>{{item.lookNum}}</text>
									<uni-icon type="eye" size="16" color='#8d8d8d'></uni-icon>
								</view>
								<view class="mark">
									<text>{{item.discussNum}}</text>
									<uni-icon type="chat" size="16" color='#8d8d8d'></uni-icon>
								</view>
							</view>
						</view>
						<view class="footer">
							<view class="left">
								<image :src="item.headImg" mode=""></image>
								<text>{{item.mname}}</text>
								<text>{{dateFtt('yyyy-MM-dd',item.createTime)}}</text>
							</view>
							<view class="rights">
								<text>{{item.school_name}}</text>
							</view>
						</view>
					</view>
					
					<view class="bottom" v-if='state'>
						<view class="bianji"  @tap="discuss('edit',item.id)">
							<uni-icon type="compose" color='#9a9a9a' size="20" ></uni-icon>编辑
						</view>
						<view class="delete" @tap="deletePage(item.id)">
							<uni-icon type="trash" size="20" color='#9a9a9a'></uni-icon>删除
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="add" v-if="state">
			<view class="btn" @tap="discuss('add','')">
				发布帖子
			</view>
		</view>
	</view>
</template>

<script>
	import {getForumList,delforum,getUserBbs} from '@/api/api.js'
	import {dateFtt,showModal,showToast} from '@/assets/js/common.js'
	export default {
		data() {
			return {
				list:[],
				pageNo:1,
				state:'',
			};
		},
		onLoad(option){
			console.log(option.state)
			this.state=option.state
			// this.getForumList(1)
			if(option.state){
				//个人中心自己发布的贴子
				this.changeBar('我的贴子')
				this.getUserBbs(1)
			}else{
				//查看全部的帖子
				this.getForumList(1)
				this.changeBar('论坛')
			}
			
		},
		onShow(){
			if(this.state){
				//个人中心进入
				this.getUserBbs(1)
			}
			// this.getForumList(1)
		},
		methods:{
			toDetial(id){
				uni.navigateTo({
					url:'detail/detail?id='+id
				})
			},
			async getForumList(pageNo){
				let res=await getForumList(pageNo)
				console.log(res)
				if(res.code==0){
					this.list=res.data.memberForumList
				}
			},
			async getUserBbs(pageNo){
				let res=await getUserBbs(pageNo)
				console.log(res)
				if(res.code==0){
					this.list=res.data.memberForumList
				}
			},
			discuss(state,id){
				uni.navigateTo({
					url:'detail/edit?state='+state+'&id='+id
				})
			},
			changeBar(title){
				uni.setNavigationBarTitle({
					title:title
				})
			},
			deletePage(id){
				showModal('删除帖子','你确定删除帖子吗？','确定',true).then(res=>{
					delforum(id).then(res=>{
						if(res.code==0){
							this.getForumList(1)
							showToast('帖子删除成功')
						}
					})
				}).catch(e=>console.log(e))
			}
		}
	}
</script>

<style lang="scss">
.row{
	padding:0 25upx; 
	padding-bottom: 100upx;
}
.headers{
	border-bottom: 1px solid #e0e0e0;
	line-height:70upx;
	padding: 20upx;
}
.content{
	padding: 20upx;
	font-size: 26upx;
	color: #666;
}
.jz {
	margin:20upx 0;
	image{
		width: 150upx;
		height: 45upx;
	}
}
.item{
	font-size: 32upx;
	color: #333;
	line-height: 50upx;
	// padding: 20upx;
	border-radius: 6upx;
	margin-bottom: 30upx;
	background: #fff;
}
image{
	width: 50upx;
	height: 50upx;
}
.left,.rights{
	display: flex;
	align-items: center;
	line-height: 40upx;
	margin: 20upx 0;
	font-size: 26upx;
}
.right{
		width: 100%;
		font-size: 24upx;
		display: flex;
		line-height: 40upx;
		flex-direction: row-reverse;
	}
.left{
	
	color:#999;
	image,text{
		margin-right: 20upx;
	}
}
.footer{
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding:  0 20upx;
}
.right{
	color: #8d8d8d;
	text{
		margin-right: 5upx;
	}
	.see{
		margin-right: 10upx;
	}
}
.add{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		background: #ffd84d;
		text-align: center;
		color: #000;
		line-height: 100upx;
	}
	.bottom{
		display: flex;
		text-align: center;
		border-top:1px solid #e0e0e0 ;
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
	.bianji{
		border-right:1px solid #e0e0e0 ;
	}
	.onorder {
		text-align: center;
		margin-top: 160upx;
	
		image {
			width: 282upx;
			height: 462upx;
		}
	}
</style>
