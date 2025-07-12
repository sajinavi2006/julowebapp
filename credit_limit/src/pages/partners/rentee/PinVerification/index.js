import React, { useState, useEffect, Fragment } from 'react';
import { useHistory, withRouter, useParams } from 'react-router-dom';
import PinInput from 'components/forms/PinInput';
import Layout from 'components/Layout';
import { useUserContext } from 'providers/UserProvider';
import {
  createLoan,
  checkVerificationCode,
} from 'services/partner/rentee/form';
import { PinVerficationWrapper, LoanIdWrapper } from './styles';
import { Button } from 'assets/css/styled';
import utils from 'utils';

const pinCount = 6;

// this component will be used in 2 pages, pin-verification and seller-verification
// thus, important to determine what page based on 'page' params
function PinVerification() {
  const history = useHistory();
  const { page } = useParams();
  const {
    handleLoadingOverlay,
    isLoadingOverlay,
    handleNotification,
    preTransactionData,
    saveTransactionData,
    transactionData,
  } = useUserContext();
  const isPinVerificationPage = page === 'pin-verification';
  const [pinValue, setPinValue] = useState('');
  const loanXid = transactionData?.loan_xid || utils.store.get('loanXid');

  const guardPinVerificationPage = () => {
    // prevent this page if user doesnt have account_id | loan_amount_request | device_id in user context
    if (isPinVerificationPage) {
      if (
        (!preTransactionData?.account_id &&
          !preTransactionData?.loan_amount_request) ||
        !preTransactionData?.device_id
      ) {
        history.push('/rentee/home');
      }
    }
  };

  // this function will be called if user in pin verification page
  const handleCreateLoan = async (pin) => {
    handleLoadingOverlay(true);
    try {
      const params = {
        account_id: preTransactionData?.account_id,
        loan_amount_request: preTransactionData?.loan_amount_request,
        device_id: preTransactionData?.device_id,
        pin,
      };

      const response = await createLoan(params);
      if (!response.success) {
        const errorMessage = response?.errors?.[0];
        return handleNotification({
          isOpen: true,
          message: errorMessage,
          severity: false,
        });
      }

      saveTransactionData(response.data);
      utils.store.set('loanXid', response?.data?.loan_xid);
      return history.replace('/rentee/transaction-summaries');
    } catch (error) {
      const errorMessage = error?.response?.data?.errors?.[0];
      handleNotification({
        isOpen: true,
        message: errorMessage,
        severity: false,
      });
    } finally {
      handleLoadingOverlay(false);
    }
  };

  // this function will be called if user is in seller verification page
  const handleSellerVerification = async (pin) => {
    handleLoadingOverlay(true);
    try {
      const payload = {
        code: pin,
        loanXID: loanXid,
      };

      const response = await checkVerificationCode(payload);
      if (!response?.data?.result) {
        return handleNotification({
          isOpen: true,
          message: 'Kode verifikasi yang Anda ketik tidak sesuai',
          severity: false,
        });
      }
      return history.push('/rentee/transaction-summaries');
    } catch (error) {
      const errorMessage = error?.response?.data?.errors?.[0];
      handleNotification({
        isOpen: true,
        message: errorMessage,
        severity: false,
      });
    } finally {
      handleLoadingOverlay(false);
    }
  };

  const handleOnChangePin = (pin) => {
    setPinValue(pin);
    handleNotification({ isOpen: false });
    if (pin.length === pinCount) {
      if (isPinVerificationPage) return handleCreateLoan(pin);
    }
  };

  const goToForgotPassword = () => {
    history.push('/rentee/forgot-password');
  };

  const renderSellerInfo = () => {
    return (
      <Fragment>
        <LoanIdWrapper>
          <p>
            Loan XID: <b>{loanXid}</b>
          </p>
        </LoanIdWrapper>
        <p style={{ marginBottom: '30px', padding: '0 50px' }}>
          Tunjukan kode diatas ke sales Erafone untuk mendapatkan kode
          verifikasi
        </p>
      </Fragment>
    );
  };

  const renderConfirmationButton = () => {
    return (
      <Button
        disabled={pinCount !== pinValue.length}
        fluid
        className='pin-verification-confirmation-button'
        onClick={() => {
          handleSellerVerification(pinValue);
        }}
      >
        Konfirmasi
      </Button>
    );
  };

  useEffect(() => {
    guardPinVerificationPage();
  }, []);

  return (
    <PinVerficationWrapper>
      <Layout barBackType='secondary' barBackTitle='Verifikasi'>
        {isPinVerificationPage ? (
          <p className='pin-title'>Ketik PIN</p>
        ) : (
          renderSellerInfo()
        )}
        <PinInput
          disabled={isLoadingOverlay}
          numInputs={pinCount}
          value={pinValue}
          isInputNum={true}
          isInputSecure={true}
          onChange={handleOnChangePin}
          shouldAutoFocus={true}
          style={`otp-input`}
          containerStyle={`otp-container`}
        />
        {isPinVerificationPage ? (
          <p className='pin-forgot-password' onClick={goToForgotPassword}>
            <u>Lupa PIN ?</u>
          </p>
        ) : (
          renderConfirmationButton()
        )}
      </Layout>
    </PinVerficationWrapper>
  );
}

export default withRouter(PinVerification);
