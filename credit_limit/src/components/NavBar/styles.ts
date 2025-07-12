import { css } from '@emotion/css';
import styled from '@emotion/styled';
import { colsMax } from 'assets/css/utils';

interface INavBarStyled {
  theme?: {
    navbar: {
      backgroundColor: string;
    };
  };
  minWidth: string;
}

// CSS
export const itemMenu = css`
  display: flex;
  align-items: center;
  justify-content: center;

  a:hover {
    text-decoration: none;
  }

  ${colsMax('large')} {
    padding-top: 1rem;
  } ;
`;

export const navLink = (color: string, hoverColor: string) => css`
  color: ${color};

  &:hover {
    color: ${hoverColor};
  }
`;

export const listMenu = (expand: boolean, height: number) => css`
  display: grid;
  grid-template-columns: repeat(5, auto);
  list-style: none;
  width: 70vw;
  justify-content: end;
  margin-bottom: 0px;
  left: 0px;
  transition: ${height} 0.3s ease, opacity 0.3s ease;
  clear: both;

  ${colsMax('large')} {
    display: block;
    width: 100%;
    top: 0px;
    height: ${expand ? `${height}px` : '0px'};
    overflow: hidden;
    opacity: ${expand ? '1' : '0'};

    li {
      overflow: hidden;
    }
  } ;
`;

export const wrapperListMenu = css`
  max-height: 35px;
  min-height: 35px;
  align-items: center;
  display: flex;
`;

// STYLED
export const NavBarStyled = styled.nav<INavBarStyled>`
  ${(props) => {
    const theme = props.theme;
    return {
      background: theme.navbar.backgroundColor,
      minWidth: `${props.minWidth}px`,
    };
  }};
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  padding: 1rem 0rem;
  z-index: 500;
`;
