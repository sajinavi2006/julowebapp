import juloLogo from 'assets/img/logo-horizontal.svg';

import { navbarCx } from './styles';

const Navbar = () => {
  return (
    <nav css={navbarCx} className='application-navbar'>
      <img src={juloLogo} alt='' />
    </nav>
  );
};

export default Navbar;
