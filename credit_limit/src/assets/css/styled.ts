import styled from '@emotion/styled';

import themeJ1 from 'themes/Partner/j1';
import {
  ButtonProps,
  ButtonOutlineProps,
  CardProps,
  NavbarProps,
  WrapperProps,
  ElementProps,
} from './types';
import { colsMax, colsMin, handleFontSize, handleStyleProps } from './utils';

export const Div = styled.div<ElementProps>`
  ${(props) => handleStyleProps(props)};
  ${(props) => handleFontSize(props.fontSize)}
`;

export const Span = styled.span<ElementProps>`
  ${(props) => handleStyleProps(props)};
  ${(props) => handleFontSize(props.fontSize)}
`;

export const Img = styled.img<ElementProps>`
  ${(props) => handleStyleProps(props)};
  ${(props) => handleFontSize(props.fontSize)}
`;

export const Label = styled.label<ElementProps>`
  ${(props) => handleStyleProps(props)};
  ${(props) => handleFontSize(props.fontSize)}
`;

export const Ol = styled.ol<ElementProps>`
  ${(props) => handleStyleProps(props)};
  ${(props) => handleFontSize(props.fontSize)}
`;

export const Li = styled.li<ElementProps>`
  font-size: inherit;
  font-weight: inherit;
  color: inherit;
  ${(props) => handleStyleProps(props)};
  ${(props) => handleFontSize(props.fontSize)}
`;

export const Divider = styled.div<ElementProps>`
  width: 100%;
  height: 1px;
  ${(props) => {
    return {
      background: props.color || themeJ1.colors.borderLight,
      margin: props.margin || '1.5rem 0px',
    };
  }};
  ${(props) => handleStyleProps(props)};
  ${(props) => handleFontSize(props.fontSize)}
`;

export const Button = styled.button<ButtonProps>`
  ${(props) => {
    const theme = props.theme;
    const type = props.types;

    if (type) {
      switch (type) {
        case 'primary':
          return {
            color: props.color ? props.color : theme?.buttonPrimary?.color,
            background: props.disabled
              ? theme?.buttonPrimary?.disabled
              : props.backgroundColor || theme?.buttonPrimary?.backgroundColor,
          };
        case 'secondary':
          return {
            color: props.color ? props.color : theme?.buttonSecondary?.color,
            background: props.disabled
              ? theme?.buttonSecondary?.disabled
              : props.backgroundColor ||
                theme?.buttonSecondary?.backgroundColor,
          };
        case 'grey':
          return {
            color: props.color || theme?.buttonGrey?.color,
            background: props.disabled
              ? theme?.buttonGrey?.disabled
              : props.backgroundColor || theme?.buttonGrey?.backgroundColor,
          };
        case 'gradient':
          return {
            color: props.color ? props.color : theme?.buttonBlue?.color,
            background: props.disabled
              ? theme?.buttonBlue?.disabled
              : props.backgroundColor || theme?.buttonBlue?.gradient,
          };
        default:
          return {
            color: props.color ? props.color : theme?.buttonPrimary?.color,
            background: props.disabled
              ? theme?.buttonPrimary?.disabled
              : props.backgroundColor || theme?.buttonPrimary?.backgroundColor,
          };
      }
    } else {
      return {
        color: props.color ? props.color : theme?.buttonPrimary?.color,
        background: props.disabled
          ? theme?.buttonPrimary?.disabled
          : props.backgroundColor || theme?.buttonPrimary?.backgroundColor,
      };
    }
  }};

  ${(props) => {
    return {
      width: props.fluid ? '100%' : 'inherit',
      border: `1px solid ${
        props.borderColor || props.backgroundColor || 'transparent'
      }`,
      padding: props.padding || '.375rem .75rem',
      textAlign: props.textAlign || 'center',
    };
  }};

  ${(props) => handleFontSize(props.fontSize)};
  ${(props) =>
    handleStyleProps({
      ...props,
      borderRadius: props.borderRadius || '.25rem',
    })};

  ${(props) =>
    props.hover && {
      '&:hover': {
        color: props.hoverColor || 'inherit',
        background: props.hoverBackgroundColor || 'inherit',
        borderColor: props.hoverBorderColor || 'inherit',
      },
    }};

  ${(props) =>
    props.backgroundImage && {
      background: `url(${props.backgroundImage})`,
      backgroundSize: props.backgroundSize || 'cover',
    }}

  ${(props) => {
    return {
      display: props.display || 'inline-block',
      backgroundPosition: props.backgroundPosition,
    };
  }}
    
  cursor: pointer;
  font-weight: 400;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  line-height: 1.5;
  transition: all 0.25s;
`;

