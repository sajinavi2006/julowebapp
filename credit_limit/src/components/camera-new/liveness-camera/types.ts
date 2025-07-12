import { FaceComponentData } from '@innovatrics/dot-face-auto-capture/.';

export interface LivenessCameraProps {
  dialogData?: {
    title: string;
  };
  name?: string;
  onTakePhoto: (value: string) => void;
  setImage: (value: string | LivenessData[]) => void;
  camState: boolean;
  setCamState: (newCamState: boolean) => void;
  isConfirmDialogShowing: boolean;
  checkLivenessStatus: () => Promise<boolean | null>;
  onLivenessError?: (error: Error) =>void;
  retryOnApplicationFailed?: boolean;
}

export interface LivenessData {
  name: string;
  image: Blob;
  data: FaceComponentData;
}

export interface UploadProps {
  data: LivenessData[];
  livenessStatus: boolean | null;
  retryOnApplicationFailed?: boolean;
}
