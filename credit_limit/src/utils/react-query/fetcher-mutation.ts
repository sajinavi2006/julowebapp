import { API_BASE_PATH } from 'constants/config';
import http from './http';
import type { FMOptions } from './model/fetcher-mutation';

/**
 * @function fetcherMutation
 * @param options
 */
const fetcherMutation = async (options: FMOptions) => {
  const { variables, context } = options;
  const { path = '', method, headers = {}, meta = {}, isFormData } = context;

  const accessToken = meta.accessToken as string;

  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
  }

  const response = await http({
    path: `${API_BASE_PATH}/${path}`,
    body: variables,
    method: method ?? 'POST',
    headers,
    accessToken,
  });

  return Promise.resolve(response);
};

export default fetcherMutation;
