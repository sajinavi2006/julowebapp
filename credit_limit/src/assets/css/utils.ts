import { CSSObject } from '@emotion/css';

import { BREAKPOINT } from 'constant';
import { StyleProps } from './types';

const STYLE_KEYS = [
  'alignItems',
  'alignSelf',
  'background',
  'backgroundColor',
  'backgroundImage',
  'backgroundPosition',
  'backgroundSize',
  'border',
  'borderColor',
  'borderBottom',
  'borderLeft',
  'borderRadius',
  'borderRight',
  'borderTop',
  'bottom',
  'boxShadow',
  'color',
  'columnGap',
  'cursor',
  'display',
  'flex',
  'flexBasis',
  'flexDirection',
  'flexShrink',
  'flexWrap',
  'flexFlow',
  'fluid',
  'fontWeight',
  'gap',
  'gridTemplateColumns',
  'gridTemplateAreas',
  'height',
  'justifyContent',
  'left',
  'margin',
  'marginBottom',
  'marginLeft',
  'marginRight',
  'marginTop',
  'maxHeight',
  'maxWidth',
  'minHeight',
  'minWidth',
  'opacity',
  'overflow',
  'overflowX',
  'padding',
  'paddingRight',
  'paddingLeft',
  'paddingTop',
  'paddingBottom',
  'position',
  'right',
  'rounded',
  'textAlign',
  'top',
  'transform',
  'transition',
  'textDecoration',
  'width',
  'placeContent',
  'outline',
  'fontSize',
] as StyleProps[];

export function omitHTMLProps(props: Record<string, unknown>) {
  const clone = { ...props };

  for (const key in props) {
    if (!STYLE_KEYS.includes(key as StyleProps)) {
      delete clone[key];
    }
  }

  return clone as StyleProps;
}

export const handleStyleProps = (props: StyleProps) => {
  const { rounded, borderRadius, fluid, width, ...resProps } = omitHTMLProps(
    props as Record<string, unknown>,
  );

  return {
    ...resProps,
    borderRadius: rounded ? '5px' : borderRadius,
    width: fluid ? '100%' : width,
  };
};

// Breakpoint
export const colsMin = (keyBreakPoint: string) => {
  const breakPointArray = Object.keys(BREAKPOINT).map((key) => [
    key,
    BREAKPOINT[key],
  ]);

  const [result] = breakPointArray.reduce(
    (current, [name, size]) =>
      keyBreakPoint === name
        ? [...current, `@media (min-width: ${size}px)`]
        : current,
    [],
  );

  return result;
};

export const colsMax = (keyBreakPoint: string) => {
  const breakPointArray = Object.keys(BREAKPOINT).map((key) => [
    key,
    BREAKPOINT[key],
  ]);

  const [result] = breakPointArray.reduce(
    (current, [name, size]) =>
      keyBreakPoint === name
        ? [...current, `@media (max-width: ${size}px)`]
        : current,
    [],
  );
  return result;
};

