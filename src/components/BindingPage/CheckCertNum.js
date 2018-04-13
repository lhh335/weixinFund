import React, { Component } from 'react';
import { connect } from 'dva';
import { createAction } from '../../utils';
import styles from './bindingPhone.css';
import TextInput from '../base/TextInput';

@connect(({ auth }) => ({ auth }))
class CheckCertNum extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  getValue = val => {
    console.log('====================================');
    console.log(val);
    console.log('====================================');
    this.props.dispatch(createAction('showTip')(''));
    if (val.length === 4) {
      this.props.dispatch(createAction('auth/checkCertNum')({ certTail: val }));
    }
  };

  render() {
    const { passwordTips } = this.props.auth;

    return (
      <div
        style={{ textAlign: 'center', paddingTop: '50px' }}
        className={'padding_vertical_normal'}>
        <p className={styles.text}>
          为了保证您的账户安全，我们需要再次校验您预留证件号码的后四位！请输入...
        </p>
        <TextInput
          ref={el => (this.pwdRef = el)}
          clear
          showPwd
          type="tel"
          tips={passwordTips}
          maxLength={4}
          onChange={this.getValue}
        />
        <p className={styles.text} style={{ marginTop: '150px' }}>
          如您有任何疑问，请联系您的理财师
        </p>
      </div>
    );
  }
}

export default CheckCertNum;
