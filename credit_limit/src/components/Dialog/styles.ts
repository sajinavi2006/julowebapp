import styled, { CSSObject } from '@emotion/styled';
import { colsMax, colsMin } from 'assets/css/utils';

export type IDialogType = 'form' | 'slideUp' | 'slideLeft' | 'fade' | 'default';
export type IPostition = 'top' | 'center' | 'bottom';

interface IStyledDialog {
  position?: IPostition;
  maxWidth?: string | number;
  minWidth?: string | number;
  zIndex?: string | number;
  isOpenAnimation?: boolean;
  type?: IDialogType;
  isOpen?: boolean;
  styles?: CSSObject;
  name?: string;
}

// STYLED
export const StyledDialog = styled.div<IStyledDialog>`
  position: fixed;
  overflow: auto;
  display: flex;
  justify-content: center;
  clear: both;

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
  ${(props) => {
    return {
      maxWidth: `${props.maxWidth}`,
      zIndex: props.zIndex,
    };
  }}

  ${colsMin('small')} {
    min-width: ${(props) => props.maxWidth};
  }
  ${colsMax('small')} {
    width: 100%;
    left: 0 !important;
    min-width: ${(props) => props.minWidth}px;

    ${(props) => {
      const slideUpAnimation = props.isOpenAnimation
        ? '0%'
        : props.name === 'dialogCamera'
        ? 'calc(100% - 50px)'
        : '100%';
      switch (props.type) {
        case 'form':
          return {
            transform: `translate(0, ${slideUpAnimation})`,
          };
        case 'slideUp':
          return {
            transform: `translate(0, ${slideUpAnimation})`,
          };
        case 'slideLeft':
          return {
            transform: 'translate(0, -50%)',
          };
        case 'fade':
          return {
            transform: 'translate(0, 0)',
          };
        default:
          return {
            transform: 'translate(0, -50%)',
          };
      }
    }}
  }
  ${(props) => {
    const slideUpAnimation = props.isOpenAnimation
      ? '0%'
      : props.name === 'dialogCamera'
      ? 'calc(100% - 50px)'
      : '100%';
    switch (props.type) {
      case 'form':
        return {
          left: '50%',
          bottom: '0',
          transform: `translate(-50%, ${slideUpAnimation})`,
          transition: 'transform 0.5s',
        };
      case 'slideUp':
        return {
          left: '50%',
          bottom: '0',
          transform: `translate(-50%, ${slideUpAnimation})`,
          transition: 'transform 0.5s',
        };
      case 'fade':
        return {
          opacity: `${props.isOpenAnimation ? '1' : '0'}`,
          left: '0',
          top: '0',
          transition: 'opacity 0.3s',
        };
      default:
        return {
          top: '50%',
          left: `${props.isOpen ? '50%' : '0%'}`,
          transform: `translate(${
            props.isOpenAnimation ? '-50%' : '-150vw'
          }, -50%)`,
          transition: 'transform 0.5s, left 0.5s',
          visibility: props.isOpen ? 'visible' : 'hidden',
          opacity: props.isOpen ? '1' : '0',
        };
    }
  }}
  ${(props) => props.styles}
`;

interface IDialogBackground {
  isOpen?: boolean;
  zIndex?: string | number;
}

export const DialogBackground = styled.div<IDialogBackground>`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #000;
  border-radius: 0px;
  opacity: ${(props) => (props.isOpen ? '0.48' : '0')};
  z-index: ${(props) => props.zIndex};
  transition: all 0.3s;
  clear: both;
`;

interface IStyledDialogTnC extends IStyledDialog {
  animation?: string;
  isOpenAnimation?: boolean;
}

export const StyledDialogTnC = styled.div<IStyledDialogTnC>`
  position: fixed;
  ${(props) =>
    props.animation !== 'form' && {
      top: '50%',
      left: '50%',
      transform: `translate(${'-50%'}, -50%)`,
      transition: 'transform 0.5s, left 0.5s',
      visibility: 'visible',
      opacity: '1',
    }}
  ${(props) =>
    props.animation === 'form' && {
      left: '50%',
      bottom: '0',
      transform: `translate(-50%, ${props.isOpenAnimation ? '0%' : '100%'})`,
      transition: 'transform 0.5s',
    }}
    overflow: auto;
  display: flex;

  z-index: ${(props) => props.zIndex};
  justify-content: center;
  clear: both;
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
  ${colsMin('small')} {
    min-width: ${(props) => props.maxWidth};
  }
  ${colsMax('small')} {
    min-width: 100%;
  }
  ${(props) => props.styles}
`;
