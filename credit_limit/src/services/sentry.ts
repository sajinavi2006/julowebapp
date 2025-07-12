import * as Sentry from '@sentry/browser';
import utils from '../utils';
import { AxiosError } from 'axios';

const sentryError = {
  handleSentryApiError: (
    error: AxiosError,
    payload: Record<string, unknown> = {},
    token = '',
    options: Record<string, unknown> = {},
  ) => {
    const authErrorRedirect = options?.authErrorRedirect;
    const partner = utils.store.get('partner');
    const webType = utils.store.get('webType');
    const END_POINT = window.location.origin;

    if (error.response) {
      const data = error.response.data;
      const status = error.response.status;

      if (status && status >= 500) {
        Sentry.configureScope((scope) => {
          scope.setExtra('response_data', data);
          scope.setExtra('response_status', status);
          scope.setExtra('payload', payload);
          scope.setExtra('token', token);
        });
        Sentry.captureException(error);
      }

      if (
        webType === 'webapp' &&
        partner === 'linkaja' &&
        error?.response?.status == 401 &&
        (error?.response?.headers['www-authenticate'] === 'Token' ||
          error?.response?.headers['www-authenticate'] === 'token')
      ) {
        utils.store.clearAllItem('sessionId');
        utils.store.set('invalidToken', true);
        window.location.replace(`${END_POINT}/${partner}/nik`);
      } else if (
        webType === 'webapp' &&
        error?.response?.status == 401 &&
        (error?.response?.headers['www-authenticate'] === 'Token' ||
          error?.response?.headers['www-authenticate'] === 'token')
      ) {
        utils.store.clearAllItem();
        utils.store.set('invalidToken', true);
        if (authErrorRedirect) {
          window.location.replace(`${END_POINT}/${partner}`);
        } else {
          window.location.replace(`${END_POINT}/${partner}/login`);
        }
      } else if (
        webType === 'webview' &&
        (error?.response?.status == 401 || error?.response?.status >= 500)
      ) {
        window.location.replace(`${END_POINT}/view/error`);
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
