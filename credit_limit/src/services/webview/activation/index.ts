import { GET, POST } from 'services/axios';

import { config } from 'configs';
import utils from 'utils';

const END_POINT = config.apiUrl;

const headersSecretKey = () => {
  const paramsURL = utils.store.getParse('params');
  const paramsAuth = paramsURL?.auth?.replace(/\s/g, '+') ?? null;
  return {
    'secret-key': paramsAuth,
  };
};

const applicationDetails = () => {
  const param = {
    url: `${END_POINT}/partnership/web/v1/whitelabel-paylater-application/details/`,
    headers: headersSecretKey(),
  };
  return GET(param);
};

const checkUser = (payload: Record<string, unknown>) => {
  const param = {
    url: `${END_POINT}/partnership/web/v1/check-user/`,
    headers: { ...headersSecretKey() },
    data: payload,
  };
  return POST(param);
};

const sendVerificationCodeEmail = (payload: Record<string, unknown>) => {
  const param = {
    url: `${END_POINT}/partnership/web/v1/whitelabel-paylater-application/email-otp`,
    headers: headersSecretKey(),
    data: payload,
  };
  return POST(param);
};

const sendVerificationCodeApi = (payload: Record<string, unknown>) => {
  const param = {
    url: `${END_POINT}/partnership/web/v1/whitelabel-paylater-application/otp`,
    headers: headersSecretKey(),
    data: payload,
  };
  return POST(param);
};

const validateOTP = (payload: Record<string, unknown>) => {
  const param = {
    url: `${END_POINT}/partnership/web/v1/whitelabel-paylater-application/validate-otp/`,
    headers: headersSecretKey(),
    data: payload,
  };
  return POST(param);
};

const validatePin = (payload: Record<string, unknown>) => {
  const param = {
    url: `${END_POINT}/partnership/web/v1/whitelabel-paylater-input-pin/`,
    headers: headersSecretKey(),
    data: payload,
  };
  return POST(param);
};

const linkAccountApi = (payload: Record<string, unknown>) => {
  const param = {
    url: `${END_POINT}/partnership/web/v1/whitelabel-paylater-link-account/`,
    headers: headersSecretKey(),
    data: payload,
  };
  return POST(param);
};

export {
  applicationDetails,
  sendVerificationCodeEmail,
  sendVerificationCodeApi,
  validateOTP,
  checkUser,
  validatePin,
  linkAccountApi,
};
