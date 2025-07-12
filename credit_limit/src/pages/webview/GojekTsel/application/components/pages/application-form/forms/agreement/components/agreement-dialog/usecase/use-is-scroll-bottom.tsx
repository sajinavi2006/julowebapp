import { useCallback, useEffect, useState } from 'react';

export function useIsScrollBottom() {
  const [isScrollBottom, setIsScrollBottom] = useState(false);

  const onScrollToBottom = useCallback(() => {
    const dialogElement = document.getElementById(
      'agreement-dialog-content-wrapper',
    );
    if (dialogElement) {
      const scrollHeight = dialogElement.scrollHeight || 0;
      const clientHeight = dialogElement.clientHeight || 0;

      const scrollDistance = scrollHeight - clientHeight;
      dialogElement.scroll({ top: scrollDistance, behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    const dialogElement = document.getElementById(
      'agreement-dialog-content-wrapper',
    );
    function onScroll() {
      if (dialogElement) {
        const scrollHeight = dialogElement.scrollHeight;
        const clientHeight = dialogElement.clientHeight;

        const scrollDistance = scrollHeight - clientHeight;
        const currentScroll = Math.round(dialogElement.scrollTop);

        const difference = scrollDistance - currentScroll - 20;
        const isBottomReached = scrollDistance === currentScroll;
        setIsScrollBottom(isBottomReached || difference < 1);
      }
    }

    dialogElement?.addEventListener('scroll', onScroll);
    return () => dialogElement?.removeEventListener('scroll', onScroll);
  }, []);

  return { isScrollBottom, onScrollToBottom };
}
