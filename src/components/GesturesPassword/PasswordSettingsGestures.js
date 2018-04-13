import React, { Component } from 'react';
import { connect } from 'dva';
import HandleUnlock from '../../components/commonBusiness/HandleUnlock';
import { replaceRouter, pushRouter } from '../../utils';

@connect(({ app }) => ({ app }))
class PasswordSettingsGestures extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleClick = () => {
    this.props.dispatch(pushRouter('/binding/gestures/reset'));
  };

  render() {
    const { isLock } = this.props;
    const { type } = this.props.match.params;
    const { query } = this.props.location;
    //const { message = '', baseUrl = '' } = query;

    // if (isLock) {
    //   this.props.dispatch(replaceRouter('/binding/confirm/success'), {
    //     message: '您已经设置手势密码',
    //     purpose: 'modifyGestures'
    //   });
    // } else {
    let clearLock = false;
    if (type !== 'block') {
      clearLock = true;
    }
    console.log('clearLock', this.props.location, type);
    return (
      <HandleUnlock
        minPoint={3}
        onClick={this.handleClick}
        clearLock={clearLock}
        type={type}
        message={query && query.message}
        baseUrl={query && query.baseUrl}
      />
    );
    // }
  }
}

export default PasswordSettingsGestures;
