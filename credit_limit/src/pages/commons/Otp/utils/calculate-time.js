import { _noop } from '@julofinance/web-helpers/dist/fn';

import isValidDate from './is-valid-date';

export function calculateTime(props) {
  const { onCountdownStop = _noop, resendTime } = props;

  const startTime = new Date();
  const endTime = new Date(resendTime);
  const difference = endTime - startTime;

  if (!isValidDate(resendTime)) return setTimeLeft('00:00');
  if (difference <= 0) {
    onCountdownStop();
    return '00:00';
  }

  const totalSeconds = Math.floor(difference / 1000);

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);

  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  return `${formattedMinutes}:${formattedSeconds}`;
}
