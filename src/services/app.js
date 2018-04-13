import { requestGet, requestPost } from '../utils/request';
import API_NAME from './apiNames';

export const authToken = async payload =>
  requestPost(API_NAME.AUTH_TOKEN, payload);
  
export const getJsConfig = async payload =>
  requestPost(API_NAME.WX_JSCONFIG, payload);
