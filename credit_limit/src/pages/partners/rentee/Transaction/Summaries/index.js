import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import decimalToPercent from '@julofinance/web-helpers/dist/number/decimalToPercent';
import formatMoney from '@julofinance/web-helpers/dist/string/formatMoney';
import { useUserContext } from 'providers/UserProvider';

import {
  cancellingLoanStatus,
  getLoanDetail,
  getDepositStatus,
} from 'services/partner/rentee/form';
import utils from 'utils';

import { wrapperGuidance, styleIconChecked } from './styles';
import {
  Button,
  Card,
  Col,
  Div,
  Divider,
  Row,
  Wrapper,
} from 'assets/css/styled';
import {
  borderNone,
  dFlex,
  justifyCenter,
  mb2,
  mb3,
  my3,
  my4,
  w100,
} from 'assets/css/stylesFix';
import {
  borderBottom,
  bottom,
  fontSize,
  minHeight,
  padding,
  text,
  zIndex,
} from 'assets/css/stylesValue';

import IconChecked from 'assets/img/icon/ic-checked_grey.png';

import Layout from 'components/Layout';
import DialogInfo from 'components/Dialog/DialogInfo';

const CUSTOMER_GUIDANCE = [
  {
    text: 'Customer wajib melakukan unboxing bersama Sales Erafone',
  },
  {
    text: 'Sales Erafone akan mengunduh aplikasi JULO dengan tujuan:',
    list: {
      typeList: 'ol',
      typePoint: 'a',
      message: [
        {
          text: 'Memberikan reminder/pengingat otomatis untuk jadwal pembayaran melalui aplikasi',
        },
        {
          text: 'Memberikan informasi terkait program Rentee dan Program JULO lainnya',
        },
      ],
    },
  },
  {
    text: 'Di gadget tersebut akan diunduh aplikasi Financing Device Lock. Jika customer gagal melakukan pembayaran di atas 30 hari, maka gadget akan dikunci dan disita oleh JULO',
  },
  {
    text: 'Jika Anda membatalkan transaksi, uang deposit yang sudah terbayar tidak bisa dikembalikan',
  },
];

