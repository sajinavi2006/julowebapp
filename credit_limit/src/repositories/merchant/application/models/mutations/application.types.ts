import { VerifyOtpParam } from './otp.types';

interface ApiResponseMessage {
  message: string;
}

export interface SubmitApplicationParam {
  dob: string;
  birthPlace: string;
  businessDuration: string;
  businessCategory: string;
  companyName: string;
  emailDirector: string;
  fullname: string;
  gender: string;
  lastEducation?: string;
  limit: string;
  maritalStatus: string;
  monthlyIncome: string;
  nib: string;
  nik: string;
  primaryPhoneNumber: string;
  productLine: string;
  address: string;
  addressProvince: string;
  addressRegency: string;
  addressDistrict: string;
  addressSubdistrict: string;
  addressZipcode: string;
}

export interface ApplicationDocumentParam {
  ktp?: object;
  selfie?: object;
  nibDocument?: object;
  companyPhoto: Array<ApplicationFile>;
  financialDocument: Array<ApplicationFile>;
  cashflowReport: Array<ApplicationFile>;
  otherDocument: Array<ApplicationFile>;
}

export type ApplicationParam = SubmitApplicationParam &
  ApplicationDocumentParam &
  Pick<VerifyOtpParam, 'otp'> & { currentStep: number };

export interface ApplicationFile {
  url: string;
  id: number;
  fileName: string;
}

export type DeleteDocumentResponse = ApiResponseMessage;
export type RequestOtpResponse = {
  resendTime: string;
};
export type DeleteSingleDocumentResponse = ApiResponseMessage;

export interface DeleteSingleDocumentParam {
  imageId: number | string;
}

export type UploadDocumentResponse = ApplicationFile;
export type UploadDocumentParam = FormData;

export interface RequestOtpParam {
  phoneNumber: string;
}
