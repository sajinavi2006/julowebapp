import { useEffect, useState } from 'react';
import type {
  FaceUiProps,
  HTMLFacetUiElement,
} from '@innovatrics/dot-auto-capture-ui/face';
import type {
  CameraPropsChangeEvent,
  CameraStateChangeEvent,
  FaceInstructionChangeEvent,
  DetectedFaceChangeEvent,
  DetectedFaceCorners,
} from '@innovatrics/dot-face-auto-capture/events';
import { FaceCustomEvent } from '@innovatrics/dot-face-auto-capture/events';
import type {
  AppState,
  FaceInstructionCode,
  AutoCaptureError,
  Resolution,
} from '@innovatrics/dot-face-auto-capture';
import '@innovatrics/dot-auto-capture-ui/face';

const FaceUi = (props: FaceUiProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [instructionCode, setInstructionCode] = useState<
    FaceInstructionCode | undefined
  >();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [appState, setAppState] = useState<AppState | undefined>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<AutoCaptureError | undefined>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [detectedFaceCorners, setDetectedFaceCorners] = useState<
    DetectedFaceCorners | undefined
  >();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cameraResolution, setCameraResolution] = useState<
    Resolution | undefined
  >();

  useEffect(() => {
    const handleInstruction = (event: FaceInstructionChangeEvent) => {
      setInstructionCode(event?.detail?.instructionCode);
    };

    const handleCameraProps = (event: CameraPropsChangeEvent) => {
      setCameraResolution(event?.detail?.cameraResolution);
    };

    const handleAppState = (event: CameraStateChangeEvent) => {
      setAppState(event?.detail?.appState);

      const error = event?.detail?.error;

      if (error) {
        setError(error);
      }
    };

    const handleDetectedFace = (event: DetectedFaceChangeEvent) => {
      setDetectedFaceCorners(event?.detail?.detectedCorners);
    };

    document.addEventListener(
      FaceCustomEvent.INSTRUCTION_CHANGED,
      handleInstruction,
    );
    document.addEventListener(
      FaceCustomEvent.CAMERA_PROPS_CHANGED,
      handleCameraProps,
    );
    document.addEventListener(FaceCustomEvent.STATE_CHANGED, handleAppState);
    document.addEventListener(
      FaceCustomEvent.DETECTED_FACE_CHANGED,
      handleDetectedFace,
    );

    return () => {
      document.removeEventListener(
        FaceCustomEvent.INSTRUCTION_CHANGED,
        handleInstruction,
      );
      document.removeEventListener(
        FaceCustomEvent.CAMERA_PROPS_CHANGED,
        handleCameraProps,
      );
      document.removeEventListener(
        FaceCustomEvent.STATE_CHANGED,
        handleAppState,
      );
      document.removeEventListener(
        FaceCustomEvent.DETECTED_FACE_CHANGED,
        handleDetectedFace,
      );
    };
  }, []);

  useEffect(() => {
    const uiElement = document.getElementById(
      'x-dot-face-auto-capture-ui',
    ) as HTMLFacetUiElement | null;

    if (uiElement) {
      uiElement.props = props;
    }
  });

  return <x-dot-face-auto-capture-ui id='x-dot-face-auto-capture-ui' />;
};

export default FaceUi;
