import { useCallback, useRef, useState } from 'react';
import { cx } from '@emotion/css';
import Webcam from 'react-webcam';

import { useUserContext } from 'providers/UserProvider';
import { MIN_WIDTH, MAX_WIDTH } from 'constant';

import {
  Button,
  ButtonOutline,
  Col,
  Div,
  Row,
  Wrapper,
} from 'assets/css/styled';
import { height, top, transform } from 'assets/css/stylesValue';
import { cursorPointer, positionAbsolute } from 'assets/css/stylesFix';

import DialogCamera from 'components/Dialog/DialogCamera';

import icTakePhoto from 'assets/img/circle.png';
import bgSelfie from 'assets/img/background/bg-photo_selfie_large.png';

import { FrontCameraProps } from './types';

const videoConstraints = {
  facingMode: 'user',
};

const FrontCamera = ({
  dialogData,
  onTakePhoto,
  windowHeight,
  setImage,
}: FrontCameraProps) => {
  const webcamRef = useRef<Webcam>(null);
  const { handleLoadingOverlay } = useUserContext();
  const [imgSrc, setImgSrc] = useState<string>('');

  const capture = useCallback(() => {
    const imageCapture = webcamRef.current?.getScreenshot();
    setImgSrc(imageCapture || '');
  }, [webcamRef]);

  const handleTakePhoto = (value: string) => {
    switch (value) {
      case 'take photo':
        capture();
        break;
      case 'retake photo':
        setImgSrc('');
        break;
      case 'confirm photo':
        setImage?.(imgSrc);
        onTakePhoto('close');
        break;
      default:
        break;
    }
  };

  const handleCameraLoad = (value: MediaStream) => {
    if (value?.active) {
      handleLoadingOverlay(false);
    }
  };

  return (
    <Div height='100%' width='100%' display='flex' justifyContent='center'>
      <Div
        minWidth={MIN_WIDTH}
        width='100%'
        color='#fff'
        display='flex'
        flexWrap='wrap'
        flexDirection='column'
        justifyContent='space-between'
      >
        <Div display='flex' justifyContent='center'>
          <Webcam
            audio={false}
            mirrored={false}
            ref={webcamRef}
            screenshotFormat='image/jpeg'
            videoConstraints={videoConstraints}
            onUserMedia={handleCameraLoad}
            className={cx(height('100vh'), transform('scaleX(-1)'))}
          />
          <img
            className={cx(
              top('0'),
              height(`${windowHeight}px`),
              positionAbsolute,
            )}
            src={imgSrc || bgSelfie}
            alt='Photo'
          />
        </Div>
        {imgSrc ? (
          <Wrapper
            cursor='pointer'
            display='block'
            position='fixed'
            left='50%'
            bottom='8%'
            width='20rem'
            transform='translate(-50%, -50%)'
          >
            <Row display='flex' justifyContent='center'>
              <Col xs='6' sm='3'>
                <ButtonOutline
                  fluid
                  border='transparent'
                  onClick={() => handleTakePhoto('retake photo')}
                >
                  Foto Ulang
                </ButtonOutline>
              </Col>
              <Col xs='6' sm='3'>
                <Button fluid onClick={() => handleTakePhoto('confirm photo')}>
                  OK
                </Button>
              </Col>
            </Row>
          </Wrapper>
        ) : (
          <Div
            cursor='pointer'
            display='block'
            position='fixed'
            left='50%'
            bottom='5%'
            transform='translate(-50%, -50%)'
          >
            <img
              height='100%'
              src={icTakePhoto}
              alt='Take Photo'
              className={cursorPointer}
              onClick={() => handleTakePhoto('take photo')}
            />
          </Div>
        )}
      </Div>
      <Div maxWidth={MAX_WIDTH} minWidth={MIN_WIDTH} position='absolute'>
        {dialogData ? <DialogCamera data={dialogData} /> : null}
      </Div>
    </Div>
  );
};

export default FrontCamera;
