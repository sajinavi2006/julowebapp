import { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { NAVBAR_MENU } from 'constant';

import { Main } from 'assets/css/styled';
import logoName from 'assets/img/logo-horizontal.svg';

import NavBar from 'components/NavBar';
import LinkAjaPrivateRoute from './components/LinkAjaPrivateRoute';
import LinkAjaPublicRoute from './components/LinkAjaPublicRoute';
import LinkAjaWildCartRoute from './components/LinkAjaWildCartRoute';

import Home from 'pages/partners/linkaja/Home';
import LinkAjaRegister from 'pages/partners/linkaja/Register';
import LinkAjaOtpVerification from 'pages/partners/linkaja/OtpVerification';
import LinkAjaOtpEmailVerification from 'pages/partners/linkaja/OtpEmailVerification';

import LinkAjaSphp from 'pages/partners/linkaja/SPHP';
import LinkAjaAgreementSummaries from 'pages/partners/linkaja/AgreementSummaries';

import Application from 'pages/commons/Applications';
import PinPage from 'pages/partners/linkaja/Pin';
import PinVerificationPage from 'pages/partners/linkaja/PinVerification';
import Transaction from 'pages/partners/linkaja/Transaction';
import LoanExpectation from 'pages/partners/linkaja/Loan';
import ResetPin from 'pages/partners/linkaja/ResetPin';
import TnC from 'pages/partners/linkaja/TnC';
import Signature from 'pages/partners/linkaja/Signature';

import utils from 'utils';

const LinkAjaRoute = () => {
  const savePartnerToStorage = () => {
    utils.store.set('partner', 'linkaja');
  };

  useEffect(() => {
    savePartnerToStorage();
  }, []);

  return (
    <Main>
      <NavBar menu={NAVBAR_MENU} logo={logoName} />
      <Switch>
        <Route
          exact
          component={LinkAjaRegister}
          path={`/linkaja/:type(register|nik)`}
        />
        <Route exact component={ResetPin} path={`/linkaja/reset-pin`} />

        <LinkAjaPublicRoute
          component={LinkAjaOtpVerification}
          path={`/linkaja/otp`}
        />

        <LinkAjaPrivateRoute
          exact
          component={LinkAjaOtpEmailVerification}
          path={`/linkaja/email-otp`}
        />

        <LinkAjaPrivateRoute
          exact
          component={LoanExpectation}
          path={`/linkaja/loan-expectation`}
        />
        <LinkAjaPrivateRoute component={Home} path={`/:partner/home`} />

        <LinkAjaPrivateRoute component={PinPage} path={`/linkaja/pin`} />
        <LinkAjaPrivateRoute
          component={Application}
          path={`/:partner/application/:type`}
        />
        {/**
         * pin-form: used for longform pin confirmation before submission
         * pin-transaction: used for transaction pin confirmation
         * pin-verification: j1 pin verification */}
        <LinkAjaPrivateRoute
          component={PinVerificationPage}
          path={`/linkaja/:type(pin-verification|pin-form|pin-transaction)`}
        />

        <LinkAjaPrivateRoute component={TnC} path={`/linkaja/tnc`} />

        <LinkAjaPrivateRoute component={LinkAjaSphp} path={`/linkaja/sphp`} />
        <LinkAjaPrivateRoute
          component={LinkAjaAgreementSummaries}
          path={`/linkaja/agreement-summaries`}
        />
        <LinkAjaPrivateRoute
          exact
          component={Signature}
          path={`/linkaja/signature`}
        />
        <LinkAjaPrivateRoute
          component={Transaction}
          path={`/linkaja/transactions`}
        />

        {/* redirect to nik page if there is no url registered */}
        <Route exact path='*' component={LinkAjaWildCartRoute} />
      </Switch>
    </Main>
  );
};

export default LinkAjaRoute;
