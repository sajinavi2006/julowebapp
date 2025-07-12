import React, { useCallback, useRef, useState } from 'react';
import Webcam from 'react-webcam';

import { useUserContext } from 'providers/UserProvider';
import { MAX_WIDTH } from 'constant';

import shutter from 'assets/img/shutter.svg';
import bgSelfie from 'assets/img/frame_selfie.svg';

import { FrontCameraProps } from './types';
import {
  frontCameraCx,
  frontCameraContainer,
  wrapperActionButton,
  wrapperCamera,
} from './styles';
import { Button, Wrapper } from 'assets/css/styled';

import DialogGuidance from './components/dialog-guidance';

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

const width = 600;
const height = 450;

const windowHeight = window.innerHeight;

const FrontCamera = (props: FrontCameraProps) => {
  const { onTakePhoto, setImage } = props;
  const webcamRef = useRef<Webcam>(null);
  const { handleLoadingOverlay } = useUserContext();
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [showWebcam, setShowWebcam] = useState(true);

  const capture = useCallback(() => {
    const imageCapture = webcamRef?.current?.getScreenshot();
    setImgSrc(imageCapture || '');
    setShowWebcam(false);
  }, [webcamRef]);

  const handleTakePhoto = (value: string) => {
    switch (value) {
      case 'take photo':
        capture();
        break;
      case 'retake photo':
        setImgSrc('');
        setShowWebcam(true);
        break;
      case 'confirm photo':
        setImage?.(imgSrc || '');
        onTakePhoto('close');
        break;
      default:
        break;
    }
  };

  const handleCameraLoad = (value: { active: unknown }) => {
    if (value?.active) {
      handleLoadingOverlay(false);
    }
  };

  return (
    <div className={frontCameraContainer(MAX_WIDTH)}>
      <div className={frontCameraCx}>
        <div className='cameraContainer'>
          <div className='camHeaderInstruction'>
            Pastikan posisi wajah dan KTP di dalam bingkai
          </div>
          <div
            className={wrapperCamera}
          >
            {showWebcam ? (
              <Webcam
                audio={false}
                mirrored={false}
                ref={webcamRef}
                screenshotFormat='image/jpeg'
                width={width}
                height={height}
                videoConstraints={
                  windowHeight < 700
                    ? mobileVideoConstraints
                    : desktopVideoConstraints
                }
                onUserMedia={(e) => handleCameraLoad(e)}
                className='webcam'
                forceScreenshotSourceSize
              />
            ) : (
              <img className='preview' width={width} height={height} src={imgSrc || ''} alt='Photo' />
            )}
            <img className={'frameCamera'} width={width} height={height} src={bgSelfie || ''} alt='Photo' />
          </div>
        </div>
        <Wrapper className='camFooterContainer'>
          {imgSrc ? (
            <div className={wrapperActionButton}>
              <Button
                fluid
                onClick={() => handleTakePhoto('retake photo')}
                className='leftActionButton buttonOutline'
              >
                Foto Ulang
              </Button>

              <Button
                fluid
                onClick={() => handleTakePhoto('confirm photo')}
                className='rightActionButton'
              >
                Lanjutkan
              </Button>
            </div>
          ) : (
            <div className='shutterContainer'>
              <img
                src={shutter}
                alt='Take Photo'
                className='shutter'
                onClick={() => handleTakePhoto('take photo')}
              />
            </div>
          )}
        </Wrapper>
      </div>

      {!imgSrc && <DialogGuidance />}
    </div>
  );
};

export default FrontCamera;
