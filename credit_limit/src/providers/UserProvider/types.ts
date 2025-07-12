import type { Theme } from '@emotion/react';
import type { Dispatch, ReactNode, SetStateAction } from 'react';

export type PartnerTheme = Partial<Theme> | ((outerTheme: Theme) => Theme);

export interface UserProviderProps {
  children: ReactNode;
}

export interface UserContextProps {
  datas: DataProps;
  setDatas: Dispatch<SetStateAction<DataProps>>;
  fetchHomeScreen: () => Promise<unknown>;
  convertDataURLtoFile: (dataurl: string, filename: string) => string | File;
}

export interface LoadingContextProps {
  isLoadingOverlay: boolean;
  handleLoadingOverlay: (value: boolean) => void;
}

export interface TransactionContextProps {
  transactionData: Record<string, unknown>;
  preTransactionData: Record<string, unknown>;
  savePreTransactionData: (data: Record<string, unknown>) => void;
  saveTransactionData: (data: Record<string, unknown>) => void;
  resetTransactionStorage: (data: Record<string, unknown>) => void;
}

export interface NotificationContextProps {
  isNotificationOpened: boolean;
  notificationMessage: string;
  notificationSeverity: boolean;
  handleNotification: (notificationProps: HandleNotificationArgs) => void;
}

export interface HandleNotificationArgs {
  isOpen: boolean;
  message?: string;
  severity?: boolean;
}

interface Params extends Record<string, unknown> {
  urlParams: Record<string, unknown>;
}

export interface DataProps extends Record<string, unknown> {
  token: string | null;
  partner: unknown | null;
  appStatus: unknown | null;
  accountId: string | null;
  fullname: string | null;
  phone: string | null;
  username: string;
  pin: string;
  count: number;
  isPhotoDialogShown: boolean;
  notificationDuration: number;
  webVersion: string;
  errorDivPaddingTop: string;
  cameraAllowError: string;
  jobTypes: string[];
  provinces: Array<unknown>;
  regencies: Array<unknown>;
  villages: Array<unknown>;
  subDistrict: Array<unknown>;
  invalidPhoneError1Flg: boolean;
  invalidPhoneError2Flg: boolean;
  invalidDataFlg: boolean;
  paramsUrl?: string;
  params?: Params;
  invalidParams?: boolean;
  webType?: string;
}
