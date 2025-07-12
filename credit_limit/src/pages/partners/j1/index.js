import React, { useEffect, useState } from 'react';
import { useHistory, useParams, withRouter } from 'react-router-dom';

import { useUserContext } from 'providers/UserProvider';

import { NAVBAR_MENU } from 'constant';

import { Main } from 'assets/css/styled';

import logoName from 'assets/img/logo-horizontal.svg';

import NavBar from 'components/NavBar';

import Home from './Home';
import utils from 'utils';

const J1 = () => {
  const history = useHistory();
  const { datas } = useUserContext();
  const { page, partner } = useParams();
  const [isMounted, setIsMounted] = useState(false);
  const getPartner = utils.store.get('partner') || partner;
  const applicationXId = utils.store.get('application_xid');

  // related to partner klop
  const checkAppXid = () => {
    const queryParams = new URLSearchParams(datas.paramsUrl);
    const paramsAppXId = queryParams.get('application_xid');

    if (paramsAppXId && applicationXId) {
      if (partner === 'klop' && paramsAppXId !== applicationXId) {
        const except = ['partner'];

        utils.store.clearAllItem(except);
        return window.location.replace(`/${partner}/pin${datas.paramsUrl}`);
      }
    }
  };

  useEffect(() => {
    checkAppXid();
  }, []);

  const renderPage = () => {

    if (!isMounted) {
      switch (page) {
        case 'home':
          return <Home />;

        default:
          history.replace(`/${getPartner}/home${datas.paramsUrl}`);

          return <></>;
      }
    } else {
      setIsMounted(true);
    }
  };

  return (
    <Main>
      <NavBar menu={NAVBAR_MENU} logo={logoName} />
      {renderPage()}
    </Main>
  );
};

export default withRouter(J1);
