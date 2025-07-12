import React, { useEffect } from 'react';
import decimalToPercent from '@julofinance/web-helpers/dist/number/decimalToPercent';
import formatMoney from '@julofinance/web-helpers/dist/string/formatMoney';
import { cx } from '@emotion/css';
import { useUserContext } from 'providers/UserProvider';
import { useHistory } from 'react-router-dom';
import { useTheme } from '@emotion/react';

import {
  cancellingLoanStatus,
  finishingLoanStatus,
} from 'services/partner/paylater';

import utils from 'utils';

import { Button, Card, Col, Div, Img, Row, Wrapper } from 'assets/css/styled';
import { borderNone, mb4, my3, my4, w100 } from 'assets/css/stylesFix';
import { minHeight, padding, text, margin } from 'assets/css/stylesValue';

import transactionProcessImg from 'assets/img/paylater/transaction-process.svg';
import juloLogoBlue from 'assets/img/logo/logo-name_blue.png';

import Layout from 'components/Layout';
import DialogInfo from 'components/Dialog/DialogInfo';
// import Input from 'components/Input'; will be used if kode promo is needed

/**
 * Route: /paylater/agreement-summaries
 */

const AgreementSummaries = () => {
  const theme = useTheme();
  const themeTexts = theme?.text;
  const themeCardPrimary = theme?.cardPrimary;
  const themeButtonPrimary = theme?.buttonPrimary;
  const themeButtonOutlinePrimary = theme?.buttonOutlinePrimary;
  const history = useHistory();
  const {
    handleNotification,
    transactionData,
    datas,
    saveTransactionData,
  } = useUserContext();

  const [showDialogPaymentConfirmation, setShowDialogPaymentConfirmation] =
    useState(false);
  const [confirmationDialogData, setConfirmationDialogData] = useState({});

  const loanXid = transactionData?.loan_xid || utils.store.get('loanXid');
  const partnerName = utils.store.get('merchant');
  const handleAction = (value, state) => {
    history.push(value, { from: state });
  };

  useEffect(() => {
    setConfirmationDialogData({
      buttonWrap: true,
      title: {
        text: 'Apakah Anda Yakin?',
      },
      message: {
        text: 'Apakah Anda yakin ingin membatalkan transaksi ini?',
      },
      img: transactionProcessImg,
      button: [
        {
          bgColor: themeButtonOutlinePrimary?.backgroundColor,
          color: themeButtonOutlinePrimary?.color,
          borderColor: themeButtonOutlinePrimary?.borderColor,
          fontSize: 12,
          loading: false,
          url: '/paylater/transactions/cancel',
          text: 'Batal',
          item: { position: 'center' },
        },
        {
          bgColor: themeButtonPrimary?.backgroundColor,
          color: themeButtonPrimary?.color,
          borderColor: themeButtonPrimary?.borderColor,
          fontSize: 12,
          loading: false,
          action: 'close',
          item: { position: 'center' },
          text: 'Lanjut Bayar',
        },
      ],
    });
  }, [theme]);

  const handleCancelAgreement = async () => {
    setShowDialogPaymentConfirmation(true);
  };

  const handleDialogInfo = async (value) => {
    const { action, url, data } = value;
    if (action) {
      setShowDialogPaymentConfirmation(false);
    }
    if (url) {
      const buttonData = confirmationDialogData.button;
      const buttonTarget = { ...confirmationDialogData.button[data?.index] };
      buttonTarget.loading = true;
      buttonData[data?.index] = buttonTarget;

      setConfirmationDialogData((prev) => {
        return {
          ...prev,
          button: buttonData,
        };
      });

      try {
        await cancellingLoanStatus(loanXid);
        resetTransactionStorage();
        history.replace(url);
      } catch (error) {
        handleNotification({
          isOpen: true,
          message: error?.response?.data?.errors?.[0],
        });
      }
    }
  };

  const handleFinishPayment = async () => {
    try {
      await finishingLoanStatus(loanXid);

      saveTransactionData({
        ...transactionData,
        isTransactionSuccess: true,
      });

      utils.store.removeItem('loanXid');
      utils.store.removeItem('preTransactionData');
      utils.store.removeItem('transactionData');
      utils.store.removeItem('loanStatus');

      history.replace('/paylater/transactions/success');
    } catch (error) {
      const errorData = error.response.data || {};
      const errMessage = errorData.errors?.[0];
      handleNotification({
        isOpen: true,
        message: errMessage,
      });
    }
  };

  useEffect(() => {
    if (!loanXid) {
      return history.replace('/paylater/home');
    }
  }, []);

  return (
    <Layout hideBarBack={true}>
      <Div>
        <Div
          display='flex'
          justifyContent='space-between'
          alignItems='flex-end'
        >
          <Img src={juloLogoBlue} height='30' alt='logo' />
          <Div
            className={cx(
              text({ size: 18, color: themeTexts?.blue, weight: 'bold' })
            )}
          >
            Ringkasan Perjanjian
          </Div>
        </Div>
        <Wrapper padding='0px'>
          <Card
            rounded
            boxShadow={themeCardPrimary?.boxShadow}
            className={cx(my4)}
            paddingValue={'15px'}
          >
            <Div display='flex' justifyContent='space-between'>
              <Div
                className={cx(
                  text({
                    size: 14,
                    color: themeTexts?.greyLight,
                  })
                )}
              >
                Jumlah pinjaman
              </Div>
              <Div
                className={cx(
                  text({
                    size: 14,
                    color: '#5e5e5e',
                    weight: '600',
                  })
                )}
              >
                {formatMoney(transactionData.loan_amount)}
              </Div>
            </Div>
            <Div
              display='flex'
              justifyContent='space-between'
              className={cx(my3)}
            >
              <Div
                className={cx(text({ size: 14, color: themeTexts?.greyLight }))}
              >
                Jangka waktu
              </Div>
              <Div
                className={cx(
                  text({
                    size: 14,
                    color: '#5e5e5e',
                    weight: 'bold',
                  })
                )}
              >
                {transactionData.loan_duration} bulan
              </Div>
            </Div>
            <Div
              display='flex'
              justifyContent='space-between'
              className={cx(my3)}
            >
              <Div
                className={cx(
                  text({
                    size: 14,
                    color: themeTexts?.greyLight,
                  })
                )}
              >
                Bunga per bulan
              </Div>
              <Div
                className={cx(
                  text({
                    size: 14,
                    color: '#5e5e5e',
                    weight: 'bold',
                  })
                )}
              >
                {decimalToPercent(
                  transactionData.monthly_interest
                )}
              </Div>
            </Div>

            <Div display='flex' justifyContent='space-between'>
              <Div
                className={cx(
                  text({
                    size: 14,
                    color: themeTexts?.greyLight,
                  })
                )}
              >
                Tagihan per bulan
              </Div>
              <Div
                className={cx(
                  text({
                    size: 14,
                    color: '#5e5e5e',
                    weight: 'bold',
                  })
                )}
              >
                {formatMoney(transactionData.installment_amount)}
              </Div>
            </Div>
          </Card>

          <Div className={cx(text({ size: 14, color: themeTexts?.greyLight }))}>
            Informasi Transaksi
          </Div>

          <Card
            rounded
            boxShadow={themeCardPrimary?.boxShadow}
            className={cx(my3)}
            padding='15px'
          >
            <Row>
              <Col
                xs='5'
                sm='4'
                className={cx(
                  text({
                    size: 12,
                    color: themeTexts?.greyLight,
                  })
                )}
              >
                E-commerce
              </Col>
              <Col
                xs='7'
                sm='8'
                className={cx(
                  text({
                    size: 12,
                    color: themeTexts?.primary,
                    weight: 'bold',
                  })
                )}
              >
                {partnerName}
              </Col>
              <Div className={cx(margin('12px 0 0 0'), w100)} />

              <Col
                xs='5'
                sm='4'
                className={cx(
                  text({
                    size: 12,
                    color: themeTexts?.greyLight,
                  })
                )}
              >
                Nominal
              </Col>
              <Col
                xs='7'
                sm='8'
                className={cx(
                  text({
                    size: 12,
                    color: themeTexts?.primary,
                    weight: 'bold',
                  })
                )}
              >
                {formatMoney(transactionData.transaction_amount)}
              </Col>
              <Div className={cx(margin('0 0 12px 0'), w100)} />
              <Col
                xs='5'
                sm='4'
                className={cx(
                  text({
                    size: 12,
                    color: themeTexts?.greyLight,
                  })
                )}
              >
                Nama Pemilik
              </Col>
              <Col
                xs='7'
                sm='8'
                className={cx(
                  text({
                    size: 12,
                    color: themeTexts?.primary,
                    weight: 'bold',
                  })
                )}
              >
                {datas?.applicationFullname}
              </Col>
            </Row>
          </Card>
        </Wrapper>
        <Wrapper padding='0'>
          <Div className={cx('text-center', my4)}>
            <Div
              className={cx(
                text({
                  size: 14,
                  color: themeTexts?.blue,
                  decoration: 'underline',
                })
              )}
              onClick={() =>
                handleAction('/paylater/sphp', '/paylater/agreement-summaries')
              }
            >
              Lihat Surat Perjanjian Hutang Piutang
            </Div>
          </Div>
          {/* will be used if kode promo is needed */}
          {/* <Div
            className={cx(
              text(
                { size: 14, color: themeTexts?.greyLight, weight: 'bold' },
                mt4
              )
            )}
          >
            Kode Promo
          </Div>
          <Input
            placeholder='Kode promo'
            style={{ border: '1px solid #E5E5E5' }}
            isOutlined
            colorinput='#E5E5E5'
            classNameInput={cx(minHeight(48), borderRadiusAll('5px'))}
          />
          <Divider marginBottom='1rem' /> */}
          {datas.isUseSignature ? (
            <Button
              fluid
              marginBottom='24px'
              className={cx(
                borderNone,
                padding('11px'),
                minHeight(48),
                text({ size: 16 })
              )}
              onClick={() =>
                handleAction(
                  '/paylater/signature',
                  '/paylater/agreement-summaries'
                )
              }
            >
              Tanda Tangan Elektronik
            </Button>
          ) : (
            <Button
              fluid
              marginBottom='24px'
              className={cx(
                borderNone,
                padding('11px'),
                minHeight(48),
                text({ size: 16 })
              )}
              onClick={handleFinishPayment}
            >
              Selesaikan Pembayaran
            </Button>
          )}

          <Div className={cx('text-center', mb4)}>
            <Div
              className={cx(
                text({
                  size: 14,
                  color: '#c1c1c1',

                  decoration: 'underline',
                })
              )}
              onClick={handleCancelAgreement}
            >
              Batalkan Perjanjian
            </Div>
          </Div>
        </Wrapper>
      </Div>
      <DialogInfo
        dialogData={confirmationDialogData}
        showDialogInfo={showDialogPaymentConfirmation}
        handleShowDialogInfo={(e) => setShowDialogPaymentConfirmation(e)}
        handleClickDialogButton={(e) => handleDialogInfo(e)}
      />
    </Layout>
  );
};

export default AgreementSummaries;
