import { GET as AxiosGet, POST as AxiosPost } from 'services/axios';

import { config } from 'configs';
import utils from 'utils';
import { MethodValueTypes } from 'services/types';

const END_POINT = config.apiUrl;

/**
 * if token error Will be redirect to /{partner}/nik
 */
const GET = (param: MethodValueTypes) => {
  return AxiosGet(param, { authErrorRedirect: 'nik' });
};

const POST = (param: MethodValueTypes) => {
  return AxiosPost(param, { authErrorRedirect: 'nik' });
};

const headersFormUrlEncoded = () => {
  const merchant = utils.store.get('merchant');

  return {
    'Content-Type': 'multipart/form-data',
    username: merchant,
  };
};

const headers = () => {
  const merchant = utils.store.get('merchant');
  return {
    'Content-Type': 'application/json',
    username: merchant,
  };
};

const headerSecretKey = () => {
  const secretKey = utils.store.get('secretKey');
  return {
    'secret-key': secretKey,
  };
};

const headersToken = () => {
  const token = utils.store.get('token');
  return {
    'secret-key': token,
  };
};

// API section A-Z

const applicationDetail = () => {
  const param = {
    url: `${END_POINT}/partnership/web/v1/paylater-application/details/`,
    headers: { ...headers(), ...headerSecretKey() },
  };
  return GET(param);
};

const checkUser = (payload: Record<string, unknown>) => {
  const param = {
    url: `${END_POINT}/partnership/web/v1/check-user/`,
    headers: { ...headers(), ...headerSecretKey() },
    data: payload,
  };
  return POST(param);
};

const listProduct = (paylaterTransactionId: string, applicationXid: string) => {
  const param = {
    url: `${END_POINT}/partnership/web/v1/paylater-product-details`,
    headers: {
      ...headers(),
      ...headersToken(),
    },
    params: {
      paylater_transaction_xid: paylaterTransactionId,
      application_xid: applicationXid,
    },
  };
  return GET(param);
};

const loanOffer = (params: Record<string, unknown>) => {
  const param = {
    url: `${END_POINT}/partnership/v1/loan-offer`,
    headers: {
      ...headers(),
      ...headersToken(),
    },
    params,
  };
  return GET(param);
};

const cancellingLoanStatus = (loanXid: string) => {
  const param = {
    url: `${END_POINT}/partnership/v1/agreement/loan/status/${loanXid}/`,
    headers: { ...headers(), ...headersToken() },
    data: { status: 'cancel' },
  };
  return POST(param);
};

const finishingLoanStatus = (loanXid: string) => {
  const param = {
    url: `${END_POINT}/partnership/v1/agreement/loan/status/${loanXid}/`,
    headers: { ...headers(), ...headersToken() },
    data: { status: 'sign' },
  };
  return POST(param);
};

const getSphp = (loanXid: string) => {
  const param = {
    url: `${END_POINT}/partnership/v1/agreement/content/${loanXid}`,
    headers: { ...headers(), ...headersToken() },
  };
  return GET(param);
};

const uploadSignature = (payload: Record<string, unknown>) => {
  const { base64Data, loanXID } = payload;
  const formData = new FormData();
  formData.append('upload', base64Data as string);
  formData.append('data', base64Data as string);
  const param = {
    url: `${END_POINT}/partnership/v1/loan/${loanXID}/images`,

    headers: {
      ...headersFormUrlEncoded(),
      ...headerSecretKey(),
      ...headersToken(),
    },
    data: formData,
  };
  return POST(param);
};

const createLoanTransaction = ({
  applicationId,
  loanAmount,
  loanDuration,
  loanPurpose,
  transactionXid,
}: {
  applicationId: string;
  loanAmount: string;
  loanDuration: string;
  loanPurpose: string;
  transactionXid: string;
}) => {
  const param = {
    url: `${END_POINT}/partnership/v1/loan/${applicationId}`,
    headers: {
      ...headers(),
      ...headersToken(),
    },
    data: {
      application_id: applicationId,
      loan_amount_request: loanAmount,
      loan_duration: loanDuration,
      loan_purpose: loanPurpose,
      paylater_transaction_xid: transactionXid,
    },
  };
  return POST(param);
};

// Export section A-Z
export {
  checkUser,
  applicationDetail,
  listProduct,
  loanOffer,
  cancellingLoanStatus,
  createLoanTransaction,
  getSphp,
  finishingLoanStatus,
  uploadSignature,
};
