import { Route, Switch, useRouteMatch } from 'react-router-dom';

import MerchantLayout from 'new-components/layouts/merchant';
import LoanListPage from 'pages/merchant/axiata/loan-list';
import LoanDetailPage from 'pages/merchant/axiata/loan-detail';
import loanCreation from 'pages/merchant/axiata/loan-creation';
import { Snackbar, SnackbarProvider } from 'pages/merchant/axiata';

const AxiataRoute = () => {
  const { path } = useRouteMatch();

  return (
    <MerchantLayout>
      <SnackbarProvider>
        <Switch>
          <Route exact path={path} component={LoanListPage} />
          <Route exact path={`${path}/loan/create`} component={loanCreation} />
          <Route path={`${path}/loan/:loanXid`} component={LoanDetailPage} />
        </Switch>

        <Snackbar />
      </SnackbarProvider>
    </MerchantLayout>
  );
};

export default AxiataRoute;
