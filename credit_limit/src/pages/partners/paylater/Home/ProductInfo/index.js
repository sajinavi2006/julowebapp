import PropTypes from 'prop-types';
import { cx } from '@emotion/css';

import { cardCase } from 'constant';

import { actionItemMenu } from './styles';
import { Col, Row, Div } from 'assets/css/styled';
import {
  breakWord,
  cursorPointer,
  dInlineFlex,
  fontNormal,
  mb4,
  mt2,
  positionAbsolute,
  positionRelative,
  py2,
  textCenter,
} from 'assets/css/stylesFix';
import {
  color,
  fontSize,
  fontWeight,
  transition,
  translate,
} from 'assets/css/stylesValue';

import iconLocked from 'assets/img/icon/ic-locked.svg';

const ProductInfo = (props) => {
  const { userData, showDialogInfo, setDialogData, setShowDialogInfo } = props;

  const handleClickMenu = () => {
    const tempCardCase = cardCase('webpage');
    setDialogData(tempCardCase);
    setShowDialogInfo(!showDialogInfo);
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
              textCenter,
              py2,
              !item.is_locked && actionItemMenu,
              cursorPointer,
              transition('all 0.3s'),
            )}
            onClick={() => !item.is_locked && handleClickMenu()}
          >
            <Div className={cx(dInlineFlex, positionRelative)}>
              <Div className={cx(positionRelative)}>
                {item.background_icon && (
                  <img
                    className={cx(positionAbsolute)}
                    src={item.background_icon}
                    width='50'
                    height='50'
                  />
                )}
                <img
                  className={cx(positionRelative)}
                  src={item.foreground_icon}
                  width='50'
                  height='50'
                />
              </Div>
              {item.is_locked && (
                <img
                  src={iconLocked}
                  width='20'
                  height='20'
                  className={cx(positionAbsolute, translate('160%', '-25%'))}
                />
              )}
            </Div>
            <Div
              className={cx(
                mt2,
                breakWord,
                fontNormal,
                fontWeight('bold'),
                fontSize(14),
                color('#5e5e5e'),
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
