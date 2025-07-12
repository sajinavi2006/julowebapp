import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useTheme } from '@emotion/react';
import { cx } from '@emotion/css';
import { useUserContext } from 'providers/UserProvider';
import ConfirmationPopUp from './ConfirmationDialog';
import formatMoney from '@julofinance/web-helpers/dist/string/formatMoney';
import Layout from 'components/Layout';
import utils from 'utils';


import LoaderText from 'components/LoaderText';

import {
  Col,
  Div,
  Row,
  Wrapper,
  Button,
  ButtonOutline,
  Card,
} from 'assets/css/styled';

import {
  mb3,
  mb4,
  ml2,
  dFlex,
  justifyCenter,
  alignCenter,
  mb2,
  w100,
  positionAbsolute,
  borderNone,
  justifyBetween,
} from 'assets/css/stylesFix';
import {
  text,
  fontSize,
  bottom,
  zIndex,
  padding,
  minHeight,
  backgroundColor,
  marginBottom,
} from 'assets/css/stylesValue';

import { content } from './styles';

import { listProduct, loanOffer } from 'services/partner/paylater';

const Transaction = () => {
  const theme = useTheme();

  const history = useHistory();
  const {
    savePreTransactionData,
    transactionData,
    handleNotification,
    handleLoadingOverlay,
    datas,
  } = useUserContext();

  const [loanList, setLoanList] = useState({});
  const [productResponse, setProductResponse] = useState({});
  const [monthResponse, setMonthResponse] = useState([]);
  const [isLoadingVerifyLoan, setIsLoadingVerifyLoan] = useState(false);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);

  const { transactionXid, applicationXid } = datas;

  const loanXid = transactionData?.loan_xid || utils.store.get('loanXid');

  const fetchListProduct = async () => {
    try {
      handleLoadingOverlay(true);
      const response = await listProduct(transactionXid, applicationXid);
      if (response.success) {
        const data = response.data;
        setProductResponse(data);
      }
    } catch (error) {
      const errorData = error.response.data || {};
      const errMessage = errorData.detail;
      handleNotification({
        isOpen: true,
        message: errMessage,
      });
    } finally {
      handleLoadingOverlay(false);
    }
  };

  const fetchLoanOfferHandler = async () => {
    try {
      handleLoadingOverlay(true);
      setIsLoadingVerifyLoan(true);

      const response = await loanOffer({
        loan_amount_request: productResponse.cart_amount,
        application_xid: applicationXid,
        paylater_transaction_xid: transactionXid,
      });

      if (response.success) {
        const data = response.data;
        setMonthResponse(data.loan_duration);
      } else {
        handleNotification({
          isOpen: true,
          message: response?.errors[0],
        });
      }
    } catch (error) {
      const errorData = error.response.data || {};
      const errMessage = errorData.detail;
      if (
        errorData.errors[0].length &&
        errorData.errors[0] === 'Limit Kamu Tidak Mencukupi'
      ) {
        return history.replace('/paylater/insufficient-balance');
      }

      handleNotification({
        isOpen: true,
        message: errMessage,
      });
    } finally {
      handleLoadingOverlay(false);
      setIsLoadingVerifyLoan(false);
    }
  };

  // Handle Click Time Period
  const handleClickTimePeriod = (key) => {
    setLoanList(monthResponse[key]);
  };

  useEffect(() => {
    if (loanXid) {
      return history.replace('/paylater/agreement-summaries');
    }

    // Fetching list product
    fetchListProduct();
  }, []);

  useEffect(() => {
    // Fetching list product
    if (productResponse.cart_amount) fetchLoanOfferHandler();
  }, [productResponse]);

  useEffect(() => {
    // IF MONTH DURATION NOT NULL
    const monthResult =
      monthResponse.find((x) => x.duration === loanList.duration) || {};

    if (monthResult)
      setLoanList((prevState) => ({
        ...prevState,
        loan_detail: monthResult,
      }));
  }, [monthResponse]);

  const handleConfirmationSubmit = () => {
    const payload = {
      application_id: applicationXid,
      paylater_transaction_xid: transactionXid,
      loan_amount_request: loanList?.loan_amount,
      loan_duration: loanList?.duration,
      loan_purpose: loanList?.loan_purpose,
    };

    savePreTransactionData({
      ...payload,
      transaction_amount: productResponse.transaction_amount,
    });
    history.push('/paylater/pin-transaction', { from: 'transaction' });
  };

  const handleShowDialog = (e) => {
    setShowConfirmationDialog(e);
  };

  // Render Button with flagging active
  const renderButton = (key, item) => {
    const parameters = {
      borderRadius: '8px',
      theme: theme,
      className: `${cx(text({ size: 14, weight: 600 }), mb2)}`,
    };

    if (item.duration === loanList.duration)
      return (
        <Button
          key={key}
          fluid
          type='gradient'
          onClick={() => handleClickTimePeriod(key)}
          {...parameters}
        >
          {item.duration} Bulan
        </Button>
      );
    else
      return (
        <ButtonOutline
          key={key}
          type='primary'
          fluid
          color={theme?.text?.primary}
          onClick={() => handleClickTimePeriod(key)}
          {...parameters}
        >
          {item.duration} Bulan
        </ButtonOutline>
      );
  };

  return (
    <Layout
      barBackTitle={'Pembayaran'}
      barBackType='primary'
      layoutContainer={{
        padding: '0px',
        height: 'inherit',
      }}
    >
      <Div className={`${content}`}>
        <Wrapper backgroundColor={'#fbfdff'}>
          {productResponse.product_details?.map((item, key) => (
            <Row
              key={key}
              className={cx(
                dFlex,
                justifyBetween,
                padding('0em 1em'),
                marginBottom('1em'),
              )}
            >
              <Col xs='4'>
                <Div
                  className={`${text({
                    color: theme?.text?.primary,
                    size: 12,
                  })}`}
                >
                  Nama Barang
                </Div>
              </Col>
              <Col xs='8' textAlign='right'>
                <Div
                  className={`${text({
                    color: theme?.text?.primary,
                    size: 12,
                  })}`}
                >
                  {item.product_name}
                </Div>
              </Col>
              <Col xs='4'>
                <Div
                  className={`${text({
                    color: theme?.text?.greyLight,
                    size: 12,
                  })}`}
                >
                  Jumlah Barang
                </Div>
              </Col>

              <Col xs='8' textAlign='right'>
                <Div
                  className={`${text({
                    color: theme?.text?.primary,
                    size: 12,
                  })}`}
                >
                  {item.product_qty}
                </Div>
              </Col>
            </Row>
          ))}

          <Div
            className={cx(
              fontSize(16),
              backgroundColor(theme.colors?.greyLight),
              padding('0.5em 1em'),
              marginBottom('1em'),
              dFlex,
              justifyBetween,
              alignCenter,
              mb4,
            )}
          >
            <Div
              className={`${text({
                color: theme?.text?.primary,
                size: 12,
                weight: 600,
              })}`}
            >
              Subtotal
            </Div>
            <Div
              className={`${text({
                color: theme?.text?.primary,
                size: 16,
                weight: 'bold',
              })}`}
            >
              Rp. {formatMoney(productResponse.cart_amount, false)}
            </Div>
          </Div>
        </Wrapper>

        <Wrapper>
          {/* JANGKA WAKTU */}
          <Row className={`${mb4}`} justifyContent='space-between'>
            <Col xs='4' sm='4' display='flex' alignItems='center'>
              <Div
                className={`${text({
                  color: theme?.text?.primary,
                  size: 14,
                })}`}
              >
                Jangka Waktu
              </Div>
            </Col>
            <Col xs='6' sm='6'>
              <Div
                className={`${text({
                  color: theme?.text?.blue,
                  size: 28,
                  weight: 'bold',
                  align: 'right',
                })}`}
              >
                {loanList.duration ? `${loanList.duration} Bulan` : '-'}
              </Div>
            </Col>
          </Row>
          {/* BUTTON LIST FOR JANGKA WAKTU */}
          <Row className={`${mb4}`}>
            {monthResponse.map((item, key) => (
              <Col xs='4' sm='3' key={key}>
                {renderButton(key, item)}
              </Col>
            ))}
          </Row>
        </Wrapper>

        <Div
          background={theme?.colors?.backgroundColorBlueGradient}
          padding='15px 15px 30px 15px'
          className={mb4}
        >
          <Div
            className={`${text({
              size: 14,
              color: theme?.colors?.white,
            })} ${mb3}`}
          >
            Ringkasan Transaksi
          </Div>
          <Wrapper>
            <Row height='50px' padding={'0 16px'}>
              <Col
                xs='6'
                sm='4'
                display='flex'
                paddingRight='0'
                paddingLeft='0'
                flexDirection='column'
                justifyContent='space-between'
                borderRight={`1px solid ${theme?.colors?.borderLight}`}
              >
                <Div
                  className={`${text({
                    size: 14,
                    color: theme?.colors?.white,
                  })}`}
                >
                  Jumlah Pinjaman
                </Div>

                <Div
                  className={`${text({
                    size: 14,
                    color: theme?.colors?.white,
                  })}`}
                >
                  Cicilan per bulan
                </Div>
              </Col>
              <Col
                xs='6'
                sm='8'
                display='flex'
                flexDirection='column'
                justifyContent='space-between'
              >
                <Div
                  display='flex'
                  alignItems='center'
                  justifyContent='flex-end'
                  className={`${text({
                    color: theme?.colors?.white,
                    weight: 'bold',
                  })}`}
                >
                  {isLoadingVerifyLoan ? (
                    <LoaderText width='16px' />
                  ) : loanList.loan_amount ? (
                    <>
                      <Div className={`${text({ size: 16 })}`}>Rp</Div>
                      <Div className={cx(ml2, text({ size: 16 }))}>
                        {formatMoney(loanList.loan_amount, false) || '-'}
                      </Div>
                    </>
                  ) : (
                    <span>-</span>
                  )}
                </Div>
                <Div
                  display='flex'
                  alignItems='center'
                  justifyContent='flex-end'
                  className={`${text({
                    color: theme?.colors?.white,
                    weight: 'bold',
                  })}`}
                >
                  {isLoadingVerifyLoan ? (
                    <LoaderText width='16px' />
                  ) : loanList.monthly_installment ? (
                    <>
                      <Div className={`${text({ size: 16 })}`}>Rp</Div>
                      <Div className={cx(ml2, text({ size: 16 }))}>
                        {formatMoney(loanList.monthly_installment, false) ||
                          '-'}
                      </Div>
                    </>
                  ) : (
                    <span>-</span>
                  )}
                </Div>
              </Col>
            </Row>
          </Wrapper>
        </Div>

        <ConfirmationPopUp
          onSubmit={handleConfirmationSubmit}
          transactionDetail={loanList}
          showDialog={showConfirmationDialog}
          handleShowDialog={(e) => handleShowDialog(e)}
        />
        <Div
          className={cx(
            w100,
            positionAbsolute,
            dFlex,
            justifyCenter,
            bottom('0px'),
            zIndex(2),
          )}
        >
          <Card fluid>
            <Button
              fluid
              onClick={() => handleShowDialog(true)}
              className={cx(
                borderNone,
                padding('11px'),
                minHeight(48),
                fontSize(16),
              )}
              disabled={loanList ? (loanList.loan_detail ? true : false) : true}
            >
              Lanjutkan
            </Button>
          </Card>
        </Div>
      </Div>
    </Layout>
  );
};

export default Transaction;
