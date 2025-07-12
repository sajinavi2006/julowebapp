import { GET, POST } from 'services/axios';

import { config } from 'configs';
import utils from 'utils';

const END_POINT = config.apiUrl;

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

const getDevices = () => {
  const param = {
    url: `${END_POINT}/loan/v1/rentee/loan-purpose`,
    headers: headers(),
  };
  return GET(param);
};

const verifyLoan = (payload: Record<string, unknown>) => {
  const param = {
    url: `${END_POINT}/loan/v1/rentee/loan-duration`,
    headers: headers(),
    data: payload,
  };
  return POST(param);
};

const createLoan = (payload: Record<string, unknown>) => {
  const param = {
    url: `${END_POINT}/loan/v1/rentee/loan`,
    headers: headers(),
    data: payload,
  };
  return POST(param);
};

const checkVerificationCode = (payload: Record<string, unknown>) => {
  const { loanXID, code } = payload;
  const param = {
    url: `${END_POINT}/rentee/v1/check-verification-code/${loanXID}/`,
    headers: headers(),
    data: { code },
  };
  return POST(param);
};

const getDepositStatus = (loanXid: string) => {
  const param = {
    url: `${END_POINT}/loan/v1/rentee/deposit-status/${loanXid}`,
    headers: headers(),
  };
  return GET(param);
};

const sphp = (xid: string) => {
  const param = {
    url: `${END_POINT}/loan/v1/rentee/agreement/content/${xid}`,
    headers: headers(),
  };
  return GET(param);
};

const getLoanDetail = (loanXid: string, partner: string) => {
  const param = {
    url: `${END_POINT}/loan/v1/agreement/loan/${loanXid}${
      partner ? '?partner_name=' + partner : ''
    }`,
    headers: headers(),
  };
  return GET(param);
};

const uploadSignature = (payload: Record<string, unknown>) => {
  const { base64Data, loanXID } = payload;
  const formData = new FormData();
  formData.append('upload', base64Data as string);
  formData.append('data', base64Data as string);
  const param = {
    url: `${END_POINT}/loan/v1/agreement/signature/upload/${loanXID}/`,
    headers: headersFormUrlEncoded(),
    data: formData,
  };
  return POST(param);
};

const cancellingLoanStatus = (loanXid: string) => {
  const param = {
    url: `${END_POINT}/loan/v1/agreement/loan/status/${loanXid}/`,
    headers: headers(),
    data: { status: 'cancel' },
  };
  return POST(param);
};

const finishingLoanStatus = (loanXid: string) => {
  const param = {
    url: `${END_POINT}/loan/v1/agreement/loan/status/${loanXid}/`,
    headers: headers(),
    data: { status: 'finish' },
  };
  return POST(param);
};

const fetchLoan = () => {
  const param = {
    url: `${END_POINT}/rentee/v1/fetch-loan/`,
    headers: headers(),
  };
  return GET(param);
};

const reactiveLoan = (loanXid: string) => {
  const param = {
    url: `${END_POINT}/loan/v1/rentee/reactive-loan/${loanXid}`,
    headers: headers(),
  };
  return POST(param);
};

export {
  getDevices,
  verifyLoan,
  getDepositStatus,
  checkVerificationCode,
  createLoan,
  sphp,
  getLoanDetail,
  uploadSignature,
  cancellingLoanStatus,
  finishingLoanStatus,
  fetchLoan,
  reactiveLoan,
};
