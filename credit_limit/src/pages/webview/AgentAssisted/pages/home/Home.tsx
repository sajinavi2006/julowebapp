import { AFPILogo, Logo, OJKLogo } from 'new-components/shapes';
import { Button } from 'new-components/elements';

import { useAgentAssistedNavigation, useApplicationInfo } from '../../hooks';
import { homeCx } from './styles';
import { useHandleDescription } from './usecase';
import { LimitBanner } from './components';

const Home = () => {
  const { customer, applicationStatus, creditLimit } = useApplicationInfo();

  const description = useHandleDescription({ status: applicationStatus });
  const { goTo } = useAgentAssistedNavigation();

  return (
    <div css={homeCx} className='home'>
      <Logo fill='white' className='logo' />
      <div className='card home-content'>
        {applicationStatus === 'approved' && (
          <LimitBanner limit={creditLimit} />
        )}

        <div className='text-wrapper'>
          <div className='welcome-text'>
            <span>Hai {customer},</span>
            <span>Buat PIN dulu, yuk!</span>
          </div>
          <div className='description'>{description}</div>
        </div>

        <Button className='create-pin-btn' onClick={() => goTo('create-pin')}>
          Buat PIN Sekarang
        </Button>
        <footer>
          <span>Berizin dan Diawasi oleh</span>
          <OJKLogo />
          <AFPILogo />
        </footer>
      </div>
    </div>
  );
};

export default Home;
