import { useEffect, useRef } from 'react';

/**
 * Make interval use easier, without need to clear interval
 * example: useInterval(()=>{
 * // action
 * }, 1000 or null)
 *
 * pass number to start, or
 * pass null to pause the interval loop
 */
const useInterval = (callback: () => void, delay: number) => {
  const savedCallback = useRef<() => void>();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    const tick = () => {
      if (savedCallback.current) {
        savedCallback.current();
      }
    };
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

export default useInterval;
