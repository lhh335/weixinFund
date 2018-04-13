import React from 'react';
import classnames from 'classnames';

const styles = {
  lineStyle: {
    width: '0.1rem',
    height: '1.4rem',
    margin: '0 0.4rem',
    backgroundColor: '#979797'
  },
  imgStyle: {
    height: '1.7rem',
    width: '5.9rem'
  },
  titleStyle: {
    fontSize: '20px'
  }
};

function LogoTitle({ title, ...props }) {
  return (
    <div className={classnames('padding_vertical_normal', 'vertical_center')}>
      <img
        src={require('../../images/logo_caifu.png')}
        alt=""
        style={styles.imgStyle}
      />
      <div style={styles.lineStyle} />
      <span style={styles.titleStyle}>{title}</span>
    </div>
  );
}

export default LogoTitle;
