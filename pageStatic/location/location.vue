<template>
	<view class="location">
		<view class="nowcur">
			<text class="wei">当前定位</text>
			<view class="now">
				<image src="https://6465-dev-iey4o-1257667322.tcb.qcloud.la/location.png?sign=79d94d4b350b3f09a1736a5a7a919bdf&t=1567401419"
				 mode=""></image>
				<text class="daxue">{{schoolName}}</text>
			</view>
		</view>
		<view class="list">
			<view class="listItem" v-for="(item,index) in data" :key="index" @click="selectSchool(item)">{{item.storeName}}</view>
			<view class="uni-loadmore" v-if="showLoadMore">{{loadMoreText}}</view>
		</view>
	</view>
</template>

<script>
	import {
		getSchoolList,
		selectSchool
	} from '@/api/api'
	import {
		showModal,
		setStorageSync
	} from '@/assets/js/common'
	export default {
		data() {
			return {
				data: [],
				loadMoreText: "加载中...",
				showLoadMore: false,
				pageNo: 1,
				schoolName: ''
			};
		},
		onLoad(option) {
			console.log(option)
			this.schoolName = option.schoolName
			this.showLoadMore=true
			this.initData();
		},
		onUnload() {
			this.max = 0,
				this.data = [],
				this.loadMoreText = "加载更多",
				this.showLoadMore = false;
		},
		onReachBottom() {
			console.log("onReachBottom");
			if(this.showLoadMore){
				this.pageNo++
				this.showLoadMore = true;
				setTimeout(() => {
					this.getSchoolList(this.pageNo, res => {
						console.log(res)
						if (res.data.schoolList) {
							this.data = this.data.concat(res.data.schoolList)
						} else {
							this.loadMoreText = "没有更多数据了!"
							this.showLoadMore=false
							return;
						}
					})
				}, 300)
			}
		},
		methods: {
			initData() {
				setTimeout(() => {
					this.getSchoolList(this.pageNo, res => {
						this.data = res.data.schoolList
					})
				}, 300);
			},
			getSchoolList(pageNo, callback) {
				getSchoolList({
					pageNo: pageNo
				}).then(res => {
					callback(res)
				})
			},
			selectSchool(item) {
				let parmas = {
					id: item.id,
					storeName: item.storeName
				}
				//修改上一页面的数据
				showModal('选择学校', `你确认选择${item.storeName}吗？`).then(res => {
					selectSchool(parmas).then(re => {
						console.log(re)
						if (re.code == 0) {
							this.$store.commit('SCHOOLMSG',{schoolName:parmas.storeName,school_id:parmas.id})
							uni.switchTab({
								url:'../../pages/static/index'
							})
						}
					}).catch(e => {
						console.log(e)
					})
				}).catch(e => {
					console.log(e)
				})
			}
		}
	}
</script>

<style lang="scss">
	@import '../../assets/css/uni.css';

	.location {
		background: #f5f5f5;
		padding-top: 25px;
	}

	.nowcur {
		padding-bottom: 10px;
		background: #fff;
		padding-left: 30px;
		line-height: 30px;

		image {
			width: 18px;
			height: 18px;
		}
	}

	.now {
		display: flex;
		align-items: center;
	}

	.wei {
		font-size: 14px;
		color: #999;
	}

	.daxue {
		margin-left: 10px;
	}

	.list {
		background: #FFFFFF;
		margin-top: 20px;
	}

	.listItem {
		line-height: 60px;
		border-bottom: 1px solid #ccc;
		margin: 0 25px;

		&:nth-last-child(1) {
			border-bottom: 0
		}
	}
</style>
