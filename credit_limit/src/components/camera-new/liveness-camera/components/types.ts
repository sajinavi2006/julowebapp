import { FaceCallback } from '@innovatrics/dot-face-auto-capture/.';

export interface FaceAutoCaptureProps {
  onPhotoTaken: FaceCallback;
  onError: (error: Error) => void;
  smilePhoto: boolean;
  showSmile: boolean;
  setShowSmile: (showSmile: boolean) => void;
  btnState: boolean;
  timer: number;
  showTimer: boolean;
  showCircle: boolean;
}
