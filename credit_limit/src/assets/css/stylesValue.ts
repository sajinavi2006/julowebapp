import { CSSObject, css } from '@emotion/css';

import { handleFontSize } from './utils';

interface TextProps {
  color?: string;
  weight?: number | string;
  decoration?: string;
  style?: string;
  align?: CSSObject['textAlign'];
  lineHeight?: string;
  fixedSize?: boolean;
  size?: number;
}

const handleText = (props: TextProps) => {
  const { color, weight, decoration, style, align, lineHeight } = props;

  return {
    color: color,
    fontWeight: weight && `${weight} !important`,
    textDecoration: decoration,
    fontStyle: style,
    textAlign: align,
    lineHeight: lineHeight,
    wordBreak: 'break-word' as const,
  };
};

export const text = (props: TextProps) => {
  return css`
    ${handleText(props)};
    ${props.fixedSize
      ? { fontSize: `${props.size}px !important` }
      : handleFontSize(props.size || 0)};
  `;
};

export const top = (value: string) => css`
  top: ${value};
`;

export const bottom = (value: string) => css`
  bottom: ${value};
`;

export const left = (value: string) => css`
  left: ${value};
`;

export const right = (value: string) => css`
  right: ${value};
`;

export const opacity = (value: string | number) => css`
  opacity: ${value};
`;

export const flex = (value: string) => css`
  flex: ${value};
`;

export const fontSize = (
  value: number,
  isFixed: boolean | string = false,
) => css`
  ${isFixed ? value : handleFontSize(value)}
`;

export const fontStyle = (value: string) => css`
  font-style: ${value};
`;

export const fontWeight = (value: string) => css`
  font-weight: ${value};
`;

export const width = (value: string) => css`
  width: ${value};
`;

export const minWidth = (value: number) => css`
  min-width: ${value}px;
`;

export const maxWidth = (value: number) => css`
  max-width: ${value}px;
`;

export const height = (value: string) => css`
  height: ${value};
`;

export const minHeight = (value: number) => css`
  min-height: ${value}px;
`;

export const maxHeight = (value: number) => css`
  max-height: ${value}px;
`;

export const widthHeight = (width: string, height: string) => css`
  width: ${width ? width : '100%'};
  height: ${height ? height : '100%'};
`;

export const margin = (value: string) => css`
  margin: ${value}!important;
`;

export const marginX = (value: string) => css`
  margin-left: ${value}!important;
  margin-right: ${value}!important;
`;

export const marginY = (value: string) => css`
  margin-top: ${value}!important;
  margin-bottom: ${value}!important;
`;

export const marginBottom = (value: string) => css`
  margin-bottom: ${value}!important;
`;

export const marginTop = (value: string) => css`
  margin-top: ${value}!important;
`;

export const objectFit = (value: string) => css`
  object-fit: ${value}!important;
`;

export const padding = (value: string) => css`
  padding: ${value}!important;
`;

export const paddingLeft = (value: string) => css`
  padding-left: ${value}!important;
`;

export const paddingTop = (value: string) => css`
  padding-top: ${value};
`;

export const paddingBottom = (value: string) => css`
  padding-bottom: ${value};
`;

export const color = (value: string) => css`
  color: ${value}!important;
`;

export const background = (value: string) => css`
  background: ${value};
`;

export const backgroundColor = (value: string) => css`
  background-color: ${value}!important;
`;

export const backgroundImage = (url: string, size: string) => css`
  background-image: url(${url});
  ${size ? `background-size: ${size};` : 'background-size: cover;'}
  background-repeat: no-repeat;
`;

export const border = (value: string) => css`
  border: ${value}!important;
`;

export const borderY = (value: string) => css`
  border-top: ${value}!important;
  border-bottom: ${value}!important;
`;

export const borderX = (value: string) => css`
  border-right: ${value}!important;
  border-left: ${value}!important;
`;

export const borderTop = (value: string) => css`
  border-top: ${value};
`;

export const borderBottom = (value: string) => css`
  border-bottom: ${value};
`;

export const borderRadiusAll = (value: string) => css`
  border-radius: ${value}!important;
`;

export const borderRadiusTop = (value: string) => css`
  border-radius: ${value ? value : '0'}px ${value ? value : '0'}px 0px 0px !important;
`;

export const borderRadiusLeft = (value: string) => css`
  border-radius: ${value ? value : '0'}px 0px 0px
    ${value ? value : '0'}px!important;
`;

export const borderRadiusRight = (value: string) => css`
  border-radius: 0px ${value ? value : '0'}px ${value ? value : '0'}px 0px !important;
`;

export const zIndex = (value: string | number) => css`
  z-index: ${value};
`;

export const flexGrow = (value: string | number) => css`
  flex-grow: ${value};
`;

export const transition = (value: string) => css`
  transition: ${value};
`;

export const transform = (value: string) => css`
  transform: ${value};
`;

export const translate = (value1: string, value2: string) => css`
  transform: translate(${value1}, ${value2});
`;

export const justifyContent = (value: string) => css`
  justify-content: ${value};
`;
