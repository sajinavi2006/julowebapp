export interface CameraProps {
  cameraPosition?: string;
  dialogData?: {
    name?: string;
    title: string;
    content: React.ReactNode;
  };
  getImage: (params: string) => void;
  getShow?: (param: boolean) => void;
  show?: boolean;
}
