import request from './request'
import {BASE_URL} from '@/assets/js/const'
// 登陆
export const userLogin = (params) => request(BASE_URL + "weixin/getUserInfoBySessionKey.do", params, 'POST');
// 获取openid
export const getOpenid = (params) => request(BASE_URL + "weixin/getOpenidByCode.do", params);
//获取学校列表
export const getSchoolList = (params) => request(BASE_URL + "applet/school/list.do", params);
//选择学校
export const selectSchool = (params) => request(BASE_URL + "applet/school/selectSchool.do", 'PUT');
//获取省市区
export const getArea = (params) => request(BASE_URL + "area/querySonByPid.do?pid="+params);
//获取用户地址列表applet/memberUser/address.do
export const getUserAdress = () => request(BASE_URL + "applet/memberUser/address.do");
//保存地址applet/memberUser/address.do
export const setUserAdress = (params) => request(BASE_URL + "applet/memberUser/address.do",params,'POST');