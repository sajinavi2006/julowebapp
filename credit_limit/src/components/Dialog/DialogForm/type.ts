export type CardCaseType =
  | 'webpage'
  | 'webpage1'
  | 'appl_docs'
  | '131'
  | 'appl_main'
  | 'reapply_j1'
  | 'j1_appl_docs'
  | 'On Review'
  | 'Success Submit'
  | 'Wrong KTP'
  | 'Wrong Selfie'
  | 'Wrong KTP & Selfie'
  | 'Rentee transaction success'
  | 'Transaction success';

export interface IDialogData {
  dialogForm?: {
    type?: string;
    img?: string;
    dropdownMenu?: string;
    title: {
      text?: string;
    };
    titleMenuMandatory?: string;
    titleMenuOptional?: string;
    message: {
      text?: string;
    };
    button: {
      text?: string;
      action?: CardCaseType;
      url?: string;
    };
  };
}

export interface IResponse {
  id?: number;
  data?: {
    [name: string]: {
      enable?: boolean;
      status?: string[];
      image: {
        image_url_api: string;
      };
    };
  };
  errors?: string[];
}

export interface IhandleScrollFormDialog {
  target: {
    scrollTop: number;
  };
}

export interface IHandleSelect {
  [key: string]: string;
}

export interface IHandleSelectButton {
  name?: string;
}

export interface IHandleClickDynamicFormTakePhoto {
  index: number;
  status: string;
  position: string;
  data: {
    name?: string;
    title?: string;
    type?: string;
    status?: string;
  };
  name: {
    data: {
      name: string;
    };
  };
}

export interface Props {
  dialogData: IDialogData;
  handleShowDialogForm: (value: boolean) => void;
  handleSentDialogForm: (value: boolean) => void;
  setDialogData: (value?: unknown) => void;
  setShowDialogInfo: (value: boolean) => void;
  showDialogForm: boolean;
}
