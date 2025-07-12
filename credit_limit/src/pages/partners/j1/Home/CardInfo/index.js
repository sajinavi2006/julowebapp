import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import { cx } from '@emotion/css';

import { useUserContext } from 'providers/UserProvider';

import { cardCase } from 'constant';

import { cardHome } from './styles';
import { Button, Card, Col, Div, Row } from 'assets/css/styled';
import {
  alignCenter,
  alignFlexStart,
  boxShadowThin,
  cursorPointer,
  dFlex,
  flexColumn,
  fontNormal,
  h100,
  justifyBetween,
  justifyCenter,
  mb4,
  my3,
  p3,
  textWhite,
  w100,
} from 'assets/css/stylesFix';
import {
  borderRadiusAll,
  borderRadiusRight,
  color,
  flexGrow,
  fontSize,
  fontWeight,
} from 'assets/css/stylesValue';

const CardInfo = (props) => {
  const { datas } = useUserContext();
  const theme = useTheme();
  const { cardInfo, setDialogData, setShowDialogInfo } = props;
  const history = useHistory();

  const handleClickInfoCard = (value) => {
    const { type, destination } = value;

    if (type === 'webpage') {
      window.location.assign(destination);
    }
  };

  const cardInfoButtonColor = (item) => {
    if (item.textcolour) {
      return item.textcolour;
    } else if (!item.background_img) {
      return '#5e5e5e';
    } else {
      return '';
    }
  };

  const handleClickButtonCardInfo = (value) => {
    if (value?.action_type === 'webpage') {
      window.open(value?.destination);
    } else if (value?.action_type == 'redirect') {
      history.push(`/${datas?.partner}/${value.destination}`);
    } else if (
      datas.appStatus == '190' &&
      value?.destination !== 'reapply_j1' &&
      value?.destination !== 'j1_appl_docs' &&
      value?.destination !== 'appl_main' &&
      value?.destination !== 'appl_docs'
    ) {
      const tempCardCase = cardCase('webpage');
      setDialogData(tempCardCase);
      setShowDialogInfo(true);
    } else if (datas.appStatus == '106') {
      const tempCardCase = cardCase('webpage');
      setDialogData(tempCardCase);
      setShowDialogInfo(true);
    } else if (
      datas.appStatus == '135' &&
      datas.homeScreenInfo.customers[0].can_reapply
    ) {
      const tempCardCase = cardCase('webpage');
      setDialogData(tempCardCase);
      setShowDialogInfo(true);
    } else if (datas.appStatus == '137') {
      const tempCardCase = cardCase('webpage');
      setDialogData(tempCardCase);
      setShowDialogInfo(true);
    } else if (datas.appStatus == '139') {
      const tempCardCase = cardCase('webpage');
      setDialogData(tempCardCase);
      setShowDialogInfo(true);
    } else if (datas.appStatus == '131') {
      const tempCardCase = cardCase('131');
      setDialogData(tempCardCase);
      setShowDialogInfo(true);
    } else {
      const tempCardCase = cardCase(value?.destination);
      setDialogData(tempCardCase);
      setShowDialogInfo(true);
    }
  };

  if (!cardInfo?.cards) {
    return null;
  }

  return (
    cardInfo?.cards &&
    cardInfo?.cards.map((item, index) => (
      <Card
        padding='0px'
        position='relative'
        key={index}
        isOnlyText={!item.image_icn || item?.type !== '1'}
        className={cx(
          {
            [cursorPointer]:
              item?.card_action_destination &&
              item.card_action_type === 'webpage',
            [alignFlexStart]: item.image_icn || item?.type === '1',
          },
          mb4,
          dFlex,
          boxShadowThin,
          alignCenter,
          cardHome
        )}
        onClick={() =>
          handleClickInfoCard({
            type: item.card_action_type,
            destination: item.card_action_destination,
          })
        }
      >
        {item?.background_img ? (
          <img
            className={cx(w100, h100, borderRadiusAll('5px'))}
            src={item?.background_img}
          />
        ) : null}
        <Div height='100%' width='100%' padding='1rem' position='absolute'>
          <Row className={`${h100} ${flexGrow(2)}`}>
            {item?.image_icn || item?.type === '1' ? (
              <Col
                xs='6'
                sm='6'
                className={`${p3} ${dFlex} ${justifyCenter} ${alignCenter} ${borderRadiusRight(
                  10
                )}`}
              >
                {item?.image_icn && (
                  <img src={item?.image_icn} width='80%' height='auto' />
                )}
              </Col>
            ) : null}

            <Col
              xs={`${item?.image_icn || item?.type === '1' ? '6' : '12'}`}
              sm={`${item?.image_icn || item?.type === '1' ? '6' : '12'}`}
              className={`${textWhite} ${dFlex} ${flexColumn} ${
                item?.type === '2' ? justifyCenter : justifyBetween
              }`}
            >
              <div>
                <div
                  className={`${fontNormal} ${color(
                    item?.title?.colour || theme?.text?.primary
                  )} ${fontSize(16)} ${fontWeight('bold')}`}
                >
                  {item?.title?.text}
                </div>
                <div
                  className={`${fontNormal} ${my3} ${color(
                    item?.content?.colour || theme?.text?.primary
                  )} ${fontSize(cardInfo.message?.size || 14)}`}
                >
                  {item?.content?.text}
                </div>
              </div>
              <div className={`${dFlex}`}>
                {item?.button?.length
                  ? item?.button?.map((item, index) => (
                      <div key={index} className={`${w100}`}>
                        <Button
                          fluid
                          backgroundImage={item.background_img}
                          background={item.colour}
                          backgroundSize={'cover'}
                          backgroundPosition={'center'}
                          color={`${cardInfoButtonColor(item)}`}
                          className={`${fontSize(14)}`}
                          onClick={() => handleClickButtonCardInfo(item)}
                        >
                          {item?.text}
                        </Button>
                      </div>
                    ))
                  : null}
              </div>
            </Col>
          </Row>
        </Div>
      </Card>
    ))
  );
};

CardInfo.propTypes = {
  cardInfo: PropTypes.object,
  setDialogData: PropTypes.func,
  setShowDialogInfo: PropTypes.func,
};

CardInfo.defaultProps = {
  cardInfo: {},
  setDialogData: () => {},
  setShowDialogInfo: () => {},
};

export default CardInfo;
