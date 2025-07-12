import { useCallback, useRef, useState } from 'react';
import { cx } from '@emotion/css';
import Webcam from 'react-webcam';

import { useUserContext } from 'providers/UserProvider';
import { MIN_WIDTH, MAX_WIDTH } from 'constant';

import {
  Col,
  Button,
  ButtonOutline,
  Div,
  Row,
  Wrapper,
} from 'assets/css/styled';
import { height, width } from 'assets/css/stylesValue';
import { cursorPointer, positionAbsolute } from 'assets/css/stylesFix';

import DialogCamera from 'components/Dialog/DialogCamera';

import icTakePhoto from 'assets/img/circle.png';
import bgPhotoFrame from 'assets/img/ktp_photo_frame.png';
import { objectFit } from 'assets/css/stylesValue';
import { BackCameraProps } from './types';

const videoConstraints = {
  width: 350,
  height: 225,
  facingMode: navigator.userAgent.includes('Android' || 'iPhone')
    ? { exact: 'environment' }
    : 'user',
};

const BackCamera = ({
  setImage,
  dialogData,
  name,
  onTakePhoto,
}: BackCameraProps) => {
  const { handleLoadingOverlay } = useUserContext();
  const webcamRef = useRef<Webcam>(null);
  const [imgSrc, setImgSrc] = useState('');

  const capture = useCallback(() => {
    const imageCapture = webcamRef?.current?.getScreenshot();
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
        setImage(imgSrc);
        onTakePhoto('close');
        break;
      default:
        break;
    }
  };

  const handleCameraLoad = (value: { active: boolean }) => {
    if (value?.active) {
      handleLoadingOverlay(false);
    }
  };

  return (
    <Div height='100%' width='100%' display='flex' justifyContent='center'>
      <Div
        maxWidth={MAX_WIDTH}
        minWidth={MIN_WIDTH}
        width='100%'
        color='#fff'
        display='flex'
        flexWrap='wrap'
        flexDirection='column'
        justifyContent='space-between'
        padding='5rem 0px'
      >
        <Div display='flex' justifyContent='center' position='relative'>
          <Webcam
            audio={false}
            height={videoConstraints.height}
            width={videoConstraints.width}
            ref={webcamRef}
            screenshotFormat='image/jpeg'
            videoConstraints={videoConstraints}
            onUserMedia={(e) => handleCameraLoad(e)}
            className={cx(objectFit('cover'))}
          />
          {name === 'ktp' || name === 'ktp_self' ? (
            <img
              className={cx(
                height(`${videoConstraints.height}px`),
                width(`${videoConstraints.width}px`),
                objectFit('cover'),
                positionAbsolute,
              )}
              src={imgSrc || bgPhotoFrame}
              alt='Photo'
            />
          ) : null}
        </Div>
        <Wrapper>
          <Row display='flex' justifyContent='center'>
            {imgSrc ? (
              <>
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
                  <Button
                    fluid
                    onClick={() => handleTakePhoto('confirm photo')}
                  >
                    OK
                  </Button>
                </Col>
              </>
            ) : (
              <Col xs='12' sm='12' display='flex' justifyContent='center'>
                <img
                  src={icTakePhoto}
                  alt='Take Photo'
                  className={cursorPointer}
                  onClick={() => handleTakePhoto('take photo')}
                />
              </Col>
            )}
          </Row>
        </Wrapper>
      </Div>
      <Div maxWidth={MAX_WIDTH} minWidth={MIN_WIDTH} position='absolute'>
        {dialogData ? <DialogCamera data={dialogData} /> : null}
      </Div>
    </Div>
  );
};

export default BackCamera;
