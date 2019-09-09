<template>
	<view>
		<view class="uni-textarea">
			<textarea placeholder="请输入文字,最多150" blur="bindTextAreaBlur" maxlength="150" class="text" />
			</view>
			<ss-upload-image :url="url" :file-list="fileList" :name="name" @on-success="onSuccess" @on-error="" @on-remove="onRemove" @on-process="onProcess" />
		</view>
</template>
<script>
	import ssUploadImage from '@/components/ss-upload-image/ss-upload-image.vue'
	export default {
		components:{
			ssUploadImage
		},
		data() {
			return {
				title: 'textarea',
				focus: false,
				fileList: [],
				url: 'http://',
				name: 'file'
			}
		},
		methods: {
			bindTextAreaBlur: function (e) {
				console.log(e.detail.value)
			},
			// 上传成功
			onSuccess(res) {
			  // 响应示例
			  // {
			  //    code: 0,
			  //    data: {
			  //      image_url: 'http://www.xxxxx.png'
			  //    },
			  //    message: '上传成功'
			  // }
			  if (res.code === 0) {
			    this.fileList.push(res.data.image_url)
			  }
			  console.log(res)
			},
			// 上传进程
			onProcess(res) {
			  console.log(res)
			},
			// 上传失败
			onError(err) {
			  console.log(err)
			},
			// 移除
			onRemove(index) {
			  this.fileList.splice(index, 1)
			}
		}
	}
</script>

<style lang="scss">
	@import '../../../assets/css/uni.css';
	.text{
		height: 500upx !important;
		margin-top: 25upx;
	}
</style>
