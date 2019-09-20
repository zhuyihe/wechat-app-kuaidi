<template>
	<view class="row">
		<view class="li">
			<view class="item">
				<view class="footer">
					<view class="left">
						<image class="image" :src="detail.headImg" mode=""></image>
						<text class="name">{{detail.mname}}</text>
						<text class="time">{{detail.createTime}}</text>
					</view>
				</view>
				<view class="content cons">
					<view class="header">
						{{detail.title}}
					</view>
					<view class="com">
						{{detail.message}}
					</view>
				</view>
				<view class="imgs">
					<template >
						<image v-for="(item,index) in detail.messageImg" :src="`${imgUrl+item}`" mode="" :key='index'></image>
					</template>
				</view>
			</view> 
		</view>
		<view class="remark">
			<view class="tou">
				<view class="tou1">
					<view class="xian"></view>
					<view>评论<text>{{detail.discussNum}}</text></view>
				</view>
				<view class="tou2">
					<text class="see">{{detail.lookNum}}</text>
					<uni-icon type="eye" size="16" color='#8d8d8d'></uni-icon>
				</view>
			</view>
			<view class="rearkList">
				<view class="itemList">
					<view class="footer">
						<view class="left">
							<image class="image" src="https://6465-dev-iey4o-1257667322.tcb.qcloud.la/tou.png?sign=6518609ce25df47c20b8f9f0693ec45b&t=1567401028" mode=""></image>
							<text class="name">牵绊易世荣</text>
							<text class="time">2019.08.17</text>
						</view>
					</view>
					<view class="content content1">
						<text>床头挂篮有三个，每个五块钱</text>
						<uni-icon type="chat" size="16" color='#8d8d8d' @tap='remark'></uni-icon>
					</view>
					<view class="replay">
						<view class="replayList">
							<view class="raname"><text>牵绊易世荣</text>:580元，原价是690元,我这个鞋子一次都没穿过这个你可以放心</view>
						</view>
						<view class="totalReplay" @tap="allReplay">
							共54条评论
						</view>
					</view>
				</view>
				<view class="itemList">
					<view class="footer">
						<view class="left">
							<image class="image" src="https://6465-dev-iey4o-1257667322.tcb.qcloud.la/tou.png?sign=6518609ce25df47c20b8f9f0693ec45b&t=1567401028" mode=""></image>
							<text class="name">牵绊易世荣</text>
							<text class="time">2019.08.17</text>
						</view>
					</view>
					<view class="content content1">
						<text>床头挂篮有三个，每个五块钱</text>
						<uni-icon type="chat" size="16" color='#8d8d8d' @tap='remark'></uni-icon>
					</view>
				</view>
			</view>
		</view>
		<uni-popup ref="popup" type="bottom">
			<view class="pinlun">
				<view class="rec">
					<input type="text" value="" placeholder="评论" />
				</view>
				<view class="submit">
					<text>发布</text>
				</view>
			</view>
		</uni-popup>
		
	</view>
</template>

<script>
	import {getForumDetial} from '@/api/api.js'
	import {IMG_URL} from '@/assets/js/const.js'
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	export default {
		components: {
			uniPopup
		},
		data() {
			return {
				id:null,
				detail:{},
				imgUrl:IMG_URL
			}
		},
		onLoad(option){
			this.id=option.id;
			this.getForumDetial(this.id)
		},
		methods: {
			remark(){
				this.$refs.popup.open()
			},
			allReplay(){
				uni.navigateTo({
					url:'../../replay/replay?path=bbs'
				})
			},
			async getForumDetial(id){
				let res=await getForumDetial(id)
				if(res.code==0){
					this.detail=res.data.memberForum
					this.detail.messageImg=res.data.memberForum.messageImg.split(',')
					console.log(this.detail)
				}
			}
		}
	}
</script>

<style scoped lang='scss'>
	.row {
		font-size: 30upx;
	}
	.totalReplay{
		color: #008de1;
	}
	.li {
		padding: 30upx 25upx;
		background: #FFFFFF;
		margin: 20upx 0;
	}

	.image {
		width: 65upx;
		height: 65upx;
		border-radius: 50%;
	}

	.left,
	.right {
		display: flex;
		align-items: center;
		line-height: 40upx;
		margin-bottom: 20upx;
		font-size: 30upx;
	}

	.left {
		color: #999;

		image,
		text {
			margin-right: 20upx;
		}
	}

	.footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.right {
		color: #8d8d8d;

		text {
			margin-right: 5upx;
		}
	}

	.name {
		font-size: 32upx;
		color: #000020;
	}

	.time {
		font-size: 26upx;
		margin-top: 10upx;
	}

	.imgs {
		justify-content: space-between;
		margin: 30upx 0;
		display: flex;

		image {
			width: 226upx;
			height: 226upx;
		}
	}

	.remark {
		background: #FFFFFF;
		/* margin-bottom: 160upx; */
		.tou {
			line-height: 90upx;
			border-bottom: 1px solid #e0e0e0;
			padding: 0 22upx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 28upx;
			.tou1,.tou2{
				display: flex;
				align-items: center;
			}
			.see{
				margin-right: 5upx;
			}
		}

		.xian {
			width: 4upx;
			height: 28upx;
			background: #ffd84d;
			margin-right: 10upx;
		}
		
	}

	.rearkList {
		padding-bottom:30upx;
		.itemList {
			padding: 23upx 22px;
		}

		.name {
			color: #8f8f8f;
		}

		.content {
			margin-left: 90upx;
		}

		.raname {
			text{
				color: #008de1;
			}
		}
		.replay{
			margin-left: 90upx;
			background: #ebebeb;
			font-size:26upx ;
			padding:0 20upx;
		}
		.replayList {
			display: flex;
			line-height: 50upx;
			margin-top: 20upx;
		}

		.itemList {
			border-bottom: 1px solid #e0e0e0;

			&:nth-last-child(1) {
				border: 0;
			}
		}

		.content1 {
			display: flex;
			justify-content: space-between;
		}
	}

	.pinlun {
		line-height: 120upx;
		display: flex;
		align-items: center;
		width: 100%;
		background: #fff;
		.rec{
			margin-bottom: 10upx;
			width: 80%;
			input{
				width:90%;
				/* border: 1px solid #ccc; */
				margin: auto;
				padding-left: 20upx;
				border-radius: 60upx;
				background: #eee;
				line-height: 60upx;
				height: 60upx;
			}
		}
		.submit{
			text-align: center;
			width: 20%;
			text{
				background: #ffd84d;
				padding:5upx 25upx;
				border-radius: 40upx;
			}
		}
	}
	.cons{
		.header{
			font-size: 30upx;
			font-weight: bold;
			margin: 20upx 0;
		}
		.com{
			font-size: 28upx;
			color: #666;
			line-height: 40upx;
			text-indent: 60upx;
		}
	}
</style>
