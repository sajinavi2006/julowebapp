import { CSSObject } from '@emotion/react';
import { DetailedHTMLProps, HTMLAttributes, CSSProperties } from 'react';

export interface StyleProps {
  alignItems?: CSSObject['alignItems'];
  alignSelf?: CSSObject['alignSelf'];
  background?: CSSObject['background'];
  backgroundColor?: CSSObject['backgroundColor'];
  backgroundImage?: CSSObject['backgroundImage'];
  backgroundPosition?: CSSObject['backgroundPosition'];
  backgroundSize?: CSSObject['backgroundSize'];
  border?: CSSObject['border'];
  borderColor?: CSSObject['borderColor'];
  borderBottom?: CSSObject['borderBottom'];
  borderLeft?: CSSObject['borderLeft'];
  borderRadius?: CSSObject['borderRadius'];
  borderRight?: CSSObject['borderRight'];
  borderTop?: CSSObject['borderTop'];
  bottom?: CSSObject['bottom'];
  boxShadow?: CSSObject['boxShadow'];
  color?: CSSObject['color'];
  columnGap?: CSSObject['columnGap'];
  cursor?: CSSObject['cursor'];
  display?: CSSObject['display'];
  flex?: CSSObject['flex'];
  flexBasis?: CSSObject['flexBasis'];
  flexDirection?: CSSObject['flexDirection'];
  flexShrink?: CSSObject['flexShrink'];
  flexWrap?: CSSObject['flexWrap'];
  flexFlow?: CSSObject['flexFlow'];
  fluid?: CSSObject['fluid'];
  fontWeight?: CSSObject['fontWeight'];
  gap?: CSSObject['gap'];
  gridTemplateColumns?: CSSObject['gridTemplateColumns'];
  gridTemplateAreas?: CSSObject['gridTemplateAreas'];
  height?: CSSObject['height'];
  justifyContent?: CSSObject['justifyContent'];
  left?: CSSObject['left'];
  margin?: CSSObject['margin'];
  marginBottom?: CSSObject['marginBottom'];
  marginLeft?: CSSObject['marginLeft'];
  marginRight?: CSSObject['marginRight'];
  marginTop?: CSSObject['marginTop'];
  maxHeight?: CSSObject['maxHeight'];
  maxWidth?: CSSObject['maxWidth'];
  minHeight?: CSSObject['minHeight'];
  minWidth?: CSSObject['minWidth'];
  opacity?: CSSObject['opacity'];
  overflow?: CSSObject['overflow'];
  overflowX?: CSSObject['overflowX'];
  padding?: CSSObject['padding'];
  paddingRight?: CSSObject['paddingRight'];
  paddingLeft?: CSSObject['paddingLeft'];
  paddingTop?: CSSObject['paddingTop'];
  paddingBottom?: CSSObject['paddingBottom'];
  position?: CSSObject['position'];
  right?: CSSObject['right'];
  rounded?: boolean;
  textAlign?: CSSObject['textAlign'];
  top?: CSSObject['top'];
  transform?: CSSObject['transform'];
  transition?: CSSObject['transition'];
  textDecoration?: CSSObject['textDecoration'];
  width?: CSSObject['width'];
  placeContent?: CSSObject['placeContent'];
  outline?: CSSObject['outline'];
  fontSize?: CSSObject['fontSize'];
}

export interface ElementProps
  extends StyleProps,
    Omit<
      DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>,
      'color' | 'style'
    > {
  style?: CSSProperties;
}

export interface ThemeTypes {
  buttonPrimary?: {
    color?: string;
    disabled?: string;
    backgroundColor?: string;
  };
  buttonSecondary?: {
    color?: string;
    disabled?: string;
    backgroundColor?: string;
  };
  buttonBlue?: {
    color?: string;
    disabled?: string;
    gradient?: string;
  };
  buttonGrey?: {
    color?: string;
    disabled?: string;
    backgroundColor?: string;
  };
  buttonOutlinePrimary?: {
    color?: string;
    disabled?: string;
    backgroundColor?: string;
    borderColor?: string;
  };
  colors?: {
    white?: string;
  };
  cardPrimary?: {
    boxShadow?: string;
  };
}

export interface ButtonProps extends ElementProps {
  theme?: ThemeTypes;
  types?: 'primary' | 'secondary' | 'gradient' | 'grey' | 'text';
  hover?: boolean;
  hoverColor?: string;
  hoverBackgroundColor?: string;
  hoverBorderColor?: string;
}

export interface ButtonOutlineProps extends ButtonProps {
  theme?: ThemeTypes;
  borderless?: string;
}

export interface CardProps extends ElementProps {
  isOnlyText?: boolean;
  paddingValue?: string;
  theme?: ThemeTypes;
}

export interface NavbarProps {
  theme?: {
    navbar?: {
      backgroundColor?: string;
    };
  };
  expand?: boolean | string;
  maxWidth?: string;
}

export interface WrapperProps extends ElementProps {
  removePadding?: boolean;
  alignHorizontal?: string;
  alignVertical?: string;
}
