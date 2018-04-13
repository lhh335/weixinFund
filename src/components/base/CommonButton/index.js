import React from 'react';
import classnames from 'classnames';
import styles from './button.css';

function CommonButton(props) {
  const {
    placeholder,
    disabled,
    isPosting,
    onClick,
    style,
    type,
    theme
  } = props;
  if (type === 'default') {
    return (
      <div
        className={classnames('padding_vertical_normal', 'horizontal_center')}
        style={style}>
        <button
          disabled={disabled || isPosting}
          className={classnames({
            [styles.primary]: !disabled && !theme,
            [styles[`primary--${theme}`]]: !disabled && theme,
            [styles.disabled]: disabled
          })}
          onClick={() => !disabled && !isPosting && onClick()}>
          {isPosting ? (
            <i className="icon-spinner3 loading" />
          ) : (
            <span>{placeholder}</span>
          )}
        </button>
      </div>
    );
  } else {
    return (
      <div style={style}>
        <span
          className={classnames({
            [styles.text]: !disabled,
            [styles[`text--disabled`]]: disabled
          })}
          onClick={() => !disabled && onClick()}>
          {placeholder}
        </span>
      </div>
    );
  }
}

CommonButton.defaultProps = {
  placeholder: '',
  type: 'default',
  disabled: false,
  isPosting: false,
  style: {},
  theme: '',
  onClick: () => {}
};

export default CommonButton;
