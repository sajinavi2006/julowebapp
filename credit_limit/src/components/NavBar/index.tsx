import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import utils from '../../utils';
import { NavLink, useParams } from 'react-router-dom';
import {
  listMenu,
  itemMenu,
  navLink,
  wrapperListMenu,
  NavBarStyled,
} from './styles';
import {
  alignCenter,
  cursorPointer,
  ml4,
  overflowHidden,
} from '../../assets/css/stylesFix';
import { ButtonOutline, Wrapper } from '../../assets/css/styled';
import { BREAKPOINT, NAVBAR_MENU } from '../../constant';
import BurgerButton from '../BurgerButton';
import { useWindowSize } from 'hooks';

import renteeLogo from 'assets/img/logo/Rentee.svg';
import juloLogo from 'assets/img/logo-horizontal.svg';
import { cx } from '@emotion/css';

interface MenuProps {
  title: string;
  url: string;
  page: string;
  urlType?: string | '';
  config: {
    type: string;
    baseColor: string;
    hoverColor: string;
  };
  orderCollapse?: string | '';
}
[];
interface Props {
  disableClickLogo?: boolean;
  hideMenu?: boolean;
  menu?: MenuProps[];
  logo?: string;
  alignHorizontal?: React.CSSProperties['justifyContent'];
}

interface IParams {
  partner: string;
}

const NavBar: React.FC<Props> = ({
  alignHorizontal = 'space-between',
  disableClickLogo,
  hideMenu,
  logo,
  menu = NAVBAR_MENU,
}) => {
  const [windowWidth] = useWindowSize();
  const { partner } = useParams<IParams>();
  const [navbarExpand, setNavbarExpand] = useState(false);
  const [sortMenu, setSortMenu] = useState<MenuProps[]>();
  const ulElement = useRef<HTMLLIElement>(null);
  const history = useHistory();

  const handleClickNavbarExpand = () => {
    setNavbarExpand(!navbarExpand);
  };

  const getLogo = () => {
    switch (partner) {
      case 'rentee':
        return renteeLogo;
      default:
        return juloLogo;
    }
  };

  useEffect(() => {
    if (windowWidth > BREAKPOINT.large) {
      setSortMenu(menu ? menu : NAVBAR_MENU);
    } else {
      const result =
        sortMenu &&
        [...sortMenu].sort((a, b) =>
          a.orderCollapse && b.orderCollapse
            ? a.orderCollapse.localeCompare(b.orderCollapse)
            : 0,
        );
      setSortMenu(result);
    }
  }, [windowWidth]);

  const handleClickLogo = () => {
    const partnership = partner || utils.store.get('partner');
    const token = utils.store.get('token');

    if (partnership === 'linkaja') {
      return token
        ? history.push('/linkaja/home')
        : history.push('/linkaja/nik');
    }

    token
      ? history.push(`/${partner}/home`)
      : history.push(`/${partner}/login`);
  };

  const handleClickMenu = (type = '', url: string) => {
    switch (type) {
      case 'windowOpen':
        window.open(url);
        break;
      default:
        window.location.assign(url);
        break;
    }
  };

  return (
    <NavBarStyled minWidth='320'>
      <Wrapper
        flexWrap
        alignHorizontal={alignHorizontal}
        alignVertical='center'
        className={`${alignCenter} ${overflowHidden}`}
      >
        <img
          src={logo ? logo : getLogo()}
          height='30'
          className={cx({ [cursorPointer]: !disableClickLogo })}
          onClick={() => !disableClickLogo && handleClickLogo()}
        />
        {!hideMenu ? (
          <>
            <div
              className={`${wrapperListMenu}`}
              onClick={() => handleClickNavbarExpand()}
            >
              <BurgerButton expand={navbarExpand} />
            </div>
            <ul
              className={`${listMenu(
                navbarExpand,
                ulElement?.current?.offsetTop || 0,
              )}`}
            >
              {sortMenu &&
                sortMenu.map((item, index) => {
                  return (
                    <li
                      ref={ulElement}
                      key={index}
                      className={`${ml4} ${itemMenu}`}
                    >
                      {item.config.type === 'button' ? (
                        <ButtonOutline
                          onClick={() =>
                            handleClickMenu(item.urlType, item.url)
                          }
                          color={item?.config?.baseColor}
                          hoverColor={item?.config?.hoverColor}
                          hoverBorderColor={item?.config?.hoverColor}
                          hover
                        >
                          {item.title}
                        </ButtonOutline>
                      ) : (
                        <NavLink
                          className='navbar-item'
                          activeClassName='is-active'
                          to={item.page}
                          exact
                        >
                          <span
                            className={`${navLink(
                              item?.config?.baseColor,
                              item?.config?.hoverColor,
                            )}`}
                          >
                            {item.title}
                          </span>
                        </NavLink>
                      )}
                    </li>
                  );
                })}
            </ul>
          </>
        ) : null}
      </Wrapper>
    </NavBarStyled>
  );
};

export default NavBar;
