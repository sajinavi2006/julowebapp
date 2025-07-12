import styled from '@emotion/styled';
import { css } from '@emotion/css';

// CSS
export const chevronImage = (isOpen: boolean) => css`
  transform: rotate(${isOpen ? '-180deg' : '0deg'});
  transition: transform 280ms ease 0s;
`;

export const dropdownItem = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 5px 20px;
  cursor: pointer;
  :hover {
    background-color: #eee;
  }
`;

export const wrapperDropdownMenu = (isOpen: boolean) => css`
  max-height: 226px;
  overflow-x: auto;
  margin-top: 8px;
  position: absolute;
  width: 100%;
  background: #fff;
  transition: transform 280ms ease-out 0s, opacity 0.16s ease 0s,
    visibility 0.16s ease 0s, box-shadow 0.16s ease 0s;
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  padding: 5px 0px;
  z-index: 15;
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
  error?: boolean;
  position?: 'top' | 'center' | 'bottom';
}

// STYLED
export const StyledDropdown = styled.div<IStyledDropdown>`
  text-align: left;
  width: 100%;
  border: solid 1px #c7c7c7;
  border-top: 0;
  border-left: 0;
  border-right: 0;
  color: #5e5e5e;
  display: flex;
  padding: 10px 0px;
  transition: box-shadow 0.16s ease 0s;
  background-color: ${(props) => props.backgroundColor};
  opactiy; ${(props) => props.disabled && '0.5'};
  border-color; ${(props) => props.error && '#ff4747'};

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

  input {
    width: 95%;
    border: 0;
    outline: none;
    color: #5e5e5e;
  }
`;

export const Error = styled.p`
  position: absolute;
  width: 100%;
  color: #ff4747;
  font-size: 12px;
  margin: 0;
  padding-top: 5px;
`;
