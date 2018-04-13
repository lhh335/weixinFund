import React, { Component } from 'react';
import { connect } from 'dva';
import classnames from 'classnames';
import LogoTitle from '../base/LogoTitle';
import TextInput from '../base/TextInput/index';
import CommonButton from '../base/CommonButton/index';
import { createAction } from '../../utils';

@connect(({ auth }) => ({ auth }))
export default class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getNewPassword = value => {
    this.props.dispatch(
      createAction('auth/putNewPassword')({ password: value })
    );
    // this.props.dispatch(createAction('auth/showTip')(''));
  };

  getPassword = value => {
    this.props.dispatch(
      createAction('auth/putNewSecondPassword')({ password: value })
    );
    // this.props.dispatch(createAction('auth/showTip')(''));
  };

  componentDidMount() {
    console.log('============', this.props);
  }

  submitReset = () => {
    console.log('>>>>>>>>>>>>>>>>', this.props.auth.isPosting);
    this.props.dispatch(createAction('auth/resetPassword')());
  };

  handleBlur = e => {
    const { verifyParams } = this.props.auth;
    const { password, secondPassword } = verifyParams;
    console.log('val', !!secondPassword && secondPassword !== password);
    if (!!secondPassword && secondPassword !== password) {
      this.props.dispatch(
        createAction('auth/showTip')('两次输入密码不一致，请重新输入')
      );
    } else {
      this.props.dispatch(createAction('auth/showTip')(''));
    }
  };

  handleFocus = e => {
    this.props.dispatch(createAction('auth/showTip')(''));
  };

  render() {
    const { verifyParams, isPosting, passwordTips } = this.props.auth;
    const { password, secondPassword } = verifyParams;

    console.log('====================================');
    console.log(passwordTips);
    console.log('====================================');
    return (
      <div style={{ paddingTop: '1.9rem' }}>
        <LogoTitle title="设置新密码" />
        <form name="loginForm" className="margin_top_50">
          <TextInput
            clear
            showPwd
            type="password"
            placeholder="请输入您的新密码"
            headPlaceholder="新密码"
            ref={el => (this.inputRef = el)}
            onChange={this.getNewPassword}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}>
            {/* <i
              className="icon-lock"
              style={{ color: '#009BFF', fontSize: '16px' }}
            /> */}
            <img
              src={require('../../images/logo_user.png')}
              alt=""
              style={{ width: '14px' }}
            />
          </TextInput>
          <TextInput
            clear
            showPwd
            type="password"
            placeholder="请再输入一遍"
            headPlaceholder="再次输入新密码"
            tips={passwordTips}
            ref={el => (this.pwdRef = el)}
            onChange={this.getPassword}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}>
            {/* <i
              className="icon-lock"
              style={{ color: '#009BFF', fontSize: '16px' }}
            /> */}
            <img
              src={require('../../images/logo_lock.png')}
              alt=""
              style={{ width: '14px' }}
            />
          </TextInput>
          <CommonButton
            style={{ marginTop: '44px' }}
            disabled={!(secondPassword && password && !passwordTips)}
            placeholder="完成"
            isPosting={isPosting}
            onClick={this.submitReset}
          />
        </form>
      </div>
    );
  }
}
