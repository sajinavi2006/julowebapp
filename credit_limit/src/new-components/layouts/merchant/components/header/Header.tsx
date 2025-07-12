import COOKIES_KEY from 'constants/cookies';
import useCookie from 'hooks/use-cookie';
import { useRGetProfile } from 'repositories/merchant/auth';
import { Avatar } from 'new-components/shapes';

import Logo from 'assets/img/logo/julo-logo-white.svg';

import { headerCx } from './styles';

const Header = () => {
  const { cookies } = useCookie();

  const { data } = useRGetProfile({
    enabled: !!cookies[COOKIES_KEY.AUTHORIZATION],
  });

  const fullname = `${data?.data.fullname}`;

  return (
    <header css={headerCx}>
      <div className='nav-brand'>
        <img src={Logo} alt='Julo logo' width={80} height={36} />
      </div>
      <div className='profile'>
        <div className='profile-picture'>
          <Avatar  />
        </div>
        <div className='profile-info'>
          <div className='profile-name'>
            <span>{fullname}</span>
          </div>

          <div className='profile-id'>
            <span>Merchant</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
