import { GET, POST } from 'services/axios';

import { config } from 'configs';
import utils from 'utils';

const END_POINT = config.apiUrl;

const headersOnlyAuthorization = () => {
  const TOKEN = utils.store.get('token');
  return {
    Authorization: `Token ${TOKEN}`,
  };
};

const signSPHP = (applicationXId: string) => {
  const param = {
    url: `${END_POINT}/merchant-financing/v1/sphp/sign/${applicationXId}`,
    headers: headersOnlyAuthorization(),
  };
  return POST(param);
};

const sphp = (applicationXId: string) => {
  const param = {
    url: `${END_POINT}/merchant-financing/v1/sphp/content/${applicationXId}`,
    headers: headersOnlyAuthorization(),
  };
  return GET(param);
};

export { signSPHP, sphp };
