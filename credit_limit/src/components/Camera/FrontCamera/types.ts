export interface FrontCameraProps {
  dialogData?: {
    title: string;
    content: React.ReactNode;
  };
  onTakePhoto: (param: string) => void;
  windowHeight: number;
  setImage?: (param: string) => void;
}
