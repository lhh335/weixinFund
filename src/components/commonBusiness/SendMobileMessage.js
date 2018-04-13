import React, { Component } from 'react';
import { connect } from 'dva';
import { createAction } from '../../utils';
import CommonButton from '../base/CommonButton';
import styles from '../BindingPage/bindingPhone.css';

@connect(({ auth }) => ({ auth }))
class SendMobileMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowTime: false,
      countdownTime: 60
    };
  }
  componentDidMount() {
    // this.props.dispatch(createAction('auth/sendMessage')());
    this.sendVerificationCode();
  }

  sendVerificationCode = () => {
    const { purpose, mobile } = this.props;
    if (mobile) {
      this.props.dispatch(
        createAction('auth/sendMessage')({ purpose, mobile })
      );
      this.setState({
        isShowTime: true
      });
      this.countdownTime();
    }
  };

  countdownTime = val => {
    console.log(this.state.countdownTime);
    if (this.state.countdownTime == 1) {
      this.setState({
        countdownTime: 60,
        isShowTime: false
      });
    } else {
      let countdownTime = this.state.countdownTime - 1;
      this.setState({
        countdownTime: countdownTime
      });
      setTimeout(this.countdownTime, 1000);
    }
  };

  render() {
    const { mobile } = this.props;
    const { isShowTime, countdownTime } = this.state;
    return (
      <div>
        <p className={styles.text}>已将验证码发送到您预留的手机</p>
        <p className={styles.mobile}>{mobile} </p>
        <div className="horizontal_center">
          {isShowTime ? (
            <span className={styles.primary}>{countdownTime}s</span>
          ) : null}

          <CommonButton
            disabled={isShowTime}
            type="text"
            placeholder={'重新获取'}
            onClick={this.sendVerificationCode}
          />
        </div>
        <p className={styles.text} style={{ marginTop: '2.6rem' }}>
          请输入4位手机验证码
        </p>
      </div>
    );
  }
}

export default SendMobileMessage;
