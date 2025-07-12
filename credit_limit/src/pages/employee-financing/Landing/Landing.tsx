import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { cx } from '@emotion/css';
import Layout from 'components/Layout';

import { LandingWrapper } from './styles';
import { Button, Img } from 'assets/css/styled';
import {
  color as colorText,
  fontSize,
  fontWeight,
  padding,
} from 'assets/css/stylesValue';
import JuloLogo from 'assets/img/logo/julo-logo-white.svg';
import HandBackground from 'assets/img/background/bg-hand-financing.png';
import { useQueryParams } from 'utils/RouteHelper';
import { parseJwt } from 'utils/Parse';
import store from 'utils/Store';
import ValidationWrapper from '../components/ValidationWrapper';

/**
 * Route: /ef-pilot/:type(application|disbursment)
 * Access: Public
 */
const Landing = () => {
  const history = useHistory();
  const { type }: { type: 'application' | 'disbursement' } = useParams();
  const query = useQueryParams();
  const token = query.get('token');

  const handleToken = () => {
    if (token) {
      const email: string = parseJwt(token).email;
      store.set('email', email);
      store.set('token', token);
    }
  };

  const handleOnClick = () => {
    if (type === 'application') {
      return history.replace('/ef-pilot/application/personal_identity');
    }
    history.replace('/ef-pilot/disbursement/loan');
  };

  useEffect(() => {
    if (token) {
      store.set('type', type);
      handleToken();
    }
  }, [token]);

  return (
    <ValidationWrapper>
      <Layout
        hideNavbar={true}
        hideBarBack={true}
        layoutContainer={{
          padding: '0px',
        }}
      >
        <LandingWrapper>
          <Img width='14rem' alignSelf='center' src={JuloLogo} />
          <p
            className={cx(
              fontSize(24),
              fontWeight('bold'),
              colorText('#FFFFFF'),
              padding('0 4rem'),
            )}
          >
            Employee Financing Program
          </p>

          <Img alignSelf='center' width={'100%'} src={HandBackground} />
          <Button
            onClick={handleOnClick}
            alignSelf='center'
            width='10rem'
            color='#00ACF0'
            backgroundColor='white'
          >
            Isi Formulir
          </Button>
        </LandingWrapper>
      </Layout>
    </ValidationWrapper>
  );
};

export default Landing;
