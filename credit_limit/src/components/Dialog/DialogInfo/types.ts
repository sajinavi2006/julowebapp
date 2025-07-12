export interface DialogInfoProp {
  clickOutside?: boolean;
  customMaxWidth?: number;
  children?: React.ReactNode;
  dialogData?: DialogData;
  handleClickDialogButton?: (value: HandleClickDialogButtonArgs) => void;
  handleShowDialogInfo?: (value: boolean) => void;
  showDialogInfo: boolean;
}

export interface DialogData {
  img?: string | null;
  buttonWrap?: boolean;
  title?: {
    text?: string;
  };
  message?: {
    text?: string;
  };
  button?: Record<string, string>[];
}

export interface HandleClickDialogButtonArgs {
  action: string;
  url: string;
  urlType: string;
  data: Record<string, string | number>;
}
