import styled from '@emotion/styled';
import { colsMin } from 'assets/css/utils';

interface IStyledBurgerButton {
  expand: boolean;
}

export const StyledBurgerButton = styled.button<IStyledBurgerButton>`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;

  &:focus {
    outline: none;
  }

  div {
    width: 2rem;
    height: 0.25rem;
    background: #fff;
    border-radius: 10px;
    transition: transform 0.3s linear;
    position: relative;
    transform-origin: 1px;

    &:first-of-type {
      transform: ${(props) => (props.expand ? 'rotate(45deg)' : 'rotate(0)')};
    }

    &:nth-of-type(2) {
      opacity: ${(props) => (props.expand ? '0' : '1')};
      transform: ${(props) =>
        props.expand ? 'translateX(20px)' : 'translateX(0)'};
    }

    &:nth-of-type(3) {
      transform: ${(props) => (props.expand ? 'rotate(-45deg)' : 'rotate(0)')};
    }
  }

  ${colsMin('large')} {
    display: none;
  } ;
`;
