import { useRef } from 'react';

/**
 *
 * Hooks for memoizing function that is being passed to hooks from argument
 *
 * @dev fransiscus.hermanto@julofinance.com
 * @reason [eslint-disable-next-line \@typescript-eslint/ban-types] cb can be any function
 *
 * @returns MutableRefObject<Function>
 */
// eslint-disable-next-line @typescript-eslint/ban-types
const useMemoArgFunction = (cb: Function) => {
  const cbRef = useRef(cb);

  cbRef.current = cb;

  return cbRef;
};

export default useMemoArgFunction;
