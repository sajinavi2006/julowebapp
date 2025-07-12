import { MutableRefObject, useEffect, useMemo, useState } from "react";

interface UseHandleMenuStateOptions {
  elementRef: MutableRefObject<HTMLElement | null>;
  href?: string;
  currentPath?: string;
}

function useHandleMenuState(options: UseHandleMenuStateOptions) {
  const { elementRef, href, currentPath } = options;

  const [isHovered, setIsHovered] = useState(false);

  const isSelected = useMemo(() => {
    return href === currentPath;
  }, [currentPath, href]);

  useEffect(() => {
    const element = elementRef.current;

    if (!element) return;

    /**
     * :hover
     */
    element.addEventListener("mouseenter", () => setIsHovered(true));
    element.addEventListener("mouseleave", () => setIsHovered(false));
  }, [elementRef]);

  return { isHovered, isSelected };
}

export default useHandleMenuState;
