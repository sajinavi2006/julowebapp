import styled from '@emotion/styled';
import { MIN_WIDTH } from 'constant';
import { BarBackStyledProps } from './types';

// CSS
// STYLED
export const BarBackStyled = styled.nav<BarBackStyledProps>`
  ${(props) => {
    return {
      background: props.background,
      minWidth: MIN_WIDTH,
      borderBottom: props.borderBottom && `1px solid ${props.borderBottom}`,
    };
  }};
  padding: 1.5rem 1.5rem;
  display: flex;
`;
