import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import NavBar from '../NavBar';
import { blacklistedRegisterFlowJ1, NAVBAR_MENU_AUTH } from 'constant';

const Header = () => {
  const { partner } = useParams<{ partner: string }>();
  const blacklistedRegister = blacklistedRegisterFlowJ1.includes(partner);
  const [navbarMenu, setNavbarMenu] = useState(NAVBAR_MENU_AUTH);

  useEffect(() => {
    if (blacklistedRegister) {
      const menuTemp = NAVBAR_MENU_AUTH.filter(
        (item) => item.page !== 'signup',
      );

      setNavbarMenu(menuTemp);
    }
  }, []);

  return <NavBar menu={navbarMenu} />;
};

export default Header;
