import React, { PureComponent } from 'react';
import { Result, Icon, Flex } from 'antd-mobile';
import classnames from 'classnames';
import CommonButton from '../base/CommonButton';
import { dispatch } from '../../index.js';
import { routerRedux } from 'dva/router';
import { closePage, publicDesensitization } from '../../utils';

const noop = () => {};

class ConfirmPage extends PureComponent {
  static defaultProps = {
    promptInfo: '',
    type: '',
    mobile: '',
    userName: '',
    handleBackClick: () => {
      dispatch(routerRedux.goBack());
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      commonBtnPlaceholder: '确定',
      textBtnPlaceholder: '',
      textBtnClick: () => closePage(),
      handleClick: () => closePage()
    };
  }

  styles = {
    logoStyle: {
      height: '4.31rem',
      width: '4.31rem'
    },
    signStyle: {
      height: '4.19rem',
      width: '4.19rem'
    },
    promptLayout: {
      marginTop: '1.13rem',
      marginBottom: '3.38rem'
    },
    promptLayout_account: {
      marginTop: '1.5rem',
      marginBottom: '3.4rem'
    },
    promptText: {
      fontSize: '18px'
    },
    promptText_account: {
      fontSize: '20px',
      color: '#333333'
    },
    username: {
      color: '#333333',
      fontSize: '30px',
      lineHeight: '0.94rem'
    },
    phonenum: {
      color: '#808080',
      marginTop: '0.6rem',
      fontSize: '16px',
      lineHeight: '1.13rem'
    },
    errorTips: {
      textAlign: 'center',
      color: '#808080',
      fontSize: '16px',
      lineHeight: '22px',
      fontWeight: '400'
    },
    telPrompt: {
      fontSize: '14px',
      marginTop: '70px',
      color: '#808080'
    },

    telnum: {
      fontSize: '18px',
      marginTop: '10px',
      color: '#197FC3'
    }
  };

  componentDidMount() {
    if (this.props.type === 'account') {
      this.setState({
        handleClick: () => this.goPage('/binding/wealth'),
        textBtnPlaceholder: '解绑',
        textBtnClick: () => this.goPage('/binding/phone/remove')
      });
    }

    switch (this.props.purpose) {
      case 'unbind':
        this.setState({
          commonBtnPlaceholder: '关闭当前页面',
          textBtnPlaceholder: '绑定其他账户',
          textBtnClick: () => this.goPage('/binding/account')
        });
        break;
      case 'bindAccount':
        this.setState({
          commonBtnPlaceholder: '设置手势密码',
          handleClick: () =>
            this.goPage('/binding/gestures/setting', {
              message: '手势密码设置成功'
            }),
          textBtnPlaceholder: '暂不设置',
          textBtnClick: () => closePage()
        });
        break;
      case 'bindFail':
        this.setState({
          commonBtnPlaceholder: '立即验证',
          handleClick: () => this.goPage('/binding/phone/add')
        });
        break;
      case 'setGestures':
        this.setState({
          commonBtnPlaceholder: '确定',
          handleClick: () =>
            this.goPage('/binding/gestures/setting', {
              message: '手势密码设置成功'
            })
        });
        break;
      case 'modifyGestures':
        this.setState({
          commonBtnPlaceholder: '修改手势密码',
          handleClick: () =>
            this.goPage('/binding/gestures/reset', {
              message: '修改手势密码成功'
            }),
          textBtnPlaceholder: '关闭手势密码',
          textBtnClick: () =>
            this.goPage('/binding/gestures/close', {
              message: '关闭手势密码成功'
            })
        });
        break;
      default:
        break;
    }
  }

  goPage = (url, query) => {
    console.log('gopage', url);
    dispatch(routerRedux.replace(url, query));
  };

  renderBindingPassword = () => {
    const { promptInfo, type, purpose, userName, mobile } = this.props;
    const { handleClick, commonBtnPlaceholder } = this.state;
    return (
      <div
        style={{
          flex: 1,
          textAlign: 'center'
        }}>
        <Flex justify="center">
          {type === 'success' ? (
            <Icon
              type="check-circle"
              style={{ fill: '#197FC3', height: '4.19rem', width: '4.19rem' }}
            />
          ) : (
            <Icon
              type="cross-circle-o"
              style={{ fill: '#FF4E4E', height: '4.19rem', width: '4.19rem' }}
            />
          )}
        </Flex>
        <Flex direction="column" style={this.styles.promptLayout}>
          <span style={this.styles.promptText}>{promptInfo}</span>
          {type === 'success' ? null : (
            <div style={{ marginTop: '10px' }}>
              <p style={this.styles.errorTips}>
                非常抱歉，您的手机号还未通过验证
              </p>
              <p style={this.styles.errorTips}>
                请联系您的理财师验证手机号，再绑定微信
              </p>
            </div>
          )}
        </Flex>
        <CommonButton
          onClick={handleClick}
          placeholder={commonBtnPlaceholder}
        />
        {type === 'success' ? null : (
          <div>
            <p style={this.styles.telPrompt}>
              如您有任何疑问，请联系您的理财师或
            </p>
            <p style={this.styles.telnum}>400-021-8850</p>
          </div>
        )}
      </div>
    );
  };
  renderBindingAccount = () => {
    const { userName, mobile, purpose } = this.props;
    const { handleClick } = this.state;
    console.log(mobile, publicDesensitization(mobile));
    return (
      <div
        style={{
          flex: 1
        }}>
        <div className="horizontal_center">
          <img
            src={require('../../images/logo_normal.png')}
            alt=""
            style={this.styles.logoStyle}
          />
        </div>
        <div style={{ marginTop: '1.82rem' }}>
          <div className="horizontal_center" style={this.styles.username}>
            {userName}
          </div>
          <div className="horizontal_center" style={this.styles.phonenum}>
            {publicDesensitization(mobile)}
          </div>
        </div>
        <div
          className="horizontal_center"
          style={this.styles.promptLayout_account}>
          <span style={this.styles.promptText_account}>
            您已成功绑定嘉实财富账户
          </span>
        </div>
        {purpose === 'bindAccount' ? (
          <CommonButton onClick={handleClick} placeholder="设置手势密码" />
        ) : (
          <CommonButton onClick={handleClick} placeholder="查看我的帐户" />
        )}
      </div>
    );
  };
  render() {
    const { type } = this.props;
    const { textBtnPlaceholder, textBtnClick } = this.state;
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}>
        <div
          style={{
            flex: 1,
            alignItems: 'center'
          }}
          className="horizontal_center">
          {type === 'account'
            ? this.renderBindingAccount()
            : this.renderBindingPassword()}
        </div>
        <div className="horizontal_center" style={{ margin: '30px 0' }}>
          <span
            style={{ color: '#808080', fontSize: '18px' }}
            onClick={textBtnClick}>
            {textBtnPlaceholder}
            <i
              className="icon-arrow"
              style={{ color: '#CCCCCC', fontSize: '14px', marginLeft: '8px' }}
            />
          </span>
        </div>
      </div>
    );
  }
}

export default ConfirmPage;
