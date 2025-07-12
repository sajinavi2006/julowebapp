import { css } from '@emotion/css';
import { colsMax } from './utils';

// CSS
export const dNone = css`
  display: none !important;
`;

export const textWhite = css`
  color: #fff;
`;

export const fontNormal = css`
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
`;

export const breakWord = css`
  word-break: break-word;
`;

export const fontWeight600 = css`
  font-weight: 600;
`;

export const cursorPointer = css`
  cursor: pointer !important;
`;

export const cursorDefault = css`
  cursor: default !important;
`;

export const overflowYAuto = css`
  overflow-y: auto !important;
`;

export const overflowHidden = css`
  overflow: hidden !important;
`;

export const positionRelative = css`
  position: relative;
`;

export const positionFixed = css`
  position: fixed !important;
`;

export const positionAbsolute = css`
  position: absolute;
`;

export const translateCenter = css`
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const translateXCenter = css`
  left: 50%;
  transform: translate(-50%, 0);
`;

export const textCenter = css`
  text-align: center;
`;

export const textRight = css`
  text-align: right;
`;

export const textLeft = css`
  text-align: left;
`;

export const textUppercase = css`
  text-transform: uppercase;
`;

export const textUnderline = css`
  text-decoration: underline;
`;

export const dFlex = css`
  display: flex;
`;

export const dBlock = css`
  display: block;
`;

export const dInlineBlock = css`
  display: inline-block;
`;

export const dInlineFlex = css`
  display: inline-flex;
`;

export const flexColumn = css`
  flex-direction: column;
`;

export const justifyCenter = css`
  justify-content: center;
`;

export const justifyBetween = css`
  justify-content: space-between;
`;

export const justifyEnd = css`
  justify-content: flex-end;
`;

export const justifyEvenly = css`
  justify-content: space-evenly;
`;

export const alignCenter = css`
  align-items: center;
`;

export const alignFlexStart = css`
  align-items: flex-start;
`;

export const borderRadiusTopNone = css`
  border-top-right-radius: 0px !important;
  border-top-left-radius: 0px !important;
`;

export const borderRadiusBottomNone = css`
  border-bottom-right-radius: 0px !important;
  border-bottom-left-radius: 0px !important;
`;

export const borderNone = css`
  border: none !important;
`;

export const borderTopNone = css`
  border-top: none;
`;

export const borderBottomNone = css`
  border-bottom: none;
`;

export const boxShadowThin = css`
  box-shadow: rgb(0 0 0 / 7%) 0px 4px 6px;
`;

export const boxShadowThick = css`
  box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.25);
`;

export const h100 = css`
  height: 100% !important;
`;

export const h90 = css`
  height: 90% !important;
`;

export const w100 = css`
  width: 100% !important;
`;

export const w90 = css`
  width: 90% !important;
`;

export const w50 = css`
  width: 50% !important;
`;

export const w25 = css`
  width: 25% !important;
`;

export const max100vh = css`
  height: 100%;
  max-height: 100vh;
`;

export const fluid = css`
  ${colsMax('small')} {
    padding: 0px !important;
  } ;
`;

export const my0 = css`
  margin-bottom: 0rem !important;
  margin-top: 0rem !important;
`;

export const my1 = css`
  margin-bottom: 0.25rem !important;
  margin-top: 0.25rem !important;
`;

export const my2 = css`
  margin-bottom: 0.5rem !important;
  margin-top: 0.5rem !important;
`;

export const my3 = css`
  margin-bottom: 1rem !important;
  margin-top: 1rem !important;
`;

export const my4 = css`
  margin-bottom: 1.5rem !important;
  margin-top: 1.5rem !important;
`;

export const my5 = css`
  margin-bottom: 3rem !important;
  margin-top: 3rem !important;
`;

export const mx0 = css`
  margin-left: 0rem !important;
  margin-right: 0rem !important;
`;

export const mx1 = css`
  margin-left: 0.25rem !important;
  margin-right: 0.25rem !important;
`;

export const mx2 = css`
  margin-left: 0.5rem !important;
  margin-right: 0.5rem !important;
`;

export const mx3 = css`
  margin-left: 1rem !important;
  margin-right: 1rem !important;
`;

export const mx4 = css`
  margin-left: 1.5rem !important;
  margin-right: 1.5rem !important;
`;

export const mx5 = css`
  margin-left: 3rem !important;
  margin-right: 3rem !important;
`;

export const py0 = css`
  padding-bottom: 0rem !important;
  padding-top: 0rem !important;
`;

export const py1 = css`
  padding-bottom: 0.25rem !important;
  padding-top: 0.25rem !important;
`;

export const py2 = css`
  padding-bottom: 0.5rem !important;
  padding-top: 0.5rem !important;
`;

export const py3 = css`
  padding-bottom: 1rem !important;
  padding-top: 1rem !important;
`;

export const py4 = css`
  padding-bottom: 1.5rem !important;
  padding-top: 1.5rem !important;
