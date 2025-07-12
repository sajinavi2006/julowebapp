import axios from 'axios';

import { config } from '../configs';
import services from '.';
import utils from '../utils';

const commonService = {
  upload: (
    payload: Record<string, unknown>,
    successCallback: (payload: unknown) => void,
    errorCallback: (payload: unknown) => void,
  ) => {
    axios
      .post(config.apiUrl + 'common/upload', payload)
      .then((response) => {
        successCallback(response.data);
      })
      .catch((exception) => {
        services.sentry.handleSentryApiError(exception);
        errorCallback(exception);
      });
  },
  getDropdownData: async (
    params: Record<string, unknown>,
    successCallback: (payload: unknown) => void,
  ) => {
    axios
      .get('https://api-staging.julo.co.id/api/partner/grab/common/dropdown', {
        headers: {
          Authorization: `Token ${utils.store.get('token')}`,
          'Token-Version': '1.0',
        },
        params,
      })
      .then((response) => {
        successCallback(response.data);
      });
    //   .catch((exception) => {
    //     //services.sentry.handleSentryApiError(exception);
    //     //errorCallback(exception)
    //   });
  },
  getData: async (
    { uri, params }: { uri: string; params: Record<string, unknown> },
    successCallback: (payload: unknown) => void,
    errorCallback: (payload: unknown) => void,
  ) => {
    axios
      .get(config.apiUrl + uri, {
        headers: {
          Authorization: `Token ${utils.store.get('token')}`,
          'Token-Version': '1.0',
        },
        params,
      })
      .then((response) => {
        successCallback(response.data);
      })
      .catch((exception) => {
        if (errorCallback) errorCallback(exception);
      });
  },
  postData: async (
    { uri, body }: { uri: string; body: Record<string, unknown> },
    successCallback: (payload: unknown) => void,
    errorCallback: (payload: unknown) => void,
  ) => {
    axios
      .post(config.apiUrl + uri, body, {
        headers: {
          Authorization: `Token ${utils.store.get('token')}`,
          'Token-Version': '1.0',
        },
      })
      .then((response) => {
        successCallback(response.data);
      })
      .catch((exception) => {
        if (errorCallback) errorCallback(exception);
      });
  },
  putData: async (
    { uri, body }: { uri: string; body: Record<string, unknown> },
    successCallback: (payload: unknown) => void,
    errorCallback: (payload: unknown) => void,
  ) => {
    axios
      .put(config.apiUrl + uri, body, {
        headers: {
          Authorization: `Token ${utils.store.get('token')}`,
          'Token-Version': '1.0',
        },
      })
      .then((response) => {
        successCallback(response.data);
      })
      .catch((exception) => {
        if (errorCallback) errorCallback(exception);
      });
  },

  get: (
    uri: string,
    successCallback: (payload: unknown) => void,
    errorCallback: (payload: unknown) => void,
  ) => {
    axios
      .get(config.apiUrl + uri)
      .then((response) => {
        successCallback(response.data);
      })
      .catch((exception) => {
        services.sentry.handleSentryApiError(exception);
        errorCallback(exception);
      });
  },

  getImageDetails: (
    successCallback: (payload: unknown) => void,
    errorCallback: (payload: unknown) => void,
  ) => {
    const AppId = utils.store.get('applicationId');
    const url = `/v1/applications/${AppId}/images/?include_deleted=false`;
    axios
      .get(config.apiUrl + url, {
        headers: {
          Authorization: `Token ${utils.store.get('token')}`,
          'Token-Version': '1.0',
        },
      })
      .then((response) => {
        successCallback(response.data);
      })
      .catch((exception) => {
        if (errorCallback) errorCallback(exception);
      });
  },

  post: (
    uri: string,
    payload: Record<string, unknown>,
    successCallback: (payload: unknown) => void,
    errorCallback: (payload: unknown) => void,
  ) => {
    axios
      .post(config.apiUrl + uri, payload)
      .then((response) => {
        successCallback(response.data);
      })
      .catch((exception) => {
        services.sentry.handleSentryApiError(exception);
        errorCallback(exception);
      });
  },
};

export default commonService;
