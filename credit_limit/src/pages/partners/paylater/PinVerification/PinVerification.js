import React, { useState, useEffect } from 'react';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import { cx } from '@emotion/css';
import containsNumber from '@julofinance/web-helpers/dist/string/containsNumber';

import utils from 'utils';
import { MAX_WIDTH, LINKAJA_RETRY_TIME } from 'constant';
import { createLoanTransaction } from 'services/partner/paylater';
import { validatePin } from 'services/webview/activation';
import { useUserContext } from 'providers/UserProvider';

import LoaderText from 'components/LoaderText';
import PinInput from 'components/forms/PinInput';
import Layout from 'components/Layout';
import HyperlinkMessage from 'components/Errors/HyperlinkMessage';

import { inputStyle, errorMessage, redColor } from './styles';
import { text, borderBottom } from 'assets/css/stylesValue';
import { Div, Wrapper } from 'assets/css/styled';
import {
  h100,
  h90,
  justifyCenter,
  mt3,
  px3,
  dFlex,
  w100,
  mt5,
  my5,
} from 'assets/css/stylesFix';
import { useApplicationSubmissionResolver } from 'pages/commons/Applications/hooks';
import AccountConnected from '../components/Dialog/AccountConnected';
import Block from '../components/Dialog/Block';
import BlockPermanent from '../components/Dialog/BlockPermanent';

/**
 * Route: /paylater/:type(pin-verification|pin-form|pin-transaction)
 * Access: Private
 */
