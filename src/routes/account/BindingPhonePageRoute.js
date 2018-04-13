import { Route } from 'dva/router';
import BindingMobilePhone from '../../components/BindingPage/BindingMobilePhone';
import UnBindMobilePhone from '../../components/BindingPage/UnBindMobilePhone';

const GesturesPasswordPageRoute = ({ match }) => (
  <div style={{ height: '100%' }}>
    <Route path={`${match.url}/add`} exact component={BindingMobilePhone} />
    <Route path={`${match.url}/remove`} exact component={UnBindMobilePhone} />
  </div>
);

export default GesturesPasswordPageRoute;
