import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { UserContext } from '../../../../../../providers/UserProvider';

import { cardCase } from '../../../../../../../constant';

import { actionItemMenu } from './styles';
import { Card, Col, Row } from '../../../../../../../assets/css/styled';
import {
  alignCenter,
  boxShadowThick,
  boxShadowThin,
  breakWord,
  cursorPointer,
  dFlex,
  dInlineFlex,
  flexColumn,
  fontNormal,
  fontWeight600,
  justifyCenter,
  mt2,
  my4,
  positionAbsolute,
  positionRelative,
  py2,
  py4,
  textCenter,
} from '../../../../../../../assets/css/stylesFix';
import {
  backgroundImage,
  borderRadiusTop,
  color,
  fontSize,
  fontWeight,
  padding,
  transition,
  translate,
} from '../../../../../../../assets/css/stylesValue';

import bannerBFI from '../../../../../../assets/img/background/bg-bfi.jpg';

import iconLocked from '../../../../../../assets/img/icon/ic-locked.svg';
import iconBFI from '../../../../../../assets/img/icon/ic-bfi.png';

const ProductInfo = (props) => {
  const { datas } = useContext(UserContext);
  const { userData, showDialogInfo, setDialogData, setShowDialogInfo } = props;

  const handleClickMenu = () => {
    const tempCardCase = cardCase('webpage');
    setDialogData(tempCardCase);
    setShowDialogInfo(!showDialogInfo);
  };

  return datas.appStatus == '105' &&
    userData.creditInfo?.credit_score === 'C' ? (
    <Card rounded className={`${boxShadowThick} ${my4}`}>
      <div className={`${fontSize(14)} ${color('#5e5e5e')} ${fontWeight600}`}>
        Rekomendasi produk
      </div>
      <Row>
        <Col xs='12' sm='6'>
          <Card
            rounded
            padding='0px'
            className={`${boxShadowThin} ${mt2} ${dFlex} ${flexColumn} ${cursorPointer}`}
            onClick={() =>
              window.location.assign('https://kredit.bfi.co.id/julo/')
            }
          >
            <div
              className={`${dFlex} ${justifyCenter} ${alignCenter} ${backgroundImage(
                bannerBFI
              )} ${padding('40px 0px')} ${borderRadiusTop(5)}`}
            >
              <img src={iconBFI} width='42' height='26' />
            </div>
            <div className={`${padding('15px')}`}>
              <div
                className={`${fontSize(10)} ${fontWeight600} ${color(
                  '#5e5e5e'
                )}`}
              >
                BFI
              </div>
              <div className={`${fontSize(6)} ${color('#5e5e5e')}`}>
                Pinjaman dengan jaminan
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </Card>
  ) : (
    <Row className={`${py4}`}>
      {userData?.product &&
        userData?.product?.map((item, index) => (
          <Col
            xs='3'
            sm='3'
            key={index}
            className={`${textCenter} ${py2} ${
              !item.is_locked && actionItemMenu
            } ${cursorPointer} ${transition('all 0.3s')}`}
            onClick={() => !item.is_locked && handleClickMenu()}
          >
            <div className={`${dInlineFlex} ${positionRelative}`}>
              <div className={`${positionRelative}`}>
                {item.background_icon && (
                  <img
                    className={`${positionAbsolute}`}
                    src={item.background_icon}
                    width='50'
                    height='50'
                  />
                )}
                <img
                  className={`${positionRelative}`}
                  src={item.foreground_icon}
                  width='50'
                  height='50'
                />
              </div>
              {item.is_locked && (
                <img
                  src={iconLocked}
                  width='20'
                  height='20'
                  className={`${positionAbsolute} ${translate('160%', '-25%')}`}
                />
              )}
            </div>
            <div
              className={`${mt2} ${breakWord} ${fontNormal} ${fontWeight(
                'bold'
              )} ${fontSize(14)} ${color('#5e5e5e')}`}
            >
              {item.name}
            </div>
          </Col>
        ))}
    </Row>
  );
};

ProductInfo.propTypes = {
  userData: PropTypes.object,
  showDialogInfo: PropTypes.bool,
  setDialogData: PropTypes.func,
  setShowDialogInfo: PropTypes.func,
};

ProductInfo.defaultProps = {
  userData: {},
  showDialogInfo: false,
  setDialogData: () => {},
  setShowDialogInfo: () => {},
};

export default ProductInfo;