export const ButtonFloating = styled.button`
  position: fixed;
  width: 60px;
  height: 60px;
  bottom: 40px;
  right: 40px;
  background-color: #00acf0;
  color: #fff;
  border: none;
  border-radius: 50px;
  text-align: center;
  box-shadow: 2px 2px 3px #999;

  .floatingButtonText {
    transform: rotate(180deg);
    font-size: 40px;
  }
`;
export const ButtonFloatingSmall = styled.button`
  position: fixed;
  width: 30px;
  height: 30px;
  bottom: 40px;
  right: 40px;
  background-color: #00acf0;
  color: #fff;
  border: none;
  border-radius: 20px;
  text-align: center;
  box-shadow: 2px 2px 3px #999;

  .floatingButtonText {
    transform: rotate(180deg);
    font-size: 20px;
  }
`;

export const ButtonOutline = styled.button<ButtonOutlineProps>`
  cursor: pointer;
  display: inline-block;
  padding: 0.375rem 0.75rem;
  font-weight: 400;
  text-align: center;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  font-size: 1rem;
  line-height: 1.5;
  transition: all 0.25s;

  ${(props) =>
    props.hover && {
      '&:hover': {
        color: props.hoverColor || 'inherit',
        backgroundColor: props.hoverBackgroundColor || 'inherit',
        borderColor: props.hoverBorderColor || 'inherit',
      },
    }};

  ${(props) => {
    const theme = props.theme;
    const type = props.types;

    if (type) {
      switch (type) {
        case 'primary':
          return {
            color: props.color
              ? props.color
              : theme?.buttonOutlinePrimary?.color,
            border: props.borderless
              ? 'none'
              : `1px solid ${theme?.buttonOutlinePrimary?.borderColor}`,
            background: props.disabled
              ? theme?.buttonOutlinePrimary?.disabled
              : props.backgroundColor
              ? props.backgroundColor
              : theme?.buttonOutlinePrimary?.backgroundColor,
          };
        default:
          return {
            color: props.color ? props.color : theme?.colors?.white,
            border: props.borderless
              ? 'none'
              : `1px solid ${props.borderColor || theme?.colors?.white}`,
            background: props.disabled
              ? theme?.buttonOutlinePrimary?.disabled
              : props.background || 'transparent',
          };
      }
    } else {
      return {
        color: props.color ? props.color : theme?.colors?.white,
        border: props.borderless
          ? 'none'
          : `1px solid ${props.borderColor || theme?.colors?.white}`,
        background: props.disabled
          ? theme?.buttonOutlinePrimary?.disabled
          : props.background || 'transparent',
      };
    }
  }};

  ${(props) => handleFontSize(props?.fontSize)};
  ${(props) =>
    handleStyleProps({
      ...props,
      borderRadius: props.borderRadius || '.25rem',
    })};
`;

export const Card = styled.div<CardProps>`
  ${(props) => {
    const theme = props.theme;
    return {
      minHeight: props.isOnlyText ? '250px' : props.height && `${props.height}`,
      padding: props.paddingValue || '15px',
      width: props.fluid ? '100%' : props.width && props.width,
      height: props.height && `${props.height}`,
      borderRadius: props.rounded ? '5px' : '0px',
      backgroundColor: props.backgroundColor || theme?.colors?.white,
      boxShadow: props.boxShadow || theme?.cardPrimary?.boxShadow,
    };
  }};

  ${(props) => handleFontSize(props?.fontSize)};
  ${(props) => handleStyleProps(props)};

  ${(props) =>
    props.backgroundImage && {
      background: `url(${props.backgroundImage})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
    }}
`;

export const NavBar = styled.nav<NavbarProps>`
  ${(props) => {
    const theme = props.theme;
    return {
      background: theme?.navbar?.backgroundColor,
      transform: props.expand ? 'translateY(0)' : 'translateY(-100%)',
    };
  }};
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  width: 100%;
  padding: 16dp 10dp;
  position: absolute;
  top: 0;
  left: 0;
  transition: transform 0.3s ease-in-out;

  ${(props) =>
    props.maxWidth && {
      maxWidth: props.maxWidth,
    }}
`;

export const Main = styled.div`
  background-color: #f7f7f7;
  height: 100vh;
  overflow-x: auto;
  overflow-y: auto;
