import { Switch, Route, useLocation, Redirect } from 'react-router-dom';

import utils from 'utils';
import usePageTracking from 'hooks/usePageTracking';
import { downloadAppUrl } from 'constant';

import CreatePinPage from 'pages/commons/CreatePin';
import InputPinPage from 'pages/commons/InputPin';
import ResetPinPage from 'pages/commons/ResetPin';
import PartnerRoutes from './partner';
import WebViewRoutes from './webview';
import EmployeeFinancingRoutes from './employee-financing';
import MerchantRoutes from './merchant';

function Routes() {
  usePageTracking();
  const location = useLocation();
  const urlParams = utils.store.getParse('params');
  const pathname = location.pathname;
  const webType = utils.store.get('webType');
  const getParentPathName = pathname.split('/')[1];

  if (pathname === '/') {
    window.location.assign(downloadAppUrl);
    return null;
  }

  if (webType === 'webview' && getParentPathName !== 'view')
    return <Redirect to={`/view/${urlParams?.page}`} />;

  return (
    <Switch>
      <Route exact path='/create-pin/:xid' component={CreatePinPage} />
      <Route exact path='/input-pin/:xid' component={InputPinPage} />
      <Route exact path='/reset/pin' component={ResetPinPage} />
      <Route path='/view/:page' component={WebViewRoutes} />
      <Route path='/ef-pilot' component={EmployeeFinancingRoutes} />
      <Route path='/merchant' component={MerchantRoutes} />
      <Route path='/:partner' component={PartnerRoutes} />
    </Switch>
  );
}

export default Routes;
