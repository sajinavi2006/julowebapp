import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Webcam from 'react-webcam';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

import CameraPhoto, { FACING_MODES } from 'jslib-html5-camera-photo';

import { MAX_WIDTH, MIN_WIDTH } from 'constant';
import useGlobalState from 'actions';

import DialogCamera from 'components/Dialog/DialogCamera';

import circle from 'assets/img/circle.png';
import leftArrow from 'assets/img/icon/ic-back.svg';
import ktpPhotoFrame from 'assets/img/ktp_photo_frame.png';

import { Button, ButtonOutline, Div } from 'assets/css/styled';
import { backCameraUniversalCx } from './styles';

const isMobile =
  /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile/i.test(
    navigator.userAgent,
  );
const desktopVideoConstraints = {
  width: 1400,
  height: 976,
  facingMode: 'user',
};

const mobileVideoConstraints = {
  width: 1400,
  height: 976,
  facingMode: 'environment',
};

const BackCameraUniversal = (props) => {
  const [state, actions] = useGlobalState();

  const [isTaken, setIsTaken] = useState(false);
  const [cameraResult, setCameraResult] = useState('');
  const [cameraPhoto, setCameraPhoto] = useState(() => {});
  const [cameraViewControl, _setCameraViewControl] = useState(null);
  const [cameraOutputControl, setCameraOutputControl] = useState(null);
  const [dialogGuidance, setDialogGuidance] = useState(props?.dialogData);

  const webcamRef = useRef(null);

  useEffect(() => {
    if (props?.type === 'ktp' || props?.type === 'ktp_self') {
      setDialogGuidance((prev) => ({
        ...prev,
        ...props.dialogData,
      }));
    }
  }, [props?.dialogData]);

  useEffect(() => {
    actions.closeLoadingOverlay();

    return () => actions.setState('isPhotoDialogShown', false);
  }, []);

  return (
    <Dialog
      open={state.isPhotoDialogShown}
      onClose={() => actions.setState('isPhotoDialogShown', false)}
      fullScreen
      PaperProps={{
        style: {
          backgroundColor: '#000',
        },
      }}
    >
      <DialogContent css={backCameraUniversalCx} style={{ padding: '0px' }}>
        <div
          className='camera'
          style={{ backgroundColor: '#222222', height: '100vh' }}
        >
          <div
            style={{ cursor: 'pointer', padding: '16px', color: '#ffffff' }}
            onClick={() => {
              try {
                setIsTaken(false);
                if (cameraPhoto.stream) {
                  cameraPhoto.stopCamera();
                }
              } catch (error) {
                actions.setState('isPhotoDialogShown', false);
                if (props.onCancel) props.onCancel(true);
              } finally {
                if (props.onCancel) props.onCancel(true);
                actions.setState('isPhotoDialogShown', false);
              }
            }}
          >
            <img src={leftArrow} style={{ marginRight: '20px' }} />
            <span style={{ fontWeight: 'bold', fontSize: '16px' }}>
              Foto {props.name}
            </span>
          </div>
          <div
            style={{
              width: '100%',
              height: '100%',
              position: 'fixed',
            }}
          >
            <div style={{ height: '225px', width: '350px' }}>
              <Webcam
                audio={false}
                mirrored={false}
                ref={webcamRef}
                width={350}
                height={225}
                screenshotFormat='image/jpeg'
                videoConstraints={
                  isMobile ? mobileVideoConstraints : desktopVideoConstraints
                }
                className='webcam'
                forceScreenshotSourceSize
              />
              {props.type === 'ktp_self' && !isTaken && (
                <img
                  style={{
                    height: '225px',
                    width: '350px',
                    position: 'fixed',
                    left: 'calc(50% - 175px)',
                    marginTop: '50px',
                  }}
                  src={ktpPhotoFrame}
                />
              )}
            </div>
            <div className='cameraTriggerContainerBack'>
              {isTaken ? (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    align: 'center',
                    left: '0%',
                    bottom: '5%',
                    transform: 'translate(0%, -50%)',
                  }}
                >
                  <ButtonOutline
                    borderless
                    style={{ width: '100px' }}
                    className='text-white mx-3'
                    onClick={() => {
                      setIsTaken(false);
                      const tempCameraPhoto = new CameraPhoto(
                        cameraViewControl,
                      );

                      setCameraPhoto(tempCameraPhoto);

                      tempCameraPhoto
                        .startCameraMaxResolution(FACING_MODES.ENVIRONMENT)
                        .then(() => {})
                        .catch(() => {});

                      setCameraOutputControl({
                        ...cameraOutputControl,
                        src: '//:0',
                      });

                      webcamRef.current?.video?.play();
                      setCameraResult('');

                      if (props.onImageRetry) {
                        props.onImageRetry();
                      }
                    }}
                  >
                    Foto Ulang
                  </ButtonOutline>
                  <Button
                    types='primary'
                    style={{ width: '100px' }}
                    className='mx-3'
                    onClick={() => {
                      if (props.onImageSubmitted) {
                        props.onImageSubmitted(cameraResult);
                        actions.setState('isPhotoDialogShown', false);
                      }
                    }}
                  >
                    OK
                  </Button>
                </div>
              ) : (
                <img
                  alt='Take Photo'
                  src={circle}
                  style={{
                    cursor: 'pointer',
                    display: 'block',
                    position: 'fixed',
                    left: '50%',
                    bottom: '5%',
                    transform: 'translate(-50%, -50%)',
                  }}
                  onClick={() => {
                    const imageCapture = webcamRef?.current?.getScreenshot();
                    webcamRef.current?.video?.pause();
                    setIsTaken(true);
                    setCameraResult(imageCapture);
                    if (props.onImageTaken) {
                      props.onImageTaken(imageCapture);
                    }
                  }}
                />
              )}
            </div>
          </div>
          <Div maxWidth={MAX_WIDTH} minWidth={MIN_WIDTH} position='absolute'>
            {dialogGuidance?.content ? (
              <DialogCamera data={dialogGuidance} />
            ) : null}
          </Div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

BackCameraUniversal.propTypes = {
  dialogData: PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.any,
  }),
  onCancel: PropTypes.func,
  type: PropTypes.any,
  name: PropTypes.string,
  onImageTaken: PropTypes.func,
  onImageRetry: PropTypes.func,
  onImageSubmitted: PropTypes.func,
};

export default BackCameraUniversal;
