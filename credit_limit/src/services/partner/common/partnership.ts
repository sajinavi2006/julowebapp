import {
  GET as AxiosGet,
  PATCH as AxiosPatch,
  POST as AxiosPost,
  PUT as AxiosPut,
} from 'services/axios';

import { config } from 'configs';
import utils from 'utils';
import { MethodValueTypes } from 'services/types';

// For api single slash "/api"
const END_POINT = config.apiUrl;
// For api double slash "//api"
const END_POINT_DOUBLE_SLASH = config.apiUrlDoubleSlash;

/**
 * if token error Will be redirect to /{partner}/nik
 */
const GET = (param: MethodValueTypes) => {
  return AxiosGet(param, { authErrorRedirect: 'nik' });
};

const PATCH = (param: MethodValueTypes) => {
  return AxiosPatch(param, { authErrorRedirect: 'nik' });
};

const POST = (param: MethodValueTypes) => {
  return AxiosPost(param, { authErrorRedirect: 'nik' });
};

const PUT = (param: MethodValueTypes) => {
  return AxiosPut(param, { authErrorRedirect: 'nik' });
};

// Headers section A-Z
const appId = () => {
  const AppId = utils.store.get('applicationId');

  return AppId;
};

const headers = () => {
  const partner = utils.store.get('partner');
  return {
    'Content-Type': 'application/json',
    username: partner,
  };
};

const headersFormUrlEncoded = () => {
  const partner = utils.store.get('partner');

  return {
    'Content-Type': 'multipart/form-data',
    username: partner,
  };
};

const headerSecretKey = () => {
  const secretKey = utils.store.get('secretKey');
  return {
    'secret-key': secretKey,
  };
};

const headersToken = () => {
  const TOKEN = utils.store.get('token');
  return {
    Authorization: `Token ${TOKEN}`,
  };
};

// API section A-Z
const boostOption = () => {
  const param = {
    url: `${END_POINT}/partnership/web/v1/booster/document-status/${appId()}/`,
    headers: { ...headersToken(), ...headerSecretKey() },
  };
  return GET(param);
};

const boostStatus = () => {
  const param = {
    url: `${END_POINT}/partnership/web/v1/booster/status/${appId()}`,
    headers: { ...headersToken(), ...headerSecretKey() },
  };
  return GET(param);
};

const cancelLoan = (loanXid: string) => {
  const param = {
    url: `${END_POINT}/loan/v1/agreement/loan/status/${loanXid}/`,
    headers: { ...headers(), ...headersToken() },
    data: {
      status: 'cancel',
    },
  };
  return POST(param);
};

const checkPinWeakness = ({
  nik,
  pin,
}: {
  nik: string;
  pin: string | number;
}) => {
  const param = {
    url: `${END_POINT}/partnership/web/v1/check-partner-strong-pin`,
    headers: { ...headers(), ...headerSecretKey() },
    data: {
      nik,
      pin,
    },
  };
  return POST(param);
};

const checkRegisteredUser = () => {
  const param = {
    url: `${END_POINT}/partnership/web/v1/check_registered_user`,
    headers: { ...headers(), ...headerSecretKey() },
  };
  return POST(param);
};

const checkUser = (payload: Record<string, string>) => {
  const param = {
    url: `${END_POINT}/partnership/web/v1/check-user/`,
    headers: { ...headers(), ...headerSecretKey() },
    data: payload,
  };
  return POST(param);
};

const createPinPartnership = (payload: Record<string, string>) => {
  const param = {
    url: `${END_POINT}/partnership/web/v1/create-partner-pin`,
    headers: { ...headers(), ...headerSecretKey() },
    data: payload,
  };
  return POST(param);
};

const createLoanTransaction = ({
  applicationId,
  loanAmount,
  loanDuration,
  loanPurpose,
}: {
  applicationId: string;
  loanAmount: string | number;
  loanDuration: string | number;
  loanPurpose: string;
}) => {
  // FOR THIS API USING DOUBLE SLASH aka //api
  const param = {
    url: `${END_POINT_DOUBLE_SLASH}/partnership/web/v1/loan`,
    headers: { ...headers(), ...headerSecretKey(), ...headersToken() },
    data: {
      application_id: applicationId,
      loan_amount_request: loanAmount,
      loan_duration: loanDuration,
      loan_purpose: loanPurpose,
    },
  };
  return POST(param);
};

