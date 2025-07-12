import { useState, useEffect } from 'react';
import { AxiosError } from 'axios';
import { useHistory } from 'react-router-dom';
import { Checkbox } from '@material-ui/core';
import { cx } from '@emotion/css';

import { signSPHP, sphp } from 'services/merchant_financing';
import { useUserContext } from 'providers/UserProvider';
import utils from 'utils';

import { SPHPWrapper } from './styles';
import { borderNone, mb4, mb3 } from 'assets/css/stylesFix';
import {
  padding,
  minHeight,
  fontSize,
  margin,
  color,
  fontWeight,
  text,
} from 'assets/css/stylesValue';
import { Button, Div } from 'assets/css/styled';
import iconSorry from 'assets/img/icon/ic-sorry.svg';

import Layout from 'components/Layout';
import LoaderText from 'components/LoaderText';

function SPHP() {
  const history = useHistory();
  const {
    handleNotification,
    handleLoadingOverlay,
    transactionData,
    setDatas,
  } = useUserContext();
  const [isChecked, setIsChecked] = useState(false);
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [htmlContent, setHtmlContent] = useState('');
  const [expiredDays, setExpiredDays] = useState('');
  const paramsURL = utils.store.getParse('params');
  const applicationXId =
    transactionData?.applicationXId || utils.store.get('applicationXId');

  useEffect(() => {
    const getSphpContent = async () => {
      handleLoadingOverlay(true);
      handleNotification({ isOpen: false });

      try {
        const response = await sphp(applicationXId);
        return setHtmlContent(response.data);
      } catch (err) {
        const error = err as AxiosError;

        if (error?.response?.data?.errors?.[0]?.number_of_days) {
          const numberOfDays = error.response.data.errors[0].number_of_days;
          setHtmlContent('');
          return setExpiredDays(numberOfDays);
        }

        if (error?.response?.data?.errors?.[0] == 'SPHP sudah diupload') {
          utils.store.removeItem('token');
          setDatas((prev) => ({
            ...prev,
            token: null,
          }));
          history.replace({
            pathname: 'login',
            search: paramsURL?.string,
          });
        }

        if (error?.response?.status !== 404) {
          handleNotification({
            isOpen: true,
            message: error?.response?.data?.errors?.[0],
          });
        }
      } finally {
        handleLoadingOverlay(false);
      }
    };

    getSphpContent();
  }, []);

  const handleClickSPHP = async () => {
    setIsButtonLoading(true);
    const applicationXId =
      transactionData?.applicationXId || utils.store.get('applicationXId');
    try {
      await signSPHP(applicationXId);

      history.replace('sphp-success');
    } catch (err) {
      const error = err as AxiosError;
      if (error?.response?.data?.errors?.[0]?.number_of_days) {
        const numberOfDays = error.response.data.errors[0].number_of_days;
        setHtmlContent('');
        return setExpiredDays(numberOfDays);
      }

      handleNotification({
        isOpen: true,
        message: error?.response?.data?.errors?.[0],
      });
    } finally {
      setIsButtonLoading(false);
    }
  };

  const renderExpiredError = () => {
    return (
      <Div
        height='80vh'
        margin='10px'
        display='flex'
        justifyContent='center'
        alignItems='center'
        flexDirection='column'
      >
        <img className={`${mb4}`} src={iconSorry} />
        <p
          className={cx(
            mb3,
            color('#1ea7e9'),
            fontSize(16),
            fontWeight('bold'),
          )}
        >
          Surat Perjanjian Hutang Piutang tidak ditemukan
        </p>
        <p className={cx(mb3, fontSize(14), text({ align: 'center' }))}>
          SPHP sudah kadaluarsa. Mohon tunggu dan ajukan pinjaman kembali
          setelah {expiredDays} hari
        </p>
      </Div>
    );
  };

  return (
    <Layout hideBarBack hideNavbarMenu disableClickLogo>
      <SPHPWrapper>
        {!htmlContent && expiredDays && renderExpiredError()}

        {htmlContent && !expiredDays && (
          <SPHPWrapper>
            <div
              style={{ padding: '0 20px' }}
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />

            <div className='agree-wrapper'>
              <Checkbox
                checked={isChecked}
                onChange={(e) => {
                  setIsChecked(e.target.checked);
                }}
              />
              <p onClick={() => setIsChecked(!isChecked)}>
                Saya telah membaca dan menyetujui Surat Perjanjian Hutang
                Piutang
              </p>
            </div>
            <Button
              disabled={!isChecked}
              fluid
              className={`${borderNone} ${padding('11px')} ${margin(
                '0px 0px 24px 0px',
              )} ${minHeight(48)} ${fontSize(16)}`}
              onClick={() => !isButtonLoading && handleClickSPHP()}
            >
              {isButtonLoading ? <LoaderText /> : 'Tanda Tangan'}
            </Button>
          </SPHPWrapper>
        )}
      </SPHPWrapper>
    </Layout>
  );
}

export default SPHP;
