import {showToast,showLoading,hideLoading,showModal,getStorageSync} from '@/assets/js/common'
const request = (url, data, method = 'GET') => {
	showLoading('加载中', true)
	return new Promise((resovle, reject) => {
		const httpRequest = uni.request({
			url,
			data,
			method,
			header: {
				"token":getStorageSync('token'),
				"content-type":"application/json;charset=UTF-8"
			},
			dataType: 'json',
			success: res => {
				// console.log(res)
				if(res.statusCode==200){
					resovle(res.data)
				}else if(res.statusCode==403){
					if(getStorageSync('token')){
						console.log(getStorageSync('token'))
						uni.redirectTo({
							url:"/pages/login/login?hasAuth="+true
						})
					}else{
						console.log(res.data)
						if(res.ret || url.indexOf('getOpenidByCode.do')>-1){
							resovle(res.data)
						}else{
							showModal('系统提示','您暂未登陆无法进行操作，是否登陆？','确定',true).then(res=>{
								uni.switchTab({
									url: '/pages/my/index'
								})
							}).catch(()=>{
								uni.switchTab({
									url: '/pages/static/index'
								})
							})
							showToast('请先登录！')
						}
						
					}
				}else if(res.statusCode==500){
					showToast('服务器异常，请联系管理员')
				}else if(res.statusCode==401){
					showToast('暂无权限')
				}
			},
			fail: res => {
				//请求超时 
				console.log(res)
				showToast('网络请求超时，请刷新重试')
				reject(res.data)
			},
			complete: () => {
				hideLoading();
			}
		})
	})
}
export default request