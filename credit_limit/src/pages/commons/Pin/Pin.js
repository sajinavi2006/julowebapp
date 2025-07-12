import { useState, useEffect } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';

import { useUserContext } from 'providers/UserProvider';
import { DIALOG_INVALID_FLOW_REGISTER_KLOP } from 'constant';
import Page from 'components/Page';
import utils from 'utils';
import useGlobalState from 'actions';
import back from 'assets/img/icon/ic-back.svg';
import PinInput from 'components/forms/PinInput';
import { checkPinWeakness, validateApplication } from 'services/auth';
import { pinStyle } from './styles';
import DialogInfo from 'components/Dialog/DialogInfo';

const PIN_COUNT = 6;

function Pin() {
  const [state, actions] = useGlobalState();
  const { setDatas } = useUserContext();
  const history = useHistory();
  const { partner } = useParams();
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const appXid = queryParams.get('application_xid');
  const xid = queryParams.get('xid');

  const [pinFirst, setFirstPIN] = useState('');
  const [pinSecond, setSecondPIN] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showDialogInvalidFlowKlop, setShowDialogInvalidFlowKlop] =
    useState(false);
  const [isEligibleRender, setIsEligibleRender] = useState(false);

  const isPartnerKlop = partner === 'klop' && !!appXid && !!xid;
  const isPartnerKlopWithoutParams = partner === 'klop' && !appXid && !xid;

  const reTypePin = async (value) => {
    actions.setState('pinError', null);
    if (pinFirst.length <= PIN_COUNT) {
      setFirstPIN(value);
    }

    if (value.length === PIN_COUNT) {
      actions.openLoadingOverlay();
      try {
        const payload = {
          nik: utils.store.get('nik'),
          pin: value,
        };
        const response = await checkPinWeakness(payload);

        if (response?.data === 'Strong password') {
          actions.setState('isFirstPin', true);
          actions.setState('isReEnterPin', true);
          const input = document.querySelector('input');
          // prevent error if pages load to slow
          input?.focus();

          setIsLoading(false);
          actions.closeLoadingOverlay();
        } else {
          actions.setState('pinError', response?.errors[0]);

          actions.closeLoadingOverlay();
        }
      } catch (error) {
        if (error) {
          actions.closeLoadingOverlay();
          actions.setState(
            'pinError',
            error?.response?.data?.errors?.length > 0
              ? error?.response?.data?.errors[0]
              : error.message,
          );
        }
      }
    }
  };
  const confirmPin = async (value) => {
    actions.setState('pinError', null);

    if (pinSecond.length <= PIN_COUNT) {
      setSecondPIN(value);
    }

    if (value.length === PIN_COUNT) {
      if (pinFirst === value) {
        utils.store.set('pin', pinFirst);
        actions.setState('pin', pinFirst);
        history.replace(`tnc${search}`, { from: 'pin' });
      } else {
        actions.setState('pinError', 'PIN yang Anda ketik tidak sesuai');
      }
    }
  };

  const clearForm = () => {
    actions.setState('pinError', null);
    setFirstPIN('');
    setSecondPIN('');
    actions.setState('isFirstPin', false);
    actions.setState('isReEnterPin', false);
    const input = document.querySelector('input');
    input?.focus();
  };

  const goBack = () => {
    if (!state.isFirstPin) {
      actions.setState('isFirstPin', false);
      history.push(`/${partner}/signup${search}`);
    } else {
      clearForm();
    }
  };

  const validateKlopApplication = async () => {
    try {
      setIsLoading(true);
      const response = await validateApplication({
        application_xid: appXid,
        xid,
      });
      const data = response.data;
      if (data.is_pin_created) {
        utils.store.set('nik', data.nik);
        utils.store.set('token', data.token);
        utils.store.set('partner', partner);

        //set token will be automatically redirect to private route
        setDatas((prev) => ({
          ...prev,
          token: data.token,
          nik: data.nik,
          partner,
        }));
      } else {
        setIsEligibleRender(true);
        utils.store.set('nik', data.nik);
        utils.store.set('expiryPinToken', data.token);
      }
    } catch (error) {
      if (error.response) {
        const data = error.response.data || {};
        actions.setState('pinError', data.errors?.[0]);

        // if application not found then redirect to klop page
        window.location.assign('https://klop.co');
      }
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const nik = utils.store.get('nik');

    if (!nik && !isPartnerKlop) {
      history.push(`/${partner}/signup${search}`);
    }

    if (isPartnerKlopWithoutParams) {
      setShowDialogInvalidFlowKlop(true);
    }

    // for klop partner
    if (appXid && xid) {
      utils.store.set('application_xid', appXid);
      utils.store.set('xid', xid);
      utils.store.set('webType', 'webapp');
      validateKlopApplication();
    } else {
      setIsEligibleRender(true);
    }
  }, []);

  useEffect(() => {
    if (isEligibleRender) {
      clearForm();
    }
  }, [isEligibleRender]);

  return isEligibleRender ? (
    <Page useHeader>
      <div className='authentication-body container-fluid'>
        <div className='row'>
          <div className='col-12 bordered-bottom registration-title justify-content-center'>
            {((isPartnerKlop && state.isFirstPin) || !isPartnerKlop) && (
              <a
                data-testid='back-btn'
                onClick={goBack}
                className='back-trigger'
              >
                <img src={back} alt='' />
              </a>
            )}
            <span className='registration-title__txt'>Buat PIN</span>
          </div>
        </div>
        <div className='row d-flex justify-content-center'>
          <div className='col-md-4 col-lg-3'>
            <div className='auth-form-wrapper position-relative'>
              {!state.isFirstPin ? (
                <h5 className='text-center mb-3'>Ketik PIN Baru</h5>
              ) : (
                <h5 className='text-center mb-3'>Ketik Ulang PIN Baru</h5>
              )}
              <div className='form-group'>
                {!state.isFirstPin ? (
                  <PinInput
                    data-testid='otp-input'
                    disabled={isLoading || isPartnerKlopWithoutParams}
                    numInputs={PIN_COUNT}
                    value={pinFirst}
                    isInputSecure={true}
                    onChange={reTypePin}
                    shouldAutoFocus={true}
                    style={`otp-input`}
                    containerStyle={`otp-container ${pinStyle(pinFirst)}`}
                  />
                ) : state.isReEnterPin ? (
                  <PinInput
                    data-testid='otp-input'
                    disabled={isLoading || isPartnerKlopWithoutParams}
                    numInputs={PIN_COUNT}
                    onChange={confirmPin}
                    value={pinSecond}
                    isInputSecure={true}
                    style={'otp-input'}
                    containerStyle={`otp-container ${pinStyle(pinSecond)}`}
                  />
                ) : null}
              </div>
              <div className='form-group text-center'>
                {state.pinError ? (
                  <span className='d-block pin-error-txt'>
                    {state.pinError}
                  </span>
                ) : !state.isFirstPin ? (
                  <span className='d-block'>
                    Pastikan Anda mengingat PIN ini dan merahasiakannya dari
                    siapapun
                  </span>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>

      <DialogInfo
        clickOutside={false}
        dialogData={DIALOG_INVALID_FLOW_REGISTER_KLOP}
        handleShowDialogInfo={setShowDialogInvalidFlowKlop}
        showDialogInfo={showDialogInvalidFlowKlop}
        handleClickDialogButton={() => {}}
      />
    </Page>
  ) : null;
}

export default Pin;
