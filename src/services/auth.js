import { requestGet, requestPost } from '../utils/request';
import API_NAME from './apiNames';

//账户绑定
export const bindingAccount = async payload =>
  requestPost(API_NAME.BIND_ACCOUNT, payload);
//账户解绑
export const unBindAccount = async payload =>
  requestPost(API_NAME.UNBIND_ACCOUNT, payload);
//发送短信验证码
export const sendMessage = async payload =>
  requestPost(API_NAME.SEND_MESSAGE, payload);
//获取用户信息
export const fetchUserInfo = async params =>
  requestGet(API_NAME.INFO_PERSON, params);
//短信验证码校验
export const checkVerifyCode = async params =>
  requestPost(API_NAME.CHECK_VERIFYCODE, params);
//身份证后4位校验
export const checkVerifyCert = async params =>
  requestPost(API_NAME.CHECK_VERIFYCERT, params);
//重置登陆密码
export const resetPassword = async params =>
  requestPost(API_NAME.PASSWORD_RESET, params);
