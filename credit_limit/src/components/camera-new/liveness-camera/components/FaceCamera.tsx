import { memo, useEffect } from 'react';
import type {
  FaceCameraProps,
  HTMLFaceCaptureElement,
} from '@innovatrics/dot-face-auto-capture';
import '@innovatrics/dot-face-auto-capture';

const FaceCamera = (props: FaceCameraProps) => {
  useEffect(() => {
    const faceAutoCaptureElement = document.getElementById(
      'x-dot-face-auto-capture',
    ) as HTMLFaceCaptureElement | null;

    if (faceAutoCaptureElement) {
      faceAutoCaptureElement.cameraOptions = props;
    }
  }, [props]);

  return (
    <x-dot-face-auto-capture id='x-dot-face-auto-capture' translate={true} />
  );
};

export default memo(FaceCamera);
