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
				// "Authorization":"Bearer " + store.state.token,
			},
			dataType: 'json',
			success: res => {
				if(res.statusCode==200){
					resovle(res.data)
				}else if(res.statusCode==403){
					console.log(res.statusCode)
				}else{
					console.log(res.statusCode)
				}
			},
			fail: res => {
				//请求超时 
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