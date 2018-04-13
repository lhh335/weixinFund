import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './input.css';
import classnames from 'classnames';
import CommonButton from '../CommonButton';

function fixControlledValue(value) {
  if (typeof value === 'undefined' || value === null) {
    return '';
  }
  return value;
}

function noop() {}

class TextInput extends Component {
  static defaultProps = {
    type: 'text',
    placeholder: '',
    headPlaceholder: '',
    clear: false,
    showPwd: false,
    disabled: false,
    verificationCode: false,
    sendverifycode: noop,
    onChange: noop,
    onBlur: noop,
    onFocus: noop,
    checktype: '',
    tips: ''
  };

  constructor(props) {
    super(props);
    this.state = {
      value: props.value || props.defaultValue || '',
      type: props.type || 'text',
      isShowTips: false,
      isShowTime: false,
      showheadPlaceholder: false,
      verificationHolder: '获取验证码',
      countdownTime: 60
    };
  }

  onInputChange = e => {
    let value = e.target.value;
    value = value.trim();
    if (value) {
      this.setState({
        ...this.state,
        showHeadPlaceholder: true
      });
    } else {
      this.setState({
        ...this.state,
        showHeadPlaceholder: false
      });
    }
    const { type } = this.props;
    switch (type) {
      case 'text':
        break;
      case 'bankCard':
        value = value.replace(/\D/g, '').replace(/(....)(?=.)/g, '$1 ');
        break;
      case 'phone':
        value = value.replace(/\D/g, '').substring(0, 11);
        const valueLen = value.length;
        if (valueLen > 3 && valueLen < 8) {
          value = `${value.substr(0, 3)} ${value.substr(3)}`;
        } else if (valueLen >= 8) {
          value = `${value.substr(0, 3)} ${value.substr(3, 4)} ${value.substr(
            7
          )}`;
        }
        break;
      case 'number':
        // value = value.replace(/\D/g, '');
        if (value.length > this.props.maxLength)
          value = value.slice(0, this.props.maxLength);
        break;
      case 'tel':
        value = value.replace(/\D/g, '');
        break;
      case 'password':
        break;
      default:
        break;
    }
    this.handleOnChange(value);
  };

  onInputFocus = value => {
    // if (this.props.type !== 'tel') {
    this.setState({
      isShowTips: false,
      showheadPlaceholder: true
    });

    // }
    if (this.props.onFocus) {
      this.props.onFocus(value);
    }
  };

  onInputBlur = e => {
    const { checktype } = this.props;
    let value = e.target.value;
    let showTips = false;
    if (this.inputRef) {
      let regCert = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
      let regPhone = /^1[34578]\d{9}$/;
      // this.inputRef may be null if customKeyboard unmount
      if (checktype === 'username') {
        if (!regCert.test(value) && !regPhone.test(value)) {
          showTips = true;
          this.showTips();
        }
      } else if (checktype === 'mobile') {
        if (!regPhone.test(value)) {
          showTips = true;
          this.showTips();
        }
      }
    }
    if (this.props.onBlur) {
      this.props.onBlur(e, showTips);
    }
  };

  handleOnChange = value => {
    const { onChange } = this.props;

    if (!('value' in this.props)) {
      this.setState({ value });
    } else {
      this.setState({ value: this.props.value });
    }
    if (onChange) {
      onChange(value);
    }
  };

  clearInput = () => {
    this.setState({
      value: ''
    });
    if (this.props.onChange) {
      this.props.onChange('');
    }
    this.focus();
  };

  showTips = () => {
    this.setState({
      isShowTips: true
    });
  };

  showPassword = () => {
    if (this.state.type === 'password') {
      this.setState({
        type: 'text'
      });
    } else {
      this.setState({
        type: 'password'
      });
    }
    this.focus();
  };

  focus = () => {
    if (this.inputRef) {
      this.inputRef.focus();
    }
  };

  sendVerificationCode = () => {
    this.setState({
      verificationHolder: '重新获取',
      isShowTime: true
    });
    console.log('sendVerifyCode');
    this.props.sendverifycode();
    this.countdownTime();
  };

