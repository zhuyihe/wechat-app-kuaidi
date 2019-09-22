<template>
	<view class="row">
		<view class="remark">
			<view class="rearkList">
				<view class="itemList">
					<view class="footer">
						<view class="left">
							<image class="image" :src="items.headImg"
							 mode=""></image>
							<text class="name">{{items.mname}}</text>
							<text class="time">{{dateFtt('yyyy-MM-dd',items.createTime)}}</text>
						</view>
					</view>
					<view class="content content1">
						<text class="text">{{items.message}}</text>
						<uni-icon type="chat" size="16" color='#8d8d8d' @tap='remark(1)'></uni-icon>
					</view>
				</view>
				<!-- <view class="itemList itemListitem">
					<view class="footer">
						<view class="left">
							<image class="image" src="https://6465-dev-iey4o-1257667322.tcb.qcloud.la/tou.png?sign=6518609ce25df47c20b8f9f0693ec45b&t=1567401028"
							 mode=""></image>
							<text class="name">牵绊易世荣</text>
							<text class="time">2019.08.17</text>
						</view>
					</view>
					<view class="content content1">
						<text class="text">床头挂篮有三个，每个五块钱</text>
						<uni-icon type="chat" size="16" color='#8d8d8d' @tap='remark'></uni-icon>
					</view>
				</view> -->
				<view class="itemList itemListitem" v-for='(item,index) in replayList' :key='index'>
					<view class="footer">
						<view class="left">
							<image class="image" :src="item.headImg"
							 mode=""></image>
							<text class="name">{{item.mname}}</text>
							<text class="time">{{dateFtt('yyyy-MM-dd',item.createTime)}}</text>
							<text v-if='items.mid==item.mid' class="lou">楼主</text>
						</view>
					</view>
					<view class="content content1">
						<view class="text">
							<text class="names" v-if='item.tomid!==0'>@{{item.tomname}}</text>{{item.message}}
						</view>
						<uni-icon type="chat" size="16" color='#8d8d8d' @tap='remark(2,item)'></uni-icon>
					</view>
				</view>
			</view>
		</view>
		<uni-popup ref="popup" type="bottom" @change='closePopup'>
			<view class="pinlun">
				<view class="rec">
					<input type="text" value="" :placeholder="placeholder" :focus="setFocus" v-model="message" />
				</view>
				<view class="submit" @tap="saveForumMessage">
					<text>发布</text>
				</view>
			</view>
		</uni-popup>

	</view>
</template>

<script>
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	import {
		forumMessageAll,
		saveForumMessage
	} from '@/api/api.js'
	import {dateFtt} from '@/assets/js/common.js'
	export default {
		components: {
			uniPopup
		},
		data() {
			return {
				pageNo: 1,
				items:{},
				replayList:[],
				setFocus: false,
				message:'',
				placeholder:'评论',
				id:null,//帖子id
				pid:null,//楼主id
				tomid: 0,//消息的mid
			}
		},
		onLoad(option) {
			if (option.path == 'bbs') {
				this.items=JSON.parse(option.item)
				console.log(this.items)
				this.id=this.items.forum_id
				this.pid=this.items.id
				this.forumMessageAll(1)
			}
		},
		methods: {
			remark(index,data) {
				console.log(data)
				this.$refs.popup.open()
				this.setFocus=true;
				//index=1 评论楼主 index=2 评论用户
				if(index==1){
					this.placeholder = '@' + this.items.mname
					this.tomid=0
				}else{
					this.placeholder = '@' + data.mname
					this.tomid=data.mid
				}
			},
			async forumMessageAll(pageNo){
				let parmas={
					id:this.items.forum_id,
					pid:this.items.id,
					pageNo:pageNo
				}
				let res=await forumMessageAll(parmas)
				if(res.code==0){
					this.replayList=res.data.memberForumMessageList
				}
			},
			async saveForumMessage(){
				if (this.message) {
					let parmas = {
						forum_id: this.id,
						message: this.message,
						pid: this.pid,
						tomid: this.tomid
					}
					console.log(parmas)
					console.log(parmas)
					saveForumMessage(parmas).then(res => {
						if (res.code == 0) {
							console.log(res)
							this.forumMessageAll(1)
							this.message = ''
							this.$refs.popup.close()
							showToast('回复成功')
						}
					}).catch(e => {
						console.log(e)
					})
				} else {
					this.$refs.popup.close()
				}
			},
			closePopup(item) {
				if (item.show) {
					this.setFocus = true
				} else {
					this.setFocus = false
				}
			}
		}
	}
</script>

<style scoped lang='scss'>
	.row {
		font-size: 30upx;
	}

	.totalReplay {
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
		margin-bottom: 15upx;
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
		font-size: 30upx;
		color: #000020;
	}

	.time {
		font-size: 26upx;
		margin-top: 5upx;
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

		/* background: #FFFFFF; */
		/* margin-bottom: 160upx; */
		.tou {
			line-height: 90upx;
			border-bottom: 1px solid #e0e0e0;
			padding: 0 22upx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 28upx;

			.tou1,
			.tou2 {
				display: flex;
				align-items: center;
			}

			.see {
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
		padding-bottom: 30upx;

		.itemList {
			padding: 23upx 22px;
		}

		.name {
			color: #8f8f8f;
		}

		.content {
			margin-left: 90upx;

			.text {
				margin-right: 10upx;
			}

			.names {
				color: #008de1;
			}
		}

		.raname {
			text {
				color: #008de1;
			}
		}

		.replay {
			margin-left: 90upx;
			background: #ebebeb;
			font-size: 26upx;
			padding: 0 20upx;
		}

		.replayList {
			display: flex;
			line-height: 50upx;
			margin-top: 20upx;
		}

		.itemList {
			background: #fff;
		}

		.itemListitem {
			background: #f5f5f5;
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

		.rec {
			margin-bottom: 10upx;
			width: 80%;

			input {
				width: 90%;
				/* border: 1px solid #ccc; */
				margin: auto;
				padding-left: 20upx;
				border-radius: 60upx;
				background: #eee;
				line-height: 60upx;
				height: 60upx;
			}
		}

		.submit {
			text-align: center;
			width: 20%;

			text {
				background: #ffd84d;
				padding: 5upx 25upx;
				border-radius: 40upx;
			}
		}
	}

	.cons {
		.header {
			font-size: 30upx;
			font-weight: bold;
			margin: 20upx 0;
		}

		.com {
			font-size: 28upx;
			color: #666;
			line-height: 40upx;
		}
	}
	.lou{
		font-size: 22upx;
		color: #fff;
		background: #008de1;
		padding: 0 10upx;
		border-radius: 20upx;
	}
</style>
