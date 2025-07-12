import { useCallback, useEffect, useState } from 'react';

import _noop from '@julofinance/web-helpers/dist/fn/noop';
import callAllFn from '@julofinance/web-helpers/dist/fn/callAllFn';

interface UseGeoLocationOptions extends PositionOptions {
  /**
   * The default is false because,
   * It's not recommended to request on page load.
   * @remarks [How to ask for users' locations responsibly](https://developer.chrome.com/docs/lighthouse/best-practices/geolocation-on-start/#how-to-ask-for-users-locations-responsibly)
   *
   * This will directly ask for permission if the enabled is true
   *
   * Use it wisely!
   *
   * @default false
   */
  enabled?: boolean;
  onPermissionGranted?: (position: GeolocationPosition) => void;
  onPermissionDenied?: (error?: GeolocationPositionError) => void;
}

function useGeolocation(options: UseGeoLocationOptions = {}) {
  const {
    onPermissionDenied = _noop,
    onPermissionGranted = _noop,
    enabled,
  } = options;

  const [position, setPosition] = useState<GeolocationPosition>();
  const [isPermissionGranted, setIsPermissionGranted] = useState(false);

  const handlePermissionGranted = useCallback(
    (position: GeolocationPosition) => {
      setPosition(position);
      setIsPermissionGranted(true);
    },
    [],
  );

  const handlePermissionDenied = useCallback(() => {
    setPosition(undefined);
    setIsPermissionGranted(false);
  }, []);

  useEffect(() => {
    if (enabled) {
      const navigatorPermissions = navigator.permissions || {};
      if (navigatorPermissions && navigatorPermissions.query) {
        navigatorPermissions.query({ name: 'geolocation' }).then((result) => {
          const permistionState = result.state;
          switch (permistionState) {
            case 'granted':
            case 'prompt':
              navigator.geolocation.getCurrentPosition(
                callAllFn(handlePermissionGranted, onPermissionGranted),
                callAllFn(handlePermissionDenied, onPermissionDenied),
              );
              break;

            case 'denied':
            default:
              navigator.geolocation.getCurrentPosition(
                callAllFn(handlePermissionGranted, onPermissionGranted),
                callAllFn(handlePermissionDenied, onPermissionDenied),
              );
              break;
          }
        });
      } else if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          callAllFn(handlePermissionGranted, onPermissionGranted),
          callAllFn(handlePermissionDenied, onPermissionDenied),
        );
      }
    }
  }, [enabled]);

  return { isPermissionGranted, position };
}

export default useGeolocation;