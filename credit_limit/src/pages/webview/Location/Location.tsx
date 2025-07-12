import { useState } from 'react';

import JuloLogo from 'assets/img/logo/logo-name_blue.png';
import { useQueryParams } from 'utils/RouteHelper';
import useGeolocation from 'hooks/use-geolocation';
import { useTimeout } from 'hooks';

import { locationCx, navigationCx } from './style';
import Loader from './Loader';

const Location = () => {
  const [showLoader, setShowLoader] = useState(false);
  const query: URLSearchParams = useQueryParams();
  const refPageParam = query.get('ref-page');

  useGeolocation({
    enabled: true,
    onPermissionGranted: (position) => {
      window.location.replace(
        `julocallback://location-allowed?longitude=${position.coords.longitude}&latitude=${position.coords.latitude}&ref-page=${refPageParam}`,
      );
    },
    onPermissionDenied: () => {
      window.location.replace(
        `julocallback://location-blocked?ref-page=${refPageParam}`,
      );
    },
  });

  useTimeout(() => setShowLoader(true), 1000);

  return (
    <>
      <nav className={navigationCx}>
        <div className='logo-wrapper'>
          <img src={JuloLogo} alt='logo' />
        </div>
      </nav>

      <div className={locationCx}>
        {showLoader && (
          <div className='loader'>
            <Loader />
          </div>
        )}

        <div className='info'>
          Sebentar ya, permintaanmu <br />
          sedang diproses
        </div>
      </div>
    </>
  );
};

export default Location;
