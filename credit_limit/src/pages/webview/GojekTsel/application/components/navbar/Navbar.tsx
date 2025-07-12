import { Logo } from 'new-components/shapes';

import { navbarCx } from './styles';

const Navbar = () => {
  return (
    <nav css={navbarCx} className='application-navbar'>
      <Logo fill='#ffffff' width={80} height={35} />
    </nav>
  );
};

export default Navbar;
