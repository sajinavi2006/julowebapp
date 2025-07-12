import { removeCookie, setCookie, getCookie } from 'utils/cookie';

function useCookie() {
  const cookies = getCookie() || {};

  return { cookies, setCookie, removeCookie };
}

export default useCookie;
