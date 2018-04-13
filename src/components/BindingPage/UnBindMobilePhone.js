import React, { Component } from 'react';
import { connect } from 'dva';
import { createAction } from '../../utils';
import styles from './bindingPhone.css';
import TextInput from '../base/TextInput';
import SendMobileMessage from '../commonBusiness/SendMobileMessage';

@connect(({ auth }) => ({ auth }))
class UnBindMobilePhone extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.dispatch(createAction('auth/fetchUserInfo')());
  }

  getValue = val => {
    console.log('====================================');
    console.log(val);
    console.log('====================================');
    this.props.dispatch(createAction('showTip')(''));
    if (val.length === 4) {
      this.props.dispatch(
        createAction('auth/unBindAccount')({ verifyCode: val })
      );
    }
  };

  render() {
    const { userInfo, passwordTips } = this.props.auth;

    return (
      <div style={{ textAlign: 'center', paddingTop: '2.3rem' }}>
        <SendMobileMessage purpose="unbind" mobile={userInfo.mobile} />

        <TextInput
          ref={el => (this.pwdRef = el)}
          clear
          showPwd
          type="tel"
          tips={passwordTips}
          maxLength={4}
          onChange={this.getValue}
        />
        <p className={styles.text} style={{ marginTop: '2.6rem' }}>
          如您有任何疑问，请联系您的理财师
        </p>
      </div>
    );
  }
}

export default UnBindMobilePhone;
