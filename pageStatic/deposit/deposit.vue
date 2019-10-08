<template>
	<view>
		<view class="block">
			<view class="title">
				我的账户
			</view>
			<view class="content">
				<view class="my">
					可提现余额：{{member.blanceMoney}} 元
				</view>
			</view>
		</view>
		<view class="block">
			<view class="title">
				提现金额
			</view>
			<view class="content">
				<view class="amount">
					<view class="list">
						<view class="box" v-for="(amount,index) in amountList" :key="index" @tap="select(amount)" :class="{'on':amount == inputAmount}">
							{{amount}}元
						</view>
					</view>
					<view class="num">
						<view class="text">
							自定义提现金额
						</view>
						<view class="input">
							<input type="number" v-model="inputAmount" />
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="pay">
			<view class="btn" @tap="doDeposit">立即提现</view>
		</view>
	</view>
</template>

<script>
	import {memberMoney,saveWithdraw} from '@/api/api.js'
	import {
		showToast,
		showModal
	} from '@/assets/js/common'
	export default {
		data() {
			return {
				inputAmount:'',//金额
				amountList:[10,50,100],//预设3个可选快捷金额
				paytype:'alipay',//支付类型
				member:{}
			};
		},
		methods:{
			select(amount){
				this.inputAmount = amount;
			},
			doDeposit(){
				if (parseFloat(this.inputAmount).toString() == "NaN") {
					uni.showToast({title:'请输入正确金额',icon:'none'});
					return ;
				}
				if(this.inputAmount<=0){
					uni.showToast({title:'请输入大于0的金额',icon:'none'});
					return ;
				}
				if(this.inputAmount%1 !== 0){
					uni.showToast({title:'提现金额必须为整数~~',icon:'none'});
					return ;
				}
				this.saveWithdraw(this.inputAmount)
				//模板模拟支付，实际应用请调起微信/支付宝
				// uni.showLoading({
				// 	title:'...'
				// });
				// setTimeout(()=>{
				// 	uni.hideLoading();
				// 	uni.showToast({
				// 		title:'支付成功'
				// 	});
				// 	setTimeout(()=>{
				// 		uni.redirectTo({
				// 			url:'../../pay/success/success?amount='+this.inputAmount
				// 		});
				// 	},300);
				// },700)
			},
			async memberMoney(){
				let res= await memberMoney()
				if(res.code==0){
					this.member=res.data.memberVo
				}
			},
			async saveWithdraw(amount){
				let res=await saveWithdraw({amount})
				if(res.code==0){
					showToast('提交申请成功，请耐心等待！')
					setTimeout(()=>{
						uni.navigateBack({
							delta:1
						})
						uni.setStorageSync('getMoney',true)
					},2000)
				}else{
					showToast(res.msg)
				}
			}
		},
		onLoad() {
			this.memberMoney()
		},
	}
</script>

<style lang="scss">
	page{
		background: #fff;
	}
	.block{
		width: 94%;
		padding: 20upx 3%;
		.title{
			width: 100%;
			font-size: 34upx;
		}
		.content{
			.my{
				width: 100%;
				height: 120upx;
				display: flex;
				align-items: center;
				font-size: 30upx;
				border-bottom: solid 1upx #eee;
			}
			.amount{
				width: 100%;
				
				.list{
					display: flex;
					justify-content: space-between;
					padding: 20upx 0;
					.box{
						width: 30%;
						height: 120upx;
						display: flex;
						justify-content: center;
						align-items: center;
						border-radius: 10upx;
						box-shadow: 0upx 5upx 20upx rgba(0,0,0,0.05);
						font-size: 36upx;
						background-color: #f1f1f1;
						color: 333;
						&.on{
							background-color: #ffd84d;
							color: #fff;
						}
					}
				}
				.num{
					margin-top: 10upx;
					display: flex;
					justify-content: flex-end;
					align-items: center;
					.text{
						padding-right: 10upx;
						font-size: 30upx;
					}
					.input{
						width: 28.2vw;
						border-bottom: solid 2upx #999;
						
						justify-content: flex-end;
						align-items: center;
						input{
							margin: 0 20upx;
							height: 60upx;
							font-size: 30upx;
							color: #ffd84d;
							justify-content: flex-end;
							align-items: center;
						}
					}
				}
			}
			.pay-list{
				width: 100%;
				border-bottom: solid 1upx #eee;
				.row{
					width: 100%;
					height: 120upx;
					display: flex;
					align-items: center;
					.left{
						width: 100upx;
						flex-shrink: 0;
						display: flex;
						align-items: center;
						image{
							width: 80upx;
							height: 80upx;
						}
					}
					.center{
						width: 100%;
						font-size: 30upx;
					}
					.right{
						width: 100upx;
						flex-shrink: 0;
						display: flex;
						justify-content: flex-end;
					}
				}
			}
		}
	}
	.pay{
		margin-top: 20upx;
		width: 100%;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		.btn{
			width: 70%;
			height: 80upx;
			border-radius: 80upx;
			display: flex;
			justify-content: center;
			align-items: center;
			color: #000;
			background-color: #ffd84d;
			box-shadow: 0upx 5upx 10upx rgba(0,0,0,0.2);
		}
		.tis{
			margin-top: 10upx;
			width: 100%;
			font-size: 24upx;
			display: flex;
			justify-content: center;
			align-items: baseline;
			color: #999;
			.terms{
				color: #5a9ef7;
			}
		}
	}
</style>
