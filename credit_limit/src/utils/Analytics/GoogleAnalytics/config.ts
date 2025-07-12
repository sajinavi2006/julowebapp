import ReactGA from 'react-ga4';
import { InitReactGAoptions } from './types';
/**
 * GA config
 */
export const googleAnalyticsConfig = {
  measurementId: process.env.REACT_APP_GA_MEASUREMENT_ID || '',
  isDebugMode:
    process.env.NODE_ENV === 'development' &&
    process.env.REACT_APP_GA_DEBUG_MODE === '1',
};

/**
 * initialize google analytics
 */
export const initGoogleAnalytics = () => {
  const gaOptions: InitReactGAoptions = {};
  if (googleAnalyticsConfig.isDebugMode) {
    gaOptions.testMode = false;
  }
  ReactGA.initialize(googleAnalyticsConfig.measurementId, gaOptions);
  ReactGA.send('pageview');
};
