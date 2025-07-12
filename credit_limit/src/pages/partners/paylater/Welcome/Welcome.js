import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import JuloLogo from 'assets/img/paylater/julo-logo.svg';
import CicilanRinganImage from 'assets/img/paylater/cicilan-ringan.svg';
import AmanPakaiJuloImage from 'assets/img/paylater/aman-pakai-julo.svg';
import PakaiKapanpunButuhImage from 'assets/img/paylater/pakai-kapanpun-butuh.svg';

import { cx } from '@emotion/css';
import { useTheme } from '@emotion/react';

import utils from 'utils';
import Analytics from 'utils/Analytics/Analytics';

import { useUserContext } from 'providers/UserProvider';

import { Img, Div, Button } from 'assets/css/styled';
import { text, padding, minHeight, fontSize } from 'assets/css/stylesValue';
import {
  justifyBetween,
  py4,
  pb4,
  py5,
  borderNone,
  dFlex,
  justifyCenter,
  alignCenter,
  mb4,
  px5,
  flexColumn,
  mb3,
  p4,
  textCenter,
} from 'assets/css/stylesFix';

function Welcome() {
  const theme = useTheme();
  const { handleNotification } = useUserContext();

  const getLocation = () => {
    utils.commons.askLocationAccess(
      (allow) => {
        // if allow
        utils.store.set('latitude', allow.coords.latitude);
        utils.store.set('longitude', allow.coords.longitude);
      },
      () => {
        // if block

        handleNotification({
          isOpen: true,
          message:
            'Mohon ijinkan akses lokasi untuk dapat mengakses website JULO',
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
          message:
            'Mohon ijinkan akses lokasi untuk dapat mengakses website JULO',
        });
      }
      result.onchange = function () {
        if (result.state == 'granted') {
          Analytics.logEvent({
            title: 'sign_up',
            eventName: 'location_permission_granted',
          });
        }
      };
    });
  };

  useEffect(() => {
    permissionGeolocation();
  }, []);

  const SectionComponent = ({ picture, title, description }) => {
    return (
      <Div className={cx(dFlex, mb3)}>
        <Div className={cx(dFlex, justifyCenter)} flexBasis='25%'>
          <Img src={picture} width='70px' />
        </Div>
        <Div className={cx(dFlex, justifyCenter, flexColumn)} flexBasis='75%'>
          <Div
            className={cx(
              text({
                color: '#5E5E5E',
                size: 18,
                weight: '700',
              }),
              dFlex
            )}
          >
            {title}
          </Div>
          <Div
            className={cx(
              text({
                color: '#5E5E5E',
                size: 11,
              }),
              dFlex
            )}
          >
            {description}
          </Div>
        </Div>
      </Div>
    );
  };

  return (
    <Div
      className={cx(
        `welcome-body`,
        dFlex,
        flexColumn,
        alignCenter,
        justifyBetween
      )}
    >
      <Div
        className={cx(dFlex, alignCenter)}
        padding='30px 50px 30px 50px'
        minHeight='550px'
      >
        <Div
          className={cx(dFlex, justifyCenter, flexColumn, alignCenter, p4)}
          backgroundColor='#FFF'
          borderRadius='20px'
        >
          <Img src={JuloLogo} width='50%' className={py5} />
          <Div
            className={cx(
              text({
                color: '#5E5E5E',
                size: 22,
                weight: 800,
              }),
              dFlex,
              textCenter,
              pb4
            )}
          >
            Aplikasi Kredit Digital Cepat Cair dan Aman
          </Div>
          <Button
            fluid
            className={cx(
              borderNone,
              padding('11px'),
              minHeight(48),
              fontSize(16)
            )}
          >
            Daftar Sekarang
          </Button>
        </Div>
      </Div>
      <Div
        minHeight='350px'
        backgroundColor='#FFF'
        width='100%'
        borderRadius='20px 20px 0px 0px'
        className={cx(dFlex, px5, py4, flexColumn)}
      >
        <Div
          className={cx(
            text({
              color: theme?.text?.blue,
              size: 22,
              weight: '700',
            }),
            dFlex,
            justifyCenter,
            alignCenter,
            mb4
          )}
        >
          Mengapa memilih JULO?
        </Div>

        <SectionComponent
          picture={CicilanRinganImage}
          title='Cicilan Ringan'
          description={
            'Bisa dicicil s/d 9 bulan, pakai limit sekarang bayarnya bisa nanti'
          }
        />
        <SectionComponent
          picture={PakaiKapanpunButuhImage}
          title='Pakai Kapanpun Butuh'
          description={
            'Dapat limit sekarang, pakai di mana pun dan kapan pun butuh dana darurat!'
          }
        />
        <SectionComponent
          picture={AmanPakaiJuloImage}
          title='Aman Pakai JULO'
          description={
            'Pakai limit kredit tanpa khawatir, JULO Kredit Digital berizin dan diawasi OJK'
          }
        />
      </Div>
    </Div>
  );
}

export default withRouter(Welcome);
