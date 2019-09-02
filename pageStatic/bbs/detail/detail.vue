<template>
	<view class="row">
		<view class="li">
			<view class="item">
				<view class="footer">
					<view class="left">
						<image class="image" src="https://6465-dev-iey4o-1257667322.tcb.qcloud.la/tou.png?sign=404191945d458a6bb6d6abb5416b445a&t=1567400960" mode=""></image>
						<text class="name">牵绊易世荣</text>
						<text class="time">2019.08.17</text>
					</view>
				</view>
				<view class="content cons">
					<view class="header">
						我作为盗墓笔记的粉丝，感觉还是李易峰杨洋他们演的好看…剩下...
					</view>
					<view class="com">
						我作为盗墓笔记的粉丝，感觉还是李易峰杨洋他们演的好看…剩下老九门，沙海这几部拍的什么…啰哩啰嗦的老九门就几个地方好看…沙海强点剧情有地方跟上了…但是感觉还是第一部最好看我看了5遍了…三叔是请不起以前这些人了还是他们档期不够…粉丝们很期待啊
					</view>
				</view>
				<view class="imgs">
					<image src="https://6465-dev-iey4o-1257667322.tcb.qcloud.la/d.png?sign=0b212c559f7e9bf2a8d7e20bdf823a94&t=1567400989" mode=""></image>
					<image src="https://6465-dev-iey4o-1257667322.tcb.qcloud.la/d.png?sign=0b212c559f7e9bf2a8d7e20bdf823a94&t=1567400989" mode=""></image>
					<image src="https://6465-dev-iey4o-1257667322.tcb.qcloud.la/d.png?sign=0b212c559f7e9bf2a8d7e20bdf823a94&t=1567400989" mode=""></image>
				</view>
			</view> 
		</view>
		<view class="remark">
			<view class="tou">
				<view class="tou1">
					<view class="xian"></view>
					<view>评论<text>3</text></view>
				</view>
				<view class="tou2">
					<text class="see">2</text>
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
					<view class="content">
						<text>床头挂篮有三个，每个五块钱</text>
						<view class="replay">
							<view class="raname">牵绊易世荣:</view>
							<view class="recontent">
								580元，原价是690元,我这个鞋子一次都没穿过这个你可以放心
							</view>
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
						<uni-icon type="chat" size="16" color='#8d8d8d'></uni-icon>
					</view>
				</view>
			</view>
		</view>
		<view class="pinlun">
			<view class="rec">
				<input type="text" value="" placeholder="评论" />
			</view>
			<view class="submit">
				<text>发布</text>
			</view>
		</view>
	</view>
</template>

<script>
	import uniIcon from '@/components/uni-icon/uni-icon.vue'
	export default {
		components: {
			uniIcon
		},
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style scoped lang='scss'>
	.row {
		font-size: 30upx;
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
		margin-bottom: 160upx;
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
			color: #008de1;
			width: 400upx;
			text-align: center;
		}

		.replay {
			display: flex;
			background: #ebebeb;
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
		position: fixed;
		bottom: 0;
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
