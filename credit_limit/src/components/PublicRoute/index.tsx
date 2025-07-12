import { Route, Redirect, useParams } from 'react-router-dom';

import utils from 'utils';
import { useUserContext } from 'providers/UserProvider';
import { PublicRouteProps } from './types';

const PublicRoute = ({
  component: Component,
  redirectUrl,
  type,
  ...resProps
}: PublicRouteProps) => {
  const { datas } = useUserContext();
  const { partner } = useParams<{ partner: string }>();
  const pageType =
    type == 'webview' ? 'view' : utils.store.get('partner') || partner;
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const page = urlParams.get('page');

  return (
    <Route
      {...resProps}
      render={(props) => {
        if (datas.token) {
          if (type == 'webview') {
            return <Redirect to={`/${pageType}/${page}`} />;
          }

          if (redirectUrl) {
            return <Redirect to={redirectUrl} />;
          }
          return <Redirect to={`/${pageType}`} />;
        }
        return <Component {...props} />;
      }}
    />
  );
};

export default PublicRoute;
