import type { QueryFunctionContext } from '@tanstack/react-query';

import { API_BASE_PATH } from 'constants/config';
import queryStringify from '../url/query-stringify';
import http from './http';
import type { InfiniteResult } from './model/fetcher-infinite';

/**
 * @function fetcherInfinite
 * @param options
 */
const fetcherInfinite = async (
  options: QueryFunctionContext,
): Promise<InfiniteResult> => {
  const { queryKey = [], pageParam, meta = {} } = options;

  const accessToken = meta.accessToken as string;

  const [rpath, rparams] = queryKey;
  const path = rpath ? `${API_BASE_PATH}/${rpath}` : '';

  let variables: Record<string, unknown>;
  if (pageParam) {
    variables = pageParam;
  } else {
    variables = rparams ? (rparams as Record<string, unknown>) : {};
  }

  const params = queryStringify(variables);
  const response = await http({ path, params, accessToken });

  return Promise.resolve({ data: response, variables: variables });
};

export default fetcherInfinite;
