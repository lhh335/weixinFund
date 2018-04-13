import { Route } from 'dva/router';
import PasswordSettingsGestures from '../../components/GesturesPassword/PasswordSettingsGestures';
import PasswordResetGestures from '../../components/GesturesPassword/PasswordResetGestures';
const GesturesPasswordPageRoute = ({ match }) => (
  <div style={{ height: '100%' }}>
    <Route
      path={`${match.url}/reset`}
      exact
      component={PasswordResetGestures}
    />
    <Route
      path={`${match.url}/:type`}
      exact
      component={PasswordSettingsGestures}
    />
  </div>
);

export default GesturesPasswordPageRoute;
