import React, {Component,} from 'react'
import {Route, Link} from 'react-router-dom';
import {connect} from 'dva';
import {createAction} from "../../utils";
import withErrorHandler from '../../components/commonBusiness/ErrorHandler';

@connect(({person}) => ({person}))
class PersonIndex extends Component {
  constructor(props) {
    super(props)
    this.state = {}

  }

  componentWillMount() {

  }

  componentDidMount() {
    this.props.dispatch(createAction('person/getpersondata')({custNo: ''}));
  }

  render() {
    let data = this.props.person.data;
    let riskLevelValue = "";
    let investortype="";
    if (data) {
      let riskLevelKey = data.user.risk.riskLevel.toString();
      riskLevelValue = riskLevelKey ? data.dic.riskLevel_dic[riskLevelKey].value : "";
      (data.user.qualified&&data.user.qualifiedConfirm)?investortype=true:false;

    } else {
      riskLevelValue = "";
    }
    return (
      <div style={styles.total}>
        {data
          ? <div>
            <div style={styles.lineh}/>
            <div style={styles.itembc}>
              <span style={styles.lefttext}>姓名</span>
              <span style={styles.righttext}>{data.user.custName}</span>
            </div>
            <div style={styles.line}/>
            <div style={styles.itembc}>
              <span style={styles.lefttext}>证件号</span>
              <span style={styles.righttext}>{data.user.certNo}</span>
            </div>

            <div style={styles.line}/>
            <div style={styles.itembc}>
              <span style={styles.lefttext}>证件有效期</span>
              <span
                style={styles.righttext}>{data.user.certExpire}</span>
            </div>
            <div style={styles.line}/>
            <div style={styles.itembc}>
              <span style={styles.lefttext}>手机号码</span>
              <div>
                <span style={styles.righttext}>{data.user.mobile}</span>
              </div>
            </div>
            <div style={styles.line}/>
            <div style={styles.itembc}>
              <span style={styles.lefttext}>邮箱</span>
              <div style={styles.item}>
                <span style={styles.righttext}>{data.user.email}</span>
                {/*<img style={styles.imggo} alt='' src={require('../../images/goimg.png')}/>*/}
              </div>
            </div>

            <div style={styles.lineh}/>
            <div style={styles.itembc}>
              <span style={styles.lefttext}>风险承受能力</span>
              {riskLevelValue ?
                <div style={styles.item}>
                  <span style={styles.rightgotext}>{riskLevelValue}</span>
                  <img style={styles.imggo} alt='' src={require('../../images/navigationArrow.png')}/>
                </div>
                : <Link to='/wealth' style={styles.item}>
                  <span style={styles.rightgo}>去评测</span>
                  <img style={styles.imggo} alt='' src={require('../../images/navigationArrow.png')}/>
                </Link>}
            </div>
            <div style={styles.line}/>
            <div style={styles.itembc}>
              <span style={styles.lefttext}>投资者类型</span>
              <div style={styles.item}>
                <span style={styles.rightgotext}>{data.user.custName}</span>
                <img style={styles.imggo} alt='' src={require('../../images/navigationArrow.png')}/>
              </div>
            </div>
            <div style={styles.line}/>
            <div style={styles.itembc}>
              <span style={styles.lefttext}>资产认定</span>
              <div style={styles.item}>
                <span style={styles.rightgotext}>{data.user.custName}</span>
                <img style={styles.imggo} alt='' src={require('../../images/navigationArrow.png')}/>
              </div>
            </div>
            <div style={styles.line}/>
            <div style={styles.itembc}>
              <span style={styles.lefttext}>我的银行卡</span>
              {data.user.bankCardNum
                ? <div style={styles.item}>
                <span style={styles.rightgotext}>{data.user.bankCardNum}张</span>
                <img style={styles.imggo} alt='' src={require('../../images/navigationArrow.png')}/>
              </div>
                : <Link to='/wealth' style={styles.item}>
                  <span style={styles.rightgo}>绑卡</span>
                  <img style={styles.imggo} alt='' src={require('../../images/navigationArrow.png')}/>
                </Link>}
            </div>
            <div style={styles.lineh}/>

            <div style={styles.itembc}>
              <span style={styles.lefttext}>手势密码</span>
              {/*<Link to='/wealth' style={styles.righttext} >手势密码</Link>*/}
              <Link to='/wealth' style={styles.item}>
                <span style={styles.rightgo}>去设置</span>
                <img style={styles.imggo} alt='' src={require('../../images/navigationArrow.png')}/>
              </Link>
            </div>
            <div style={styles.lineh}/>
          </div>
          : <div>没有查询到数据</div>}
      </div>
    )
  }
}


PersonIndex.defaultProps = {}

PersonIndex.propTypes = {}
const styles = {
  total: {
    height: '100%',
    backgroundColor: '#F2F2F2',
    display: 'flex',
    flexDirection: 'column'
  },
  item: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
  imgoval: {
    marginRight: 20,
    height: 10,
    width: 10,
  },
  imggo: {
    marginRight: 20.3,
    height: 16,
    width: 8,
    marginLeft: 10,
  },
  lineh: {
    height: 10,
    width: '100%',
    backgroundColor: '#F2F2F2'
  },
  line: {
    height: 2,
    width: '100%',
    backgroundColor: '#EBEBEB'
  },
  itembc: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: 50,
    backgroundColor: '#ffffff',
    justifyContent: 'space-between'
  },
  lefttext: {
    color: '#999999',
    fontSize: 16,
    marginLeft: 14,
  },
  righttext: {
    fontSize: 16,
    marginRight: 14,
  },
  rightgotext: {
    color: '#000000',
    fontSize: 16,
  },
  rightgo: {
    color: '#F5A623',
    fontSize: 16,
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    width: document.body.clientWidth - 120,
    paddingRight: 20,
    height: 15,
    flexDirection: 'row-reverse',
  },

}
const FallBackComponent = ({error, errorInfo}) => (
  <div>
    <h2>Something went wrong.</h2>
    <details style={{whiteSpace: 'pre-wrap'}}>
      {error && error.toString()}
      <br/>
      {errorInfo.componentStack}
    </details>
  </div>
);
const ErrorBoundary = withErrorHandler(console.log, FallBackComponent);

export default ErrorBoundary(PersonIndex);
