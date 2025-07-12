import { POST } from './axios';

import { config } from '../configs';

const END_POINT = config.apiUrl;

const HEADERS = {
  'Content-Type': 'application/json',
};

const createPin = (payload: Record<string, unknown>) => {
  const param = {
    url: `${END_POINT}/partnership/v1/create-pin/`,
    data: payload,
    headers: HEADERS,
  };
  return POST(param);
};

const createPinAndRegister = (
  payload: Record<string, unknown>,
  token: string,
) => {
  const param = {
    url: `${END_POINT}/partnership/web/v1/create-pin`,
    data: payload,
    headers: {
      ...HEADERS,
      Authorization: `Token ${token}`,
    },
  };
  return POST(param);
};

const inputPin = (payload: Record<string, unknown>) => {
  const param = {
    url: `${END_POINT}/partnership/v1/input-pin/`,
    data: payload,
    headers: HEADERS,
  };
  return POST(param);
};

const checkPinStrength = (payload: Record<string, unknown>) => {
  const param = {
    url: `${END_POINT}/partnership/v1/check-strong-pin/`,
    data: payload,
    headers: HEADERS,
  };
  return POST(param);
};

const resetPassword = (payload: Record<string, unknown>) => {
  const param = {
    url: `${END_POINT}/merchant-financing/v1/reset-pin/`,
    data: payload,
    headers: HEADERS,
  };
  return POST(param);
};

export {
  createPin,
  createPinAndRegister,
  inputPin,
  checkPinStrength,
  resetPassword,
};
