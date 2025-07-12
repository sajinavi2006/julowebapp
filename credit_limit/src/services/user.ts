import { GET } from './axios';

import { config } from '../configs';

import utils from '../utils';
import { MethodValueTypes } from './types';

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

const creditInfo = () => {
  const param = {
    url: `${END_POINT}/customer-module/web/v1/credit-info`,
    headers: headers(),
  };
  return GET(param);
};

const homeScreenInfo = (partner: string) => {
  let param: MethodValueTypes;
  switch (partner) {
    case 'linkaja':
      param = {
        url: `${END_POINT}/partnership/web/v1/homescreen/combined`,
        headers: { ...headersToken(), ...headerSecretKey() },
      };
      break;

    default:
      param = {
        url: `${END_POINT}/v2/homescreen/combined?application_id=${appId()}${
          partner ? '&partner_name=' + partner : ''
        }`,
        headers: headers(),
      };
      break;
  }

  return GET(param);
};

const infoCard = () => {
  const param = {
    url: `${END_POINT}/streamlined_communication/v1/android_info_cards`,
    headers: headers(),
  };
  return GET(param);
};

export { creditInfo, homeScreenInfo, infoCard };
