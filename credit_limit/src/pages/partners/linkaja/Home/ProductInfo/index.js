import React from 'react';
import PropTypes from 'prop-types';
import { cx } from '@emotion/css';
import { useTheme } from '@emotion/react';
import { useHistory } from 'react-router';

import { cardCase } from 'constant';

import { actionItemMenu } from './styles';
import { Col, Div, Img, Row } from 'assets/css/styled';
import {
  breakWord,
  cursorPointer,
  dInlineFlex,
  fontNormal,
  mb4,
  positionAbsolute,
  positionRelative,
  py2,
} from 'assets/css/stylesFix';
import { text, transition, translate } from 'assets/css/stylesValue';

import iconLocked from 'assets/img/icon/ic-locked.svg';

const ProductInfo = ({
  showDialogInfo,
  setDialogData,
  setShowDialogInfo,
  userData,
}) => {
  const history = useHistory();
  const theme = useTheme();
  const themeText = theme?.text;

  const handleClickMenu = (value) => {
    const tempCardCase = cardCase('webpage');
    switch (value?.code) {
      case 1: // Tarik Dana
        history.push('transactions');
        break;

      default:
        setDialogData(tempCardCase);
        setShowDialogInfo(!showDialogInfo);
        break;
    }
  };

  return (
    <Row className={mb4}>
      {userData?.product &&
        userData?.product?.map((item, index) => (
          <Col
            xs='3'
            sm='3'
            key={index}
            className={cx(
              {
                [actionItemMenu]: !item.is_locked,
              },
              cursorPointer,
              text({ align: 'center' }),
              transition('all 0.3s'),
              py2,
            )}
            onClick={() => !item.is_locked && handleClickMenu(item)}
          >
            <Div className={cx(dInlineFlex, positionRelative)}>
              <Div className={cx(positionRelative)}>
                {item.background_icon && (
                  <Img
                    className={cx(positionAbsolute)}
                    src={item.background_icon}
                    width='50'
                    height='50'
                  />
                )}
                <Img
                  className={cx(positionRelative)}
                  src={item.foreground_icon}
                  width='50'
                  height='50'
                />
              </Div>
              {item.is_locked && (
                <Img
                  src={iconLocked}
                  width='20'
                  height='20'
                  className={cx(positionAbsolute, translate('160%', '-25%'))}
                />
              )}
            </Div>
            <Div
              className={cx(
                breakWord,
                fontNormal,
                text({ size: 14, color: themeText?.primary, weight: 'bold' }),
              )}
            >
              {item.name}
            </Div>
          </Col>
        ))}
    </Row>
  );
};

ProductInfo.propTypes = {
  disabled: PropTypes.bool,
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
