import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { Div } from 'assets/css/styled';

const reveal = keyframes`
    80% {
        letter-spacing: 8px;
    }
    100% {
        background-size: 300% 300%;
    }
`;

const glow = (glowColor: string) => keyframes`
    40% {
        text-shadow: 0 0 8px ${glowColor};
    }
`;

interface ITextLoader {
  textColor?: string;
  glowColor: string;
}

export const TextLoader = styled(Div)<ITextLoader>`
  ${(props) => {
    return {
      background: `50% 100% / 50% 50% no-repeat radial-gradient(ellipse at bottom, ${props?.textColor}, transparent, transparent)`,
      backgroundClip: 'text',
      color: 'transparent',
      fontSize: 'inherit',
      animation: `${reveal} 3000ms ease-in-out forwards 200ms, ${glow(
        props?.glowColor,
      )} 2500ms linear infinite 2000ms`,
    };
  }}
`;
