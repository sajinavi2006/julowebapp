import { Switch, Route } from 'react-router-dom';

import LandingPage from 'pages/employee-financing/Landing';
import Application from 'pages/employee-financing/Applications';
import Disbursement from 'pages/employee-financing/Disbursement';
import SuccessPage from 'pages/employee-financing/Success/Success';
import ExpiredLink from 'pages/employee-financing/ExpiredLink';

const EmployeeFinancingRoutes = () => {
  return (
    <Switch>
      <Route
        exact
        component={LandingPage}
        path={`/ef-pilot/:type(application|disbursement)`}
      />
      <Route
        exact
        component={Application}
        path={`/ef-pilot/application/:page(personal_identity|family_information|financial|loan_application)`}
      />
      <Route
        exact
        component={Disbursement}
        path={`/ef-pilot/disbursement/loan`}
      />
      <Route exact component={SuccessPage} path={`/ef-pilot/success`} />
      <Route exact component={ExpiredLink} path={'/ef-pilot/expired'} />
    </Switch>
  );
};

export default EmployeeFinancingRoutes;
