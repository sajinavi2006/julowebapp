import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import containsNumber from '@julofinance/web-helpers/dist/string/containsNumber';
import { cx } from '@emotion/css';

import utils from 'utils';
import { MAX_WIDTH, LINKAJA_RETRY_TIME } from 'constant';
import {
  loginPin,
  createLoanTransaction,
  verifyPinPartner,
} from 'services/partner/common/partnership';
import { useUserContext } from 'providers/UserProvider';

import LoaderText from 'components/LoaderText';
import PinInput from 'components/forms/PinInput';
import Layout from 'components/Layout';
import HyperlinkMessage from 'components/Errors/HyperlinkMessage';

import { inputStyle, errorMessage, redColor } from './styles';
import { text } from 'assets/css/stylesValue';
import { Div, Wrapper } from 'assets/css/styled';
import { h100, h90, justifyCenter, mt3, my3, px3 } from 'assets/css/stylesFix';
import { borderBottom } from 'assets/css/stylesValue';
import { dFlex } from 'assets/css/stylesFix';
import { w100 } from 'assets/css/stylesFix';
import { mt5 } from 'assets/css/stylesFix';
import { useApplicationSubmissionResolver } from 'pages/commons/Applications/hooks';

import { MaxPlatformLoanDialog, LoansExceedsIncomeDialog } from './components';

/**
 * Route: /linkaja/:type(pin-verification|pin-form|pin-transaction)
 * Access: Private
 */
const PinVerification = () => {
  const history = useHistory();
  const { type } = useParams();
  const { submitForm } = useApplicationSubmissionResolver('linkaja');
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
  const [showMaxPlatformLoanDialog, setShowMaxPlatformLoanDialog] =
    useState(false);
  const [showLoanExceedsIncomeDialog, setShowLoanExceedsIncomeDialog] =
    useState(false);

  let retryFetch = 1;

  const callPinVerification = async (value) => {
    try {
      const payload = {
        nik: utils?.store?.get('nik'),
        pin: value,
        web_version: '0.0.1',
        partner_name: 'linkaja',
      };

      if (utils.store.get('latitude')) {
        payload['latitude'] = utils.store.get('latitude');
      }

      if (utils.store.get('longitude')) {
        payload['longitude'] = utils.store.get('longitude');
      }

      setIsLoading(true);
      const result = await loginPin(payload);
      if (result?.success) {
        const application = result?.data?.applications?.[0];
        const customer = result?.data?.customer;
        const token = result?.data?.token;

        // store token to be used in the future
        utils.store.set({
          webType: 'webapp',
          partner: application?.partner_name,
          token: token,
          appStatus: application?.status,
          applicationId: application?.id,
          customerId: customer?.id,
          fullname: customer?.fullname,
          email: customer?.email,
          nik: customer?.nik,
          phone: customer?.phone,
        });

        setDatas({
          ...datas,
          webType: 'webapp',
          partner: application?.partner_name,
          token: token,
          appStatus: application?.status,
          applicationId: application?.id,
          customerId: customer?.id,
          fullname: customer?.fullname,
          email: customer?.email,
          nik: customer?.nik,
          phone: customer?.phone,
        });

        // go to home if success
        return history.replace('/linkaja/home');
      }
      setIsLoading(false);
      setShowError('Sedang ada gangguan, silakan coba lagi.');
    } catch (error) {
      setIsLoading(false);
      setShowError(true);
      setMessageError(error?.response?.data?.errors?.[0]);
    }
  };

  const callLongformSubmission = (value) => {
    submitForm({ pin: value });
  };

  const callCreateLoanTransaction = async () => {
    try {
      const payload = {
        applicationId: preTransactionData.application_id
          ? parseInt(preTransactionData?.application_id)
          : undefined,
        loanAmount: preTransactionData?.loan_amount_request,
        loanDuration: preTransactionData?.loan_duration,
        loanPurpose: preTransactionData?.loan_purpose,
      };

      setIsLoading(true);
      const result = await createLoanTransaction(payload);
      if (result?.success) {
        saveTransactionData(result.data);
        utils.store.set('loanXid', result?.data?.loan_xid);
        history.replace('/linkaja/agreement-summaries');
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
      const errorData = error.response.data.data;
      const errorMessage = Array.isArray(error?.response?.data?.errors)
        ? error?.response?.data?.errors?.[0]
        : error?.response?.data?.errors;

      if (statusCode === 400) {
        if (errorData?.max_3_platform) {
          setShowMaxPlatformLoanDialog(true);
        } else if (errorData?.dbr_exceeded) {
          setShowLoanExceedsIncomeDialog(true);
        }
      }
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
        setIsLoading(false);
        setShowError(true);
        setMessageError(<HyperlinkMessage errorMessage={errorMessage} />);
      }

      if (statusCode === 400) {
        if (errorData?.max_3_platform) {
          setShowMaxPlatformLoanDialog(true);
          setMessageError('');
        } else if (errorData?.dbr_exceeded) {
          setShowLoanExceedsIncomeDialog(true);
          setMessageError('');
        }
      }
    }
  };

  const callPinTransaction = async (value) => {
    try {
      const payload = {
        nik: utils?.store?.get('nik'),
        pin: value,
      };

      setIsLoading(true);
      const result = await verifyPinPartner(payload);
      if (result?.success) {
        return callCreateLoanTransaction();
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setShowError(true);
      setMessageError(error?.response?.data?.errors?.[0]);
    }
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

  useEffect(() => {
    handleLoadingOverlay(false);
  }, []);

  return (
    <Layout barBackTitle={'Verifikasi'} barBackType='secondary'>
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
          <Div textAlign='center' className={cx(mt5)}>
            <Div
              textDecoration='underline'
              cursor='pointer'
              onClick={() => history.push('reset-pin')}
            >
              Lupa Pin?
            </Div>
          </Div>
          <Div>
            <Div className={cx(errorMessage, my3)} textAlign='center'>
              {showError ? messageError : <>&nbsp;&nbsp;</>}
            </Div>
            {isLoading ? <LoaderText /> : null}
          </Div>
        </Div>
      </Wrapper>
      <MaxPlatformLoanDialog show={showMaxPlatformLoanDialog} />
      <LoansExceedsIncomeDialog show={showLoanExceedsIncomeDialog} />
    </Layout>
  );
};

export default PinVerification;
