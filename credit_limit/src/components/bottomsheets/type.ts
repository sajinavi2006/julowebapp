import { RouteComponentProps } from 'react-router';

export interface BottomSheetProps extends RouteComponentProps {
  padding?: string;
  open: boolean;
  onClose: (value: React.MouseEvent<Element, MouseEvent>) => void;
}
