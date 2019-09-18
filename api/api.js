import request from './request'
import {BASE_URL} from '@/assets/js/const'
// 登陆
export const userLogin = (params) => request(BASE_URL + "weixin/getUserInfoBySessionKey.do", params, 'POST');
// 获取openid
export const getOpenid = (params) => request(BASE_URL + "weixin/getOpenidByCode.do", params);
//获取学校列表
export const getSchoolList = (params) => request(BASE_URL + "applet/school/list.do", params);
//选择学校
export const selectSchool = (params) => request(BASE_URL + "applet/school/selectSchool.do",params, 'POST');
//获取省市区
export const getArea = (params) => request(BASE_URL + "area/querySonByPid.do?pid="+params);
//获取用户地址列表applet/memberUser/address.do
export const getUserAdress = () => request(BASE_URL + "applet/memberUser/address.do");
//保存地址applet/memberUser/address.do
export const setUserAdress = (params) => request(BASE_URL + "applet/memberUser/address.do",params,'POST');
//获取首页信息
export const getHomeIndex = () => request(BASE_URL + "home/index.do");
//计算价格
export const getMemberOrderPrice = (params) => request(BASE_URL + "applet/memberOrder/getMemberOrderPrice.do",params,'POST');
//提交订单
export const saveMemberOrder=(params) => request(BASE_URL + "applet/memberOrder/saveMemberOrder.do",params,'POST');
//获取订单 
export const memberOrderDetail = (params) => request(BASE_URL + "applet/memberOrder/memberOrderDetail.do?payCode="+params);
//获取订单列表
export const getOrderList = (params) => request(BASE_URL + "applet/memberOrder/list.do?pageNo="+params.pageNo+'&status='+params.status);
// 删除订单
export const delmemberOrder = (params) => request(BASE_URL + "applet/memberOrder/delmemberOrder.do?payCode="+params);
//会员优惠券列表
export const couponMemberlist = (params) => request(BASE_URL + "applet/memberUser/coupon/memberlist.do?state="+params);
//删除优惠券
export const couponDelCoupon = (params) => request(BASE_URL + "applet/memberUser/coupon/delCoupon.do?id="+params);
//领取优惠券列表
export const getCouponList = () => request(BASE_URL + "applet/memberUser/coupon/list.do");
//领取优惠券
export const getCoupon = (params) => request(BASE_URL + "applet/memberUser/coupon/getCoupon.do?code="+params);