`;

export const Container = styled.div<ElementProps>`
  background-color: #f7f7f7;
  ${(props) => handleFontSize(props?.fontSize)}
  ${(props) => handleStyleProps(props)}
`;

export const Wrapper = styled.div<WrapperProps>`
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
  min-width: ${(props) => props.minWidth && `${props.minWidth}px`};
  position: relative;
  transition: all 0.3s;
  width: 100%;

  ${(props) =>
    props.background && {
      background: props.background,
    }}

  ${(props) =>
    props.backgroundColor && {
      backgroundColor: props.backgroundColor,
    }}

    ${(props) =>
    props.flexWrap && {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: props.alignHorizontal,
      alignItems: props.alignVertical,
    }}

    ${(props) =>
    props.maxWidth && {
      maxWidth: `${props.maxWidth}px`,
    }}

    ${(props) => ({
    height: props?.height,
    maxHeight: props?.maxHeight,
    minHeight: props?.minHeight,
    overflowX: props?.overflowX,
  })}

  ${(props) => handleFontSize(props?.fontSize)};
  ${(props) => handleStyleProps(props)};
`;

export const Row = styled.div<ElementProps>`
  display: flex;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;

  ${(props) => handleFontSize(props?.fontSize)};
  ${(props) => handleStyleProps(props)};
