import React, { Component } from 'react';
import { connect } from 'dva';
import classnames from 'classnames';
import { Link } from 'dva/router';
import LogoTitle from '../base/LogoTitle';
import TextInput from '../base/TextInput/index';
import CommonButton from '../base/CommonButton/index';
import { createAction, pushRouter, pwdStrength } from '../../utils';

@connect(({ auth }) => ({ auth }))
export default class BindingAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getLoginId = value => {
    this.props.dispatch(createAction('auth/putLoginId')({ loginId: value }));
  };

  getPassword = value => {
    this.props.dispatch(createAction('auth/putPassword')({ password: value }));
    this.props.dispatch(createAction('showTip')(''));
  };

  componentDidMount() {
    console.log('============', this.props);
  }

  handleBlur = (e, tip) => {
    if (tip) {
      this.props.dispatch(createAction('auth/putLoginId')({ loginId: '' }));
    }
    console.log('onBlur', tip);
  };

  passwordOnFocus = () => {
    this.props.dispatch(createAction('auth/showTip')(''));
  };

  goPage = (path, params) => {
    this.props.dispatch(pushRouter(path, params));
  };

  submitBindInfo = () => {
    const { loginId, password } = this.props.auth.authParams;
    const passwordStrong = pwdStrength(password);
    this.props.dispatch(
      createAction('auth/bindingAccount')({
        loginId,
        password,
        passwordStrong
      })
    );
  };

  render() {
    const { authParams, isPosting, passwordTips } = this.props.auth;
    const { loginId, password } = authParams;

    return (
      <div style={{ paddingTop: '1.9rem' }}>
        <LogoTitle title="绑定账户" />
        <div name="loginForm" className="margin_top_50">
          <TextInput
            clear
            placeholder="请输入您的手机号/证件号"
            headPlaceholder="手机号/证件号"
            tips="号码输入格式错误，请重新输入"
            checktype="username"
            ref={el => (this.inputRef = el)}
            onBlur={this.handleBlur}
            onChange={this.getLoginId}>
            <img
              src={require('../../images/logo_user.png')}
              alt=""
              style={{ width: '14px' }}
            />
          </TextInput>
          <TextInput
            ref={el => (this.pwdRef = el)}
            clear
            showPwd
            type="password"
            placeholder="请输入您的密码"
            headPlaceholder="登录密码"
            tips={passwordTips}
            onChange={this.getPassword}
            onFocus={this.passwordOnFocus}>
            <img
              src={require('../../images/logo_lock.png')}
              alt=""
              style={{ width: '14px' }}
            />
          </TextInput>
          <div className="padding_vertical_normal">
            <CommonButton
              style={{
                marginTop: '14px',
                display: 'flex',
                justifyContent: 'flex-end'
              }}
              disabled={false}
              type="text"
              placeholder="忘记密码？"
              onClick={() => this.goPage('/binding/account/find')}
            />
          </div>
          <CommonButton
            style={{ marginTop: '44px' }}
            disabled={!(loginId && password)}
            placeholder="立即绑定"
            isPosting={isPosting}
            onClick={this.submitBindInfo}
          />
          <div
            style={{
              textAlign: 'center',
              marginTop: '32px',
              color: '#808080',
              fontSize: '12px',
              fontWeight: 200
            }}>
            <span>点击绑定表示您同意</span>
            <Link to="/agree">
              <span
                style={{
                  color: '#197FC3',
                  fontSize: '12px',
                  fontWeight: 200
                }}>
                《嘉实财富管理有限公司网络服务协议》
              </span>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
