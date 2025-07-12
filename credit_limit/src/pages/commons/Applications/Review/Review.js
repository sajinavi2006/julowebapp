import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Checkbox } from '@material-ui/core';
import PropTypes from 'prop-types';

import { Button } from 'assets/css/styled';
import { ButtonFloatingSmall, Row, Col, Div } from 'assets/css/styled';
import PersonalIdentity from '../PersonalIdentity';
import FamilyInformation from '../FamilyInformation';
import JobAndEducation from '../JobAndEducation';
import Financial from '../Financial';
import TandCDialog from 'components/Dialog/TandCDialog';
import {
  schemaPersonalIdentity,
  schemaFamilyInformation,
  schemaJobAndEducation,
  schemaFinancialValidation,
} from '../validator';

import useGlobalState from 'actions';
import utils from 'utils';

import { useApplicationContext } from '../providers/ApplicationProvider';
import { useApplicationSubmissionResolver } from '../hooks';
import { useUserContext } from 'providers/UserProvider';
import { checkRegisteredUser } from 'services/partner/common/partnership';

function Review() {
  const { handleLoadingOverlay, handleNotification } = useUserContext();
  const [isAgree, setIsAgree] = useState(false);
  const [isReadTerm, setIsReadTerm] = useState(false);
  const { longFormData, isLoaded } = useApplicationContext();
  const history = useHistory();
  const { partner } = useParams();
  const { submitForm } = useApplicationSubmissionResolver(partner);
  const [state, actions] = useGlobalState();
  const bottomPage = useRef(null);

  const handleCheckRegisteredUser = async () => {
    handleLoadingOverlay(true);

    try {
      const result = await checkRegisteredUser();
      if (result) {
        const isVerifyPin = result.data?.verify_pin_j1;
        if (isVerifyPin) {
          // go to pin confirmation page and will get longform data there
          return history.push('/linkaja/pin-form');
        }
        submitForm();
        handleLoadingOverlay(false);
      }
    } catch (error) {
      handleLoadingOverlay(false);
      handleNotification({
        isOpen: true,
        message: error?.response?.data?.errors?.[0],
      });
    }
  };

  const checkLongformValidation = async (data) => {
    if (data.ktp) {
      try {
        const isPersonalIdentityValid = await schemaPersonalIdentity.isValid(
          data,
        );
        if (!isPersonalIdentityValid)
          return history.push(`/${partner}/application/personal_identity`);

        const isFamilyInformationValid = await schemaFamilyInformation.isValid(
          data,
          {
            context: {
              close_kin_name: data.marital_status !== 'Menikah',
              spouse_name: data.marital_status === 'Menikah',
              mobile_phone_1: data.mobile_phone_1,
              mobile_phone_2: data.mobile_phone_2,
            },
          },
        );
        if (!isFamilyInformationValid)
          return history.push(`/${partner}/application/family_information`);

        const isJobInformationValid = await schemaJobAndEducation.isValid(data);
        if (!isJobInformationValid)
          return history.push(`/${partner}/application/job_and_education`);

        const isFinancialValid = await schemaFinancialValidation.isValid(data);
        if (!isFinancialValid)
          return history.push(`/${partner}/application/financial`);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    } else {
      history.push(`/${partner}/application/personal_identity`);
    }
  };

  const getLocation = () => {
    utils.commons.askLocationAccess(
      (allow) => {
        // if allow
        utils.store.set('latitude', allow.coords.latitude);
        utils.store.set('longitude', allow.coords.longitude);

        submitForm({
          longitude: allow.coords.longitude,
          latitude: allow.coords.latitude,
        });
      },
      () => {
        // if block
        handleNotification({
          isOpen: true,
          message: 'Mohon ijinkan akses lokasi untuk dapat mengakses website JULO',
        });
      }
    );
  };

  const permissionGeolocation = () => {
    navigator.permissions?.query({ name: 'geolocation' }).then((result) => {
      if (result.state == 'granted' || result.state == 'prompt') {
        getLocation();
      } else if (result.state == 'denied') {
        // if block
        handleNotification({
          isOpen: true,
          message: 'Mohon ijinkan akses lokasi untuk dapat mengirim formulir',
        });
      }
      result.onchange = function () {
        if (result.state == 'granted') {
          Analytics.logEvent({
            title: 'sign_in',
            eventName: 'location_permission_granted',
          });
        }
      };
    });
  };

  const checkPartner = () => {
    switch (partner) {
      case 'linkaja':
        handleCheckRegisteredUser();
        break;
      case 'klop':
        permissionGeolocation();
        break;
      default:
        submitForm();
        break;
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    actions.closeLoadingOverlay();
  }, []);

  useEffect(() => {
    if (isLoaded && longFormData) {
      checkLongformValidation(longFormData);
    }
  }, [longFormData, isLoaded]);

  return (
    <Fragment>
      <Row>
        <Col
          xs='12'
          marginTop='62px !important'
          backgroundColor='#1ea7e9'
          padding='0 15px'
          className='registration-title bg-main'
        >
          <span className='registration-title__txt'>Review</span>
          <p>Pengisian datamu hampir selesai! yuk selesaikan sekarang!</p>
        </Col>
      </Row>
      <PersonalIdentity isReview />
      <FamilyInformation isReview />
      <JobAndEducation isReview />
      <Financial isReview={true} />
      <Row marginTop='25px' ref={bottomPage} data-testid='checkboxes'>
        <Col xs='12'>
          <Div display='flex' alignItems='center'>
            <Checkbox
              checked={isReadTerm}
              onChange={(e) => {
                setIsReadTerm(e.target.checked);
                if (e.target.checked) {
                  actions.setState('isTandCDialogOpen', true);
                }
              }}
            />
            <span>
              Saya telah membaca dan menyetujui Syarat & Ketentuan dan Kebijakan
              Privasi JULO
            </span>
          </Div>
          <Div display='flex' alignItems='center'>
            <Checkbox
              checked={isAgree}
              onChange={(e) => {
                setIsAgree(e.target.checked);
              }}
            />
            <span>
              Saya setuju dengan pemeriksaan dan validasi data pribadi saya.
            </span>
          </Div>
        </Col>

        <Col
          xs='12'
          marginTop='5px'
          alignItems='flex-end'
          display='flex'
          paddingBottom='15px'
        >
          <Button fluid disabled={!isReadTerm || !isAgree}>
            <Div
              width='100%'
              onClick={() => isReadTerm && isAgree && checkPartner()}
            >
              Kirim Formulir
            </Div>
          </Button>
        </Col>

        <ButtonFloatingSmall
          onClick={() => {
            bottomPage.current.scrollIntoView({
              behavior: 'smooth',
            });
          }}
        >
          <div className='floatingButtonText'>^</div>
        </ButtonFloatingSmall>
      </Row>

      {state.isTandCDialogOpen && (
        <TandCDialog
          open={state.isTandCDialogOpen}
          onCancel={() => setIsReadTerm(false)}
        />
      )}
    </Fragment>
  );
}

Review.propTypes = {
  isReview: PropTypes.bool,
};

export default Review;
