import { routerRedux } from 'dva/router';

// wx JS-SDK
export const wx = window.wx;

export function closePage() {
  wx.closeWindow();
}

/**
 * 创建action.
 *
 * @param  {string} [type]
 * @param  {object} [payload]
 * @return {object}
 */
export const createAction = type => payload => ({ type, payload });

/**
 * 路由跳转.
 *
 * @param  {string} [pathname]
 * @param  {object} [state]
 * @return {object}
 */
export const pushRouter = (pathname, state) =>
  routerRedux.push({ pathname, state });

/**
 * 路由跳转.
 *
 * @param  {string} [pathname]
 * @param  {object} [query]
 * @return {object}
 */
export const replaceRouter = (pathname, query) =>
  routerRedux.replace({ pathname, query });

/**
 * 密码强度计算.
 *
 * @param  {string} [password]
 * @return {string}
 */
export function pwdStrength(password) {
  let passwordStrong = '';
  let strongRegex = new RegExp(
    '^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$',
    'g'
  );
  let mediumRegex = new RegExp(
    '^(?=.{7,})(((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[a-z])(?=.*\\W))|((?=.*[0-9])(?=.*\\W))|((?=.*[A-Z])(?=.*\\W))).*$',
    'g'
  );
  let enoughRegex = new RegExp('(?=.{6,}).*', 'g');
  if (false == enoughRegex.test(password) || password == undefined) {
    //密码小于六位的时候，密码强度都为灰色
    passwordStrong = 1;
  } else if (strongRegex.test(password)) {
    //密码为八位及以上并且字母数字特殊字符三项都包括,强度最强
    passwordStrong = 3;
  } else if (mediumRegex.test(password)) {
    //密码为七位及以上并且字母、数字、特殊字符三项中有两项，强度是中等
    passwordStrong = 2;
  } else {
    //如果密码为6为及以下，就算字母、数字、特殊字符三项都包括，强度也是弱的
    passwordStrong = 1;
  }
  return passwordStrong;
}

/**
 * 数据脱敏处理
 *
 * @param  {string} [mobile]
 * @return {string}
 */
export function publicDesensitization(data) {
  // 正则判断返回相应数据
  if (
    /(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(data) ||
    /^(13[0-9]|16[0-9]|19[0-9]|147|15[0-9]|17[6-8]|18[0-9])\d{8}|17[0-9]\d{8}$/.test(
      data
    ) ||
    /(^(?:(?![IOZSV])[\dA-Z]){2}\d{6}(?:(?![IOZSV])[\dA-Z]){10}$)|(^\d{15}$)/.test(
      data
    )
  ) {
    //身份证号 || 手机号  ||  营业执照    前三后四
    data = data.substr(0, 3) + '****' + data.substr(-4);
  } else if (/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/.test(data)) {
    //邮箱号码  前二 后以 @ 分割
    data = data.substr(0, 2) + '****' + data.substr(data.indexOf('@'));
  } else if (/^\d{16}|\d{19}$/.test(data)) {
    //银行卡号  后四位
    data = '****' + data.substr(-4);
  } else if (data.indexOf('公司') > -1) {
    //企业名称  前二后四
    data = data.substr(0, 2) + '****' + data.substr(-4);
  } else {
    return;
  }
  return data;
}
