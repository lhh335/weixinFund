import { createAction, replaceRouter, wx } from '../utils/index';
import * as appService from '../services/app';
import { stat } from 'fs';

export default {
  namespace: 'app',

  state: {
    isAppStart: true,
    isLock: false,
    alreadyLock: false
  },

  subscriptions: {
    setup({ dispatch, history }) {
      dispatch(
        createAction('authenticationToken')({
          ...history.location
        })
      );
      console.log(history);
      if (window.localStorage.getItem('password')) {
        dispatch(
          createAction('setLockState')({
            isLock: true,
            alreadyLock: true
          })
        );
      }
      return history.listen(({ pathname, query }) => {
        if (pathname === '/wealth') {
          console.log('ppppp', pathname, query);
          dispatch(createAction('accessRoute')({ pathname }));
        } else if (pathname === '/person') {
          console.log('ppppp', pathname, query);
          dispatch(createAction('accessRoute')({ pathname }));
        }
      });
    }
  },

  effects: {
    *authenticationToken({ payload }, { call, put }) {
      let arr = [];
      let params = {};
      let token = payload.search.substr(1);
      arr = token.split('&');
      arr.forEach(item => {
        let key = [];
        key = item.split('=');
        params[key[0]] = key[1];
        console.log('authenticationToken', params);
      });
      const data = yield call(appService.authToken, params);
      if (data.status.code === 10000) {
        yield put(createAction('renderRoute')({ isAppStart: true }));
        yield put(createAction('setWechatConfig')());
      } else {
        //yield put(createAction('renderRoute')({ isAppStart: false }));
      }
    },
    *setWechatConfig({ payload }, { call, put }) {
      let href = window.location.href;
      let url = href.substr(0, href.indexOf('#'));
      const configParams = {
        debug: true,
        url,
        jsApiList: ['hideAllNonBaseMenuItem']
      };
      const configData = yield call(appService.getJsConfig, configParams);
      if (configData.status.code === 1000) {
        // wx.config({
        //   debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        //   appId: 'wx8fc1d3cfc71e826c', // 必填，公众号的唯一标识
        //   timestamp: '', // 必填，生成签名的时间戳
        //   nonceStr: '', // 必填，生成签名的随机串
        //   signature: '', // 必填，签名
        //   jsApiList: [] // 必填，需要使用的JS接口列表
        // });
        wx.config(configData.data.body);
        wx.ready(res => {
          console.log(res);
          wx.hideAllNonBaseMenuItem(); // 隐藏所有非基础按钮接口
        });
        wx.error(res => {
          // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
          console.log(res);
        });
      }
    },
    *accessRoute({ payload }, { call, put, select }) {
      const isLock = yield select(state => state.app.isLock);
      if (isLock) {
        yield put(
          replaceRouter('/binding/gestures/block', {
            baseUrl: payload.pathname
          })
        );
      }
    }
  },

  reducers: {
    renderRoute(state, { payload }) {
      return { ...state, ...payload };
    },
    setLockState(state, { payload }) {
      return { ...state, ...payload };
    }
  }
};
