import { useContext } from 'react';

import { TimerContext } from './TimerProvider';

function useTimer() {
  return useContext(TimerContext);
}

export default useTimer;
