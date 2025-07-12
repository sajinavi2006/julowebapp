import ReactGA from 'react-ga4';

/**
 * send a log event to google analytics
 */
export const googleAnalyticsLogEvent = (title: string, eventName: string) => {
  ReactGA.event({
    category: title,
    action: eventName,
  });
};

export default ReactGA;
