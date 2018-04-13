import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withErrorHandler from './ErrorHandler';
import { dispatch } from '../../index';
import { replaceRouter, createAction } from '../../utils';
// HandleUnlock.defaultProps = {
//   pointColor: '#D8D8D8',
//   lineColor: '#1B9DFC',
//   errorColor: '#FC5053'
// };

class HandleUnlock extends Component {
  static defaultProps = {
    pointColor: '#D8D8D8',
    lineColor: '#1B9DFC',
    errorColor: '#FC5053',
    minPoint: 4,
    clearLock: false,
    type: 'block',
    baseUrl: '/binding/confirm/success',
    message: ''
  };

  constructor(props) {
    super(props);
    this.state = {
      height: document.querySelector('body').offsetWidth,
      width: document.querySelector('body').offsetWidth,
      chooseType: 3,
      devicePixelRatio: window.devicePixelRatio || 1
    };
  }

  drawCle = (x, y) => {
    // 初始化解锁密码面板 小圆圈
    this.ctx.strokeStyle = this.props.pointColor; //密码的点点默认的颜色
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.arc(x, y, this.r, 0, Math.PI * 2, true);
    this.ctx.closePath();
    this.ctx.stroke();
    this.ctx.fillStyle = this.props.pointColor;
    this.ctx.beginPath();
    this.ctx.arc(x, y, this.r / 2.5, 0, Math.PI * 2, true);
    this.ctx.closePath();
    this.ctx.fill();
  };

