// import {
// 	PHONE_REGEXP
// } from './const.js'
export const showLoading = (title = "拼命加载中...", mask) => {
	return new Promise((resovle, reject) => {
		uni.showLoading({
			title: title, //string
			mask: mask, //boolean
			success: (res) => {
				resovle(res);
			},
			fail: (res) => {
				reject(res);
			}
		})
	})
}
export const hideLoading = () => {
	uni.hideLoading()
}
export const showToast = (title = "", icon = "none") => {
	return new Promise((resovle, reject) => {
		uni.showToast({
			title,
			icon,
			mask: false,
			duration: 2000,
			success: res => {
				resovle(res)
			},
			fail: res => {
				reject(res)
			},
		})
	})
}
export const showModal = (title = "", content = "", cancelText = '取消', showCancel = true, confirmText = "确定") => {
	return new Promise((resovle, reject) => {
		uni.showModal({
			title,
			content,
			cancelText,
			showCancel,
			confirmText,
			success: res => {
				resovle(res)
			},
			fail: res => {
				reject(res)
			}
		})
	})
}
export const showActionSheet = (itemList) => {
	return new Promise((resovle, reject) => {
		uni.showActionSheet({
			itemList,
			success: res => {
				resovle(res)
			},
			fail: res => {
				resovle(res)
			},
		})
	})
}
export const setStorageSync = (key, value) => {
	try {
		uni.setStorageSync(key, JSON.stringify(value))
	} catch (e) {
		console.log(e);
	}
}
export const getStorageSync = (key) => {
	try {
		const value = uni.getStorageSync(key);
		if (value) {
			return JSON.parse(value)
		}
	} catch (e) {
		console.log(e)
	}
}
export const removeStorageSync = (key) => {
	try {
		uni.removeStorageSync(key);
	} catch (e) {
		console.log(e)
	}
}
export const clearStorageSync = () => {
	try {
		uni.clearStorageSync()
	} catch (e) {
		console.log(e)
	}
}
export const showShare = () => {
	wx.showShareMenu({
		shareTicket: true
	})
}
// export const checkPhone = (phone) => {
// 	return PHONE_REGEXP.test(phone.trim()) ? true : false
// }
export const uniLogin=()=>{
	return new Promise((resolve,reject)=>{
		uni.login({
			provider:'weixin',
			success:res=>{
				resolve(res)
			},
			fail:e=>{
				reject(e)
			}
		})	
	})
}
export const uniGetuserinfo=()=>{
	return new Promise((resolve,reject)=>{
		uni.getUserInfo({
			provider:'weixin',
			success:res=>{
				resolve(res)
			},
			fail:e=>{
				reject(e)
			}
		})	
	})
}