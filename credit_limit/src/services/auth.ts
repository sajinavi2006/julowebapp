import { POST } from './axios';

import { config } from '../configs';

const HEADERS = {
  'Content-Type': 'application/json',
};

const END_POINT = config.apiUrl;

const login = (payload: Record<string, unknown>) => {
  const param = {
    url: `${END_POINT}/pin/web/v1/login/`,
    data: payload,
    headers: HEADERS,
  };
  return POST(param);
};

const register = (payload: Record<string, unknown>) => {
  const param = {
    url: `${END_POINT}/pin/web/v1/register/`,
    data: payload,
    headers: HEADERS,
  };
  return POST(param);
};

const preRegister = (payload: Record<string, unknown>) => {
  const param = {
    url: `${END_POINT}/pin/v1/preregister-check`,
    data: {
      ...payload,
      app_name: 'web',
    },
    headers: HEADERS,
  };
  return POST(param);
};

const requestOtp = (payload: Record<string, unknown>) => {
  const param = {
    url: `${END_POINT}/partnership/v1/register/email/otp/request`,
    data: payload,
    headers: HEADERS,
  };
  return POST(param);
};

const verifyOtp = (payload: Record<string, unknown>) => {
  const param = {
    url: `${END_POINT}/partnership/v1/register/email/otp/validate`,
    data: payload,
  };
  return POST(param);
};

const checkPinWeakness = (payload: Record<string, unknown>) => {
  const param = {
    url: `${END_POINT}/pin/v1/check-strong-pin/`,
    data: payload,
    headers: HEADERS,
  };
  return POST(param);
};

const resetPassword = (payload: Record<string, unknown>) => {
  const param = {
    url: `${END_POINT}/partnership/web/v1/reset-pin`,
    data: payload,
    headers: HEADERS,
  };
  return POST(param);
};

const scrapData = ({
  payload,
  token,
}: {
  payload: Record<string, unknown>;
  token: string;
}) => {
  const param = {
    url: `${END_POINT}/web/v1/scrap-data/`,
    data: payload,
    headers: {
      ...HEADERS,
      Authorization: `Token ${token}`,
    },
  };
  return POST(param);
};

const validateApplication = (payload: Record<string, unknown>) => {
  const param = {
    url: `${END_POINT}/partnership/web/v1/validate-application`,
    data: payload,
    headers: HEADERS,
  };
  return POST(param);
};

export {
  login,
  register,
  preRegister,
  checkPinWeakness,
  resetPassword,
  scrapData,
  validateApplication,
  verifyOtp,
  requestOtp,
};
