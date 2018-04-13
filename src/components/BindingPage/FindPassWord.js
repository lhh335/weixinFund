import React, { Component } from 'react';
import { connect } from 'dva';
import classnames from 'classnames';
import LogoTitle from '../base/LogoTitle';
import TextInput from '../base/TextInput/index';
import CommonButton from '../base/CommonButton/index';
import { createAction, pushRouter } from '../../utils';

@connect(({ auth }) => ({ auth }))
export default class FindPassWord extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getMobile = value => {
    this.props.dispatch(createAction('auth/putMobile')({ mobile: value }));
  };

  getPassword = value => {
    this.props.dispatch(
      createAction('auth/putVerifyCode')({ verifyCode: value })
    );
  };

  componentWillMount() {}

  componentDidMount() {
    console.log('============', this.props);
  }

  handleBlur = (e, tip) => {
    if (tip) {
      this.props.dispatch(createAction('auth/putMobile')({ mobile: '' }));
    }
    console.log('onBlur', tip);
  };

  checkVerifyCode = () => {
    const { mobile, verifyCode } = this.props.auth.verifyParams;

    this.props.dispatch(
      createAction('auth/checkVerifyCode')({ mobile, verifyCode })
    );
  };

  handleSendVerifyCode = () => {
    const { mobile } = this.props.auth.verifyParams;
    console.log('sendVerifyCode2', mobile);
    this.props.dispatch(
      createAction('auth/sendMessage')({ purpose: 'resetpassword', mobile })
    );
  };

  render() {
    const { verifyParams, isPosting, passwordTips } = this.props.auth;
    const { mobile, verifyCode } = verifyParams;

    return (
      <div style={{ paddingTop: '1.9rem' }}>
        <LogoTitle title="找回密码" />
        <form name="loginForm" className="margin_top_50">
          <TextInput
            clear
            placeholder="请输入注册手机号"
            headPlaceholder="注册手机号"
            tips="号码输入格式错误，请重新输入"
            checktype="mobile"
            ref={el => (this.inputRef = el)}
            onChange={this.getMobile}
            onBlur={this.handleBlur}>
            {/* <i
              className="icon-phone"
              style={{ color: '#009BFF', fontSize: '16px' }}
            /> */}
            <img
              src={require('../../images/logo_user.png')}
              alt=""
              style={{ width: '14px' }}
            />
          </TextInput>
          <TextInput
            ref={el => (this.pwdRef = el)}
            clear
            verificationCode
            placeholder="短信验证码"
            headPlaceholder="短信验证码"
            tips={passwordTips}
            sendverifycode={this.handleSendVerifyCode}
            onChange={this.getPassword}
            onFocus={() => this.props.dispatch(createAction('showTip')(''))}>
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
            disabled={!(mobile && verifyCode)}
            placeholder="验证"
            onClick={this.checkVerifyCode}
            isPosting={isPosting}
          />
        </form>
      </div>
    );
  }
}
