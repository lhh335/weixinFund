import React from 'react';
import { HashRouter as Router, Route, Switch, routerRedux } from 'dva/router';
import App from './routes/app';

const { ConnectedRouter } = routerRedux;

export const RouteWithSubRoutes = route => (
  <Route
    path={route.path}
    render={props => (
      // pass the sub-routes down to keep nesting
      <route.component {...props} routes={route.routes} />
    )}
  />
);

function RouterConfig({ history }) {
  console.log(history);
  return (
    <ConnectedRouter history={history}>
      <Route path="/" component={App} />

      {/* <Switch>
        <Route path="/" component={BindingRoute} />
        <Route path="/wealth" exact component={WealthPageIndex} />
        <Route path="/record" exact component={TransactionRecord} />
        <Route path="/person" exact component={PersoninfoPage} />
      </Switch> */}
    </ConnectedRouter>
  );
}

export default RouterConfig;
