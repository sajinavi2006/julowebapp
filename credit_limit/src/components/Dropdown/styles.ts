import styled from '@emotion/styled';
import { css } from '@emotion/css';

// CSS
export const chevronImage = (isOpen: boolean) => css`
  transform: rotate(${isOpen ? '-180deg' : '0deg'});
  transition: transform 280ms ease 0s;
`;

export const dropdownItem = css`
  padding: 5px 20px;
  cursor: pointer;
  :hover {
    background-color: #eee;
  }
`;

export const wrapperDropdownMenu = (isOpen: boolean) => css`
  position: absolute;
  width: 100%;
  background: #fff;
  transition: transform 280ms ease-out 0s, opacity 0.16s ease 0s,
    visibility 0.16s ease 0s, box-shadow 0.16s ease 0s;
  border: 1px solid #c7c7c7;
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
  box-shadow: ${isOpen && 'rgb(0 0 0 / 7%) 0px 4px 6px'};
  padding: 5px 0px;
  z-index: 1;
  ${!isOpen
    ? {
        transform: 'translateY(-8px)',
        opacity: '0',
        visibility: 'hidden',
      }
    : ''}
`;

interface IStyledDropdown {
  isOpen?: boolean;
  backgroundColor?: string;
  disabled?: boolean;
  position?: 'top' | 'center' | 'bottom';
}

// STYLED
export const StyledDropdown = styled.button<IStyledDropdown>`
  width: 100%;
  border-radius: 3px;
  border: solid 1px #c7c7c7;
  color: #5e5e5e;
  display: flex;
  padding: 10px 20px;
  transition: box-shadow 0.16s ease 0s;
  box-shadow: ${(props) => props.isOpen && 'rgb(0 0 0 / 7%) 0px 4px 6px'};
  background-color: ${(props) => props.backgroundColor};
  border-bottom-color: ${(props) => props.isOpen && 'transparent'};
  border-bottom-left-radius: ${(props) => props.isOpen && '0px'};
  border-bottom-right-radius: ${(props) => props.isOpen && '0px'};

  opacity: ${(props) => props.disabled && '0.5'};

  align-items: ${(props) => {
    switch (props.position) {
      case 'top':
        return 'flex-start';

      case 'center':
        return 'center';

      case 'bottom':
        return 'flex-end';

      default:
        return 'center';
    }
  }};
`;
