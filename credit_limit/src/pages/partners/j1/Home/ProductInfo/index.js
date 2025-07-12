import PropTypes from 'prop-types';

import { cardCase } from 'constant';

import { actionItemMenu } from './styles';
import { Col, Row } from 'assets/css/styled';
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
      {userData.product?.map((item, index) => (
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
              'bold',
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
  setDialogData: () => { },
  setShowDialogInfo: () => { },
};

export default ProductInfo;
