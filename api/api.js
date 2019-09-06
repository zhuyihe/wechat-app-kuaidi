import request from './request'
import {BASE_URL} from '@/assets/js/const'
// 登陆
export const login = (params) => request(BASE_URL + "/weixin/getOpenidByCode.do", params, 'POST');
// // 创建联运汇理赔订单(小程序)
// export const hyxLyhClaimSave = (params) => request(API_PREFIX + "/v1/hyx/lyh/claim/save/wechat", params, 'POST');