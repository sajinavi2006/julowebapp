import { RouteComponentProps } from 'react-router-dom';

interface IDialogData {
  img: string | null;
  title: {
    text?: string;
  };
  message: {
    text?: string;
  };
  button: Record<string, never>;
}

export interface Props {
  dialogData?: IDialogData;
  step?: number;
  history?: RouteComponentProps['history'];
}