export const handleFontSize = (value?: CSSObject['fontSize']) => {
  if (typeof value === 'string') return `font-size: ${value}`;

  switch (value) {
    case 9:
      return `${colsMin('xsmall')} {
                    font-size: 1.75vw!important;
                };
                ${colsMin('small')} {
                    font-size: ${value}px!important;
                };
                ${colsMax('xsmall')} {
                    font-size: 5.6px!important;
                };`;
    case 10:
      return `${colsMin('xsmall')} {
                    font-size: 2vw!important;
                };
                ${colsMin('small')} {
                    font-size: ${value}px!important;
                };
                ${colsMax('xsmall')} {
                    font-size: 6.4px!important;
                };`;
    case 11:
      return `${colsMin('xsmall')} {
                    font-size: 2.25vw!important;
                };
                ${colsMin('small')} {
                    font-size: ${value}px!important;
                };
                ${colsMax('xsmall')} {
                    font-size: 7.2px!important;
                };`;
    case 12:
      return `${colsMin('xsmall')} {
                    font-size: 2.5vw!important;
                };
                ${colsMin('small')} {
                    font-size: ${value}px!important;
                };
                ${colsMax('xsmall')} {
                    font-size: 8px!important;
                };`;
    case 14:
      return `${colsMin('xsmall')} {
                    font-size: 3vw!important;
                };
                ${colsMin('small')} {
                    font-size: ${value}px!important;
                };
                ${colsMax('xsmall')} {
                    font-size: 9.6px!important;
                };`;
    case 16:
      return `${colsMin('xsmall')} {
                    font-size: 3.5vw!important;
                };
                ${colsMin('small')} {
                    font-size: ${value}px!important;
                };
                ${colsMax('xsmall')} {
                    font-size: 10.6px!important;
                };`;
    case 18:
      return `${colsMin('xsmall')} {
                    font-size: 4vw!important;
                };
                ${colsMin('small')} {
                    font-size: ${value}px!important;
                };
                ${colsMax('xsmall')} {
                    font-size: 12.8px!important;
                };`;
    case 20:
      return `${colsMin('xsmall')} {
                    font-size: 3.5vw!important;
                };
                ${colsMin('small')} {
                    font-size: ${value}px!important;
                };
                ${colsMax('xsmall')} {
                    font-size: 11.2px!important;
                };`;
    case 22:
      return `${colsMin('xsmall')} {
                    font-size: 4vw!important;
                };
                ${colsMin('small')} {
                    font-size: ${value}px!important;
                };
                ${colsMax('xsmall')} {
                    font-size: 12.8px!important;
                };`;

    case 24:
      return `${colsMin('xsmall')} {
                    font-size: 4.5vw!important;
                };
                ${colsMin('small')} {
                    font-size: ${value}px!important;
                };
                ${colsMax('xsmall')} {
                    font-size: 14.4px!important;
                };`;

    case 26:
      return `${colsMin('xsmall')} {
                    font-size: 5vw!important;
                };
                ${colsMin('small')} {
                    font-size: ${value}px!important;
                };
                ${colsMax('xsmall')} {
                    font-size: 16px!important;
                };`;

    case 28:
      return `${colsMin('xsmall')} {
                    font-size: 5.5vw!important;
                };
                ${colsMin('small')} {
                    font-size: ${value}px!important;
                };
                ${colsMax('xsmall')} {
                    font-size: 17.6px!important;
                };`;
    case 30:
      return `${colsMin('xsmall')} {
                    font-size: 6vw!important;
                };
                ${colsMin('small')} {
                    font-size: ${value}px!important;
                };
                ${colsMax('xsmall')} {
                    font-size: 19.2px!important;
                };`;
    case 32:
      return `${colsMin('xsmall')} {
                    font-size: 6.5vw!important;
                };
                ${colsMin('small')} {
                    font-size: ${value}px!important;
                };
                ${colsMax('xsmall')} {
                    font-size: 20.8px!important;
                };`;
    case 34:
      return `${colsMin('xsmall')} {
                    font-size: 7vw!important;
                };
                ${colsMin('small')} {
                    font-size: ${value}px!important;
                };
                ${colsMax('xsmall')} {
                    font-size: 22.4px!important;
                };`;
    case 36:
      return `${colsMin('xsmall')} {
                    font-size: 7.5vw!important;
                };
                ${colsMin('small')} {
                    font-size: ${value}px!important;
                };
                ${colsMax('xsmall')} {
                    font-size: 24px!important;
                };`;
    case 38:
      return `${colsMin('xsmall')} {
                    font-size: 8vw!important;
                };
                ${colsMin('small')} {
                    font-size: ${value}px!important;
                };
                ${colsMax('xsmall')} {
                    font-size: 25.6px!important;
                };`;
    case 40:
      return `${colsMin('xsmall')} {
                    font-size: 8.5vw!important;
                };
                ${colsMin('small')} {
                    font-size: ${value}px!important;
                };
                ${colsMax('xsmall')} {
                    font-size: 27.2px!important;
                };`;
    default:
      return `font-size: inherit;`;
  }
};
