import { useState, useEffect } from 'react';
import { Route, Switch, useParams } from 'react-router-dom';

import MerchantFinancing from 'pages/webview/MerchantFinancing';
import Activation from 'pages/webview/Activation';
import utils from 'utils';

import PrivateRoute from 'components/PrivateRoute';
import PublicRoute from 'components/PublicRoute';
import LoginPage from 'pages/webview/Login';
import ErrorPage from 'pages/webview/ErrorPage';
import LocationPage from 'pages/webview/Location';
import AgentAssisted from 'pages/webview/AgentAssisted';
import { Application } from 'pages/webview/GojekTsel';
import SmileLiveness from 'pages/webview/SmileLiveness';

function WebViewRoutes() {
  const { page } = useParams<{ page: string }>();
  const queryString = window.location.search;
  const paramsURL = utils.store.getParse('params');
  const urlParams = new URLSearchParams(queryString);
  const partnerCategory = urlParams.get('partner_category');
  const [privateComp, setPrivateComp] = useState({
    category: MerchantFinancing,
    page: '',
  });
  const [publicComp, setPublicComp] = useState<{
    category?: () => JSX.Element;
  }>({});
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const fetchRoutes = () => {
      const tempPartnerCategory =
        partnerCategory || paramsURL?.partner_category;
      if (tempPartnerCategory) {
        switch (tempPartnerCategory) {
          case 'merchant_financing':
            setPrivateComp((prevState) => ({
              ...prevState,
              category: MerchantFinancing,
            }));
            break;
        }
      } else if (page) {
        switch (page) {
          case 'activation':
            setPublicComp((prevState) => ({
              ...prevState,
              category: Activation,
            }));
            break;
          case 'create-pin':
            setPublicComp((prevState) => ({
              ...prevState,
              category: AgentAssisted,
            }));
            break;
        }
      }

      setIsMounted(true);
    };

    fetchRoutes();
  }, [isMounted]);

  return isMounted ? (
    <Switch>
      <PublicRoute
        exact
        type='webview'
        component={LoginPage}
        path={`/view/login`}
      />

      <PublicRoute
        exact
        type='webview'
        component={Application}
        path={`/view/gojek-tsel/application`}
      />

      <PublicRoute
        exact
        type='webview'
        component={ErrorPage}
        path={`/view/error`}
      />

      <Route path='/view/location' component={LocationPage} />
      <Route path='/view/smile-liveness' component={SmileLiveness} />

      {/* execute if public component category exist */}
      {publicComp?.category ? (
        <>
          <PublicRoute
            exact
            type='webview'
            component={publicComp.category}
            path={`/view/:page/`}
          />
          <PublicRoute
            exact
            type='webview'
            component={publicComp.category}
            path={`/view/:page/:type`}
          />
        </>
      ) : null}

      <PrivateRoute
        exact
        type='webview'
        component={privateComp.category}
        path={`/view/:page/`}
      />
      <PrivateRoute
        exact
        type='webview'
        component={privateComp.category}
        path={`/view/:page/:type`}
      />
    </Switch>
  ) : null;
}

export default WebViewRoutes;