const creditInfo = () => {
  const param = {
    url: `${END_POINT}/partnership/web/v1/credit-info`,
    headers: { ...headerSecretKey(), ...headersToken() },
  };
  return GET(param);
};

const fetchLoanOffer = (params: {
  loan_amount_request: string | number;
  application_xid: string;
  paylater_transaction_xid: string;
}) => {
  const param = {
    url: `${END_POINT}/partnership/web/v1/loan-offer`,
    headers: { ...headers(), ...headerSecretKey(), ...headersToken() },
    params,
  };
  return GET(param);
};

const finishingLoanStatus = (loanXid: string) => {
  // FOR THIS API USING DOUBLE SLASH aka //api
  const param = {
    url: `${END_POINT_DOUBLE_SLASH}/partnership/web/v1/agreement/loan/status/${loanXid}/`,
    headers: { ...headers(), ...headerSecretKey(), ...headersToken() },
    data: { loan_xid: loanXid, status: 'sign' },
  };
  return POST(param);
};

const getDataImages = () => {
  const param = {
    url: `${END_POINT}/partnership/web/v1/applications/${appId()}/images/?include_deleted=false`,
    headers: { ...headerSecretKey(), ...headersToken() },
  };
  return GET(param);
};

const getLoanDetail = (loanXid: string) => {
  const param = {
    url: `${END_POINT}/partnership/web/v1/agreement/loan/${loanXid}`,
    headers: { ...headers(), ...headerSecretKey(), ...headersToken() },
  };
  return GET(param);
};

const getPartnershipAddresses = (payload: Record<string, string>) => {
  const param = {
    url: `${END_POINT}/partnership/web/v1/address`,
    headers: { ...headers(), ...headerSecretKey() },
    params: payload,
  };
  return GET(param);
};

const getPartnershipDropdowns = (payload: Record<string, string>) => {
  const param = {
    url: `${END_POINT}/partnership/web/v1/dropdowns`,
    headers: { ...headers(), ...headerSecretKey() },
    params: payload,
  };
  return GET(param);
};

const getPartnershipImages = () => {
  const param = {
    url: `${END_POINT}/partnership/web/v1/images`,
    headers: { ...headers(), ...headerSecretKey() },
  };
  return GET(param);
};

const getPhoneNumber = (sessionID: string) => {
  // FOR THIS API USING DOUBLE SLASH aka //api
  const param = {
    url: `${END_POINT}/partnership/web/v1/get-phone-number`,
    headers: headers(),
    params: {
      sessionID,
    },
  };
  return GET(param);
};

const getSphp = (loanXid: string) => {
  const param = {
    url: `${END_POINT}/partnership/web/v1/agreement/content/${loanXid}`,
    headers: { ...headers(), ...headerSecretKey(), ...headersToken() },
  };
  return GET(param);
};

const getVoiceScript = (loanXid: string) => {
  const param = {
    url: `${END_POINT}/partnership/web/v1/agreement/voice/script/${loanXid}`,
    headers: { ...headers(), ...headerSecretKey(), ...headersToken() },
  };
  return GET(param);
};

const homeScreenInfo = () => {
  const param = {
    url: `${END_POINT}/partnership/web/v1/homescreen/combined`,
    headers: { ...headerSecretKey(), ...headersToken() },
  };
  return GET(param);
};

const infoCard = () => {
  const param = {
    url: `${END_POINT}/partnership/web/v1/info-card`,
    headers: { ...headerSecretKey(), ...headersToken() },
  };
  return GET(param);
};

const loginPin = (payload: {
  nik: string;
  pin: string | number;
  web_version: string;
  partner_name: string;
  latitude?: string;
  longitude?: string;
}) => {
  const param = {
    url: `${END_POINT}/partnership/web/v1/login`,
    headers: { ...headers(), ...headerSecretKey() },
    data: payload,
  };
  return POST(param);
};

const otpConfirmation = ({
  phone,
  nik,
  otp,
}: {
  phone: string;
  nik: string;
  otp: string | number;
}) => {
  const param = {
    url: `${END_POINT}/partnership/web/v1/confirm-otp`,
    headers: headers(),
    data: {
      phone,
      nik,
      otp_token: otp,
    },
  };
  return POST(param);
};

