import Cookie from 'js-cookie';

function setCookie(
  key: string,
  value: string,
  options?: Cookie.CookieAttributes,
) {
  Cookie.set(key, value, options);
}

export default setCookie;