const TransactionSummaries = () => {
  const theme = useTheme();
  const themeColors = theme?.colors;
  const themeCardPrimary = theme?.cardPrimary;
  const themeButtonPrimary = theme?.buttonPrimary;
  const themeButtonOutlinePrimary = theme?.buttonOutlinePrimary;
  const history = useHistory();
  const { partner } = useParams();
  const {
    handleNotification,
    handleLoadingOverlay,
    transactionData,
    resetTransactionStorage,
  } = useUserContext();
  const [summaries, setSummaries] = useState({});
  const [isLoanCodeVerified, setIsLoanCodeVerified] = useState(false);
  const [showDialogPaymentConfirmation, setShowDialogPaymentConfirmation] =
    useState(false);
  const [confirmationDialogData, setConfirmationDialogData] = useState({});
  const loanXid = transactionData?.loan_xid || utils.store.get('loanXid');

  const fetchDeposit = async (valueXid) => {
    handleNotification({ isOpen: false });
    try {
      const response = await getDepositStatus(valueXid);
      if (!response.success) {
        const errorMessage = response?.errors?.[0];
        return handleNotification({
          isOpen: true,
          message: errorMessage,
          severity: false,
        });
      }

      const isLoanCodeVerified = response?.data?.is_verified_code;
      return setIsLoanCodeVerified(isLoanCodeVerified);
    } catch (error) {
      handleNotification({
        isOpen: true,
        message: error?.response?.data?.errors?.[0],
      });
    }
  };

  const fetchLoanDetail = async (valueXid) => {
    handleLoadingOverlay(true);
    handleNotification({ isOpen: false });
    try {
      const response = await getLoanDetail(valueXid, partner);
      if (!response.success) {
        const errorMessage = response?.errors?.[0];

        return handleNotification({
          isOpen: true,
          message: errorMessage,
          severity: false,
        });
      }

      if (
        response.data?.loan?.status != 210 ||
        !response.data?.eligible_access?.is_eligible
      ) {
        return history.push('home');
      }
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      fetchDeposit(valueXid);
      return setSummaries(response.data);
    } catch (error) {
      handleNotification({
        isOpen: true,
        message: error?.response?.data?.errors?.[0],
      });
    } finally {
      handleLoadingOverlay(false);
    }
  };

  const handleAction = (value, state) => {
    history.push(value, { from: state });
  };

  const handleClickMenu = (value) => {
    switch (value?.action) {
      case 'cancelTransaction':
        setShowDialogPaymentConfirmation(true);
        break;
      case 'paymentMethod':
        history.push('how-to-pay');
        break;
      default:
        break;
    }
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
        history.push(url);
      } catch (error) {
        handleNotification({
          isOpen: true,
          message: error?.response?.data?.errors?.[0],
        });
      }
    }
  };

  useEffect(() => {
    setConfirmationDialogData({
      title: {
        text: 'Apakah Anda Yakin?',
      },
      message: {
        text: 'Apakah Anda yakin ingin membatalkan transaksi ini?',
      },
      button: [
        {
          bgColor: themeButtonPrimary?.backgroundColor,
          color: themeButtonPrimary?.color,
          borderColor: themeButtonPrimary?.borderColor,
          fontSize: 12,
          loading: false,
          action: 'close',
          text: 'Tidak',
        },
        {
          bgColor: themeButtonOutlinePrimary?.backgroundColor,
          color: themeButtonOutlinePrimary?.color,
          borderColor: themeButtonOutlinePrimary?.borderColor,
          fontSize: 12,
          loading: false,
          url: 'home',
          text: 'Ya',
        },
      ],
    });
  }, [theme]);

  useEffect(() => {
    if (loanXid) {
      fetchLoanDetail(loanXid);
    } else {
      return history.replace('/rentee/home');
    }
  }, [transactionData?.loan_xid]);

  return (
    <Layout
      barBackType='secondary'
      barBackTitle='Ringkasan Transaksi'
      onClickActionsMenu={(e) => handleClickMenu(e)}
      barBackActions={{
        type: 'list',
        menu: [
          {
            text: 'Cara pembayaran',
            action: 'paymentMethod',
          },
          {
            text: 'Batalkan transaksi',
            action: 'cancelTransaction',
          },
        ],
      }}
    >
      <div>
        <Div
          background={themeColors?.blueLight}
          padding='15px'
          className={`${borderBottom(`1px solid ${themeColors?.borderLight}`)}`}
        >
          <div
            className={`${text({
              size: 14,
              color: themeColors?.blue,
              weight: 'bold',
            })} ${mb3}`}
          >
            Customer Guidance List
          </div>
          <ul className={`${wrapperGuidance}`}>
            {CUSTOMER_GUIDANCE.map((item, index) => (
              <li
                key={index}
                className={`${text({
                  size: 14,
                  color: themeColors?.blue,
                })} ${mb2}`}
              >
                {item.text}
                {item.list &&
                  (item.list.typeList === 'ol' ? (
                    <ol
                      type={item.list.typePoint}
                      className={`${wrapperGuidance}`}
                    >
                      {item?.list?.message?.map((obj, objIndex) => (
                        <li
                          key={objIndex}
                          className={`${text({
                            size: 14,
                            color: themeColors?.blue,
                          })} ${mb2}`}
                        >
                          {obj.text}
                        </li>
                      ))}
                    </ol>
                  ) : (
                    <ul
                      type={item?.list?.typePoint}
                      className={`${wrapperGuidance}`}
                    >
                      {item?.list?.message?.map((obj, objIndex) => (
                        <li
                          key={objIndex}
                          className={`${text({
                            size: 14,
                            color: themeColors?.blue,
                          })} ${mb2}`}
                        >
                          {obj.text}
                        </li>
                      ))}
                    </ul>
                  ))}
              </li>
            ))}
          </ul>
        </Div>
        <Wrapper>
          <Card
            rounded
            boxShadow={themeCardPrimary?.boxShadow}
            className={`${my4}`}
          >
            <Div display='flex' justifyContent='space-between'>
              <div className={`${text({ size: 14, color: '#727272' })}`}>
                Jumlah pinjaman
              </div>
              <div
                className={`${text({
                  size: 14,
                  color: '#5e5e5e',
                  weight: 'bold',
                })}`}
              >
                {formatMoney(summaries?.loan?.loan_amount)}
              </div>
            </Div>
            <Div
              display='flex'
              justifyContent='space-between'
              className={`${my3}`}
            >
              <div className={`${text({ size: 14, color: '#727272' })}`}>
                Jangka Waktu
              </div>
              <div
                className={`${text({
                  size: 14,
                  color: '#5e5e5e',
                  weight: 'bold',
                })}`}
              >
                {summaries?.loan?.loan_duration} bulan
              </div>
            </Div>
            <Div
              display='flex'
              justifyContent='space-between'
              className={`${my3}`}
            >
              <div className={`${text({ size: 14, color: '#727272' })}`}>
                Bunga per bulan
              </div>
              <div
                className={`${text({
                  size: 14,
                  color: '#5e5e5e',
                  weight: 'bold',
                })}`}
              >
                {decimalToPercent(
                  summaries?.loan?.interest_rate_monthly
                )}
              </div>
            </Div>
            <Div display='flex' justifyContent='space-between'>
              <div className={`${text({ size: 14, color: '#727272' })}`}>
                Tagihan per bulan
              </div>
              <div
                className={`${text({
                  size: 14,
                  color: '#5e5e5e',
                  weight: 'bold',
                })}`}
              >
                {formatMoney(summaries?.loan?.installment_amount)}
              </div>
            </Div>
          </Card>

          <div className={`${text({ size: 14, color: '#727272' })}`}>
            Informasi Transaksi
          </div>

          <Card
            rounded
            boxShadow={themeCardPrimary?.boxShadow}
            className={`${my4}`}
          >
            <Row>
              <Col
                xs='5'
                sm='4'
                className={`${text({ size: 12, color: '#727272' })}`}
              >
                Kategori Produk
              </Col>
              <Col
                xs='7'
                sm='8'
                className={`${text({
                  size: 12,
                  color: '#5e5e5e',
                  weight: 'bold',
                })}`}
              >
                {summaries?.loan?.rentee?.product_category}
              </Col>
              <Col
                xs='5'
                sm='4'
                className={`${text({
                  size: 12,
                  color: '#727272',
                })} ${my3}`}
              >
                Nama Device
              </Col>
              <Col
                xs='7'
                sm='8'
                className={`${text({
                  size: 12,
                  color: '#5e5e5e',
                  weight: 'bold',
                })} ${my3}`}
              >
                {summaries?.loan?.rentee?.name_device}
              </Col>
              <Col
                xs='5'
                sm='4'
                className={`${text({ size: 12, color: '#727272' })}`}
              >
                Harga Produk
              </Col>
              <Col
                xs='7'
                sm='8'
                className={`${text({
                  size: 12,
                  color: '#5e5e5e',
                  weight: 'bold',
                })}`}
              >
                {formatMoney(summaries?.loan?.rentee?.price)}
              </Col>
            </Row>
          </Card>
        </Wrapper>
        <div
          className={`${w100} ${dFlex} ${justifyCenter} ${bottom(
            '0px',
          )} ${zIndex(2)}`}
        >
          <Card
            fluid
            paddingValue={`24px 15px`}
            style={{
              borderTopLeftRadius: '12px',
              borderTopRightRadius: '12px',
              boxShadow: 'none',
            }}
          >
            <Button
              fluid
              disabled={isLoanCodeVerified}
              position='relative'
              className={`${borderNone} ${padding('11px')} ${minHeight(
                48,
              )} ${fontSize(16)}`}
              onClick={() => handleAction('sphp', 'transaction-summaries')}
            >
              Verifikasi
              {isLoanCodeVerified && (
                <img src={IconChecked} className={`${styleIconChecked}`} />
              )}
            </Button>
            <Divider />
            <Button
              fluid
              disabled={!isLoanCodeVerified}
              className={`${borderNone} ${padding('11px')} ${minHeight(
                48,
              )} ${fontSize(16)}`}
              onClick={() => handleAction('signature', 'transaction-summaries')}
            >
              Tanda Tangan Elektronik
            </Button>
          </Card>
        </div>
      </div>
      <DialogInfo
        dialogData={confirmationDialogData}
        showDialogInfo={showDialogPaymentConfirmation}
        handleShowDialogInfo={(e) => setShowDialogPaymentConfirmation(e)}
        handleClickDialogButton={(e) => handleDialogInfo(e)}
      />
    </Layout>
  );
};

export default TransactionSummaries;
