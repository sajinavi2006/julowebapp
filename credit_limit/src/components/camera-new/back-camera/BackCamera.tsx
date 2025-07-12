import React, { useCallback, useRef, useState } from 'react';
import { cx } from '@emotion/css';
import Webcam from 'react-webcam';

import { useUserContext } from 'providers/UserProvider';

import shutter from 'assets/img/shutter.svg';
import icRotateLeft from 'assets/img/icon/ic-rotate-left.svg';
import icRotateRight from 'assets/img/icon/ic-rotate-right.svg';
import bgPhotoFrame from 'assets/img/ktp_photo_frame_new.png';

import { Button, Col, Row, Wrapper } from 'assets/css/styled';
import { cursorPointer } from 'assets/css/stylesFix';

import {
  backCameraCx,
  camContainer,
  camHeaderInstruction,
  camWrapper,
  defaultCenter,
  photoResult,
  webcamCx,
  wrapperActionButton,
  wrapperImageCx,
  wrapperRotateButton,
  wrapperShutter,
  wrapperWebcamCx,
} from './styles';

import { idCardTemplate } from './constant';
import { BackCameraProps } from './types';

import DialogGuidance from './components/dialog-guidance';

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

const BackCamera = (props: BackCameraProps) => {
  const { setImage, onTakePhoto } = props;
  const { handleLoadingOverlay } = useUserContext();
  const webcamRef = useRef<Webcam>(null);
  const [imgSrc, setImgSrc] = useState<string>('');
  const [rotDeg, setRotDeg] = useState<number>(360);
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
        setRotDeg(360);
        setImgSrc('');
        setShowWebcam(true);
        break;
      case 'confirm photo':
        setImage(imgSrc);
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

  const handleRotation = (direction: string) => {
    if (direction === 'left') {
      setRotDeg((prev) => prev - 90);
    } else if (direction === 'right') {
      setRotDeg((prev) => prev + 90);
    }
  };

  return (
    <div className={camContainer}>
      <div className={backCameraCx}>
        <Row className={camWrapper}>
          <Col xs='8'>
            <div className={cx(camHeaderInstruction)}>
              Pastikan posisi KTP di dalam bingkai
            </div>
          </Col>
          <Col xs='12' className={wrapperImageCx}>
            {showWebcam ? (
              <div className={wrapperWebcamCx(bgPhotoFrame)}>
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  width={280}
                  height={160}
                  screenshotFormat='image/jpeg'
                  videoConstraints={
                    isMobile ? mobileVideoConstraints : desktopVideoConstraints
                  }
                  onUserMedia={(e) => handleCameraLoad(e)}
                  className={webcamCx}
                  forceScreenshotSourceSize
                />
              </div>
            ) : (
              <div>
                <img
                  className={photoResult(
                    idCardTemplate.height,
                    idCardTemplate.width,
                    rotDeg,
                  )}
                  src={imgSrc}
                  alt='Photo'
                />
                <div className={wrapperRotateButton}>
                  <Button
                    fluid
                    className='rotateButton buttonOutline'
                    onClick={() => handleRotation('left')}
                  >
                    <img className='iconRotateButton' src={icRotateLeft} />
                    Putar Kiri
                  </Button>
                  <Button
                    fluid
                    className='rotateButton buttonOutline'
                    onClick={() => handleRotation('right')}
                  >
                    <img className='iconRotateButton' src={icRotateRight} />
                    Putar Kanan
                  </Button>
                </div>
              </div>
            )}
          </Col>
        </Row>
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
            <div className={cx(defaultCenter, wrapperShutter)}>
              <img
                src={shutter}
                width={80}
                height={80}
                alt='Take Photo'
                className={cursorPointer}
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

export default BackCamera;
