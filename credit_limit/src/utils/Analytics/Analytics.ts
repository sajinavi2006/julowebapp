import { googleAnalyticsLogEvent } from './GoogleAnalytics/analytics';

interface LogEventArgs {
  title: string;
  eventName: string;
}

const isShowAnalyticsLog = process.env.REACT_APP_SHOW_ANALYTICS_LOG === 'true';

const logEvent = ({ title, eventName }: LogEventArgs) => {
  if (isShowAnalyticsLog) {
    // eslint-disable-next-line no-console
    console.log('%cNEW EVENT', 'background: #00ab6b; color: white', {
      title,
      eventName,
    });
  }
  googleAnalyticsLogEvent(title, eventName);
};

export default {
  logEvent,
};
