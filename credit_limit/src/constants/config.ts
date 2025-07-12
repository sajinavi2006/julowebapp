/**
 * This Config is for merchant use only
 */
const CONFIG = {
  API_BASE_PATH: String(process.env.REACT_APP_API_BASE_PATH ?? ''),
  API_HOST: String(process.env.REACT_APP_API_HOST ?? ''),
  API_TIMEOUT: Number(process.env.REACT_APP_API_TIMEOUT ?? 3500),
  GOOGLE_CLIENT_ID: String(
    process.env.REACT_APP_MERCHANT_GOOGLE_CLIENT_ID ?? '',
  ),
};

export const { API_BASE_PATH, API_HOST, API_TIMEOUT, GOOGLE_CLIENT_ID } =
  CONFIG;
