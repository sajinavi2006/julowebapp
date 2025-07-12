import React from 'react';
import { StyledBurgerButton } from './styles';

interface Props {
  expand: boolean;
}

const BurgerButton: React.FC<Props> = ({ expand }) => {
  return (
    <StyledBurgerButton expand={expand}>
      <div />
      <div />
      <div />
    </StyledBurgerButton>
  );
};

export default BurgerButton;
