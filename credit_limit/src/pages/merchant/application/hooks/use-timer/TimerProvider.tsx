import { createContext, useCallback, useEffect, useRef, useState } from 'react';

import { TimerContextProps, TimerProviderProps } from './types';
import { convertDateToSeconds } from './utils';

export const TimerContext = createContext<TimerContextProps>({
  startTime: () => { },
  setTime: () => { },
  time: 0,
});

const TimerProvider = (props: TimerProviderProps) => {
  const { children } = props;

  const [time, _setTime] = useState(0);
  const timeInterval = useRef<ReturnType<typeof setInterval>>();

  const setTime = (date?: string | number | Date) => {
    if (!date) return;

    if (!(date instanceof Date)) {
      _setTime(convertDateToSeconds(new Date(date)));
    } else {
      _setTime(convertDateToSeconds(date));
    }
  };

  const startTime = useCallback(() => {
    if (timeInterval.current) clearInterval(timeInterval.current);

    timeInterval.current = setInterval(() => {
      _setTime((prev) => {
        if (prev <= 0) {
          clearInterval(timeInterval.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  useEffect(() => {
    return () => {
      if (timeInterval.current) {
        clearInterval(timeInterval.current);
      }
    };
  }, []);

  return (
    <TimerContext.Provider value={{ time, setTime, startTime }}>
      {children}
    </TimerContext.Provider>
  );
};

export default TimerProvider;