  drawPoint = function(style) {
    // 初始化圆心
    for (var i = 0; i < this.lastPoint.length; i++) {
      this.ctx.fillStyle = style;
      this.ctx.beginPath();
      this.ctx.arc(
        this.lastPoint[i].x,
        this.lastPoint[i].y,
        this.r / 2.5,
        0,
        Math.PI * 2,
        true
      );
      this.ctx.closePath();
      this.ctx.fill();
    }
  };
  drawStatusPoint = function(type) {
    // 初始化状态线条
    for (var i = 0; i < this.lastPoint.length; i++) {
      this.ctx.strokeStyle = type;
      this.ctx.beginPath();
      this.ctx.arc(
        this.lastPoint[i].x,
        this.lastPoint[i].y,
        this.r,
        0,
        Math.PI * 2,
        true
      );
      this.ctx.closePath();
      this.ctx.stroke();
    }
  };
  drawLine = function(style, po, lastPoint) {
    //style:颜色 解锁轨迹
    this.ctx.beginPath();
    this.ctx.strokeStyle = style;
    this.ctx.lineWidth = 3;

    this.ctx.moveTo(this.lastPoint[0].x, this.lastPoint[0].y);
    for (var i = 1; i < this.lastPoint.length; i++) {
      this.ctx.lineTo(this.lastPoint[i].x, this.lastPoint[i].y);
    }

    this.ctx.lineTo(po.x, po.y);
    this.ctx.stroke();
    this.ctx.closePath();
  };
  createCircle = function() {
    // 创建解锁点的坐标，根据canvas的大小来平均分配半径

    var n = this.state.chooseType;
    var count = 0;
    this.r = this.ctx.canvas.width / (1.6 + 4 * n); // 公式计算
    this.lastPoint = [];
    this.arr = [];
    this.restPoint = [];
    var r = this.r;
    for (var i = 0; i < n; i++) {
      for (var j = 0; j < n; j++) {
        count++;
        var obj = {
          x: j * 4 * r + 3 * r,
          y: i * 4 * r + 3 * r,
          index: count
        };
        this.arr.push(obj);
        this.restPoint.push(obj);
      }
    }
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    for (let i = 0; i < this.arr.length; i++) {
      this.drawCle(this.arr[i].x, this.arr[i].y);
      this.drawPoint(this.props.pointColor);
      this.drawStatusPoint(this.props.pointColor);
    }
    //return arr;
  };
  getPosition = function(e) {
    // 获取touch点相对于canvas的坐标
    var rect = e.currentTarget.getBoundingClientRect();
    var po = {
      x: (e.touches[0].clientX - rect.left) * this.state.devicePixelRatio,
      y: (e.touches[0].clientY - rect.top) * this.state.devicePixelRatio
    };
    return po;
  };
  update = function(po) {
    const { lineColor } = this.props;
    // 核心变换方法在touchmove时候调用
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

    for (var i = 0; i < this.arr.length; i++) {
      // 每帧先把面板画出来
      this.drawCle(this.arr[i].x, this.arr[i].y);
    }

    this.drawPoint(lineColor); // 每帧花轨迹
    this.drawStatusPoint(lineColor); // 每帧花轨迹

    // if (this.lastPoint.length == 4) {
    //     // debugger
    // }

    for (let i = 0; i < this.restPoint.length; i++) {
      if (
        Math.abs(po.x - this.restPoint[i].x) < this.r &&
        Math.abs(po.y - this.restPoint[i].y) < this.r
      ) {
        this.drawPoint(this.restPoint[i].x, this.restPoint[i].y);
        this.lastPoint.push(this.restPoint[i]);
        this.restPoint.splice(i, 1);
        break;
      }
    }
    // 获得lastPoint后画线
    this.drawLine(lineColor, po, this.lastPoint); // 每帧画圆心
  };
  checkPass = function(psw1, psw2) {
    // 检测密码
    let p1 = '',
      p2 = '';
    for (var i = 0; i < psw1.length; i++) {
      p1 += psw1[i].index + psw1[i].index;
    }
    for (let i = 0; i < psw2.length; i++) {
      p2 += psw2[i].index + psw2[i].index;
    }
    return p1 === p2;
  };
  storePass = function(psw) {
    // touchend结束之后对密码和状态的处理
    const { title } = this.refs;
    const {
      lineColor,
      errorColor,
      minPoint,
      clearLock,
      baseUrl,
      message,
      type
    } = this.props;
    if (this.pswObj.step === 1) {
      if (this.checkPass(this.pswObj.fpassword, psw)) {
        this.pswObj.step = 2;
        this.pswObj.spassword = psw;
        // this.refs.title.innerHTML = '密码保存成功';

        this.drawStatusPoint(lineColor);
        this.drawPoint(lineColor);
        window.localStorage.setItem(
          'password',
          JSON.stringify(this.pswObj.spassword)
        );
        window.localStorage.setItem('chooseType', this.state.chooseType);
        setTimeout(function() {
          dispatch(
            replaceRouter('/binding/confirm/success', {
              message
            })
          );
        }, 1000);
      } else {
        title.style.color = errorColor;
        title.innerHTML = '图案不一致，请重试一次';
        this.drawStatusPoint(errorColor);
        this.drawPoint(errorColor);
        delete this.pswObj.step;
        this.delayReset();
      }
    } else if (this.pswObj.step === 2) {
      if (this.checkPass(this.pswObj.spassword, psw)) {
        title.style.color = lineColor;
        title.innerHTML = '解锁成功';

        this.drawStatusPoint(lineColor); //小点点外圈高亮
        this.drawPoint(lineColor);
        this.drawLine(
          lineColor,
          this.lastPoint[this.lastPoint.length - 1],
          this.lastPoint
        ); // 每帧画圆心
        if (clearLock) {
          this.updatePassword();
        }
        if (type === 'close' || type === 'block') {
          dispatch(
            createAction('app/setLockState')({
              isLock: false,
              alreadyLock: type === 'block'
            })
          );
          setTimeout(function() {
            dispatch(replaceRouter(baseUrl, { message }));
          }, 1000);
        }
      } else if (psw.length < minPoint) {
        this.drawStatusPoint(errorColor);
        this.drawPoint(errorColor);
        this.drawLine(
          errorColor,
          this.lastPoint[this.lastPoint.length - 1],
          this.lastPoint
        ); // 每帧画圆心

        title.style.color = errorColor;
        title.innerHTML = `请至少连接三个点`;
        this.delayReset();
      } else {
        this.drawStatusPoint(errorColor);
        this.drawPoint(errorColor);
        this.drawLine(
          errorColor,
          this.lastPoint[this.lastPoint.length - 1],
          this.lastPoint
        ); // 每帧画圆心
        title.style.color = errorColor;
        title.innerHTML = '图案不一致，请重试一次';
        this.delayReset();
      }
    } else {
      if (psw.length < minPoint) {
        this.drawStatusPoint(errorColor);
        this.drawPoint(errorColor);
        this.drawLine(
          errorColor,
          this.lastPoint[this.lastPoint.length - 1],
          this.lastPoint
        ); // 每帧画圆心

        title.style.color = errorColor;
        title.innerHTML = `请至少连接三个点`;
        this.delayReset();
      } else {
        this.pswObj.step = 1;
        this.pswObj.fpassword = psw;
        title.style.color = '#808080';
        title.innerHTML = '请再次绘制手势图案';
        this.delayReset();
      }
    }
  };
  makeState = function() {
    console.log('this.pswObj.step', this.pswObj.step);
    const { title } = this.refs;
    if (this.pswObj.step === 2) {
      document.getElementById('updatePassword').style.display = 'block';
      //document.getElementById('chooseType').style.display = 'none';

      title.style.color = '#787878';
      title.innerHTML = '请解锁';
    } else if (this.pswObj.step === 1) {
      //document.getElementById('chooseType').style.display = 'none';
      document.getElementById('updatePassword').style.display = 'none';
    } else {
      document.getElementById('updatePassword').style.display = 'none';
      //document.getElementById('chooseType').style.display = 'block';
    }
  };
  // setChooseType = function(type) {
  //   chooseType = type;
  //   this.init();
  // };
  updatePassword = function() {
    window.localStorage.removeItem('password');
    window.localStorage.removeItem('chooseType');
    this.pswObj = {};
    this.refs.title.innerHTML = '请绘制解锁图案';
    this.reset();
  };
  initDom = () => {
    let canvas = this.refs.canvas;
    // let canvas = document.getElementById("a");
    const { height, width, devicePixelRatio } = this.state;
    // 高清屏锁放
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';

    canvas.height = height * devicePixelRatio;
    canvas.width = width * devicePixelRatio;
  };
  init = function() {
    console.log('clearLock', window.localStorage.getItem('password'));
    this.initDom();
    try {
      this.pswObj = window.localStorage.getItem('password')
        ? {
            step: 2,
            spassword: JSON.parse(window.localStorage.getItem('password'))
          }
        : {};
    } catch (error) {
      console.log('clearLock', error);
      window.localStorage.removeItem('password');
      window.localStorage.removeItem('chooseType');
      this.pswObj = {};
    }
    this.lastPoint = [];
    this.makeState();
    this.touchFlag = false;
    this.canvas = this.refs.canvas;
    this.ctx = this.canvas.getContext('2d');
    this.createCircle();
    this.bindEvent();
  };
  reset = function() {
    this.makeState();
    this.createCircle();
  };

