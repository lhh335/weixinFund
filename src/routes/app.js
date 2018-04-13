import React, { Component } from 'react';
import { Route, Switch } from 'dva/router';
import { connect } from 'dva';
import { Result, Icon } from 'antd-mobile';
import WealthPageIndex from './wealthRoutePage/wealthPageIndex';
import TransactionRecord from './wealthRoutePage/transactionRecord';
import BindingRoute from './account/BindingRoute';
import PersoninfoPage from '../components/personinfoPage/PersoninfoPage';
import AgreementPage from './Agreement';
import { createAction } from '../utils';

@connect(({ app }) => ({ app }))
class App extends Component {
  componentWillReceiveProps(nextProps) {
    if (this.props.location.pathname !== nextProps.location.pathname) {
      console.log('appp', this.props);
      this.props.dispatch(createAction('app/setWechatConfig')());
    }
  }

  render() {
    const { isAppStart } = this.props.app;
    if (isAppStart) {
      return (
        <Switch>
          <Route path="/binding" component={BindingRoute} />
          <Route path="/agree" exact component={AgreementPage} />
          <Route path="/wealth" exact component={WealthPageIndex} />
          <Route path="/record" exact component={TransactionRecord} />
          <Route path="/person" exact component={PersoninfoPage} />
        </Switch>
      );
    } else {
      return (
        <Result
          img={
            <Icon
              type="cross-circle-o"
              style={{ fill: '#FF4E4E', height: '60px', width: '60px' }}
            />
          }
          title="非法访问"
          message="请回到微信公众号进行访问"
        />
      );
    }
  }
}

export default App;
