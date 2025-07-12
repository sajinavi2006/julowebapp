import React from 'react';
import PropTypes from 'prop-types';
import { cx } from '@emotion/css';
import formatMoney from '@julofinance/web-helpers/dist/string/formatMoney';

import { cardHome } from './styles';
import { Card } from 'assets/css/styled';
import {
  dFlex,
  flexColumn,
  fontNormal,
  h100,
  justifyBetween,
  justifyEvenly,
  mb4,
  mt5,
  textCenter,
  textRight,
  textUppercase,
  textWhite,
} from 'assets/css/stylesFix';
import {
  fontSize,
  fontStyle,
  fontWeight,
  opacity,
  padding,
  width,
} from 'assets/css/stylesValue';

import bannerActiveUserInfo from 'assets/img/background/bg-banner_active.jpg';
import bannerInActiveUserInfo from 'assets/img/background/bg-banner_inactive.jpg';

import logoOnly from 'assets/img/logo/logo-only.svg';

const USER_INFO = {
  active: {
    banner: bannerActiveUserInfo,
  },
  inActive: {
    banner: bannerInActiveUserInfo,
  },
};

const CreditInfo = (props) => {
  const { isUserActive, userData } = props;

  const limitMessage = userData?.creditInfo?.limit_message;

  return (
    <Card
      rounded
      padding={`24px 24px ${isUserActive ? '24px' : '150px'} 24px`}
      backgroundImage={`${
        isUserActive ? USER_INFO.active.banner : USER_INFO.inActive.banner
      }`}
      className={cx(cardHome, mb4)}
    >
      {isUserActive ? (
        <div className={`${dFlex} ${flexColumn} ${justifyBetween} ${h100}`}>
          <div className={`${dFlex} ${justifyBetween} ${textWhite}`}>
            <div>
              <div className={`${fontNormal} ${textUppercase} ${fontSize(18)}`}>
                {userData?.creditInfo?.fullname}
              </div>
              <div className={`${fontNormal} ${opacity(0.85)} ${fontSize(14)}`}>
                Limit total {formatMoney(userData?.creditInfo?.set_limit)}
              </div>
            </div>
            <div className={`${textCenter} ${width('40px')}`}>
              <img src={logoOnly} width='25' />
            </div>
          </div>
          <div className={`${dFlex} ${justifyBetween} ${textWhite} ${mt5}`}>
            <div>
              <div className={`${fontNormal} ${opacity(0.85)} ${fontSize(14)}`}>
                Limit tersedia
              </div>
              <div
                className={`${fontNormal} ${fontWeight('bold')} ${fontSize(
                  18
                )}`}
              >
                {formatMoney(userData?.creditInfo?.available_limit)}
              </div>
            </div>
            <div
              className={`${fontNormal} ${dFlex} ${flexColumn} ${justifyEvenly}`}
            >
              <div className={`${opacity(0.85)} ${fontSize(12)} ${textRight}`}>
                Terpakai
              </div>
              <div className={`${fontNormal} ${fontSize(14)} ${textRight}`}>
                {formatMoney(userData?.creditInfo?.used_limit)}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className={`${dFlex} ${justifyBetween} ${textWhite}`}>
            <div className={`${fontNormal} ${textUppercase} ${fontSize(18)}`}>
              {userData?.creditInfo?.fullname}
            </div>
            <div className={`${textCenter} ${width('40px')}`}>
              <img src={logoOnly} width='25' />
            </div>
          </div>
          <div
            className={cx(
              textWhite,
              padding('50px 0px 0px 0px'),
              fontSize(18),
              fontStyle('italic')
            )}
          >
            {limitMessage
              ? limitMessage
              : 'Pengajuan kredit JULO sedang dalam proses'}
          </div>
        </>
      )}
    </Card>
  );
};

CreditInfo.propTypes = {
  isUserActive: PropTypes.bool,
  userData: PropTypes.object,
};

CreditInfo.defaultProps = {
  isUserActive: false,
  userData: {},
};

export default CreditInfo;
