import { useCallback, useEffect, useRef, useState } from 'react';
import {
  FaceCustomEvent,
  FaceInstructionChangeEvent,
} from '@innovatrics/dot-face-auto-capture/events';
import type {
  FaceCallback,
  FaceInstructionCode,
} from '@innovatrics/dot-face-auto-capture';
import { FaceInstructions } from '@innovatrics/dot-auto-capture-ui/face';

import FaceCamera from './FaceCamera';
import FaceUi from './FaceUi';

import { FaceAutoCaptureProps } from './types';
import { container } from './styles';

import smileFace from 'assets/img/smile.png';
import livenessStaticCircle from 'assets/img/liveness-circle.svg';

const FaceAutoCapture = ({
  onPhotoTaken,
  onError,
  smilePhoto,
  showSmile,
  setShowSmile,
  btnState,
  timer,
  showTimer,
  showCircle,
}: FaceAutoCaptureProps) => {
  const smilePrompt = smilePhoto ? ' dengan ekspresi tersenyum' : '';
  const newInstructions: Partial<FaceInstructions> = {
    brightness_too_high: 'Pencahayaan terlalu terang',
    brightness_too_low: 'Pencahayaan terlalu redup',
    candidate_selection: 'Tahan posisi dalam beberapa detik' + smilePrompt,
    face_centering: 'Posisikan wajahmu di dalam lingkaran' + smilePrompt,
    face_not_present: 'Arahkan wajahmu ke dalam lingkaran' + smilePrompt,
    face_too_close: 'Wajahmu terlalu dekat, mundur sedikit',
    face_too_far: 'Wajahmu terlalu jauh, maju sedikit',
    sharpness_too_low: 'Fokuskan kamera ke arah wajahmu',
  };

  // TO-DO: will add 3s delay later
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [instructionCode, setInstructionCode] = useState<
    FaceInstructionCode | undefined
  >();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isSmileTaken, setIsSmileTaken] = useState(false);

  const handlePhotoTaken = useCallback<FaceCallback>(
    (imageData, content) => {
      onPhotoTaken(imageData, content);
    },
    [onPhotoTaken],
  );

  useEffect(() => {
    const handleInstruction = (event: FaceInstructionChangeEvent) => {
      setInstructionCode(event?.detail?.instructionCode);
    };

    document.addEventListener(
      FaceCustomEvent.INSTRUCTION_CHANGED,
      handleInstruction,
    );

    return () => {
      document.removeEventListener(
        FaceCustomEvent.INSTRUCTION_CHANGED,
        handleInstruction,
      );

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const shouldShowTimer =
      instructionCode === 'candidate_selection' && smilePhoto;

    if (shouldShowTimer) {
      setIsSmileTaken(true);
      setShowSmile(false);
    }
  }, [instructionCode]);

  return (
    <div className={container}>
      <FaceCamera
        cameraFacing='user'
        onPhotoTaken={handlePhotoTaken}
        onError={onError}
        wasmDirectoryPath={window.location.origin + '/wasm'}
      />
      <FaceUi
        instructions={newInstructions}
        appStateInstructions={{
          waiting: {
            text: !isSmileTaken
              ? showCircle
                ? 'Posisikan wajahmu di dalam lingkaran dengan ekspresi tersenyum'
                : 'Klik "Lanjutkan" untuk langkah selanjutnya: Wajah Senyum'
              : 'Harap tunggu beberapa detik hingga proses selesai, ya!',
          },
          loading: {
            text: 'Sedang memuat, tunggu sebentar',
          },
        }}
      />
      {showTimer && smilePhoto && btnState ? (
        <div className='timer'>{timer}</div>
      ) : null}
      {showSmile ? (
        <div className='smile-placeholder'>
          <img className='smileFace fadeInAndOut' src={smileFace} />
          {showCircle ? (
            <img className='livenessCircleStatic' src={livenessStaticCircle} />
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default FaceAutoCapture;
