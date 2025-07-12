import { Route, Redirect, useParams } from 'react-router-dom';

import utils from 'utils';
import { useUserContext } from 'providers/UserProvider';
import { PrivateRouteProps } from './types';

const PrivateRoute = ({
  component: Component,
  redirectUrl,
  type,
  ...resProps
}: PrivateRouteProps) => {
  const { datas } = useUserContext();
  const params: { partner: string } = useParams();
  const secretKey = utils.store.get('secretKey');

  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to login page
    <Route
      {...resProps}
      render={(props) => {
        if (!datas.token && !secretKey) {
          switch (type) {
            case 'webview':
              return <Redirect to={`/view/login`} />;
            default:
              if (redirectUrl) {
                return <Redirect to={`${redirectUrl}${datas.paramsUrl}`} />;
              }
              return <Redirect to={`/${params.partner}/login`} />;
          }
        }
        return <Component {...props} />;
      }}
    />
  );
};

export default PrivateRoute;
