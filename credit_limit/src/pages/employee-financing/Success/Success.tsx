import { useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import Layout from 'components/Layout';

import { Div, Img } from 'assets/css/styled';
import IconSubmitted from 'assets/img/icon/ic-loan-submitted.svg';
import { SuccessWrapper } from './styles';
import store from 'utils/Store';

/**
 * Route: /ef-pilot/success
 * Access: Public
 * Guard: /ef-pilot/application/financial
 */
const SuccessPage = () => {
  const location = useLocation<{ from: string }>();
  const history = useHistory();
  const from = location?.state?.from ?? '';

  useEffect(() => {
    // check is from financial page
    const isAllowed =
      from === '/ef-pilot/application/financial' || from === 'disbursement';
    const token = store.get('token');
    const type = store.get('type');

    if (!isAllowed) {
      if (type === 'application') {
        if (token) {
          return history.push('/ef-pilot/application/personal_identity');
        }
        return history.push('/ef-pilot/application');
      } else {
        if (token) {
          return history.push('/ef-pilot/disbursement/loan');
        }
        return history.push('/ef-pilot/disbursement');
      }
    }
  }, []);

  return (
    <Layout
      hideNavbar={true}
      hideBarBack={true}
      layoutContainer={{
        padding: '0px',
      }}
    >
      <SuccessWrapper>
        <Img
          width='10rem'
          alignSelf='center'
          marginBottom='10px'
          src={IconSubmitted}
        />
        <Div
          fontSize='24px'
          fontWeight='bold'
          marginBottom='10px'
          color='#00ACF0'
        >
          Pengajuan Dikirim
        </Div>
        <Div fontSize='18px' color='#9E9E9E' marginBottom='10px'>
          Pengajuanmu akan segera di review. Tunggu sampai proses verifikasi
          datamu selesai, ya.
        </Div>
        <Div fontSize='18px' color='#9E9E9E'>
          Terima kasih telah menggunakan Employee Financing Program bersama JULO
        </Div>
      </SuccessWrapper>
    </Layout>
  );
};

export default SuccessPage;
