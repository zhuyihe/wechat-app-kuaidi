import {showToast,showLoading,hideLoading} from '@/assets/js/common'
import store from '@/store/store'
const request = (url, data, method = 'GET') => {
	showLoading('加载中', true)
	return new Promise((resovle, reject) => {
		const httpRequest = uni.request({
			url,
			data,
			method,
			header: {
				"token":store.state.token,
				"content-type":"application/json;charset=UTF-8"
			},
			dataType: 'json',
			success: res => {
				console.log(res)
				if(res.statusCode==200){
					resovle(res.data)
				}else if(res.statusCode==403){
					if(store.state.token){
						console.log(store.state.token)
						uni.redirectTo({
							url:"/pages/login/login?hasAuth="+true
						})
					}else{
						console.log('获取openid')
						resovle(res.data)
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