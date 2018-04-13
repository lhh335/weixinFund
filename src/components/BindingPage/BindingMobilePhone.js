import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './bindingPhone.css';
import CommonButton from '../base/CommonButton';
import TextInput from '../base/TextInput';
import SendMobileMessage from '../commonBusiness/SendMobileMessage';

@connect(({ auth }) => ({ auth }))
class BindingMobilePhone extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  getValue = val => {
    console.log('====================================');
    console.log(val);
    console.log('====================================');
  };

  render() {
    const { userInfo } = this.props.auth;
    return (
      <div style={{ textAlign: 'center', paddingTop: '2.3rem' }}>
        <SendMobileMessage purpose="unbind" mobile={userInfo.mobile} />
        <TextInput
          ref={el => (this.pwdRef = el)}
          clear
          showPwd
          type="tel"
          tips="验证码输入错误，请重新输入"
          maxLength={6}
          onChange={this.getValue}
        />
        <p className={styles.text} style={{ marginTop: '2.6rem' }}>
          如您有任何疑问，请联系您的理财师
        </p>
      </div>
    );
  }
}

export default BindingMobilePhone;
