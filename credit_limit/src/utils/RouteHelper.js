import { useLocation } from 'react-router-dom';

/**
 * Get query url:
 * ex: ?hello=world
 */
export function useQueryParams() {
  const location = useLocation() || {};

  return new URLSearchParams(location?.search);
}