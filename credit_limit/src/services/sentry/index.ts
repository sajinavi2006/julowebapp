import * as Sentry from '@sentry/browser';
import { AxiosError } from 'axios';
import utils from 'utils';

const sentryError = {
  handleSentryApiError: (error: AxiosError, payload = '', token = '') => {
    const partner = utils.store.get('partner');
    const END_POINT = window.location.origin;
    const loginUrl = partner
      ? `${END_POINT}/${partner}/login`
      : `${END_POINT}/login`;

    if (error.response) {
      const data = error.response.data;
      const status = error.response.status;
      if (status >= 500) {
        Sentry.configureScope((scope) => {
          scope.setExtra('response_data', data);
          scope.setExtra('response_status', status);
          scope.setExtra('payload', payload);
          scope.setExtra('token', token);
        });
        Sentry.captureException(error);
      }
      if (
        error?.response?.status == 401 &&
        (error?.response?.headers['www-authenticate'] === 'Token' ||
          error?.response?.headers['www-authenticate'] === 'token')
      ) {
        utils.store.clearAllItem();
        utils.store.set('invalidToken', true);
        window.location.replace(loginUrl);
      }
    } else {
      Sentry.configureScope((scope) => {
        scope.setExtra('response_err', 'no response');
        scope.setExtra('response_data', 'no data');
        scope.setExtra('response_status', 'no status');
        scope.setExtra('payload', payload);
        scope.setExtra('token', token);
      });
      Sentry.captureException(error);
    }

    const message = 'error';
    return message;
  },
};

export default sentryError;
