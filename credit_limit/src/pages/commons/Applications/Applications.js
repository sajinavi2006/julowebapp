import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

import {
  MAX_WIDTH,
  MIN_WIDTH,
  NAVBAR_MENU,
  whitelistedPartner,
} from 'constant';

import { Container, Main, Wrapper } from 'assets/css/styled';

import logoName from 'assets/img/logo-horizontal.svg';
import services from 'services';
import { homeScreenInfo } from 'services/user';
import { useUserContext } from 'providers/UserProvider';

import NavBar from 'components/NavBar';
import PersonalIdentity from './PersonalIdentity';
import FamilyInformation from './FamilyInformation';
import JobAndEducation from './JobAndEducation';
import Financial from './Financial';
import Review from './Review/index';
import utils from 'utils';
import { useHistory, useParams } from 'react-router';
import { useApplicationContext } from './providers/ApplicationProvider';
import { useCheckApplicationField } from './hooks';

const Applications = (props) => {
  const { type } = props.match.params;
  const history = useHistory();
  const applicationXId = utils.store.get('application_xid');
  const [showVerif, setShowVerif] = useState(false);
  const [isEligibleRender, setIsEligibleRender] = useState(false);

  const { partner } = useParams();
  const { isFieldDisabled } = useCheckApplicationField(partner);
  const { getDropdownLists, getBankList, getAllSettings } =
    useApplicationContext();
  const { datas, setDatas } = useUserContext();

  const setShowVerifAndFetch = (value) => {
    setShowVerif(value);
  };

  const fetchCommons = async () => {
    const { appStatus, partner } = datas;

    // prevent user redirect to longform if application status more than 100
    if (appStatus > 100) {
      return history.replace(`/${partner}`);
    }

    // get all dropdown related
    getDropdownLists();
    // get all banks to be used on financial page
    getBankList();

    if (!isFieldDisabled('get_settings')) {
      // get all settings related to longfrom
      getAllSettings();
    }

    if (!utils.store.get('terms')) {
      services.common.getData({ uri: `/v3/termsprivacy` }, (response) => {
        utils.store.set('terms', response);
      });
    }

    if (!isFieldDisabled('get_home_info')) {
      // to get user partner
      const responseHomeScreen = await homeScreenInfo();
      const content = responseHomeScreen.content || {};
      const application = content.applications?.[0] || {};
      const tempPartner = application.partner_name;
      const customer = content.customers?.[0] || {};
      const phone = customer.phone;
      const nik = customer.nik;
      const email = customer.email;
      const customerId = customer.id;
      const applicationId = application.id;
      const appStatus = application.status;
      setDatas((prev) => ({
        ...prev,
        phone,
        nik,
        email,
        appStatus,
      }));

      // store data for the registration
      utils.store.set('email', email);
      utils.store.set('customerId', customerId);
      utils.store.set('applicationId', applicationId);

      setIsEligibleRender(true);

      const isPartnerValid = whitelistedPartner.includes(tempPartner);

      if (!tempPartner || !isPartnerValid) {
        return history.replace(`/j1/application/personal_identity`);
      }

      if (tempPartner !== partner) {
        return history.replace(`/${tempPartner}/application/personal_identity`);
      }

      setIsEligibleRender(true);
    }

    setIsEligibleRender(true);
  };

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

    fetchCommons();
  };

  const RenderPageType = useCallback(() => {
    switch (type) {
      case 'personal_identity':
        return (
          <PersonalIdentity
            showVerif={showVerif}
            setShowVerif={setShowVerifAndFetch}
          />
        );
      case 'family_information':
        return <FamilyInformation />;
      case 'job_and_education':
        return <JobAndEducation />;
      case 'financial':
        return <Financial />;
      case 'review':
        return (
          <Review showVerif={showVerif} setShowVerif={setShowVerifAndFetch} />
        );
      default:
        break;
    }
  }, [type]);

  useEffect(() => {
    checkAppXid();
  }, [isEligibleRender]);

  return (
    <Main>
      <NavBar menu={NAVBAR_MENU} logo={logoName} />
      <Container>
        <Wrapper
          height={'100%'}
          minHeight={'100vh'}
          maxWidth={MAX_WIDTH}
          minWidth={MIN_WIDTH}
          backgroundColor='#fff'
          overflowX='hidden'
        >
          {isEligibleRender && <RenderPageType />}
        </Wrapper>
      </Container>
    </Main>
  );
};
Applications.propTypes = {
  match: PropTypes.object,
};

export default Applications;
