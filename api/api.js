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
//获取论坛列表
export const getForumList = (params) => request(BASE_URL + "applet/memberUser/forum/list.do?pageNo="+params);
//获取论坛详情
export const getForumDetial = (params) => request(BASE_URL + "applet/memberUser/forum/forumDetail.do?id="+params);
//论坛发帖
export const saveForum=(params) => request(BASE_URL + "applet/memberUser/forum/saveForum.do",params,'POST');
//查看帖子评论
export const getForumMessage=(params) => request(BASE_URL + "applet/memberUser/forum/forumMessage.do?id="+params.id+'&pageNo='+params.pageNo);
//回复帖子
export const saveForumMessage=(params) => request(BASE_URL + "applet/memberUser/forum/saveForumMessage.do",params,'POST');
//查看更多评论
export const forumMessageAll=(params) => request(BASE_URL + "applet/memberUser/forum/forumMessageAll.do?id="+params.id+'&pid='+params.pid+'&pageNo='+params.pageNo);
//编辑帖子
export const updateForum=(params) => request(BASE_URL + "applet/memberUser/forum/updateForum.do",params,'POST');
//删除帖子
export const delforum = (params) => request(BASE_URL + "applet/memberUser/forum/delforum.do?id="+params);
//查看个人中心的帖子
export const getUserBbs = (params) => request(BASE_URL + "applet/memberUser/forum/memberList.do?pageNo="+params);

