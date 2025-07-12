import { POST, GET } from 'services/axios';

import { config } from 'configs';
import utils from 'utils';
import { DisbursementParam } from './types';

const END_POINT = config.apiUrl;

const headers = () => {
  const TOKEN = utils.store.get('token');
  return {
    Authorization: `Bearer ${TOKEN}`,
    'Content-Type': 'application/json',
  };
};

const headersFormUrlEncoded = () => {
  return {
    'Content-Type': 'multipart/form-data',
  };
};

const submitApplication = (payload: Record<string, unknown>) => {
  const param = {
    url: `${END_POINT}/employee-financing/pilot/submit-application`,
    headers: {
      ...headers(),
      ...headersFormUrlEncoded(),
    },
    data: payload,
  };

  return POST(param);
};

const submitDisbursement = (payload: DisbursementParam) => {
  const param = {
    url: `${END_POINT}/employee-financing/pilot/submit-disbursement`,
    headers: {
      ...headers(),
    },
    data: payload,
  };

  return POST(param);
};

const validateToken = (token: string) => {
  const param = {
    url: `${END_POINT}/employee-financing/pilot/auth`,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };
  return GET(param);
};

export { submitApplication, submitDisbursement, validateToken };
export * from './types';