`;

interface ColTypes extends ElementProps {
  xs?: string;
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
  hiddenXs?: boolean;
  hiddenSm?: boolean;
}

export const Col = styled.div<ColTypes>`
  min-height: 1px;
  position: relative;
  padding-right: 15px;
  padding-left: 15px;
  width: 100%;

  ${(props) => handleFontSize(props?.fontSize)};
  ${(props) => handleStyleProps(props)}

  ${colsMax('small')} {
    ${(props) => {
      const parseValueSmall = props?.xs?.toString();
      switch (parseValueSmall) {
        case '12':
          return {
            flex: '0 0 100%',
            maxWidth: '100%',
          };
        case '11':
          return {
            flex: '0 0 91.666667%',
            maxWidth: '0 0 91.666667%',
          };
        case '10':
          return {
            flex: '0 0 83.333333%',
            maxWidth: '83.333333%',
          };
        case '9':
          return {
            flex: '0 0 75%',
            maxWidth: '75%',
          };
        case '8':
          return {
            flex: '0 0 66.666667%',
            maxWidth: '66.666667%',
          };
        case '7':
          return {
            flex: '0 0 58.333333%',
            maxWidth: '58.333333%',
          };
        case '6':
          return {
            flex: '0 0 50%',
            maxWidth: '50%',
          };
        case '5':
          return {
            flex: '0 0 41.666667%',
            maxWidth: '41.666667%',
          };
        case '4':
          return {
            flex: '0 0 33.33333%',
            maxWidth: '33.33333%',
          };
        case '3':
          return {
            flex: '0 0 25%',
            maxWidth: '25%',
          };
        case '2':
          return {
            flex: '0 0 16.666667%',
            maxWidth: '16.666667%',
          };
        case '1':
          return {
            flex: '0 0 8.333333%',
            maxWidth: '8.333333%',
          };
        default:
          break;
      }
    }}
  }

  ${colsMin('small')} {
    ${(props) => {
      const parseValueSmall = props?.xs?.toString();
      switch (parseValueSmall) {
        case '12':
          return {
            flex: '0 0 100%',
            maxWidth: '100%',
          };
        case '11':
          return {
            flex: '0 0 91.666667%',
            maxWidth: '0 0 91.666667%',
          };
        case '10':
          return {
            flex: '0 0 83.333333%',
            maxWidth: '83.333333%',
          };
        case '9':
          return {
            flex: '0 0 75%',
            maxWidth: '75%',
          };
        case '8':
          return {
            flex: '0 0 66.666667%',
            maxWidth: '66.666667%',
          };
        case '7':
          return {
            flex: '0 0 58.333333%',
            maxWidth: '58.333333%',
          };
        case '6':
          return {
            flex: '0 0 50%',
            maxWidth: '50%',
          };
        case '5':
          return {
            flex: '0 0 41.666667%',
            maxWidth: '41.666667%',
          };
        case '4':
          return {
            flex: '0 0 33.33333%',
            maxWidth: '33.33333%',
          };
        case '3':
          return {
            flex: '0 0 25%',
            maxWidth: '25%',
          };
        case '2':
          return {
            flex: '0 0 16.666667%',
            maxWidth: '16.666667%',
          };
        case '1':
          return {
            flex: '0 0 8.333333%',
            maxWidth: '8.333333%',
          };
        default:
          break;
      }
    }}
  }
  ${colsMin('medium')} {
    ${(props) => {
      const parseValueMedium = props?.md?.toString();
      switch (parseValueMedium) {
        case '12':
          return {
            flex: '0 0 100%',
            maxWidth: '100%',
          };
        case '11':
          return {
            flex: '0 0 91.666667%',
            maxWidth: '0 0 91.666667%',
          };
        case '10':
          return {
            flex: '0 0 83.333333%',
            maxWidth: '83.333333%',
          };
        case '9':
          return {
            flex: '0 0 75%',
            maxWidth: '75%',
          };
        case '8':
          return {
            flex: '0 0 66.666667%',
            maxWidth: '66.666667%',
          };
        case '7':
          return {
            flex: '0 0 58.333333%',
            maxWidth: '58.333333%',
          };
        case '6':
          return {
            flex: '0 0 50%',
            maxWidth: '50%',
          };
        case '5':
          return {
            flex: '0 0 41.666667%',
            maxWidth: '41.666667%',
          };
        case '4':
          return {
            flex: '0 0 33.33333%',
            maxWidth: '33.33333%',
          };
        case '3':
          return {
            flex: '0 0 25%',
            maxWidth: '25%',
          };
        case '2':
          return {
            flex: '0 0 16.666667%',
            maxWidth: '16.666667%',
          };
        case '1':
          return {
            flex: '0 0 8.333333%',
            maxWidth: '8.333333%',
          };
        default:
          break;
      }
    }}
  }
  ${colsMin('large')} {
    ${(props) => {
      const parseValueLarge = props?.lg?.toString();
      switch (parseValueLarge) {
        case '12':
          return {
            flex: '0 0 100%',
            maxWidth: '100%',
          };
        case '11':
          return {
            flex: '0 0 91.666667%',
            maxWidth: '0 0 91.666667%',
          };
        case '10':
          return {
            flex: '0 0 83.333333%',
            maxWidth: '83.333333%',
          };
        case '9':
          return {
            flex: '0 0 75%',
            maxWidth: '75%',
          };
        case '8':
          return {
            flex: '0 0 66.666667%',
            maxWidth: '66.666667%',
          };
        case '7':
          return {
            flex: '0 0 58.333333%',
            maxWidth: '58.333333%',
          };
        case '6':
          return {
            flex: '0 0 50%',
            maxWidth: '50%',
          };
        case '5':
          return {
            flex: '0 0 41.666667%',
            maxWidth: '41.666667%',
          };
        case '4':
          return {
            flex: '0 0 33.33333%',
            maxWidth: '33.33333%',
          };
        case '3':
          return {
            flex: '0 0 25%',
            maxWidth: '25%',
          };
        case '2':
          return {
            flex: '0 0 16.666667%',
            maxWidth: '16.666667%',
          };
        case '1':
          return {
            flex: '0 0 8.333333%',
            maxWidth: '8.333333%',
          };
        default:
          break;
      }
    }}
  }
  ${colsMin('extraLarge')} {
    ${(props) => {
      const parseValueExtraLarge = props?.xl?.toString();
      switch (parseValueExtraLarge) {
        case '12':
          return {
            flex: '0 0 100%',
            maxWidth: '100%',
          };
        case '11':
          return {
            flex: '0 0 91.666667%',
            maxWidth: '0 0 91.666667%',
          };
        case '10':
          return {
            flex: '0 0 83.333333%',
            maxWidth: '83.333333%',
          };
        case '9':
          return {
            flex: '0 0 75%',
            maxWidth: '75%',
          };
        case '8':
          return {
            flex: '0 0 66.666667%',
            maxWidth: '66.666667%',
          };
        case '7':
          return {
            flex: '0 0 58.333333%',
            maxWidth: '58.333333%',
          };
        case '6':
          return {
            flex: '0 0 50%',
            maxWidth: '50%',
          };
        case '5':
          return {
            flex: '0 0 41.666667%',
            maxWidth: '41.666667%',
          };
        case '4':
          return {
            flex: '0 0 33.33333%',
            maxWidth: '33.33333%',
          };
        case '3':
          return {
            flex: '0 0 25%',
            maxWidth: '25%',
          };
        case '2':
          return {
            flex: '0 0 16.666667%',
            maxWidth: '16.666667%',
          };
        case '1':
          return {
            flex: '0 0 8.333333%',
            maxWidth: '8.333333%',
          };
        default:
          break;
      }
    }}
  }
`;
