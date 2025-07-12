import { queryParse } from 'utils/url';

export function useHandleCheckTokenExist() {
  const token = queryParse(window.location.search).token;

  if (!token) {
    window.location.assign('/');
    return false;
  }

  return true;
}
