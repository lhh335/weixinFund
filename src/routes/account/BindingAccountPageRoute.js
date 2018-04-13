import { Route } from 'dva/router';
import BindingAccountPage from '../../components/BindingPage/BindingAccount';
import FindPassWordPage from '../../components/BindingPage/FindPassWord';
import CheckCertNum from '../../components/BindingPage/CheckCertNum';
import ResetPasswordPage from '../../components/BindingPage/ResetPassword';

const BindingAccountPageRoute = ({ match }) => (
  <div style={{ height: '100%' }}>
    <Route path={`${match.url}`} exact component={BindingAccountPage} />
    <Route path={`${match.url}/find`} exact component={FindPassWordPage} />
    <Route path={`${match.url}/certcheck`} exact component={CheckCertNum} />
    <Route path={`${match.url}/reset`} exact component={ResetPasswordPage} />
  </div>
);

export default BindingAccountPageRoute;