const PinVerification = () => {
  const history = useHistory();
  const { pathname } = useLocation();
  const [showDialog, setShowDialog] = useState(false);
  const { type } = useParams();
  const { submitForm } = useApplicationSubmissionResolver('paylater');
  const {
    datas,
    setDatas,
    preTransactionData,
    handleLoadingOverlay,
    saveTransactionData,
    handleNotification,
  } = useUserContext();

  const theme = useTheme();
  const themeColor = theme?.colors;
  const themeText = theme?.text;
  const [pin, setPin] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messageError, setMessageError] = useState('');
  const [showError, setShowError] = useState(false);
  const [showBlocked, setShowBlocked] = useState(false);
  const [showBlockedPermanent, setShowBlockedPermanent] = useState(false);

  let retryFetch = 1;

  useEffect(() => {
    handleLoadingOverlay(false);
  }, []);

  const showBlockedPopup = (error) => {
    // show blocked dialog
    if (error.includes('1 Menit')) {
      setShowBlocked(true);
    } else if (error.includes('2 Menit')) {
      setShowBlocked(true);
    } else if (error.includes('permanen')) {
      setShowBlocked(false);
      setShowBlockedPermanent(true);
    } else {
      setShowBlocked(false);
      setShowBlockedPermanent(false);
    }
  };
  const callCreateLoanTransaction = async () => {
    try {
      const payload = {
        applicationId: preTransactionData.application_id,
        transactionXid: preTransactionData.paylater_transaction_xid,
        loanAmount: preTransactionData?.loan_amount_request,
        loanDuration: preTransactionData?.loan_duration,
        loanPurpose: preTransactionData?.loan_purpose,
      };

      setIsLoading(true);
      const result = await createLoanTransaction(payload);
      if (result?.success) {
        saveTransactionData({
          ...result.data,
          transaction_amount: preTransactionData.transaction_amount,
        });
        utils.store.set('loanXid', result?.data?.loan_xid);
        history.replace('/paylater/agreement-summaries');
      } else {
        const errorMessage = Array.isArray(result?.errors)
          ? result?.errors?.[0]
          : result?.errors;

        handleNotification({
          isOpen: true,
          message: errorMessage,
        });
      }
      setIsLoading(false);
    } catch (error) {
      // Recursive Function looping `LINKAJA_RETRY_TIME` times
      const statusCode = error?.response?.status;
      /**
       * Status Code 408 = Time out
       * if after fetching http status code return 408,
       * retry will be start
       */
      if (retryFetch <= LINKAJA_RETRY_TIME && statusCode === 408) {
        callCreateLoanTransaction();
        retryFetch++;
        return;
      } else {
        const errorMessage = Array.isArray(error?.response?.data?.errors)
          ? error?.response?.data?.errors?.[0]
          : error?.response?.data?.errors;
        setIsLoading(false);
        setShowError(true);
        setMessageError(<HyperlinkMessage errorMessage={errorMessage} />);
      }
    }
  };

  const callPinTransaction = async (value) => {
    try {
      const payload = {
        pin: value,
      };

      setIsLoading(true);
      const result = await validatePin(payload);

      if (result?.success) {
        return callCreateLoanTransaction();
      }
      setIsLoading(false);
    } catch (error) {
      const errorMessage =
        error?.response?.data?.errors?.[0] ||
        'Sedang ada gangguan, silakan coba lagi.';

      showBlockedPopup(errorMessage);
      setIsLoading(false);
      setShowError(true);
      setMessageError(errorMessage);
    }
  };

  const callPinVerification = async (value) => {
    try {
      const payload = {
        pin: value,
      };

      setIsLoading(true);
      const result = await validatePin(payload);

      if (result?.success) {
        // store token to be used in the future
        utils.store.set({
          webType: 'webapp',
        });

        setDatas({
          ...datas,
          webType: 'webapp',
        });

        return setShowDialog(true);
      }
      setShowDialog(false);
      setIsLoading(false);
      setShowError('Sedang ada gangguan, silakan coba lagi.');
    } catch (error) {
      const errorMessage =
        error?.response?.data?.errors?.[0] ||
        'Sedang ada gangguan, silakan coba lagi.';

      showBlockedPopup(errorMessage);
      setIsLoading(false);
      setShowError(true);
      setMessageError(errorMessage);
    }
  };

  const callLongformSubmission = (value) => {
    submitForm(value);
  };

  const submitPin = (value) => {
    switch (type) {
      case 'pin-verification':
        callPinVerification(value);
        break;
      case 'pin-form':
        callLongformSubmission(value);
        break;
      case 'pin-transaction':
        callPinTransaction(value);
        // PLEASE INPUT PIN TRANSACTION API CALL HERE
        break;
      default:
        break;
    }
  };

  const handleOnPinChange = (value) => {
    if (containsNumber(value)) {
      setPin(value);
      setShowError(false);
      setMessageError('');
      if (value.length === 6) {
        return submitPin(value);
      }
      setIsLoading(false);
      setShowError(false);
      return setMessageError('');
    }
    setPin('');
  };

  return (
    <Layout hideNavbar={true}>
      <Wrapper maxWidth={MAX_WIDTH} className={cx(h90, px3)}>
        <Div className={cx(h100)}>
          <Div
            className={cx(text({ color: themeText?.primary }))}
            textAlign='center'
          >
            <Div className={cx(text({ size: 14, weight: 'bold' }))}>
              Ketik PIN JULO
            </Div>
          </Div>
          <Div className={mt3}>
            <PinInput
              disabled={isLoading}
              numInputs={6}
              value={pin}
              isInputNum={true}
              isInputSecure={true}
              onChange={handleOnPinChange}
              shouldAutoFocus={true}
              style={cx(inputStyle, {
                [borderBottom(
                  `1px solid ${themeColor?.borderLight}!important`,
                )]: pin.length < 6,
                [redColor]: showError,
              })}
              containerStyle={cx(dFlex, justifyCenter, w100)}
            />
          </Div>

          <Div>
            <Div className={cx(errorMessage, my5)} textAlign='center'>
              {showError ? messageError : <>&nbsp;&nbsp;</>}
            </Div>
            {isLoading ? <LoaderText /> : null}
          </Div>
          <Div textAlign='center' className={cx(mt5)}>
            <Div
              textDecoration='underline'
              cursor='pointer'
              onClick={() => history.push('reset-pin')}
            >
              Lupa PIN ?
            </Div>
          </Div>
        </Div>

        {/* Dialog */}
        {pathname.includes('pin-verification') && (
          <AccountConnected
            showDialog={showDialog}
            setShowDialog={setShowDialog}
            redirectURL='/paylater/transactions'
          />
        )}
        <Block
          errorMessage={messageError}
          showDialog={showBlocked}
          setShowDialog={setShowBlocked}
        />
        <BlockPermanent
          showDialog={showBlockedPermanent}
          setShowDialog={setShowBlockedPermanent}
        />
        {/* End Dialog */}
      </Wrapper>
    </Layout>
  );
};

export default PinVerification;
