import { GET, PATCH, POST, PUT } from './axios';

import { config } from '../configs';
import utils from '../utils';

const END_POINT = config.apiUrl;

const appId = () => {
  const AppId = utils.store.get('applicationId');

  return AppId;
};

const headers = () => {
  const TOKEN = utils.store.get('token');
  return {
    'Content-Type': 'application/json',
    Authorization: `Token ${TOKEN}`,
    'Token-Version': '1.0',
  };
};

const headersFormUrlEncoded = () => {
  const TOKEN = utils.store.get('token');
  return {
    'Content-Type': 'multipart/form-data',
    Authorization: `Token ${TOKEN}`,
    'Token-Version': '1.0',
  };
};

const boostOption = () => {
  const param = {
    url: `${END_POINT}/v3/booster/document-status/${appId()}/`,
    headers: headers(),
  };
  return GET(param);
};

const boostStatus = () => {
  const param = {
    url: `${END_POINT}/v3/booster/status/${appId()}`,
    headers: headers(),
  };
  return GET(param);
};

const bankList = () => {
  const param = {
    url: `${END_POINT}/customer-module/v1/bank/`,
    headers: headers(),
  };
  return GET(param);
};

const verifyBankAccount = (payload: Record<string, unknown>) => {
  const param = {
    url: `${END_POINT}/customer-module/v2/verify-bank-account`,
    headers: headers(),
    data: payload,
  };
  return POST(param);
};

const updateBankAccount = (payload: Record<string, unknown>) => {
  const param = {
    url: `${END_POINT}/application_flow/web/v1/resubmit_bank_account`,
    headers: headers(),
    data: payload,
  };
  return POST(param);
};

const uploadImage = (payload: FormData) => {
  const param = {
    url: `${END_POINT}/v1/images/`,
    headers: headersFormUrlEncoded(),
    data: payload,
  };
  return POST(param);
};

const getDataImages = () => {
  const param = {
    url: `${END_POINT}/v1/applications/${appId()}/images/?include_deleted=false`,
    headers: headersFormUrlEncoded(),
  };
  return GET(param);
};

const termsPrivacy = () => {
  const param = {
    url: `${END_POINT}/v2/privacy`,
    headers: headers(),
  };
  return GET(param);
};

const submitMandatoryForm = () => {
  const param = {
    url: `${END_POINT}/v2/submit-document-flag/${appId()}/`,
    headers: headers(),
    data: {
      is_document_submitted: true,
      is_sphp_signed: false,
    },
  };
  return PUT(param);
};

const postAddressInfo = (payload: Record<string, unknown>) => {
  const param = {
    url: `${END_POINT}/v3/address/info`,
    headers: headers(),
    data: payload,
  };
  return POST(param);
};

const getAddressProvinces = () => {
  const param = {
    url: `${END_POINT}/v3/address/provinces`,
    headers: headers(),
  };
  return GET(param);
};

const postAddressCities = (payload: Record<string, unknown>) => {
  const param = {
    url: `${END_POINT}/v3/address/cities`,
    headers: headers(),
    data: payload,
  };
  return POST(param);
};

const postAddressDistricts = (payload: Record<string, unknown>) => {
  const param = {
    url: `${END_POINT}/v3/address/districts`,
    headers: headers(),
    data: payload,
  };
  return POST(param);
};

const postAddressSubDistricts = (payload: Record<string, unknown>) => {
  const param = {
    url: `${END_POINT}/v3/address/subdistricts`,
    headers: headers(),
    data: payload,
  };
  return POST(param);
};

const getDropdownList = () => {
  const param = {
    url: `${END_POINT}/application_flow/web/v1/dropdown_list`,
    headers: headers(),
  };
  return GET(param);
};

const getSettings = (featureName: string) => {
  const param = {
    url: `${END_POINT}/v2/mobile/feature-settings?feature_name=${featureName}`,
    headers: headers(),
  };
  return GET(param);
};

const getLongFormSettings = () => {
  const param = {
    url: `${END_POINT}/application_flow/v1/longform/setting/`,
    headers: headers(),
  };
  return GET(param);
};

const getBanks = (isLogoShow: boolean) => {
  const param = {
    url: `${END_POINT}/v3/product-line/10/dropdown_bank_data?is_show_logo=${!!isLogoShow}`,
    headers: headers(),
  };
  return GET(param);
};

const verifyPhoneNumber = (phone: string) => {
  const param = {
    url: `${END_POINT}/v2/application/otp/`,
    headers: headers(),
    data: {
      phone,
    },
  };
  return POST(param);
};

const validateOtp = (otp_token: string) => {
  const param = {
    url: `${END_POINT}/v2/application/validate-otp/`,
    headers: headers(),
    data: {
      otp_token,
    },
  };
  return POST(param);
};

const uploadKtp = (base64Data: string | File) => {
  const formData = new FormData();
  formData.append('file', base64Data);
  formData.append('image_type', 'ktp_self');
  const param = {
    url: `${END_POINT}/partner/grab/common/upload`,
    headers: headersFormUrlEncoded(),
    data: formData,
  };
  return POST(param);
};

const uploadSelfie = (base64Data: string | File) => {
  const formData = new FormData();
  formData.append('file', base64Data);
  formData.append('image_type', 'selfie');
  const param = {
    url: `${END_POINT}/partner/grab/common/upload`,
    headers: headersFormUrlEncoded(),
    data: formData,
  };
  return POST(param);
};

const submitLongForm = (
  applicationId: string,
  payload: Record<string, unknown>,
) => {
  const param = {
    url: `${END_POINT}/partnership/web/v1/application/${applicationId}/`,
    headers: headers(),
    data: payload,
  };

  return PATCH(param);
};

export {
  boostOption,
  boostStatus,
  bankList,
  getDataImages,
  getAddressProvinces,
  getDropdownList,
  getBanks,
  postAddressInfo,
  postAddressCities,
  postAddressDistricts,
  postAddressSubDistricts,
  submitMandatoryForm,
  termsPrivacy,
  updateBankAccount,
  uploadImage,
  verifyBankAccount,
  getSettings,
  getLongFormSettings,
  verifyPhoneNumber,
  validateOtp,
  uploadKtp,
  uploadSelfie,
  submitLongForm,
};
