import { client } from 'constants/client';
import {
  CustomError,
  FetchInitType,
  FetchRequestInfoType,
} from './model/custom-fetch';

const customFetch = (url: FetchRequestInfoType, options?: FetchInitType) => {
  return new Promise<Response>(async (resolve, reject) => {
    try {
      const request = await client(url, options);
      resolve(request);
    } catch (err) {
      const error = err as CustomError;
      if (error.name === 'AbortError')
        reject(new CustomError('Request Aborted - Timeout Exceeded', false));
      reject(error);
    }
  });
};

export default customFetch;
