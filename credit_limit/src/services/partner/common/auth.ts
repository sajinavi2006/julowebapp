import { POST } from 'services/axios';

import { config } from 'configs';
//import services from "../services";

const HEADERS = {
  'Content-Type': 'application/json',
};

const END_POINT = config.apiUrl;

const login = (payload: Record<string, unknown>) => {
  const param = {
    url: `${END_POINT}/pin/v1/partner/login`,
    data: payload,
    headers: HEADERS,
  };
  return POST(param);
};

export { login };
