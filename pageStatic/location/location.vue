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
				schoolName:''
			};
		},
		onLoad(option) {
			console.log(option)
			if(option.schoolName){
				this.schoolName=option.schoolName
			}else{
				this.schoolName='请选择学校'
			}
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
			if (this.max > 40) {
				this.loadMoreText = "没有更多数据了!"
				return;
			}
			this.showLoadMore = true;
			setTimeout(() => {
				this.setDate();
			}, 300);
		},
		methods: {
			initData() {
				setTimeout(() => {
					getSchoolList({
						pageNo: this.pageNo
					}).then(res => {
						console.log(res)
						this.data = res.data.schoolList
						uni.stopPullDownRefresh();
					}).catch(e => {
						console.log(e)
					})
					// this.max = 0;
					// this.data = [];
					// let data = [];
					// this.max += 10;
					// for (var i = this.max - 9; i < this.max + 1; i++) {
					// 	data.push(i)
					// }
					// this.data = this.data.concat(data);
				}, 300);
			},
			setDate() {
				let data = [];
				this.max += 10;
				for (var i = this.max - 9; i < this.max + 1; i++) {
					data.push(i)
				}
				this.data = this.data.concat(data);
			},
			selectSchool(item) {
				let parmas = {
					schoolId: item.id,
					schoolName: item.storeName
				}
				//修改上一页面的数据
				let pages = getCurrentPages()
				let prevPage = pages[pages.length - 2]
				showModal('选择学校', `你确认选择${item.storeName}吗？`).then(res => {
					selectSchool(parmas).then(re => {
						if (re.code == 0) {
							prevPage.$vm.schoolName=item.storeName
							uni.navigateBack({
								delta:1
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
