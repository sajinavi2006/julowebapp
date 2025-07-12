import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import { useUserContext } from 'providers/UserProvider';
import formatMoney from '@julofinance/web-helpers/dist/string/formatMoney';

import { getDevices, verifyLoan } from 'services/partner/rentee/form';
import utils from 'utils';

import { content } from './styles';
import { Button, Card, Col, Div, Row, Wrapper } from 'assets/css/styled';
import {
  alignCenter,
  borderNone,
  dFlex,
  justifyCenter,
  mb3,
  mb4,
  ml2,
  my4,
  pb4,
  positionAbsolute,
  w100,
} from 'assets/css/stylesFix';
import {
  bottom,
  flex,
  fontSize,
  minHeight,
  padding,
  text,
  transition,
  zIndex,
} from 'assets/css/stylesValue';

import DropdownAutocomplete from 'components/DropdownAutocomplete';
import Layout from 'components/Layout';
import LoaderText from 'components/LoaderText';

import ConfirmationPopUp from './ConfirmationDialog';

const Transaction = () => {
  const theme = useTheme();
  const history = useHistory();
  const { datas, handleNotification, savePreTransactionData, transactionData } =
    useUserContext();
  const [devicesList, setDevicesList] = useState([]);
  const [loanList, setLoanList] = useState({});
  const [isLoadingFetchDevice, setIsLoadingFetchDevice] = useState(true);
  const [isLoadingVerifyLoan, setIsLoadingVerifyLoan] = useState(false);
  const [errorVerifyLoan, setErrorVerifyLoan] = useState({
    status: true,
    message: '',
  });
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const loanXid = transactionData?.loan_xid || utils.store.get('loanXid');

  const fetchData = async () => {
    setIsLoadingFetchDevice(true);
    try {
      const response = await getDevices();

      if (response.success) {
        const tempDevices = await response.data.map((item) => {
          return {
            id: item.id,
            title: item.device_name,
            description: formatMoney(item.price),
            price: item.price,
          };
        });
        setDevicesList(tempDevices);
        setIsLoadingFetchDevice(false);
      }
    } catch (error) {
      handleNotification({
        isOpen: true,
        message: error?.response?.data?.errors?.[0],
      });
    }
  };

  const handleSelectDevice = async (value) => {
    try {
      if (value.id !== loanList.deviceId) {
        setIsLoadingVerifyLoan(true);
        setLoanList({
          deviceId: value.id,
          device: value.title,
          price: value.price,
        });
        const params = {
          account_id: datas.accountId,
          loan_amount_request: value.price,
          device_id: value.id,
        };

        const response = await verifyLoan(params);

        if (response.success) {
          setLoanList((prevState) => ({
            ...prevState,
            ...response.data[0],
          }));

          setErrorVerifyLoan({
            status: false,
            message: '',
          });
        }
      }
    } catch (error) {
      setErrorVerifyLoan({
        status: true,
        message: error?.response?.data?.errors?.[0] ?? '',
      });
    } finally {
      setIsLoadingVerifyLoan(false);
    }
  };

  const handleConfirmationSubmit = () => {
    const payload = {
      account_id: datas.accountId,
      loan_amount_request: loanList?.price,
      device_id: loanList?.deviceId,
    };

    savePreTransactionData(payload);
    history.push('/rentee/pin-verification', { from: 'transaction' });
  };

  const handleShowDialog = (e) => {
    setShowConfirmationDialog(e);
  };

  useEffect(() => {
    if (loanXid) {
      return history.replace('/rentee/home');
    }
    fetchData();
  }, []);

  return (
    <Layout
      barBackTitle='Rentee - Ganti HP Kapanpun'
      barBackType='primary'
      layoutContainer={{
        padding: '0px',
        height: 'inherit',
      }}
    >
      <div className={`${content}`}>
        <Wrapper>
          <div className={`${text({ size: 14 })}`}>Nama Device</div>
          <DropdownAutocomplete
            placeholder='Pilih Nama Device'
            options={devicesList}
            onSelect={(value) => handleSelectDevice(value)}
            isLoading={isLoadingFetchDevice}
            titleClass={`${text({ size: 14 })} ${flex('1 1 70%')}`}
            descriptionClass={`${text({ size: 14, weight: 'bold' })} ${flex(
              '1 1 30%',
            )}`}
            dropdownClass={`${errorVerifyLoan.status ? pb4 : ''} ${transition(
              'padding 0.3s',
            )}`}
            inputClass={`${text({ size: 16 })}`}
            error={errorVerifyLoan.message}
          />
          <div className={`${fontSize(14)} ${my4}`}>
            Ketik jumlah dana dan pilih jangka waktu
          </div>
          <Row className={`${mb4}`} justifyContent='space-between'>
            <Col xs='4' sm='4' display='flex' alignItems='center'>
              <div className={`${fontSize(14)}`}>Jumlah Dana</div>
            </Col>
            <Col xs='6' sm='6'>
              <Div
                display='flex'
                alignItems='center'
                justifyContent='space-between'
                borderBottom={`2px solid ${theme?.colors?.borderLight}`}
              >
                <div
                  className={`${text({
                    color: theme?.text?.greyLight,
                    size: 20,
                  })}`}
                >
                  Rp
                </div>
                <div
                  className={`${text({
                    color: theme?.text?.blue,
                    size: 28,
                    weight: 'bold',
                  })} ${dFlex} ${justifyCenter} ${alignCenter}`}
                >
                  {formatMoney(loanList?.price, false) || '0'}
                </div>
              </Div>
            </Col>
          </Row>
          <Row className={`${mb4}`} justifyContent='space-between'>
            <Col xs='4' sm='4' display='flex' alignItems='center'>
              <div className={`${fontSize(14)}`}>Jangka Waktu</div>
            </Col>
            <Col xs='6' sm='6'>
              <div
                className={`${text({
                  color: theme?.text?.blue,
                  size: 28,
                  weight: 'bold',
                  align: 'right',
                })}`}
              >
                12 bulan
              </div>
            </Col>
          </Row>
          <Row className={`${mb4}`}>
            <Col xs='4' sm='3'>
              <Button
                fluid
                type='gradient'
                borderRadius='8px'
                theme={theme}
                className={`${text({ size: 14 })}`}
              >
                12 bulan
              </Button>
            </Col>
          </Row>
        </Wrapper>
        <Div
          background={theme?.colors?.backgroundColorBlueGradient}
          padding='15px'
        >
          <div
            className={`${text({
              size: 14,
              color: theme?.colors?.white,
            })} ${mb3}`}
          >
            Ringkasan Transaksi
          </div>
          <Wrapper>
            <Row height='120px'>
              <Col
                xs='6'
                sm='4'
                display='flex'
                flexDirection='column'
                justifyContent='space-between'
                borderRight={`1px solid ${theme?.colors?.borderLight}`}
              >
                <div
                  className={`${text({
                    size: 14,
                    color: theme?.colors?.white,
                  })}`}
                >
                  Jumlah pinjaman
                </div>
                <div
                  className={`${text({
                    size: 14,
                    color: theme?.colors?.white,
                  })}`}
                >
                  Cicilan per bulan
                </div>
                <div
                  className={`${text({
                    size: 14,
                    color: theme?.colors?.white,
                  })}`}
                >
                  Jumlah deposit
                </div>
                <div
                  className={`${text({
                    size: 14,
                    color: theme?.colors?.white,
                  })}`}
                >
                  Biaya admin
                </div>
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
                  className={`${text({
                    color: theme?.colors?.white,
                    weight: 'bold',
                  })}`}
                >
                  {isLoadingVerifyLoan ? (
                    <LoaderText width='16px' />
                  ) : loanList?.loan_amount ? (
                    <>
                      <div className={`${text({ size: 16 })}`}>Rp</div>
                      <div className={`${ml2} ${text({ size: 16 })}`}>
                        {formatMoney(loanList?.loan_amount, false) || '-'}
                      </div>
                    </>
                  ) : (
                    <span>-</span>
                  )}
                </Div>
                <Div
                  display='flex'
                  alignItems='center'
                  className={`${text({
                    color: theme?.colors?.white,
                    weight: 'bold',
                  })}`}
                >
                  {isLoadingVerifyLoan ? (
                    <LoaderText width='16px' />
                  ) : loanList?.loan_amount ? (
                    <>
                      <div className={`${text({ size: 16 })}`}>Rp</div>
                      <div className={`${ml2} ${text({ size: 16 })}`}>
                        {formatMoney(loanList?.monthly_installment, false)}
                      </div>
                    </>
                  ) : (
                    <span>-</span>
                  )}
                </Div>
                <Div
                  display='flex'
                  alignItems='center'
                  className={`${text({
                    color: theme?.colors?.white,
                    weight: 'bold',
                  })}`}
                >
                  {isLoadingVerifyLoan ? (
                    <LoaderText width='16px' />
                  ) : loanList?.loan_amount ? (
                    <>
                      <div className={`${text({ size: 16 })}`}>Rp</div>
                      <div className={`${ml2} ${text({ size: 16 })}`}>
                        {formatMoney(loanList?.deposit_amount, false)}
                      </div>
                    </>
                  ) : (
                    <span>-</span>
                  )}
                </Div>
                <Div
                  display='flex'
                  alignItems='center'
                  className={`${text({
                    color: theme?.colors?.white,
                    weight: 'bold',
                  })}`}
                >
                  {isLoadingVerifyLoan ? (
                    <LoaderText width='16px' />
                  ) : loanList?.loan_amount ? (
                    <>
                      <div className={`${text({ size: 16 })}`}>Rp</div>
                      <div className={`${ml2} ${text({ size: 16 })}`}>
                        {formatMoney(loanList?.provision_amount, false)}
                      </div>
                    </>
                  ) : (
                    <span>-</span>
                  )}
                </Div>
              </Col>
            </Row>
          </Wrapper>
        </Div>
      </div>
      <div
        className={`${w100} ${positionAbsolute} ${dFlex} ${justifyCenter} ${bottom(
          '0px',
        )} ${zIndex(2)}`}
      >
        <Card
          fluid
          paddingValue={`24px 15px`}
          style={{
            borderTopLeftRadius: '12px',
            borderTopRightRadius: '12px',
          }}
        >
          <Button
            fluid
            disabled={errorVerifyLoan.status}
            className={`${borderNone} ${padding('11px')} ${minHeight(
              48,
            )} ${fontSize(16)}`}
            onClick={() => handleShowDialog(true)}
          >
            Lanjutkan
          </Button>
        </Card>
      </div>
      <ConfirmationPopUp
        onSubmit={handleConfirmationSubmit}
        transactionDetail={loanList}
        showDialog={showConfirmationDialog}
        handleShowDialog={(e) => handleShowDialog(e)}
      />
    </Layout>
  );
};

export default Transaction;