  countdownTime = val => {
    console.log(this.state.countdownTime);
    if (this.state.countdownTime === 1) {
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
    const {
      style,
      clear,
      showPwd,
      children,
      placeholder,
      verificationCode,
      tips,
      headPlaceholder,
      checktype,
      ...restProps
    } = this.props;
    const { defaultValue, name, disabled, maxLength } = restProps;
    const {
      value,
      type,
      isShowTips,
      showHeadPlaceholder,
      isShowTime,
      verificationHolder,
      countdownTime
    } = this.state;
    return (
      <div
        style={{
          padding: '0 24px'
        }}>
        <div className={styles[`placeholder--head`]}>
          {showHeadPlaceholder ? headPlaceholder : ''}
        </div>
        {type !== 'tel' ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between'
            }}
            //  className="margin_top_20"
          >
            {children ? (
              <div
                style={{ paddingRight: 15 }}
                className={classnames('vertical_center', 'padding_right_15')}>
                {children}
              </div>
            ) : null}
            <div style={{ flex: 1, overflow: 'hidden' }}>
              <input
                {...restProps}
                ref={el => (this.inputRef = el)}
                value={fixControlledValue(value)}
                defaultValue={defaultValue}
                type={type}
                placeholder={placeholder}
                name={name}
                maxLength={maxLength}
                className={styles.content}
                onChange={this.onInputChange}
                onFocus={this.onInputFocus}
                onBlur={this.onInputBlur}
                disabled={disabled}
              />
            </div>
            {clear && !disabled && (value && `${value}`.length > 0) ? (
              <div
                style={{
                  paddingRight: 15
                }}
                className="vertical_center">
                <i
                  className="icon-delete"
                  style={{ color: '#E3E3E3', fontSize: '16px' }}
                  onClick={this.clearInput}
                />
              </div>
            ) : null}
            {verificationCode ? (
              <div className="vertical_center">
                {isShowTime ? (
                  <span className={styles.primary}>{countdownTime}s</span>
                ) : null}
                <CommonButton
                  disabled={isShowTime}
                  type="text"
                  placeholder={verificationHolder}
                  onClick={this.sendVerificationCode}
                />
              </div>
            ) : null}
            {!disabled && showPwd ? (
              <div className="vertical_center">
                <i
                  onClick={this.showPassword}
                  style={{ color: '#E3E3E3', fontSize: '16px' }}
                  className={classnames({
                    [`icon-open-eye`]: type === 'text',
                    [`icon-close-eye`]: type === 'password'
                  })}
                />
              </div>
            ) : null}
          </div>
        ) : (
          <div
            className="horizontal_center"
            style={{ position: 'relative', marginTop: '16px' }}>
            <input
              {...restProps}
              ref={el => (this.inputRef = el)}
              value={fixControlledValue(value)}
              defaultValue={defaultValue}
              type={type}
              placeholder={placeholder}
              name={name}
              maxLength={maxLength}
              className={styles.numInput}
              onChange={this.onInputChange}
              onFocus={this.onInputFocus}
              onBlur={this.onInputBlur}
              disabled={disabled}
            />
            <ul className={styles.numberul}>
              <li className={styles.numberli}>{value[0] ? value[0] : ''}</li>
              <li className={styles.numberli}>{value[1] ? value[1] : ''}</li>
              <li className={styles.numberli}>{value[2] ? value[2] : ''}</li>
              <li className={styles.numberli}>{value[3] ? value[3] : ''}</li>
              {/* <li className={styles.numberli}>{value[4] ? value[4] : ''}</li>
              <li className={styles.numberli}>{value[5] ? value[5] : ''}</li> */}
            </ul>
          </div>
          // </div>
        )}
        {/* <div className={type === 'tel' ? styles[`tips--tel`] : styles.tips}> */}
        {checktype === '' ? (
          <div
            className={classnames({
              [styles[`tips--tel--success`]]: type === 'tel',
              [styles[`tips--tel--error`]]: type === 'tel',
              [styles.tips]: type !== 'tel'
            })}>
            {tips}
          </div>
        ) : (
          <div className={classnames(styles.tips)}>
            {isShowTips ? tips : ''}
          </div>
        )}
      </div>
    );
  }
}

TextInput.propTypes = {
  sendverifycode: PropTypes.func
};

export default TextInput;
