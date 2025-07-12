import type { Store as _Store } from 'use-global-hook';

export type Store = _Store<GlobalState, GlobalActions>;

export interface GlobalState {
  count: number;
  isLoadingOverlayShown: boolean;
  isPhotoDialogShown: boolean;
  notificationDuration: number;
  webVersion: string;
  errorDivPaddingTop: string;
  cameraAllowError: string;
  jobTypes: string[];
  provinces: unknown[];
  regencies: unknown[];
  villages: unknown[];
  subDistrict: unknown[];
  invalidPhoneError1Flg: boolean;
  invalidPhoneError2Flg: boolean;
  invalidDataFlg: boolean;
  emptyFieldError: string;
  doubleSpaceError: string;
  symbolOrDigitOnlyError: string;
  minimumBirthOfPlaceError: string;
  minimalCharError: string;
  symbolOnlyError: string;
  mobileFieldError1: string;
  mobileFieldMinLenError: string;
  mobileFieldError2: string;
  mobileFieldError3: string;
  mobileFieldMinLenError2: string;
  dateFieldNumberError: string;
  txtWithDigitError: string;
  sameMobileError: string;
  txtMinValue: number;
  txtPattern: RegExp;
  symbolPattern: RegExp;
  doubleSpacePattern: RegExp;
  txtWithDigitPattern: RegExp;
  firstLetterDigitPattern: RegExp;
  mobilePattern1: RegExp;
  mobilePattern2: RegExp;
  defaultDate: string;
  currentField: string;
  isFormFilled: boolean;
  isFormFilledReview: boolean;
  isReadTerm: boolean;
  otp_resend_time: number;
  windowWidth: number;
  windowHeight: number;
  ktpLoaded: boolean;
  selfieLoaded: boolean;
  isNotificationOpened?: boolean;
  notificationMessage?: string;
  notificationSeverity?: boolean;
  pinError?: string | null;
}

export interface StoreActions {
  setState: (store: Store, name: string, value: unknown) => void;
  openNotification: (
    store: Store,
    isNotificationOpened: boolean,
    message: string,
    severity?: boolean,
  ) => void;
  closeNotification: (store: Store, severity?: boolean) => void;
  openLoadingOverlay: (store: Store) => void;
  closeLoadingOverlay: (store: Store) => void;
  handleWindowSizeChange: (store: Store) => void;
}

export interface GlobalActions {
  setState: (name: keyof GlobalState, value: unknown) => void;
  openNotification: (
    isNotificationOpened: boolean,
    message: string,
    severity?: boolean,
  ) => void;
  closeNotification: (severity?: boolean) => void;
  openLoadingOverlay: () => void;
  closeLoadingOverlay: () => void;
  handleWindowSizeChange: () => void;
}
