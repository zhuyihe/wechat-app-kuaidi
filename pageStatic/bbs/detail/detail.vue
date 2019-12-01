<template>
	<view class="row">
		<view class="li">
			<view class="item">
				<view class="footer">
					<view class="left">
						<image class="image" :src="detail.headImg" mode=""></image>
						<text class="name">{{detail.mname}}</text>
						<text class="time">{{dateFtt('yyyy-MM-dd',detail.createTime)}}</text>
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
				<view class="imgs" v-if='detail.messageImg'>
					<template>
						<image v-for="(item,index) in detail.messageImg" :src="`${imgUrl+item}`" mode="" :key='index' @click="previewImage(`${imgUrl+item}`)"></image>
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
				<view class="replayLists" v-if='!replayList'>
					暂无评论，快来评论吧~~
				</view>
				<view v-for='(item,index) in replayList' :key='index' v-else>
					<view class="itemList">
						<view class="footer">
							<view class="left">
								<image class="image" :src="item.headImg" mode=""></image>
								<text class="name">{{item.mname}}</text>
								<text class="time">{{dateFtt('yyyy-MM-dd',item.createTime)}}</text>
							</view>
						</view>
						<view class="content content1">
							<text>{{item.message}}</text>
							<uni-icon type="chat" size="20" color='#8d8d8d' @tap='remark(2,item)'></uni-icon>
						</view>
						<view class="replay" v-if='item.sname'>
							<view class="replayList">
								<view class="raname"><text>{{item.sname}}</text>:{{item.smessage}}</view>
							</view>
							<view class="totalReplay" @tap="allReplay(item)" v-if='item.totalNum>1'>
								共{{item.totalNum}}条评论
							</view>
						</view>
					</view>
					<!-- <view class="itemList" v-else>
						<view class="footer">
							<view class="left">
								<image class="image" :src="item.headImg" mode=""></image>
								<text class="name">{{item.mname}}</text>
								<text class="time">{{item.createTime}}</text>
							</view>
						</view>
						<view class="content content1">
							<text>{{item.message}}</text>
							<uni-icon type="chat" size="16" color='#8d8d8d' @tap='remark'></uni-icon>
						</view>
					</view> -->
				</view>
			</view>
		</view>
		<uni-popup ref="popup" type="bottom" @change='closePopup'>
			<view class="pinlun">
				<view class="rec">
					<input type="text" value="" :placeholder="replayholder" v-model="message" :focus='setFocus' cursor-spacing='15px' />
				</view>
				<view class="submit" @tap="replay(replayIndex)">
					<text>发布</text>
				</view>
			</view>
		</uni-popup>
		<view class="add">
			<button class="btn" @tap='remark(1)'>
				评论
			</button>
		</view>
	</view>
</template>

<script>
	import {
		getForumDetial,
		getForumMessage,
		saveForumMessage,
		forumMessageAll
	} from '@/api/api.js'
	import {
		IMG_URL
	} from '@/assets/js/const.js'
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	import {
		showToast,
		showModal,
		dateFtt
	} from '@/assets/js/common'
	export default {
		components: {
			uniPopup
		},
		data() {
			return {
				id: null,
				detail: {},
				imgUrl: IMG_URL,
				pageNO: 1,
				replayList: [],
				replayholder: '回复',
				message: '',
				pid: 0, //
				tomid: 0,
				setFocus: false,
				replayIndex: 1
			}
		},
		onLoad(option) {
			this.id = option.id;
			this.getForumDetial(this.id)
			this.getForumMessage(this.id, 1)
		},
		onShow(){
			this.getForumMessage(this.id, 1)
		},
		methods: {
			previewImage(currentUrl) {
				let imgArray=this.detail.messageImg.map(item=>{
					return  IMG_URL+item
				})
				uni.previewImage({
					urls:imgArray,
					current:currentUrl,
					success:res=>{
						console.log(res)
					},fail:e=> {
						console.log(e)
					}
				});
			},
			async getForumMessage(id, pageNo) {
				let parmas = {
					id,
					pageNo
				}
				let res = await getForumMessage(parmas)
				console.log(res)
				if (res.code == 0) {
					this.replayList = res.data.memberForumMessageVOList
				}
			},
			remark(index,item) {
				this.$refs.popup.open()
				console.log(item)
				console.log(index)
				//index=1评论帖子，index=2评论一级用户
				if (index == 2) {
					this.replayholder = '@' + item.mname
					this.pid = item.id
					this.replayIndex = 2
				} else {
					//评论帖子
					this.replayIndex = 1
					this.replayholder = '评论'
					this.pid = 0
				}
				this.tomid = 0;
			},
			allReplay(item) {
				console.log(item)
				uni.navigateTo({
					url: '../../replay/replay?path=bbs&item='+JSON.stringify(item)
				})
			},
			async getForumDetial(id) {
				let res = await getForumDetial(id)
				if (res.code == 0) {
					this.detail = res.data.memberForum
					if(res.data.memberForum.messageImg) this.detail.messageImg = res.data.memberForum.messageImg.split(',')
					console.log(this.detail)
				}
			},
			replay(index) {
				if (this.message) {
					let parmas = {
						forum_id: this.id,
						message: this.message,
						pid: this.pid,
						tomid: this.tomid
					}
					console.log(parmas)
					saveForumMessage(parmas).then(res => {
						if (res.code == 0) {
							console.log(res)
							this.getForumMessage(this.id, 1)
							this.message = ''
							this.$refs.popup.close()
							showToast('回复成功')
						}else{
							showToast(res.msg)
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

	.replayLists {
		width: 400upx;
		margin:20upx auto;
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
		/* justify-content: space-between; */
		margin: 30upx 0;
		display: flex;

		image {
			width: 226upx;
			height: 226upx;
		}
	}

	.remark {
		background: #FFFFFF;
		padding-bottom: 100upx;

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
		}

		.raname {
			text {
				color: #008de1;
			}
		}

		.replay {
			margin: 10upx 0;
			margin-left: 90upx;
			background: #ebebeb;
			font-size: 26upx;
			padding:5upx 20upx;
		}

		.replayList {
			display: flex;
			line-height: 50upx;
			/* margin-top: 20upx; */
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
			text-indent: 60upx;
		}
	}

	.add {
		position: fixed;
		bottom: 20upx;
		left: 0;
		width: 100%;
		text-align: center;
		color: #000;

		text-align: center;
	}

	.btn {
		width: 80%;
		background: #ffd84d;
		border-radius: 60upx;
		line-height: 80upx;
		height: 80upx;
		margin: auto;
	}
</style>
