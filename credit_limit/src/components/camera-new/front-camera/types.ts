export interface FrontCameraProps {
  onTakePhoto: (param: string) => void;
  setImage?: (param: string) => void;
}

export interface WrapperCameraProps {
  width: number;
  height: number;
  aspectRatio: number;
  facingMode: string;
}

export type WrapperCameraStyleProps = Pick<WrapperCameraProps, 'width' | 'height'>;
