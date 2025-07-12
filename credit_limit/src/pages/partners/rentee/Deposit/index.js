import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useTheme } from '@emotion/react';

import formatDate from '@julofinance/web-helpers/dist/date/formatDate';
import formatMoney from '@julofinance/web-helpers/dist/string/formatMoney';

import { useUserContext } from 'providers/UserProvider';
import { getDepositStatus } from 'services/partner/rentee/form';
import utils from 'utils';

import { Button, ButtonOutline, Card, Div, Row } from 'assets/css/styled';
import {
  borderNone,
  dFlex,
  justifyCenter,
  mt4,
  my2,
  my3,
  my4,
  mx1,
  mx3,
  p1,
  positionAbsolute,
  w100,
} from 'assets/css/stylesFix';
import {
  bottom,
  fontSize,
  minHeight,
  padding,
  text,
  zIndex,
} from 'assets/css/stylesValue';

import IconCopy from 'assets/img/icon/ic-copy.png';
import IconHelp from 'assets/img/icon/ic-help.webp';
import IconReload from 'assets/img/icon/ic-reload.png';

import DialogInfo from 'components/Dialog/DialogInfo';
import Layout from 'components/Layout';
import LoaderText from 'components/LoaderText';

const HELP_DIALOG_DATA = {
  title: {
    text: 'Butuh Bantuan?',
  },
  message: {
    text: 'Bila terjadi masalah pada status deposit mohon hubungi Customer Service JULO di:',
  },
  button: [
    {
      fontSize: 12,
      action: 'close',
      text: 'Kembali',
    },
  ],
};

