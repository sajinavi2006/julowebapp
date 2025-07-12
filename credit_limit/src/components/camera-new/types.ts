import { LivenessData } from './liveness-camera/types';

export interface CameraProps {
  cameraPosition?: 'front' | 'back';
  dialogData?: {
    name?: string;
    title: string;
  };
  getImage: (param: string | LivenessData[]) => void;
  getShow?: (param: boolean) => void;
  show: boolean;
  liveness?: boolean;
  checkLivenessStatus: () => Promise<boolean | null>;
  onLivenessError?: (error: Error) => void;
  hideHeader?: boolean;
  retryOnApplicationFailed?: boolean;
}