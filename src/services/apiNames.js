const API_NAME = {
  // ============================
  //         初始化模块
  // ============================
  // App初始化
  AUTH_TOKEN: '/api/v1/wechat/verify',

  // ============================
  //         账户绑定模块
  // ============================

  BIND_ACCOUNT: '/api/v1/wechat/bind',
  UNBIND_ACCOUNT: '/api/v1/wechat/unbind',
  SEND_MESSAGE: '/api/v1/wechat/message',
  CHECK_VERIFYCODE: '/api/v1/wechat/verifycode',
  CHECK_VERIFYCERT: '/api/v1/wechat/verifycert',
  PASSWORD_RESET: '/api/v1/wechat/resetpassword',
  WX_JSCONFIG: '/api/v1/wechat/jsconfig',

  // ============================
  //         财富首页
  // ============================
  APP_getAllLists: '/api/v1/wechat/myprofit',

  // ============================
  //         交易记录
  // ============================

  APP_fetchRcordList: '/api/v1/wechat/request',

  // ============================
  //         个人信息
  // ============================
  INFO_PERSON: '/api/v1/wechat/userinfo'
};

export default API_NAME;
