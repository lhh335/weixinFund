import React, { Component } from 'react';
import { connect } from 'dva';
import TextInput from '../base/TextInput';
import CommonButton from '../base/CommonButton';
import { createAction, pushRouter } from '../../utils';

@connect(({ auth }) => ({ auth }))
class PasswordResetGestures extends Component {
  getPassword = value => {
    this.props.dispatch(createAction('auth/putPassword')({ password: value }));
  };

  forgetPassword = () => {
    this.props.dispatch(pushRouter('/binding/account/find'));
  };

  submit = () => {};

  render() {
    const { authParams, isPosting } = this.props.auth;
    const { password } = authParams;
    return (
      <div className="margin_top_10">
        <TextInput
          ref={el => (this.pwdRef = el)}
          clear
          showPwd
          type="password"
          placeholder="请输入您的密码"
          tips="密码错误，请重新输入"
          onChange={this.getPassword}>
          {/* <i className="icon-lock" style={{ color: '#009BFF' }} /> */}
          <img
            src={require('../../images/logo_lock.png')}
            alt=""
            style={{ width: '14px' }}
          />
        </TextInput>
        <CommonButton
          style={{
            marginTop: '14px',
            display: 'flex',
            justifyContent: 'flex-end'
          }}
          disabled={false}
          type="text"
          placeholder="忘记密码？"
          onClick={this.forgetPassword}
        />
        <CommonButton
          style={{ marginTop: '44px' }}
          disabled={!password}
          placeholder="找回手势密码"
          isPosting={isPosting}
          onClick={this.submit}
        />
      </div>
    );
  }
}

export default PasswordResetGestures;
