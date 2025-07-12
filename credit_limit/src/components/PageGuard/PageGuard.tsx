import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { LocationState, PageGuardProps } from './type';

// previousAllowedState means the page should be accessed within from state
// restrictedTo means if the page is not allowed, then redirect to the choosen page
// example: <PageGuard previousAllowedState="sphp" restrictedTo="/rentee/transaction-summaries">
const PageGuard = ({
  children,
  previousAllowedState,
  restrictedTo,
}: PageGuardProps) => {
  const history = useHistory();
  const location = useLocation<LocationState>();
  const [isMounted, setIsMounted] = useState(false);

  const from = location?.state?.from ?? '';

  const checkIsPageAllowed = () => {
    const isArray = Array.isArray(previousAllowedState);
    let isAllowed = false;

    if (isArray) {
      isAllowed = previousAllowedState.includes(from);
    } else {
      if (previousAllowedState) {
        isAllowed = from === previousAllowedState;
      }
    }

    if (!isAllowed) {
      return history.push(`${restrictedTo}`);
    }
    setIsMounted(true);
  };

  useEffect(() => {
    checkIsPageAllowed();
  }, []);

  if (!isMounted) return null;

  return children;
};

export default PageGuard;
