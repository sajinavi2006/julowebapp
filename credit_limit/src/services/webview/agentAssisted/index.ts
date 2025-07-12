import { GET, POST } from 'services/axios';

import { config } from 'configs';

const END_POINT = config.apiUrl;
const queryParams = new URLSearchParams(window.location.search);
const partnerName = queryParams.get('partner_name');
const token = queryParams.get('token');

const getApplicantInfo = () => {
  const param = {
    url: `${END_POINT}/partnership/web/v1/${partnerName}/application-info`,
    headers: {
      Authorization: token,
    },
  };
  return GET(param);
};

const verifyPin = (payload: Record<string, unknown>) => {
  const param = {
    url: `${END_POINT}/partnership/web/v1/${partnerName}/pin/verify`,
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
    data: payload,
  };
  return POST(param);
};

const createPin = (payload: Record<string, unknown>) => {
  const param = {
    url: `${END_POINT}/partnership/web/v1/${partnerName}/pin/create`,
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
    data: payload,
  };
  return POST(param);
};

export { createPin, getApplicantInfo, verifyPin };
