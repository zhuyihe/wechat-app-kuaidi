<template>
	<view class="row">
		<view class="jz">
			<image src="https://6465-dev-iey4o-1257667322.tcb.qcloud.la/jz.png?sign=e1db5f3e4f92324f98e378c7e9f24789&t=1567401576" mode=""></image>
		</view>
		<view class="li">
			<view class="item" v-for="(item,index) of list" :key='index' @tap="toDetial(item.id)">
				<view class="content">
					{{item.title}}
				</view>
				<view class="time">
					{{dateFtt('yyyy-MM-dd',item.createTime)}}
				</view>
			</view>
			<view class="uni-loadmore" v-if="showLoadMore">{{loadMoreText}}</view>
		</view>
	</view>
</template>

<script>
	import {partList} from "@/api/api.js"
	import {dateFtt} from '@/assets/js/common.js'
	export default {
		data() {
			return {
				list:[],
				pageNo:1,
				loadMoreText: "加载中...",
				showLoadMore: false,
			};
		},
		onLoad(){
			this.initData()
		},
		onUnload() {
			this.max = 0,
				this.list = [],
				this.loadMoreText = "加载更多",
				this.showLoadMore = false;
		},
		onReachBottom() {
			console.log("onReachBottom");
			this.pageNo++
			this.showLoadMore = true;
			setTimeout(() => {
				this.partList(this.pageNo, res => {
					console.log(res)
					if (res.data.schoolPartList) {
						this.list = this.list.concat(res.data.schoolPartList)
					} else {
						this.loadMoreText = "没有更多数据了!"
						return;
					}
				})
			}, 300)
		},
		methods:{
			initData() {
				setTimeout(() => {
					this.partList(this.pageNo, res => {
						this.list = res.data.schoolPartList
					})
				}, 300);
			},
			toDetial(id){
				uni.navigateTo({
					url:'detail/detail?id='+id
				})
			},
			partList(pageNo, callback){
				partList(pageNo).then(res => {
					callback(res)
				})
			}
		}
	}
</script>

<style lang="scss">
	@import '../../assets/css/uni.css';
.row{
	padding:0 25upx; 
}
.jz {
	margin:20upx 0;
	image{
		width: 150upx;
		height: 45upx;
	}
}
.item{
	font-size: 30upx;
	color: #333;
	line-height: 50upx;
	padding: 20upx;
	border-radius: 6upx;
	margin-bottom: 30upx;
	background: #fff;
}
.time{
	text-align: right;
	color: #999;
}
</style>
