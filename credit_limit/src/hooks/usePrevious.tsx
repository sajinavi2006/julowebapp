import { useRef, useEffect } from 'react';

/**
 * Hooks to get previous value of state
 *
 */

const usePrevious = (value: undefined) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

export default usePrevious;
