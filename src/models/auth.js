import {
  createAction,
  pushRouter,
  replaceRouter,
  pwdStrength
} from '../utils/index';
import * as authService from '../services/auth';
import { Modal } from 'antd-mobile';

const alert = Modal.alert;
export default {
  namespace: 'auth',

  state: {
    isPosting: false,
    passwordTips: '',
    authParams: {
      loginId: '',
      password: ''
    },
    verifyParams: {
      mobile: '',
      verifyCode: '',
      password: '',
      secondPassword: ''
    },
    userInfo: {
      mobile: ''
    }
  },
  reducers: {
    changePostState(state, { payload }) {
      console.log(state.isPosting);
      return {
        ...state,
        isPosting: payload
      };
    },
    putLoginId(state, { payload }) {
      console.log(payload);
      return {
        ...state,
        authParams: { ...state.authParams, loginId: payload.loginId }
      };
    },
    putPassword(state, { payload }) {
      return {
        ...state,
        authParams: { ...state.authParams, password: payload.password }
      };
    },
    putVerifyCode(state, { payload }) {
      return {
        ...state,
        verifyParams: { ...state.verifyParams, verifyCode: payload.verifyCode }
      };
    },
    putMobile(state, { payload }) {
      return {
        ...state,
        verifyParams: { ...state.verifyParams, mobile: payload.mobile }
      };
    },
    putNewPassword(state, { payload }) {
      return {
        ...state,
        verifyParams: { ...state.verifyParams, password: payload.password }
      };
    },
    putNewSecondPassword(state, { payload }) {
      return {
        ...state,
        verifyParams: {
          ...state.verifyParams,
          secondPassword: payload.password
        }
      };
    },

    showTip(state, { payload }) {
      console.log(payload);
      return {
        ...state,
        passwordTips: payload
      };
    },
    saveUserInfo(state, { payload }) {
      console.log(payload);
      return {
        ...state,
        userInfo: payload
      };
    }
  },

  effects: {
    *bindingAccount({ payload }, { call, put }) {
      yield put(createAction('changePostState')(true));
      const data = yield call(authService.bindingAccount, payload);
      console.log('lllllll', data);
      if (data.status.code === 10000) {
        yield put(
          replaceRouter('/binding/confirm/account', {
            message: '您已成功绑定嘉实财富账户',
            purpose: 'bindAccount'
          })
        );
      } else {
        yield put(createAction('showTip')(data.status.message));
      }
      yield put(createAction('changePostState')(false));
    },
    *unBindAccount({ payload }, { call, put }) {
      const data = yield call(authService.unBindAccount, payload);
      console.log(data);
      if (data.status.code === 10000) {
        yield put(
          replaceRouter('/binding/confirm/success', {
            message: '解绑成功',
            purpose: 'unbind'
          })
        );
      } else {
        yield put(createAction('showTip')(data.status.message));
      }
    },
    *sendMessage({ payload }, { call, put }) {
      const verifyData = yield call(authService.sendMessage, payload);
      if (verifyData.status.code === 10000) {
        alert('短信验证码', verifyData.data.verifyCode, [
          // { text: 'Cancel', onPress: () => console.log('cancel') },
          { text: 'Ok', onPress: () => console.log('ok') }
        ]);
      }
    },
    *fetchUserInfo({ payload }, { call, put }) {
      const userInfo = yield call(authService.fetchUserInfo);
      if (userInfo.status.code === 10000) {
        yield put(createAction('saveUserInfo')(userInfo.data.user));
      }
      //yield put(createAction('saveUserInfo')(userInfo.data.user));
    },
    *checkVerifyCode({ payload }, { call, put }) {
      const data = yield call(authService.checkVerifyCode, payload);
      if (data.status.code === 10000) {
        let path = '/binding/account/reset';
        if (data.data.needVerify) {
          path = '/binding/account/certcheck';
        }
        yield put(replaceRouter(path));
      } else {
        yield put(createAction('showTip')(data.status.message));
      }
    },
    *checkCertNum({ payload }, { call, put }) {
      const data = yield call(authService.checkVerifyCert, payload);
      if (data.status.code === 10000) {
        let path = '/binding/account/reset';
        yield put(replaceRouter(path));
      } else {
        yield put(createAction('showTip')(data.status.message));
      }
    },
    *resetPassword({ payload }, { call, put, select }) {
      yield put(createAction('changePostState')(true));
      const params = yield select(state => state.auth.verifyParams);
      const passwordStrong = pwdStrength(params.password);
      const data = yield call(authService.resetPassword, {
        password: params.password,
        passwordStrong
      });
      if (data.status.code === 10000) {
        console.log(data);
        yield put(
          replaceRouter('/binding/confirm/success', {
            message: '新密码设置成功'
          })
        );
      }
      yield put(createAction('changePostState')(false));
    }
  },

  subscriptions: {
    setup({ dispatch, history }) {
      // eslint-disable-line
    }
  }
};
