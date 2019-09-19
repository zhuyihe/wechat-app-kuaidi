<template>
	<view class="row">
		<view class="remark">
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
						<text class="text">床头挂篮有三个，每个五块钱</text>
						<uni-icon type="chat" size="16" color='#8d8d8d' @tap='remark'></uni-icon>
					</view>
				</view>
				<view class="itemList itemListitem">
					<view class="footer">
						<view class="left">
							<image class="image" src="https://6465-dev-iey4o-1257667322.tcb.qcloud.la/tou.png?sign=6518609ce25df47c20b8f9f0693ec45b&t=1567401028" mode=""></image>
							<text class="name">牵绊易世荣</text>
							<text class="time">2019.08.17</text>
						</view>
					</view>
					<view class="content content1">
						<text class="text">床头挂篮有三个，每个五块钱</text>
						<uni-icon type="chat" size="16" color='#8d8d8d' @tap='remark'></uni-icon>
					</view>
				</view>
				<view class="itemList itemListitem">
					<view class="footer">
						<view class="left">
							<image class="image" src="https://6465-dev-iey4o-1257667322.tcb.qcloud.la/tou.png?sign=6518609ce25df47c20b8f9f0693ec45b&t=1567401028" mode=""></image>
							<text class="name">牵绊易世荣</text>
							<text class="time">2019.08.17</text>
						</view>
					</view>
					<view class="content content1">
						<view class="text">
							<text class="names">@牵绊易世荣</text>床头挂篮有三个，每个五块钱
						</view>
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
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	export default {
		components: {
			uniPopup
		},
		data() {
			return {
			}
		},
		onLoad(option){
			console.log(option)
		},
		methods: {
			remark(){
				this.$refs.popup.open()
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
			
			.text{
				margin-right:10upx;
			}
			.names{
				color: #008de1;
			}
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
			background: #fff;
		}
		.itemListitem{
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
		}
	}
</style>
