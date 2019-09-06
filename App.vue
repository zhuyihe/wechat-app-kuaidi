<script>
	import {
		getStorageSync
	} from '@/assets/js/common'
	import store from '@/store/store'
	export default {
		onLaunch: function() {
			let that = this
			// 小程序启动判断用户是否授权，根据是否授权来请求不同的业务数据
			wx.getSetting({
				success: (res) => {
					//用户已授权
					if (res.authSetting['scope.userInfo']) {
						// 判断登录态是否过期
						uni.checkSession({
							// 登录态未过期，直接进行业务请求
							success: (res) => {
								uni.switchTab({
									url: 'pages/static/index'
								})
							},
							// 登录态已过期 。
							fail: (res) => {
								uni.redirectTo({
									url: '../login/login'
								})
							}
						})
					}
					// 为授权 
					else {
						uni.redirectTo({
							url: '../login/login'
						})
					}
				}
			})
		},
		onShow: function(options) {
			let option = JSON.stringify(options);
			console.log(option)
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {

		}
	}
</script>

<style>
	/* @import 'colorui/icon.css'; 
@import 'colorui/main.css'; */
	page {
		background: #f5f5f5;
	}

	.nav-list {
		display: flex;
		flex-wrap: wrap;
		padding: 0px 40rpx 0px;
		justify-content: space-between;
	}

	.nav-li {
		padding: 30rpx;
		border-radius: 12rpx;
		width: 45%;
		margin: 0 2.5% 40rpx;
		background-image: url(https://cdn.nlark.com/yuque/0/2019/png/280374/1552996358352-assets/web-upload/cc3b1807-c684-4b83-8f80-80e5b8a6b975.png);
		background-size: cover;
		background-position: center;
		position: relative;
		z-index: 1;
	}

	.nav-li::after {
		content: '';
		position: absolute;
		z-index: -1;
		background-color: inherit;
		width: 100%;
		height: 100%;
		left: 0;
		bottom: -10%;
		border-radius: 10rpx;
		opacity: 0.2;
		transform: scale(0.9, 0.9);
	}

	.nav-li.cur {
		color: #fff;
		background: rgb(94, 185, 94);
		box-shadow: 4rpx 4rpx 6rpx rgba(94, 185, 94, 0.4);
	}

	.nav-title {
		font-size: 32rpx;
		font-weight: 300;
	}

	.nav-title::first-letter {
		font-size: 40rpx;
		margin-right: 4rpx;
	}

	.nav-name {
		font-size: 28rpx;
		text-transform: Capitalize;
		margin-top: 20rpx;
		position: relative;
	}

	.nav-name::before {
		content: '';
		position: absolute;
		display: block;
		width: 40rpx;
		height: 6rpx;
		background: #fff;
		bottom: 0;
		right: 0;
		opacity: 0.5;
	}

	.nav-name::after {
		content: '';
		position: absolute;
		display: block;
		width: 100rpx;
		height: 1px;
		background: #fff;
		bottom: 0;
		right: 40rpx;
		opacity: 0.3;
	}

	.nav-name::first-letter {
		font-weight: bold;
		font-size: 36rpx;
		margin-right: 1px;
	}

	.nav-li text {
		position: absolute;
		right: 30rpx;
		top: 30rpx;
		font-size: 52rpx;
		width: 60rpx;
		height: 60rpx;
		text-align: center;
		line-height: 60rpx;
	}

	.text-light {
		font-weight: 300;
	}

	@keyframes show {
		0% {
			transform: translateY(-50px);
		}

		60% {
			transform: translateY(40rpx);
		}

		100% {
			transform: translateY(0px);
		}
	}

	@-webkit-keyframes show {
		0% {
			transform: translateY(-50px);
		}

		60% {
			transform: translateY(40px);
		}

		100% {
			transform: translateY(0px);
		}
	}

	html {
		font-size: 18.75px !important;
	}
</style>
