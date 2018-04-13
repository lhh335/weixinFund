// import fetch from "dva/fetch";
import { config } from '../config/base';
import request from 'superagent';
import CryptoJS from 'crypto-js';
import md5 from 'md5';
import { Toast } from 'antd-mobile';
import API_NAME from '../services/apiNames';

const reqConfig = config.request;

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response.body;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * 参数格式化url
 *
 * @param  {string} [params] get url
 * @param  {object} [params] get params
 * @return {string} 拼接后url
 */
function formatUrl(url, params) {
  const bodyArray = [];
  if (params) {
    Object.keys(params).forEach(key => bodyArray.push(`${key}=${params[key]}`));
    if (url.search(/\?/) === -1) {
      url += `?${bodyArray.join('&')}`;
    } else {
      url += `&${bodyArray.join('&')}`;
    }
  }
  return url;
}

/**
 * head参数设置
 *
 * @param  {object} [header] head参数
 * @return {object}
 */
export function authHeader(header) {
  let headers = {
    'Content-Type': 'application/json'
  };

  if (header) {
    headers = Object.assign(headers, header);
  }
  return headers;
}

const NoToastList = [API_NAME.BIND_ACCOUNT];

/**
 * 数据处理中间件
 *
 * @param  {object} data 后台返回数据
 * @return {object}
 */
function parseErrorMessage(data, url) {
  const { status } = data;
  if (status.code !== 10000) {
    if (NoToastList.indexOf(url) <= -1) {
      Toast.info(status.message, 1);
    }
    return { status };
  }

  return {
    data: data.data,
    status
  };
}

/**
 * Requests a URL, returning a data.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [params] The options we want to pass to "get"
 * @return {object}           An object containing either "data" or "err"
 */
export async function requestGet(url, params, header) {
  try {
    const getUrl = formatUrl(url, params);
    const headers = authHeader(header);
    console.log('getUrloooooooo', getUrl, params);
    const response = await request
      .get(`${getUrl}`)
      .timeout({
        response: reqConfig.REQUEST_TIME,
        deadline: reqConfig.DEADLINE_TIME
      })
      .set(headers)
      .buffer(false)
      .parse(res => JSON.parse(res.text.replace(")]}',", '')))
      .then(
        res => {
          return checkStatus(res);
        },
        err => {
          console.log('error>>>>>>>>', err);
          //return checkStatus(err.response);
          throw err;
        }
      )
      .catch(err => ({ err }));
    // const data = await response.body;
    return parseErrorMessage(response, url);
  } catch (e) {
    console.log(e);
    return {
      status: {
        code: '9999',
        message: '网络错误'
      }
    };
  }
}

/**
 * Requests a URL, returning a data.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [params] The options we want to pass to "post"
 * @return {object}           An object containing either "data" or "err"
 */
export async function requestPost(url, params, header) {
  try {
    const headers = authHeader(header);
    console.log(url);

    if (params && params.password) {
      const SHA256String = CryptoJS.SHA256(md5(params.password)).toString(
        CryptoJS.enc.Hex
      );
      params.password = SHA256String;
    }

    const response = await request
      .post(`${url}`)
      .send(JSON.stringify(params))
      .timeout({
        response: reqConfig.REQUEST_TIME,
        deadline: reqConfig.DEADLINE_TIME
      })
      .set(headers)
      .buffer(false)
      .parse(res => JSON.parse(res.text.replace(")]}',", '')))
      .then(
        res => {
          return checkStatus(res);
        },
        err => {
          console.log('error>>>>>>>>', err);
          return checkStatus(err.response);
        }
      )
      .catch(err => ({ err }));
    console.log(response);
    return parseErrorMessage(response, url);
  } catch (e) {
    console.log(e);
    return {
      status: {
        code: '9999',
        message: '网络错误'
      }
    };
  }
}
