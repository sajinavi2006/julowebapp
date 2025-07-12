import { forwardRef, useEffect, useState } from 'react';
import { cx } from '@emotion/css';

import utils from 'utils';

import LoaderText from 'components/LoaderText';

import timerIcon from 'assets/img/timer.png';

import { errorMessage, redColor } from './styles';
import { text } from 'assets/css/stylesValue';
import { Div, Img } from 'assets/css/styled';
import { my3 } from 'assets/css/stylesFix';
import { CountdownProps } from './types';

// Call function with ref. Example: onClick={() => { countdownRef.current.intervalTimer() }}
const Countdown = forwardRef((props: CountdownProps) => {
  const {
    messageError,
    messageTimesUp = 'Waktu sudah habis, silahkan coba lagi.',
    isTimesUp,
    isLoading,
    showError,
    setIsTimesUp,
    triggerNewTimer,
    isTimerReady,
  } = props;
  const [isMounted, setIsMounted] = useState(false);
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timer>();
  const [timer, setTimer] = useState('-- : --');
  const expiredTimeStored = utils.store.get('expiredTimeOtp');
  const expiredTime = expiredTimeStored ? parseInt(expiredTimeStored) : 0;

  const calculateTimeLeft = () => {
    const currentEpochDate = new Date(); // generate new Date every function has called
    const expiredTimeEpoch = expiredTime ? expiredTime : 0;
    const getTimer = expiredTimeEpoch - currentEpochDate.getTime(); // get current time for generate minutes and seconds

    const timeLeft = {
      minutes: ~~((getTimer / 1000 / 60) % 60),
      seconds: ~~((getTimer / 1000) % 60),
    };

    const tempMinutes =
      timeLeft.minutes < 10 ? `0${timeLeft.minutes}` : timeLeft.minutes;
    const tempSeconds =
      timeLeft.seconds < 10 ? `0${timeLeft.seconds}` : timeLeft.seconds;

    if (getTimer > 0) {
      // if epoch time > 0
      setIsTimesUp(false);
      setTimer(`${tempMinutes} : ${tempSeconds}`);
    } else {
      // timeout
      utils.store.set('expiredTimeOtp', 0);
      clearInterval(timerInterval);
      setIsTimesUp(true);
    }
  };

  const intervalTimer = (isClearInterval: boolean) => {
    const currentEpochDate = new Date(); // generate new Date every function has called

    if (
      !isTimerReady &&
      !isMounted &&
      expiredTime < currentEpochDate.getTime()
    ) {
      triggerNewTimer();
    } else {
      if (isClearInterval) {
        clearInterval(timerInterval);
      }
      const timer = setInterval(() => {
        calculateTimeLeft();
      }, 1000);

      setTimerInterval(timer);
    }
  };

  useEffect(() => {
    intervalTimer(true);
    setIsMounted(true);
    // call function every 'lastActivationTime' data has changed
  }, [isTimerReady]);

  return (
    <>
      <Div className={cx(errorMessage, my3)} textAlign='center'>
        {showError ? messageError : null}
      </Div>
      <Div className={cx(errorMessage, my3)} textAlign='center'>
        {isTimesUp && !showError ? messageTimesUp : null}
      </Div>
      <Div textAlign='center'>
        {!isLoading ? (
          <>
            <Img src={timerIcon} className={cx('timerImg')} alt='timer' />
            <span className={cx({ [redColor]: isTimesUp }, text({ size: 12 }))}>
              {timer}
            </span>
          </>
        ) : (
          <LoaderText />
        )}
      </Div>
    </>
  );
});

Countdown.displayName = 'Countdown';

export default Countdown;
