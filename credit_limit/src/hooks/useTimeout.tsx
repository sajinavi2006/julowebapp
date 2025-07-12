import { useRef, useEffect } from 'react';

export default function useTimeout(callback: () => void, delay: number) {
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => savedCallback.current();
    if (typeof delay === 'number') {
      timeoutRef.current = setTimeout(tick, delay);
      return () => clearTimeout(timeoutRef.current);
    }
  }, [delay]);
  return timeoutRef;
}
