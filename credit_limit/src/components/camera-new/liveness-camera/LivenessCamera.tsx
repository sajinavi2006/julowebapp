import { useCallback, useEffect, useState } from 'react';
import type { FaceCallback } from '@innovatrics/dot-face-auto-capture';
import {
  dispatchControlEvent,
  FaceCustomEvent,
  ControlEventInstruction,
} from '@innovatrics/dot-face-auto-capture/events';

import { MIN_WIDTH, MAX_WIDTH } from 'constant';
import { LivenessData, LivenessCameraProps } from './types';
import { livenessCameraCX } from './styles';

import FaceAutoCapture from './components/FaceAutoCapture';
import { useUserContext } from 'providers/UserProvider';
import uploadLiveness from './use-case/upload-liveness';

import livenessSmileImg from 'assets/img/liveness-smile.png';
import RetryDialog from './components/retry-dialog';
import { timerCountdown } from './components/constants';

const LivenessCamera = (props: LivenessCameraProps) => {
  const {
    onTakePhoto,
    setImage,
    camState,
    setCamState,
    checkLivenessStatus,
    retryOnApplicationFailed,
  } = props;
  const { handleNotification } = useUserContext();
  const [btnState, setBtnState] = useState<boolean>(true);
  const [photoData, setPhotoData] = useState<LivenessData[]>([]);
  const [showSmile, setShowSmile] = useState(false);
  const [showCircle, setShowCircle] = useState(false);
  const [showRetry, setShowRetry] = useState<boolean>(false);
  const [timer, setTimer] = useState(timerCountdown);
  const [showTimer, setShowTimer] = useState(false);
  const isMobile =
    /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile/i.test(
      navigator.userAgent,
    );

  const startCam = () => {
    setCamState(true);
  };

  const reActivateCamera = () => {
    setShowSmile(true);
    setBtnState(true);
    setShowTimer(true);
    setShowCircle(true);

    const intervalId = setInterval(() => {
      setTimer((prev) => {
        if (prev > 1) {
          return prev - 1;
        } else {
          clearInterval(intervalId);
          setShowTimer(false);
          setShowCircle(false);
          dispatchControlEvent(
            FaceCustomEvent.CONTROL,
            ControlEventInstruction.CONTINUE_DETECTION,
          );
          return timerCountdown;
        }
      });
    }, 1000);
  };

  const retakeLiveness = () => {
    setShowRetry(false);
    setCamState(false);
    setPhotoData([]);
  };

  useEffect(() => {
    const uploadPhoto = async () => {
      try {
        const livenessStatus = await checkLivenessStatus();
        const retry = await uploadLiveness({
          data: photoData,
          livenessStatus,
          retryOnApplicationFailed,
        });

        if (retry) {
          setShowRetry(true);
        } else {
          setImage(photoData);
          onTakePhoto('close');
        }
      } catch (error) {
        console.error('Upload liveness error: ' + error);
      }
    };

    if (photoData.length === 2) {
      uploadPhoto();
    }
  }, [photoData]);

  const handleFaceCapturePhotoTaken = useCallback<FaceCallback>((imageData) => {
    setPhotoData((prevData) => {
      if (prevData.length === 0) setBtnState(false);

      const { image, data } = imageData;

      const newData: LivenessData = {
        name: prevData.length === 0 ? 'neutral' : 'smile',
        image,
        data,
      };

      return [...prevData.filter(({ name }) => name !== newData.name), newData];
    });
  }, []);

  const handleError = useCallback((error: Error) => {
    if (props.onLivenessError) {
      props.onLivenessError(error);
    }

    setShowSmile(false);
    setCamState(false);
    let errMsg = error.message;
    if (error.message.includes('permission')) {
      errMsg = 'Untuk melanjutkan proses, kamu perlu berikan izin akses kamera';
    } else if (error.message.includes('resolution')) {
      errMsg = 'Harap gunakan kamera yang kualitasnya lebih baik, ya.';
    } else if (error.message.includes('capturing')) {
      errMsg =
        'Maaf, terjadi masalah saat pengambilan foto. Mohon ulangi lagi, ya.';
    }
    handleNotification({ isOpen: true, message: errMsg });
  }, []);

  return (
    <>
      <div className={livenessCameraCX(isMobile, MIN_WIDTH, MAX_WIDTH)}>
        <div className='livenessContent'>
          {camState ? (
            <div className='cameraContainer'>
              <FaceAutoCapture
                onPhotoTaken={handleFaceCapturePhotoTaken}
                onError={handleError}
                smilePhoto={photoData.length === 1}
                showSmile={showSmile}
                setShowSmile={setShowSmile}
                btnState={btnState}
                timer={timer}
                showTimer={showTimer}
                showCircle={showCircle}
              />
              {!btnState ? (
                <button
                  className='buttonContinue'
                  disabled={btnState}
                  onClick={() => reActivateCamera()}
                >
                  Lanjutkan
                </button>
              ) : null}
            </div>
          ) : (
            <div className='livenessGuideContainer'>
              <div className='livenessGuideImageContainer'>
                <img
                  src={livenessSmileImg}
                  alt='Photo'
                  className='livenessGuideImage'
                />
              </div>
              <div className='guideContainer'>
                <div className='livenessGuide'>
                  <b>Ada 2 langkah yang perlu kamu lakukan:</b>
                  1. Wajah selfie tanpa tersenyum
                  <br />
                  2. Wajah selfie dengan tersenyum
                </div>
                <button
                  onClick={() => startCam()}
                  className='buttonContinueToCamera'
                >
                  Mengerti
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <RetryDialog show={showRetry} onClose={retakeLiveness} />
    </>
  );
};

export default LivenessCamera;
