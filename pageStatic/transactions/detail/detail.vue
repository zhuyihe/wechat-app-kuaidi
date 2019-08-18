<template>
	<view class="row">
		<view class="li">
			<view class="item">
				<view class="footer">
					<view class="left">
						<image class="image" src="../../../static/tou.png" mode=""></image>
						<text class="name">牵绊易世荣</text>
						<text class="time">2019.08.17</text>
					</view>
				</view>
				<view class="content">
					床头挂篮有三个，每个五块钱
				</view>
				<view class="imgs">
					<image src="../../../static/d.png" mode=""></image>
					<image src="../../../static/d.png" mode=""></image>
					<image src="../../../static/d.png" mode=""></image>
				</view>
			</view>
		</view>
		<view class="remark">
			<view class="tou">
				<view class="xian"></view>
				<view>评论<text>3</text></view>
			</view>
			<view class="rearkList">
				<view class="itemList">
					<view class="footer">
						<view class="left">
							<image class="image" src="../../../static/tou.png" mode=""></image>
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
							<image class="image" src="../../../static/tou.png" mode=""></image>
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
			align-items: center;
			font-size: 28upx;
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
</style>