const Deposit = () => {
  const theme = useTheme();
  const themeText = theme?.text;
  const themeColors = theme?.colors;
  const history = useHistory();
  const { handleNotification, transactionData } = useUserContext();
  const [depositData, setDepositData] = useState({ status: 'PENDING' });
  const [expiredDate, setExpiredDate] = useState(null);
  const [showDialogHelp, setShowDialogHelp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const loanXid = transactionData?.loan_xid || utils.store.get('loanXid');

  const fetchDeposit = async () => {
    handleNotification({ isOpen: false });
    setIsLoading(true);
    try {
      const response = await getDepositStatus(loanXid);
      const tempExpiredDate = response.data?.expired_date.replace(/-/gi, '/');
      if (!response.success) {
        const errorMessage = response?.errors?.[0];
        return handleNotification({
          isOpen: true,
          message: errorMessage,
          severity: false,
        });
      }
      setExpiredDate(tempExpiredDate);
      return setDepositData(response.data);
    } catch (error) {
      handleNotification({
        isOpen: true,
        message: error?.response?.data?.errors?.[0],
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClickMenu = () => {
    setShowDialogHelp(true);
  };

  const handleDialogInfo = () => {
    setShowDialogHelp(false);
  };

  const actionMenu = () => {
    return (
      <ButtonOutline padding='0px'>
        <Div
          display='flex'
          alignItems='center'
          className={text({ size: 12, color: themeText?.primary })}
        >
          <img src={IconHelp} className={`${mx1}`} />
          <Div>Butuh bantuan?</Div>
        </Div>
      </ButtonOutline>
    );
  };

  const copyClipboard = (value) => {
    handleNotification({
      isOpen: true,
      message: 'Berhasil copy ke clipboard.',
      severity: true,
    });
    utils.clipboard.copy(value);
  };

  const handleDepositStatus = () => {
    switch (depositData?.status) {
      case 'PENDING':
        return {
          disabled: true,
          isShowNotification: true,
          isShowRefreshButtonStatus: true,
          status: 'Belum Lunas',
          color: themeText?.danger,
        };
      case 'SUCCESS':
        return {
          disabled: false,
          isShowNotification: true,
          isShowRefreshButtonStatus: false,
          status: 'Lunas',
          color: themeText?.success,
        };
      default:
        return {
          disabled: true,
          isShowNotification: true,
          isShowRefreshButtonStatus: true,
          status: 'Belum Lunas',
          color: themeText?.danger,
        };
    }
  };

  useEffect(() => {
    if (loanXid) {
      fetchDeposit();
    }
  }, [transactionData?.loan_xid]);

  return (
    <Layout
      barBackType='secondary'
      barBackTitle='Deposit'
      onClickActionsMenu={(e) => handleClickMenu(e)}
      layoutContainer={{
        height: '100%',
      }}
      barBackActions={{
        type: 'button',
        menu: [
          {
            text: actionMenu(),
            action: 'openHelpDialog',
          },
        ],
      }}
    >
      <Div className={`${text({ size: 14, color: themeText?.primary })}`}>
        <Div className={`${text({ weight: 'bold' })}`}>Informasi Deposit</Div>
        <Div className={`${my3}`}>
          Lakukan pembayaran deposit sebesar 20% dari total harga gadget yang
          Anda beli, biaya proteksi, dan biaya admin, ke:
        </Div>

        <Card
          rounded
          className={`${text({
            size: 14,
            color: themeText?.greyLight,
          })} ${my4}`}
        >
          <Div display='flex' justifyContent='space-between'>
            <Div>Nama bank</Div>
            <Div
              className={`${text({
                color: themeText?.primary,
                weight: 'bold',
              })}`}
            >
              {isLoading ? <LoaderText /> : depositData?.julo_bank_name}
            </Div>
          </Div>
          <Div
            display='flex'
            justifyContent='space-between'
            className={`${my3}`}
          >
            <Div>Nomor VA</Div>
            <Div
              display='flex'
              alignItems='center'
              cursor='pointer'
              onClick={() =>
                !isLoading &&
                copyClipboard(depositData?.julo_bank_account_number)
              }
              className={`${text({
                color: themeText?.primary,
                weight: 'bold',
              })}`}
            >
              <Div display='flex' alignItems='center' className={`${mx1}`}>
                <img src={IconCopy} />
              </Div>
              {isLoading ? (
                <LoaderText />
              ) : (
                depositData?.julo_bank_account_number
              )}
            </Div>
          </Div>
          <Div
            display='flex'
            justifyContent='space-between'
            className={`${my3}`}
          >
            <Div>Jumlah</Div>
            <Div
              className={`${text({
                color: themeText?.primary,
                weight: 'bold',
              })}`}
            >
              {isLoading ? (
                <LoaderText />
              ) : (
                formatMoney(depositData?.total_deposit_amount)
              )}
            </Div>
          </Div>
          <Div display='flex' justifyContent='space-between'>
            <Div>Status</Div>
            <Div
              display='flex'
              alignItems='center'
              className={`${text({
                color: themeText?.primary,
                weight: 'bold',
              })}`}
            >
              {handleDepositStatus()?.isShowRefreshButtonStatus ? (
                <ButtonOutline
                  borderless
                  types='primary'
                  display='flex'
                  alignItems='center'
                  padding='0'
                  color={themeColors?.link}
                  background={themeColors?.blueLight}
                  className={`${text({
                    size: 12,
                    color: themeText?.primary,
                    weight: 'bold',
                  })} ${mx3} ${p1}`}
                  onClick={() => fetchDeposit()}
                >
                  <Div transform='rotateY(180deg)'>
                    <LoaderText
                      isSpin={isLoading}
                      image={IconReload}
                      width='12'
                    />
                  </Div>
                  <Div className={`${mx1}`}>Refresh</Div>
                </ButtonOutline>
              ) : null}
              <Div color={handleDepositStatus()?.color}>
                {handleDepositStatus()?.status}
              </Div>
            </Div>
          </Div>
        </Card>
        {handleDepositStatus()?.isShowNotification && !!expiredDate && (
          <Div
            background={themeColors?.blueLight}
            padding='15px'
            textAlign='center'
            borderRadius={'5px'}
            className={`${text({ size: 14, color: themeText?.blue })}`}
          >
            Bayar deposit sebelum
            <span className={`${text({ weight: 'bold' })}`}>
              {` ${formatDate(expiredDate)} `}
            </span>
            atau transaksi Anda akan otomatis dibatalkan oleh sistem dan jika
            Anda membatalkan transaksi, uang deposit yang sudah terbayar tidak
            bisa dikembalikan
          </Div>
        )}
      </Div>

      <Row
        className={`${w100} ${positionAbsolute} ${dFlex} ${justifyCenter} ${padding(
          `0px 15px 24px 15px`,
        )} ${bottom('0px')} ${zIndex(2)}`}
      >
        <Button
          fluid
          disabled={handleDepositStatus()?.disabled || isLoading}
          className={`${borderNone} ${padding('11px')} ${minHeight(
            48,
          )} ${fontSize(16)}`}
          onClick={() =>
            history.push('seller-verification', { from: 'deposit' })
          }
        >
          Konfirmasi
        </Button>
      </Row>

      <DialogInfo
        dialogData={HELP_DIALOG_DATA}
        showDialogInfo={showDialogHelp}
        handleShowDialogInfo={(e) => setShowDialogHelp(e)}
        handleClickDialogButton={(e) => handleDialogInfo(e)}
      >
        <Div
          position='relative'
          padding='10px 15px'
          border={`1px solid ${themeColors?.borderLight}`}
          fontSize={12}
          color={themeText?.primary}
          fontWeight='bold'
          cursor='pointer'
          className={`${my2}`}
          onClick={() => !isLoading && copyClipboard('021 5091 9034')}
        >
          021 5091 9034
          <Div
            position='absolute'
            top='0px'
            right='0px'
            transform='translate(-100%, 50%)'
          >
            <img src={IconCopy} />
          </Div>
        </Div>
        <Div
          position='relative'
          padding='10px 15px'
          border={`1px solid ${themeColors?.borderLight}`}
          fontSize={12}
          color={themeText?.primary}
          fontWeight='bold'
          cursor='pointer'
          className={`${my2}`}
          onClick={() => !isLoading && copyClipboard('021 5091 9035')}
        >
          021 5091 9035
          <Div
            position='absolute'
            top='0px'
            right='0px'
            transform='translate(-100%, 50%)'
          >
            <img src={IconCopy} />
          </Div>
        </Div>
        <Div
          className={`${text({ color: themeText?.primary, size: 12 })} ${mt4}`}
        >
          Atau hubungi{' '}
          <span className={`${text({ weight: 'bold' })}`}>
            Erajaya Retail Officer (ERO)
          </span>
        </Div>
      </DialogInfo>
    </Layout>
  );
};

export default Deposit;
