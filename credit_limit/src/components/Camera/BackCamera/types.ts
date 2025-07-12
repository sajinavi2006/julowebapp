export interface BackCameraProps {
  dialogData?: {
    title: string;
    content: React.ReactNode;
  };
  name?: string;
  onTakePhoto: (value: string) => void;
  setImage: (value: string) => void;
}
