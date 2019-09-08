 import {setStorageSync} from '@/assets/js/common'
export const mutations={
	//临时登录凭证
	LOGIN_SESSIONKEY(state,sessionKey){
		state.token=sessionKey
		setStorageSync('state',state)
	},
	SCHOOLNAME(state,schoolName){
		state.schoolName=schoolName
		setStorageSync('state',state)
	}
	// USER_INFO(state,userInfo){
	// 	state.userInfo=userInfo
	// 	console.log(state)
	// 	setStorageSync('state',state)
	// }
}