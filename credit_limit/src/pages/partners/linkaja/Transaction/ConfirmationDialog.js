import React, { useState } from 'react';
import PropTypes from 'prop-types';
import formatMoney from '@julofinance/web-helpers/dist/string/formatMoney';
import { useTheme } from '@emotion/react';

import { Button, Card, Col, Row, Wrapper } from 'assets/css/styled';
import {
  cursorPointer,
  dFlex,
  mb3,
  overflowYAuto,
  positionAbsolute,
  positionRelative,
  translateCenter,
  textCenter,
  boxShadowThin,
  w100,
  borderNone,
  borderRadiusBottomNone,
  justifyCenter,
} from 'assets/css/stylesFix';
import {
  background,
  borderBottom,
  borderRadiusAll,
  bottom,
  color,
  fontSize,
  fontWeight,
  height,
  minHeight,
  padding,
  transition,
  widthHeight,
  zIndex,
} from 'assets/css/stylesValue';

import Dialog from 'components/Dialog';

import { overflowHidden } from 'assets/css/stylesFix';
import { px0 } from 'assets/css/stylesFix';
import { h100 } from 'assets/css/stylesFix';
import { text } from 'assets/css/stylesValue';

import { pb3 } from 'assets/css/stylesFix';

const ConfirmationPopUp = (props) => {
  const { transactionDetail, handleShowDialog, showDialog, onSubmit } = props;
  const theme = useTheme();
  const [isScrollFormDialog, setIsScrollFormDialog] = useState(false);

  const handleScrollFormDialog = (value) => {
    if (value?.target.scrollTop > 30) {
      if (!isScrollFormDialog) {
        setIsScrollFormDialog(true);
      }
    } else {
      if (isScrollFormDialog) {
        setIsScrollFormDialog(false);
      }
    }
  };

  const handleClickCloseDialog = () => {
    handleShowDialog(false);
  };

  return (
    <Dialog
      withoutTemplate
      clickOutside={true}
      padding={`0px 0px 24px 0px`}
      margin={'0px'}
      position={'bottom'}
      getShow={handleShowDialog}
      show={showDialog}
      type={'form'}
    >
      <Wrapper className={`${overflowHidden} ${px0} ${zIndex(2000)}`}>
        <Card
          rounded
          paddingValue={`0px 0px 24px 0px`}
          className={`${h100} ${borderRadiusAll('25px 25px 0px 0px')} ${color(
            'inherit'
          )}`}
        >
          <div className={`${h100} ${positionRelative} ${overflowHidden}`}>
            <div
              className={`${textCenter} ${pb3} ${
                isScrollFormDialog && boxShadowThin
              } ${transition('box-shadow 0.3s')} ${borderBottom(
                `1px solid ${theme?.colors?.borderLight}`
              )}`}
            >
              <div // Button escape dialog form
                className={`${height(
                  '30px'
                )} ${positionRelative} ${cursorPointer}`}
                onClick={() => handleClickCloseDialog()}
              >
                <div
                  className={`${positionAbsolute} ${translateCenter} ${widthHeight(
                    '84px',
                    '3px'
                  )} ${background('#ddd')}`}
                />
              </div>
              <div
                className={`${color(theme?.text?.primary)} ${fontSize(
                  18
                )} ${fontWeight('bold')}`}
              >
                Konfirmasi Transaksi
              </div>
            </div>
            <div
              className={`${padding('24px 24px 65px 24px')} ${overflowYAuto}`}
              onScroll={handleScrollFormDialog}
            >
              <Row className={`${text({ size: 14, color: '#ababab' })}`}>
                <Col
                  xs='12'
                  sm='12'
                  className={`${text({
                    color: theme?.text?.primary,
                    weight: 'bold',
                  })} ${mb3}`}
                >
                  Informasi Transaksi
                </Col>
                <Col
                  xs='6'
                  sm='6'
                  className={`${text({ size: 14, color: '#ababab' })} ${mb3}`}
                >
                  Jumlah pinjaman
                </Col>
                <Col
                  xs='6'
                  sm='6'
                  className={`${text({
                    color: theme?.text?.primary,
                    size: 16,
                    align: 'right',
                  })} ${mb3}`}
                >
                  {formatMoney(transactionDetail?.loan_amount)}
                </Col>
                <Col
                  xs='6'
                  sm='6'
                  className={`${text({ size: 14, color: '#ababab' })} ${mb3}`}
                >
                  Jangka waktu
                </Col>
                <Col
                  xs='6'
                  sm='6'
                  className={`${text({
                    color: theme?.text?.primary,
                    size: 16,
                    align: 'right',
                  })} ${mb3}`}
                >
                  {transactionDetail?.duration} bulan
                </Col>
                <Col
                  xs='12'
                  sm='12'
                  className={`${text({
                    size: 14,
                    color: theme?.text?.primary,
                    weight: 'bold',
                  })} ${mb3}`}
                >
                  Limit Kredit
                </Col>
                <Col
                  xs='6'
                  sm='6'
                  className={`${text({ size: 14, color: '#ababab' })} ${mb3}`}
                >
                  Limit tersedia saat ini
                </Col>
                <Col
                  xs='6'
                  sm='6'
                  className={`${text({
                    color: theme?.text?.primary,
                    size: 16,
                    align: 'right',
                  })} ${mb3}`}
                >
                  {formatMoney(
                    transactionDetail?.loan_detail?.available_limit
                  )}
                </Col>
                <Col
                  xs='6'
                  sm='6'
                  className={`${text({ size: 14, color: '#ababab' })} ${mb3}`}
                >
                  Limit tersisa setelah transaksi
                </Col>
                <Col
                  xs='6'
                  sm='6'
                  className={`${text({
                    color: theme?.text?.primary,
                    size: 16,
                    align: 'right',
                  })} ${mb3}`}
                >
                  {formatMoney(
                    transactionDetail?.loan_detail
                      ?.available_limit_after_transaction
                  )}
                </Col>
              </Row>
            </div>
            <div
              className={`${w100} ${positionAbsolute} ${dFlex} ${justifyCenter} ${padding(
                `0px 24px`
              )} ${bottom('0px')} ${zIndex(2)}`}
            >
              <Button
                fluid
                className={`${borderRadiusBottomNone} ${borderNone} ${padding(
                  '11px'
                )} ${minHeight(48)} ${fontSize(16)}`}
                onClick={onSubmit}
              >
                Konfirmasi
              </Button>
            </div>
          </div>
        </Card>
      </Wrapper>
    </Dialog>
  );
};

ConfirmationPopUp.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  handleShowDialog: PropTypes.func.isRequired,
  showDialog: PropTypes.bool.isRequired,
  transactionDetail: PropTypes.object.isRequired,
};

export default ConfirmationPopUp;
