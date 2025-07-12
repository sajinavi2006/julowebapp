import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { Props } from './type';

const rotate = keyframes`
    from{
        transform: rotate(360deg);
    }
    to{
        transform: rotate(0deg);
    }
`;

export const StyledImage = styled.img<Props>`
  ${(props) => {
    return {
      animation: props.isSpin
        ? `${rotate} 0.5s cubic-bezier(0.5, 0, 0.5, 1) infinite`
        : '',
    };
  }}
`;
