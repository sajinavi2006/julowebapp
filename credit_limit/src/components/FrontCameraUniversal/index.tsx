import './styles.scss';

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

import CameraPhoto, { FACING_MODES } from 'jslib-html5-camera-photo';

import { MIN_WIDTH } from 'constant';
import useGlobalState from 'actions';

import DialogCamera from 'components/Dialog/DialogCamera';

import circle from 'assets/img/circle.png';
import leftArrow from 'assets/img/icon/ic-back.svg';
import selfiePhotoLarge from 'assets/img/background/bg-photo_selfie_large.png';

import { Button, ButtonOutline, Div } from 'assets/css/styled';
import { useUserContext } from 'providers/UserProvider';

function useWindowSize() {
  const [size, setSize] = useState(0);
  useLayoutEffect(() => {
    function updateSize() {
      setSize(window.innerHeight);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}

interface IProps {
  dialogData?: {
    title?: string;
    content?: React.ReactNode;
  };
  type?: string;
  name?: string;
  onCancel?: (e?: boolean) => void;
  onImageTaken?: (e?: string) => void;
  onImageRetry?: () => void;
  onImageSubmitted?: (e?: string) => void;
}

const desktopVideoConstraints = {
  width: 1400,
  height: 976,
  facingMode: 'user',
};

const mobileVideoConstraints = {
  width: 1400,
  height: 976,
  facingMode: 'user',
};

const windowHeight = window.innerHeight;

const FrontCameraUniversal: React.FC<IProps> = (props): JSX.Element => {
  const { handleNotification } = useUserContext();
  const [state, actions] = useGlobalState();
  const height = useWindowSize();
  const webcamRef = useRef<Webcam>(null);
  const [isTaken, setIsTaken] = useState(false);
  const [isRendered, setIsRendered] = useState(false);
  const [cameraResult, setCameraResult] = useState('');
  const [cameraPhoto, setCameraPhoto] = useState<CameraPhoto>();
  const [cameraViewControl, _setCameraViewControl] =
    useState<HTMLVideoElement>();
  const [cameraOutputControl, setCameraOutputControl] = useState<{
    src?: string;
  }>({});
  const [dialogGuidance, setDialogGuidance] = useState(props?.dialogData);

  useEffect(() => {
    if (props?.type === 'selfie') {
      setDialogGuidance((prev) => ({
        ...prev,
        ...props.dialogData,
      }));
    }
  }, [props?.dialogData]);

  useEffect(() => {
    if (cameraPhoto?.stream) {
      cameraPhoto.stopCamera();
    }

    if (!state.isSelfiePhotoDialogShown || !cameraViewControl || isRendered) {
      return;
    }

    (async () => {
      actions.openLoadingOverlay();
      const tempCameraPhoto = new CameraPhoto(cameraViewControl);
      setCameraPhoto(tempCameraPhoto);

      try {
        await tempCameraPhoto.startCamera(FACING_MODES.USER, {});

        setIsRendered(true);
      } catch (error) {
        const errorName = (error as Error)?.name;
        handleNotification({
          isOpen: true,
          message:
            errorName === 'NotAllowedError'
              ? 'Mohon aktifkan permintaan akses kamera'
              : 'Ada gangguan kamera, silakan coba lagi',
        });
      } finally {
        actions.closeLoadingOverlay();
      }
    })();
  }, [cameraViewControl]);

  useEffect(() => {
    actions.closeLoadingOverlay();

    return () => actions.setState('isSelfiePhotoDialogShown', false);
  }, []);

  return (
    <Dialog
      open={state.isSelfiePhotoDialogShown || false}
      onClose={() => actions.setState('isSelfiePhotoDialogShown', false)}
      fullScreen
      PaperProps={{
        style: {
          backgroundColor: '#000',
        },
      }}
    >
      <DialogContent style={{ padding: '0px' }}>
        <div
          className='camera'
          style={{ backgroundColor: '#222222', height: '100vh' }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              position: 'fixed',
            }}
          >
            <Webcam
              audio={false}
              mirrored={false}
              ref={webcamRef}
              screenshotFormat='image/jpeg'
              videoConstraints={
                windowHeight < 700
                  ? mobileVideoConstraints
                  : desktopVideoConstraints
              }
              className='cameraViewFront'
              forceScreenshotSourceSize
            />
            <div
              style={{
                cursor: 'pointer',
                padding: '16px',
                color: '#ffffff',
                position: 'fixed',
                zIndex: '99991',
              }}
              onClick={() => {
                try {
                  setIsRendered(false);
                  setIsTaken(false);
                  if (cameraPhoto?.stream) {
                    cameraPhoto?.stopCamera();
                  }
                } catch (error) {
                  if (props.onCancel) props.onCancel(true);
                  actions.setState('isSelfiePhotoDialogShown', false);
                } finally {
                  if (props.onCancel) props.onCancel(true);
                  actions.setState('isSelfiePhotoDialogShown', false);
                }
              }}
            >
              <img src={leftArrow} style={{ marginRight: '20px' }} />
              <span style={{ fontWeight: 'bold', fontSize: '16px' }}>
                Foto {props.name}
              </span>
            </div>
            <div
              className='cameraTriggerContainerFront'
              style={{ zIndex: '99991', position: 'fixed' }}
            >
              {isTaken ? (
                <div
                  style={{
                    display: 'block',
                    width: window.innerWidth,
                    alignItems: 'center',
                    paddingRight: '16px',
                    bottom: '5%',
                    transform: 'translate(0%, -50%)',
                  }}
                >
                  <ButtonOutline
                    borderless='true'
                    style={{ width: '100px' }}
                    className='text-white mx-3'
                    onClick={() => {
                      setIsTaken(false);

                      const tempCameraPhoto =
                        cameraViewControl && new CameraPhoto(cameraViewControl);

                      setCameraPhoto(tempCameraPhoto);

                      tempCameraPhoto?.startCameraMaxResolution(
                        FACING_MODES.USER,
                      );

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
                    const imageCapture =
                      webcamRef?.current?.getScreenshot() ?? '';
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
            {!isTaken && (
              <div
                style={{
                  height: '100vh',
                  position: 'relative',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <img
                  style={{
                    position: 'absolute',
                    zIndex: '99990',
                    height: height,
                  }}
                  src={selfiePhotoLarge}
                />
              </div>
            )}
          </div>
          <Div minWidth={MIN_WIDTH} position='absolute'>
            {dialogGuidance?.content ? (
              <DialogCamera data={dialogGuidance || null} />
            ) : (
              ''
            )}
          </Div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FrontCameraUniversal;
