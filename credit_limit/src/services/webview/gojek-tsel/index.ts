import { POST } from 'services/axios';

import { config } from 'configs';

const END_POINT = config.apiUrl;

const queryParams = new URLSearchParams(window.location.search);
const portalId = queryParams.get('portal_id');

const submitGojekTselApplication = (payload: Record<string, unknown>) => {
  const param = {
    url: `${END_POINT}/partnership/web/v1/mini-form`,
    headers: {
      Authorization: `Bearer ${portalId}`,
    },
    data: payload,
  };
  return POST(param);
};
export { submitGojekTselApplication };
