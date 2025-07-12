import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { NAVBAR_MENU } from 'constant';

import { Main } from 'assets/css/styled';
import logoName from 'assets/img/logo-horizontal.svg';

import NavBar from 'components/NavBar';
import PaylaterPrivateRoute from './components/PaylaterPrivateRoute';
import PaylaterWildCartRoute from './components/PaylaterWildCartRoute';

import PaylaterRegister from 'pages/partners/paylater/Register';
import PaylaterLogin from 'pages/partners/paylater/Login';
import PaylaterActivation from 'pages/partners/paylater/Activation';
import PaylaterOtpVerification from 'pages/partners/paylater/OtpVerification';
import PaylaterWelcome from 'pages/partners/paylater/Welcome';

import Application from 'pages/commons/Applications';
import PinPage from 'pages/partners/paylater/Pin';
import PinVerificationPage from 'pages/partners/paylater/PinVerification';
import PaylaterSphp from 'pages/partners/paylater/SPHP';
import PaylaterAgreementSummaries from 'pages/partners/paylater/AgreementSummaries';

import PaylaterCancelPage from 'pages/partners/paylater/Transaction/CancelScreen';
import PaylaterSuccessPage from 'pages/partners/paylater/Transaction/SuccessScreen';

import ResetPin from 'pages/partners/paylater/ResetPin';
import Transaction from 'pages/partners/paylater/Transaction';
import Signature from 'pages/partners/paylater/Signature';
import utils from 'utils';
import InsufficientBalance from './InsufficientBalance/InsufficientBalance';
import Home from './Home';
import { applicationDetails } from 'services/webview/activation';
import { useUserContext } from 'providers/UserProvider';
import { useQueryParams } from 'utils/RouteHelper';

const PaylaterRoute = ({ location }) => {
  const { handleNotification, datas, setDatas } = useUserContext();
  const [isNavbar, setIsNavbar] = useState(true);

  const query = useQueryParams();
  const authParams = query.get('auth');

  const secretKey = utils.store.get('secretKey');

  const savePartnerToStorage = () => {
    utils.store.set('partner', 'paylater');
  };

  const fetchApplicationDetail = async () => {
    try {
      const response = await applicationDetails();
      const data = response.data;

      // STORE TO STORAGE
      utils.store.set('token', data.token);
      utils.store.set('merchant', data.partner_name);

      setDatas({
        ...datas,
        phone: utils.string.convertPhoneNumber(data.application.phone),
        email: data.application.email,
        isActive: data.is_active,
        isRegistered: data.is_registered,
        token: data.token,
        partner: 'paylater',
        appStatus: data.application.application_status,
        applicationXid: data.application.application_xid,
        transactionXid: data.paylater_transaction_xid,
        applicationFullname: data.application.application_fullname,
        isUseSignature: data.is_use_signature,
      });
    } catch (error) {
      if (error) {
        const errorData = error.response.data || {};
        const errMessage = errorData.errors?.[0];
        handleNotification({
          isOpen: true,
          message: errMessage,
        });
      }
    }
  };

  useEffect(() => {
    if (authParams) {
      utils.store.set('params', JSON.stringify({ auth: authParams }));
      utils.store.set('secretKey', authParams.replaceAll(' ', '+'));
      savePartnerToStorage();
    }
  }, [authParams]);

  useEffect(() => {
    if (secretKey) fetchApplicationDetail();
  }, [secretKey]);

  useEffect(() => {
    const arrPath = location.pathname.split('/');
    switch (arrPath[arrPath.length - 1]) {
      case 'welcome':
        setIsNavbar(false);
        break;
      case 'pin-verification':
        setIsNavbar(false);
        break;
      case 'otp':
        setIsNavbar(false);
        break;
      default:
        setIsNavbar(true);
        break;
    }
  }, [location.pathname]);

  return (
    <Main>
      {isNavbar ? <NavBar menu={NAVBAR_MENU} logo={logoName} /> : ''}
      <Switch>
        <Route exact component={PaylaterLogin} path={`/paylater/login`} />

        <Route
          exact
          component={PaylaterActivation}
          path={`/paylater/activation`}
        />

        <Route exact component={PaylaterWelcome} path={`/paylater/welcome`} />

        <Route exact component={PaylaterWelcome} path={`/paylater/not-match`} />

        <Route
          exact
          component={PaylaterRegister}
          path={`/paylater/:type(register|nik)`}
        />

        <Route
          exact
          component={InsufficientBalance}
          path={`/paylater/insufficient-balance`}
        />
        <Route exact component={ResetPin} path={`/paylater/reset-pin`} />

        <Route component={PaylaterOtpVerification} path={`/paylater/otp`} />

        <PaylaterPrivateRoute component={Home} path={`/:partner/home`} />

        <Route component={PinPage} path={`/paylater/pin`} />
        <PaylaterPrivateRoute
          component={Application}
          path={`/:partner/application/:type`}
        />
        {/**
         * pin-form: used for longform pin confirmation before submission
         * pin-transaction: used for transaction pin confirmation
         * pin-verification: j1 pin verification */}
        <Route
          component={PinVerificationPage}
          path={`/paylater/:type(pin-verification|pin-form|pin-transaction)`}
        />

        <PaylaterPrivateRoute
          component={PaylaterSphp}
          path={`/paylater/sphp`}
        />
        <PaylaterPrivateRoute
          component={PaylaterAgreementSummaries}
          path={`/paylater/agreement-summaries`}
        />
        <PaylaterPrivateRoute
          exact
          component={Signature}
          path={`/paylater/signature`}
        />
        <Route
          component={PaylaterCancelPage}
          exact
          path={`/paylater/transactions/cancel`}
        />
        <Route
          component={PaylaterSuccessPage}
          exact
          path={`/paylater/transactions/success`}
        />
        <PaylaterPrivateRoute
          component={Transaction}
          path={`/paylater/transactions`}
        />

        {/* redirect to nik page if there is no url registered */}
        <Route exact path='*' component={PaylaterWildCartRoute} />
      </Switch>
    </Main>
  );
};

PaylaterRoute.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
};
export default PaylaterRoute;
