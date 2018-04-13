import React, { Component } from 'react';
import { connect } from 'dva';
import ConfirmPage from '../../components/commonBusiness/ConfirmPage';
import { createAction, pushRouter } from '../../utils';

@connect(({ auth }) => ({ auth }))
export default class ConfirmRoutePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.dispatch(createAction('auth/fetchUserInfo')());
  }

  goPage = (path, params) => {
    this.props.dispatch(pushRouter(path, params));
  };

  render() {
    const { userInfo } = this.props.auth;
    const { type } = this.props.match.params;
    const { query } = this.props.location;

    console.log(userInfo);
    return (
      <div
        style={{
          height: '100%'
        }}>
        <ConfirmPage
          // mobile={query && query.mobile}
          // userName={query && query.custName}
          mobile={userInfo.mobile}
          userName={userInfo.custName}
          promptInfo={query && query.message}
          type={type}
          purpose={query && query.purpose}
        />
      </div>
    );
  }
}
