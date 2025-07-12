import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Checkbox } from '@material-ui/core';
import { sphp } from 'services/partner/rentee/form';
import { useUserContext } from 'providers/UserProvider';
import { borderNone } from 'assets/css/stylesFix';
import { padding, minHeight, fontSize, margin } from 'assets/css/stylesValue';
import { SPHPWrapper } from './styles';

import { Button } from 'assets/css/styled';
import utils from 'utils';

import Layout from 'components/Layout';

function SPHP() {
  const history = useHistory();
  const { handleNotification, handleLoadingOverlay, transactionData } =
    useUserContext();
  const [isChecked, setIsChecked] = useState(false);
  const [htmlContent, setHtmlContent] = useState('');
  const loanXid = transactionData?.loan_xid || utils.store.get('loanXid');

  const getSphpContent = async () => {
    handleLoadingOverlay(true);
    handleNotification({ isOpen: false });

    try {
      const response = await sphp(loanXid);
      return setHtmlContent(response.data);
    } catch (error) {
      handleNotification({
        isOpen: true,
        message: error?.response?.data?.errors?.[0],
      });
    } finally {
      handleLoadingOverlay(false);
    }
  };

  useEffect(() => {
    getSphpContent();
  }, []);

  return (
    <Layout
      barBackType='secondary'
      barBackTitle='Surat Perjanjian Hutang Piutang'
    >
      {htmlContent && (
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
              Saya telah membaca dan menyetujui Surat Perjanjian Hutang Piutang
            </p>
          </div>
          <Button
            disabled={!isChecked}
            fluid
            className={`${borderNone} ${padding('11px')} ${margin(
              '0px 0px 24px 0px',
            )} ${minHeight(48)} ${fontSize(16)}`}
            onClick={() => {
              history.replace('/rentee/deposit', { from: 'sphp' });
            }}
          >
            Lanjutkan
          </Button>
        </SPHPWrapper>
      )}
    </Layout>
  );
}

export default SPHP;
