import React, { useState, useEffect } from 'react';
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

import NavBar from 'components/NavBar';
import PersonalIdentity from './PersonalIdentity';
import FamilyInformation from 'pages/commons/Applications/FamilyInformation';
import JobAndEducation from 'pages/commons/Applications/JobAndEducation';
import Financial from 'pages/commons/Applications/Financial';
import Review from 'pages/commons/Applications/Review/index';
import utils from 'utils';
import { useHistory, useParams } from 'react-router';
import { useApplicationContext } from 'pages/commons/Applications/providers/ApplicationProvider';
import { useCheckApplicationField } from 'pages/commons/Applications/hooks';

const Application = (props) => {
  const { type } = props.match.params;
  const history = useHistory();
  const [showVerif, setShowVerif] = useState(false);

  const { partner } = useParams();
  const { isFieldDisabled } = useCheckApplicationField(partner);
  const { getDropdownLists, getBankList, getAllSettings } =
    useApplicationContext();

  const setShowVerifAndFetch = (value) => {
    setShowVerif(value);
  };

  const fetchCommons = async () => {
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
      const tempPartner =
        responseHomeScreen?.content?.applications?.[0]?.partner_name;

      const isPartnerValid = whitelistedPartner.includes(tempPartner);

      if (!tempPartner || !isPartnerValid) {
        return history.replace(`/paylater/application/personal_identity`);
      }

      if (tempPartner !== partner) {
        return history.replace(`/${tempPartner}/application/personal_identity`);
      }
    }
  };

  useEffect(() => {
    fetchCommons();
  }, []);

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
          {type === 'personal_identity' && (
            <PersonalIdentity
              showVerif={showVerif}
              setShowVerif={setShowVerifAndFetch}
            />
          )}
          {type === 'family_information' && <FamilyInformation />}
          {type === 'job_and_education' && <JobAndEducation />}
          {type === 'financial' && <Financial />}
          {type === 'review' && (
            <Review showVerif={showVerif} setShowVerif={setShowVerifAndFetch} />
          )}
        </Wrapper>
      </Container>
    </Main>
  );
};
Application.propTypes = {
  match: PropTypes.object,
};

export default Application;
