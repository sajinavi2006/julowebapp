import { Route, Switch } from 'react-router-dom';
import { Global, css } from '@emotion/react';

import { Login, Register, Application } from 'pages/merchant';
import { MerchantGuard } from 'new-components/guards/merchant';
import AxiataRoute from './axiata';

const MerchantRoutes = () => {
  return (
    <>
      <Switch>
        <Route
          path='/merchant'
          render={(parentRoute) => (
            <MerchantGuard>
              <Route
                path={`${parentRoute.match.url}/:partnerName`}
                render={(route) => (
                  <Switch>
                    <Route
                      path={`${route.match.path}/login`}
                      component={Login}
                    />
                    <Route
                      path={`${route.match.path}/register`}
                      component={Register}
                    />
                    <Route path={`${route.match.path}/forget-password`} />
                    <Route
                      path={`${route.match.path}/reset-password/:resetPasswordToken`}
                    />
                    <Route
                      path={`${route.match.path}/application`}
                      component={Application}
                    />
                    {/**
                     * @TODO Need to be changed when there are partner other than axiata
                     */}
                    <Route path={`${route.match.path}`} component={AxiataRoute} />
                  </Switch>
                )}
              />
            </MerchantGuard>
          )}
        />
      </Switch>
      <Global
        styles={css`
          html {
            font-size: 16px;
          }
        `}
      />
    </>
  );
};

export default MerchantRoutes;