const otpEmailConfirmation = ({
  email,
  otp,
}: {
  email: string;
  otp: string | number;
}) => {
  const param = {
    url: `${END_POINT}/partnership/web/v1/confirm-email-otp`,
    headers: { ...headers(), ...headerSecretKey() },
    data: {
      email,
      otp_token: otp,
    },
  };
  return POST(param);
};
const paylaterApplicationDetail = () => {
  const param = {
    url: `${END_POINT}/partnership/web/v1/paylater-application/details/`,
    headers: { ...headers(), ...headerSecretKey() },
  };
  return GET(param);
};

const paylaterListProduct = (
  paylaterTransactionId: string,
  partnerName: string,
  token: string,
) => {
  const param = {
    url: `${END_POINT}/partnership/web/v1/paylater-product-details`,
    headers: {
      ...headers(),
      username: partnerName,
      'secret-key': token,
    },
    params: {
      paylater_transaction_xid: paylaterTransactionId,
    },
  };
  return GET(param);
};

const registerUser = (payload: {
  nik: string;
  email: string;
  web_version: string;
  latitude?: string;
  longitude?: string;
}) => {
  const param = {
    url: `${END_POINT}/partnership/web/v1/register`,
    headers: { ...headers(), ...headerSecretKey() },
    data: payload,
  };
  return POST(param);
};

const requestOtp = ({
  phone,
  nik,
}: {
  phone: string | number;
  nik: string;
}) => {
  const param = {
    url: `${END_POINT}/partnership/web/v1/request-otp`,
    headers: headers(),
    data: {
      phone,
      nik,
    },
  };
  return POST(param);
};

const requestEmailOtp = ({
  email,
  nik,
}: {
  email: string;
  nik: string | number;
}) => {
  const param = {
    url: `${END_POINT}/partnership/web/v1/request-email-otp`,
    headers: { ...headers(), ...headerSecretKey() },
    data: {
      action_type: 'register',
      email,
      nik,
    },
  };
  return POST(param);
};

const sentLoanExpectation = ({
  duration,
  loan_amount,
  nik,
}: {
  duration: string | number;
  loan_amount: string | number;
  nik: string;
}) => {
  const param = {
    url: `${END_POINT}/partnership/web/v1/loan-expectation`,
    headers: { ...headers(), ...headerSecretKey() },
    data: {
      nik,
      loan_amount_request: loan_amount,
      loan_duration_request: duration,
    },
  };
  return POST(param);
};

const submitMandatoryForm = () => {
  const param = {
    url: `${END_POINT}/partnership/web/v1/submit-document-flag/${appId()}/`,
    headers: { ...headersToken(), ...headerSecretKey() },
    data: {
      is_document_submitted: true,
      is_sphp_signed: false,
    },
  };
  return PUT(param);
};

const submitPartnershipLongForm = (payload: Record<string, string>) => {
  const param = {
    url: `${END_POINT}/partnership/web/v1/submit`,
    headers: { ...headers(), ...headerSecretKey() },
    data: payload,
  };
  return PATCH(param);
};

const uploadVoiceRecording = (loanXid: string, payload: Blob) => {
  const formData = new FormData();
  formData.append('upload', payload);
  formData.append('data', `recording_${loanXid}.webm`);
  const param = {
    url: `${END_POINT}/partnership/web/v1/agreement/voice/upload/${loanXid}/`,
    headers: { ...headers(), ...headerSecretKey(), ...headersToken() },
    data: formData,
  };
  return POST(param);
};

const uploadImage = (payload: FormData) => {
  const param = {
    url: `${END_POINT}/partnership/web/v1/images/`,
    headers: {
      ...headers(), // accept JSON
      ...headerSecretKey(),
      ...headersToken(),
    },
    data: payload,
  };

  return POST(param);
};

/**
 *
 * @param skip_customer default false
 * @param check_active default true
 * @param check_passive default true
 * @returns
 */
const uploadLivenessImagePreCheck = (
  skip_customer = false,
  check_active = true,
  check_passive = true,
  token?: string,
) => {
  const param = {
    url: `${END_POINT}/liveness-detection/v2/pre-check`,
    headers: {
      ...headers(),
      Authorization: token ? `Token ${token}` : headersToken().Authorization,
    },
    data: {
      skip_customer,
      service_check_type: 'dot_digital_identity',
      client_type: 'web',
      check_active,
      check_passive,
    },
  };
  return POST(param);
};

