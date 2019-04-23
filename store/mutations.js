 import {setStorageSync} from '@/assets/js/common'
export const mutations={
	//临时登录凭证
	LOGIN_CODE(state,code){
		state.code=code
		setStorageSync('state',state)
	},
	USER_INFO(state,userInfo){
		state.userInfo=userInfo
		console.log(state)
		setStorageSync('state',state)
	}
}