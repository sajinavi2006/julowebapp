import type { QueryFunctionContext } from '@tanstack/react-query';

import { API_BASE_PATH } from 'constants/config';
import queryStringify from '../url/query-stringify';
import http from './http';

/**
 * @function fetcherQuery
 * @param options
 */
const fetcherQuery = async (options: QueryFunctionContext) => {
  const { queryKey = [], meta = {} } = options;

  const accessToken = meta.accessToken as string | undefined;

  const [rpath, rparams] = queryKey;
  const path = rpath ? `${API_BASE_PATH}/${rpath}` : '';
  const params = rparams ? (rparams as Record<string, unknown>) : {};
  const pstring = queryStringify(params);

  const response = await http({
    path,
    params: pstring,
    accessToken,
  });
  return Promise.resolve(response);
};

export default fetcherQuery;
