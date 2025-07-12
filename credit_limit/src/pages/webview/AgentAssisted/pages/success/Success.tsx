import { GooglePlay, Logo } from 'new-components/shapes';
import { Button } from 'new-components/elements';

import { useApplicationInfo } from '../../hooks';
import { successCx } from './styles';
import { useHandleDescription } from './usecase';
import { BannerIllustration } from './shapes';
import { useCallback } from 'react';

const Success = () => {
  const { applicationStatus, creditLimit } = useApplicationInfo();

  const description = useHandleDescription({
    status: applicationStatus,
    limit: creditLimit,
  });

  const onDownload = useCallback(() => {
    window.location.assign('https://r.julo.co.id/1mYI/relogin');
  }, []);

  return (
    <div css={successCx} className='success'>
      <Logo fill='white' className='logo' />

      <div className='card success-content'>
        <div className='banner'>
          <BannerIllustration />
        </div>
        <div className='text-wrapper'>
          <div className='title'>Buat PIN Berhasil!</div>
          <div className='description'>{description}</div>
        </div>
        <Button className='download-btn' onClick={onDownload}>
          Download JULO Sekarang
        </Button>
        <footer>
          <span>Tersedia di Android</span>
          <GooglePlay className='google-play' onClick={onDownload} />
        </footer>
      </div>
    </div>
  );
};

export default Success;
