import { useState, useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import formatDate from '@julofinance/web-helpers/dist/date/formatDate';
import { cx } from '@emotion/css';
import { useHistory } from 'react-router-dom';


import {
  uploadSignature,
  finishingLoanStatus,
} from 'services/partner/common/partnership';

import { useUserContext } from 'providers/UserProvider';
import utils from 'utils';

import Layout from 'components/Layout';
import Dialog from 'components/Dialog';

import {
  DialogButton,
  DialogContent,
  DialogFooterWrapper,
  DialogHeader,
  DialogWrapper,
  SignatureBoxWrapper,
  SignatureCanvasBox,
  SignatureContainer,
  SignatureContent,
  SignatureClickDescription,
  SignatureWrapper,
} from './styles';
import { Button } from 'assets/css/styled';
import { borderNone } from 'assets/css/stylesFix';
import { padding, marginBottom, minHeight } from 'assets/css/stylesValue';

import { LINKAJA_RETRY_TIME } from 'constant';

function Signature() {
  const history = useHistory();
  const {
    datas,
    convertDataURLtoFile,
    handleLoadingOverlay,
    handleNotification,
    transactionData,
    saveTransactionData,
  } = useUserContext();
  const todayDate = formatDate();
  const [showModal, setShowModal] = useState(false);
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  const [signatureValue, setSignatureValue] = useState('');
  const sigCanvas = useRef(null);
  const loanXid = transactionData?.loan_xid || utils.store.get('loanXid');

  let retryFetch = 1;

  const clearSignature = () => {
    sigCanvas?.current?.clear();
    setSignatureValue('');
  };

  const cancelSignature = () => {
    sigCanvas?.current?.clear();
    setSignatureValue('');
    setShowModal(false);
  };

  const saveSignature = () => {
    if (signatureValue) {
      setShowModal(false);
    }
  };

  const openModal = () => {
    setShowModal(true);
  };

  const handleFinishingLoanStatus = async () => {
    try {
      await finishingLoanStatus(loanXid);
      saveTransactionData({
        ...transactionData,
        isTransactionSuccess: true,
      });
      utils.store.removeItem('loanXid');
      utils.store.removeItem('preTransactionData');
      utils.store.removeItem('transactionData');
      utils.store.removeItem('loanStatus');

      return history.replace('/linkaja/home');
    } catch (error) {
      const errorData = error?.response?.data || {};

      const errMessage =
        errorData.errors?.length > 0
          ? errorData.errors?.[0]
          : error?.message || '';
      // Recursive Function looping `LINKAJA_RETRY_TIME` times
      const statusCode = error?.response?.status;
      /**
       * Status Code 408 = Time out
       * if after fetching http status code return 408,
       * retry will be start
       */
      if (retryFetch <= LINKAJA_RETRY_TIME && statusCode === 408) {
        handleFinishingLoanStatus();
        retryFetch++;
        return;
      } else if (statusCode === 400 && errMessage.responseCode == 51) {
        handleNotification({
          isOpen: true,
          message: 'Terjadi kesalahan, silahkan coba lagi',
        });

        handleLoadingOverlay(false);
      } else if (statusCode == 429) {
        handleNotification({
          isOpen: true,
          message: 'Terjadi kesalahan, silahkan coba lagi dalam 1 jam',
        });

        handleLoadingOverlay(false);
      } else {
        handleNotification({
          isOpen: true,
          message: 'Terjadi kesalahan, silahkan coba beberapa saat lagi',
        });

        handleLoadingOverlay(false);
      }
    }
  };

  const handleSubmitSignature = async () => {
    handleLoadingOverlay(true);
    handleNotification({ isOpen: false });
    const parseSignature = convertDataURLtoFile(
      signatureValue,
      `${Math.random(10)}.jpg`,
    );
    const payload = {
      loanXID: loanXid,
      base64Data: parseSignature,
    };
    try {
      await uploadSignature(payload);

      return handleFinishingLoanStatus();
    } catch (error) {
      handleNotification({
        isOpen: true,
        message: error?.response?.data?.errors?.[0],
      });

      handleLoadingOverlay(false);
    }
  };

  const renderSignatureCanvas = () => {
    return (
      <SignatureCanvasBox className='signature-canvas-box'>
        <SignatureCanvas
          backgroundColor={'transparent'}
          ref={sigCanvas}
          penColor='black'
          canvasProps={{
            width: 472,
            height: 242,
          }}
          onBegin={() => setShowPlaceholder(false)}
          onEnd={() => {
            const trimmedCanv = sigCanvas?.current?.getTrimmedCanvas();
            const base64data = trimmedCanv.toDataURL();

            setSignatureValue(base64data);
          }}
        />
      </SignatureCanvasBox>
    );
  };

  const renderModalSignature = () => {
    return (
      <Dialog
        stylesDialog={{ width: '100%' }}
        baseColor={`#000`}
        clickOutside={false}
        padding={`0px`}
        show={showModal}
      >
        <DialogWrapper>
          <DialogHeader>Tanda Tangan</DialogHeader>
          <DialogContent>
            {renderSignatureCanvas()}
            {showPlaceholder && (
              <p>Gunakan jari Anda untuk tanda tangan di sini</p>
            )}
          </DialogContent>
          <DialogFooterWrapper>
            <DialogButton
              onClick={cancelSignature}
              className='dialog-cancel-button'
            >
              Batal
            </DialogButton>
            <DialogButton
              onClick={clearSignature}
              className={cx({
                'dialog-clear-button': true,
                'dialog-disable-button': !signatureValue,
              })}
            >
              Ulangi
            </DialogButton>
            <DialogButton
              onClick={saveSignature}
              className={cx({
                'dialog-save-button': true,
                'dialog-disable-button': !signatureValue,
              })}
            >
              Simpan
            </DialogButton>
          </DialogFooterWrapper>
        </DialogWrapper>
      </Dialog>
    );
  };

  return (
    <SignatureContainer>
      <Layout barBackType='secondary' barBackTitle='Tanda Tangan Elektronik'>
        <SignatureWrapper>
          <div>
            <p>
              Lakukan tanda tangan elektronik sebagai tanda menyetujui Surat
              Perjanjian Hutang Piutang.
            </p>
            <SignatureContent>
              <p>{todayDate}</p>

              <SignatureBoxWrapper onClick={openModal}>
                {signatureValue && <img src={signatureValue} />}
                {!signatureValue && (
                  <SignatureClickDescription>
                    Klik disini untuk menandatangani surat
                  </SignatureClickDescription>
                )}
              </SignatureBoxWrapper>

              <p>( {datas.fullname} )</p>
            </SignatureContent>
          </div>
          <Button
            disabled={!signatureValue || showModal}
            fluid
            className={`${borderNone} ${padding('11px')} ${marginBottom(
              '24px',
            )} ${minHeight(48)}`}
            onClick={handleSubmitSignature}
          >
            Lanjutkan
          </Button>
        </SignatureWrapper>
      </Layout>
      {renderModalSignature()}
    </SignatureContainer>
  );
}

export default Signature;
