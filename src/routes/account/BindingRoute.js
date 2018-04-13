import { Route } from 'dva/router';
import BindingAccountPageRoute from './BindingAccountPageRoute';
import ConfirmRoutePage from './ConfirmRoutePage';
import GesturesPasswordPageRoute from './GesturesPasswordPageRoute';
import BindingPhonePageRoute from './BindingPhonePageRoute';

const BindingRoute = ({ match }) => (
  <div style={{ height: '100%' }}>
    <Route
      path={`${match.url}/confirm/:type`}
      exact
      component={ConfirmRoutePage}
    />
    <Route path={`${match.url}/account`} component={BindingAccountPageRoute} />
    <Route
      path={`${match.url}/gestures`}
      component={GesturesPasswordPageRoute}
    />
    <Route path={`${match.url}/phone`} component={BindingPhonePageRoute} />
  </div>
);

export default BindingRoute;
