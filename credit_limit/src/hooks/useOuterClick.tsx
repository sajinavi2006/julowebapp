import { useEffect, useRef } from 'react';

function useOuterClick(callback: () => void) {
  const callbackRef = useRef<() => void>(); // initialize mutable ref, which stores callback
  const innerRef = useRef<Record<string, (val: string) => []>>(); // returned to client, who marks "border" element

  // update cb on each render, so second useEffect has access to current value
  useEffect(() => {
    callbackRef.current = callback;
  });

  useEffect(() => {
    function handleClick() {
      if (innerRef.current && callbackRef.current) callbackRef.current();
    }
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []); // no dependencies -> stable click listener

  return innerRef; // convenience for client (doesn't need to init ref himself)
}

export default useOuterClick;