`;

export const py5 = css`
  padding-bottom: 3rem !important;
  padding-top: 3rem !important;
`;

export const px0 = css`
  padding-left: 0rem !important;
  padding-right: 0rem !important;
`;

export const px1 = css`
  padding-left: 0.25rem !important;
  padding-right: 0.25rem !important;
`;

export const px2 = css`
  padding-left: 0.5rem !important;
  padding-right: 0.5rem !important;
`;

export const px3 = css`
  padding-left: 1rem !important;
  padding-right: 1rem !important;
`;

export const px4 = css`
  padding-left: 1.5rem !important;
  padding-right: 1.5rem !important;
`;

export const px5 = css`
  padding-left: 3rem !important;
  padding-right: 3rem !important;
`;

export const m0 = css`
  margin: 0rem !important;
`;

export const m1 = css`
  margin: 0.25rem !important;
`;

export const m2 = css`
  margin: 0.5rem !important;
`;

export const m3 = css`
  margin: 1rem !important;
`;

export const m4 = css`
  margin: 1.5rem !important;
`;

export const m5 = css`
  margin: 3rem !important;
`;

export const p0 = css`
  padding: 0rem !important;
`;

export const p1 = css`
  padding: 0.25rem !important;
`;

export const p2 = css`
  padding: 0.5rem !important;
`;

export const p3 = css`
  padding: 1rem !important;
`;

export const p4 = css`
  padding: 1.5rem !important;
`;

export const p5 = css`
  padding: 3rem !important;
`;

export const mb0 = css`
  margin-bottom: 0rem !important;
`;

export const mb1 = css`
  margin-bottom: 0.25rem !important;
`;

export const mb2 = css`
  margin-bottom: 0.5rem !important;
`;

export const mb3 = css`
  margin-bottom: 1rem !important;
`;

export const mb4 = css`
  margin-bottom: 1.5rem !important;
`;

export const mb5 = css`
  margin-bottom: 3rem !important;
`;

export const pb0 = css`
  padding-bottom: 0rem !important;
`;

export const pb1 = css`
  padding-bottom: 0.25rem !important;
`;

export const pb2 = css`
  padding-bottom: 0.5rem !important;
`;

export const pb3 = css`
  padding-bottom: 1rem !important;
`;

export const pb4 = css`
  padding-bottom: 1.5rem !important;
`;

export const pb5 = css`
  padding-bottom: 3rem !important;
`;

export const mr0 = css`
  margin-right: 0rem !important;
`;

export const mr1 = css`
  margin-right: 0.25rem !important;
`;

export const mr2 = css`
  margin-right: 0.5rem !important;
`;

export const mr3 = css`
  margin-right: 1rem !important;
`;

export const mr4 = css`
  margin-right: 1.5rem !important;
`;

export const mr5 = css`
  margin-right: 3rem !important;
`;

export const pr0 = css`
  padding-right: 0rem !important;
`;

export const pr1 = css`
  padding-right: 0.25rem !important;
`;

export const pr2 = css`
  padding-right: 0.5rem !important;
`;

export const pr3 = css`
  padding-right: 1rem !important;
`;

export const pr4 = css`
  padding-right: 1.5rem !important;
`;

export const pr5 = css`
  padding-right: 3rem !important;
`;

export const ml0 = css`
  margin-left: 0rem !important;
`;

export const ml1 = css`
  margin-left: 0.25rem !important;
`;

export const ml2 = css`
  margin-left: 0.5rem !important;
`;

export const ml3 = css`
  margin-left: 1rem !important;
`;

export const ml4 = css`
  margin-left: 1.5rem !important;
`;

export const ml5 = css`
  margin-left: 3rem !important;
`;

export const pl0 = css`
  padding-left: 0rem !important;
`;

export const pl1 = css`
  padding-left: 0.25rem !important;
`;

export const pl2 = css`
  padding-left: 0.5rem !important;
`;

export const pl3 = css`
  padding-left: 1rem !important;
`;

export const pl4 = css`
  padding-left: 1.5rem !important;
`;

export const pl5 = css`
  padding-left: 3rem !important;
`;

export const mt0 = css`
  margin-top: 0rem !important;
`;

export const mt1 = css`
  margin-top: 0.25rem !important;
`;

export const mt2 = css`
  margin-top: 0.5rem !important;
`;

export const mt3 = css`
  margin-top: 1rem !important;
`;

export const mt4 = css`
  margin-top: 1.5rem !important;
`;

export const mt5 = css`
  margin-top: 3rem !important;
`;

export const pt0 = css`
  padding-top: 0rem !important;
`;

export const pt1 = css`
  padding-top: 0.25rem !important;
`;

export const pt2 = css`
  padding-top: 0.5rem !important;
`;

export const pt3 = css`
  padding-top: 1rem !important;
`;

export const pt4 = css`
  padding-top: 1.5rem !important;
`;

export const pt5 = css`
  padding-top: 3rem !important;
`;