const uploadLivenessImagePreActiveCheck = (token?: string) => {
  const param = {
    url: `${END_POINT}/liveness-detection/v1/pre-smile-check`,
    headers: {
      ...headers(),
      Authorization: token ? `Token ${token}` : headersToken().Authorization,
    },
    data: {
      start_active: true,
      start_passive: true,
    },
  };
  return PUT(param);
};

const uploadLivenessImage = (imgNeutral: Blob, imgSmile: Blob) => {
  const formData = new FormData();

  const currentDate = new Date();
  const formattedDate = currentDate
    .toISOString()
    .replace(/[-:.T]/g, '')
    .slice(0, -5);

  formData.append('images[0]image', imgNeutral, `${formattedDate}_neutral.jpg`);
  formData.append('images[0]type', 'neutral');
  formData.append('images[1]image', imgSmile, `${formattedDate}_smile.jpg`);
  formData.append('images[1]type', 'smile');

  const param = {
    url: `${END_POINT}/liveness-detection/v1/smile-check`,
    headers: {
      ...headersToken(),
      ...headersFormUrlEncoded(),
    },
    data: formData,
  };
  return POST(param);
};

const livenessStatusCheck = (token?: string) => {
  const param = {
    url: `${END_POINT}/liveness-detection/v1/smile-check`,
    headers: {
      Authorization: token ? `Token ${token}` : headersToken().Authorization,
      ...headersFormUrlEncoded(),
    },
  };
  return GET(param);
};

const uploadSignature = (payload: { base64Data: string; loanXID: string }) => {
  const { base64Data, loanXID } = payload;
  const formData = new FormData();
  formData.append('upload', base64Data);
  formData.append('data', base64Data);
  const param = {
    url: `${END_POINT}/partnership/web/v1/agreement/signature/upload/${loanXID}/`,
    headers: {
      ...headersFormUrlEncoded(),
      ...headerSecretKey(),
      ...headersToken(),
    },
    data: formData,
  };
  return POST(param);
};

/**
 *
 * @param {*} base64Data
 * @param {*} type = ktp_self_partnership | crop_selfie_partnership | selfie_partnership
 * @returns
 */
const uploadPartnershipImage = (
  base64Data: string,
  type:
    | 'ktp_self_partnership'
    | 'crop_selfie_partnership'
    | 'selfie_partnership',
) => {
  const formData = new FormData();
  formData.append('upload', base64Data);
  formData.append('image_type', type);
  const param = {
    url: `${END_POINT}/partnership/web/v1/images`,
    headers: { ...headersFormUrlEncoded(), ...headerSecretKey() },
    data: formData,
  };
  return POST(param);
};

const verifyPinPartner = ({
  nik,
  pin,
}: {
  nik: string;
  pin: string | number;
}) => {
  const param = {
    url: `${END_POINT}/partnership/web/v1/verify-partner-pin`,
    headers: { ...headers(), ...headerSecretKey(), ...headersToken() },
    data: {
      nik,
      pin,
    },
  };
  return POST(param);
};

// Export section A-Z
export {
  boostOption,
  boostStatus,
  cancelLoan,
  checkPinWeakness,
  checkRegisteredUser,
  checkUser,
  createPinPartnership,
  createLoanTransaction,
  creditInfo,
  fetchLoanOffer,
  finishingLoanStatus,
  getDataImages,
  getLoanDetail,
  getPartnershipAddresses,
  getPartnershipDropdowns,
  getPartnershipImages,
  getPhoneNumber,
  getSphp,
  getVoiceScript,
  homeScreenInfo,
  infoCard,
  livenessStatusCheck,
  loginPin,
  otpConfirmation,
  otpEmailConfirmation,
  paylaterApplicationDetail,
  paylaterListProduct,
  registerUser,
  requestOtp,
  sentLoanExpectation,
  submitMandatoryForm,
  submitPartnershipLongForm,
  uploadImage,
  uploadLivenessImagePreCheck,
  uploadLivenessImagePreActiveCheck,
  uploadLivenessImage,
  uploadPartnershipImage,
  uploadSignature,
  verifyPinPartner,
  requestEmailOtp,
  uploadVoiceRecording,
};
