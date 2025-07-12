import { ApiError } from 'models/api';

export interface RequestOtpParam {
  phoneNumber: string;
}

export interface VerifyOtpParam extends RequestOtpParam {
  otp: string;
}

export interface VerifyOtpResponse {
  success: string;
  content: {
    active: string;
    message: string;
  };
}

export interface MetaRequestOtp {
  expiredTime: string;
}

export interface RequestOtpError extends ApiError<MetaRequestOtp> {
  data: {
    resendTime: string;
  };
}