  delayReset = function() {
    let self = this;
    setTimeout(function() {
      self.reset();
    }, 1000);
  };
  bindEvent = function() {
    var self = this;
    this.canvas.addEventListener(
      'touchstart',
      function(e) {
        e.preventDefault(); // 某些android 的 touchmove不宜触发 所以增加此行代码
        var po = self.getPosition(e);
        for (var i = 0; i < self.arr.length; i++) {
          if (
            Math.abs(po.x - self.arr[i].x) < self.r &&
            Math.abs(po.y - self.arr[i].y) < self.r
          ) {
            self.touchFlag = true;
            self.drawPoint(self.arr[i].x, self.arr[i].y);
            self.lastPoint.push(self.arr[i]);
            self.restPoint.splice(i, 1);
            break;
          }
        }
      },
      false
    );
    this.canvas.addEventListener(
      'touchmove',
      function(e) {
        if (self.touchFlag) {
          self.update(self.getPosition(e));
        }
      },
      false
    );
    this.canvas.addEventListener(
      'touchend',
      function(e) {
        if (self.touchFlag) {
          self.touchFlag = false;
          self.storePass(self.lastPoint);
          // setTimeout(function() {
          //   self.reset();
          // }, 1000);
        }
      },
      false
    );

    // document
    //   .getElementById('updatePassword')
    //   .addEventListener('click', function() {
    //     self.updatePassword();
    //   });
  };

  componentDidMount() {
    this.init();
  }

  render() {
    return (
      <div style={{ textAlign: 'center', height: '100%' }}>
        <h1 ref="title" style={styles.tips}>
          请绘制解锁图案
        </h1>
        <span
          onClick={this.props.onClick}
          id="updatePassword"
          style={{
            position: 'absolute',
            bottom: '3.8rem',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'none',
            color: '#808080',
            fontSize: '14px'
          }}>
          忘记手势密码？
        </span>
        <canvas ref="canvas" style={styles.canvas} />
      </div>
    );
  }
}
const FallBackComponent = ({ error, errorInfo }) => (
  <div>
    <h2>Something went wrong.</h2>
    <details style={{ whiteSpace: 'pre-wrap' }}>
      {error && error.toString()}
      <br />
      {errorInfo.componentStack}
    </details>
  </div>
);

const ErrorBoundary = withErrorHandler(console.log, FallBackComponent);

const styles = {
  canvas: {
    backgroundColor: '#fff',
    display: 'inline-block',
    marginTop: '1.2rem',
    zIndex: 10000
  },
  tips: {
    color: '#808080',
    paddingTop: '5.9rem',
    fontWeight: 400,
    fontSize: '16px'
  }
};

HandleUnlock.propTypes = {
  pointColor: PropTypes.string,
  lineColor: PropTypes.string,
  errorColor: PropTypes.string,
  clearLock: PropTypes.bool
};

export default ErrorBoundary(HandleUnlock);
