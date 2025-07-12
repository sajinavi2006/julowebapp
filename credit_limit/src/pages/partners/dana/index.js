import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { NAVBAR_MENU } from 'constant';

import { Main } from 'assets/css/styled';
import logoName from 'assets/img/logo-horizontal.svg';

import NavBar from 'components/NavBar';

import DanaContract from 'pages/partners/dana/contract';

import utils from 'utils';

import { applicationDetails } from 'services/webview/activation';
import { useUserContext } from 'providers/UserProvider';
import { useQueryParams } from 'utils/RouteHelper';

const DanaRoute = () => {
  const { handleNotification, datas, setDatas } = useUserContext();
  const [isNavbar] = useState(false);

  const query = useQueryParams();
  const authParams = query.get('auth');

  const secretKey = utils.store.get('secretKey');

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

  const savePartnerToStorage = () => {
    utils.store.set('partner', 'dana');
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

  return (
    <Main>
      {isNavbar ? <NavBar menu={NAVBAR_MENU} logo={logoName} /> : ''}
      <Switch>
        <Route component={DanaContract} path={`/dana/contract`} />
      </Switch>
    </Main>
  );
};

DanaRoute.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
};
export default DanaRoute;
