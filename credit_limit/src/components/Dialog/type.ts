import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { CSSObject } from '@emotion/styled';
export interface Props {
  baseColor?: string;
  children?: React.ReactNode;
  classBackdrop?: string | null;
  classDialog?: string;
  classWrapperContent?: string;
  clickOutside?: boolean;
  customMaxWidth?: number;
  dataBarBack?: {
    title?: string;
    image?: string;
    color?: string;
    backgroundColor?: string;
  };
  fastClose?: boolean;
  fluid?: boolean;
  floating?: boolean;
  getShow?: (value: boolean) => void;
  hideBarback?: boolean;
  margin?: string;
  maxWidth?: string | number;
  minWidth?: string | number;
  name?: string;
  padding?: string;
  position?: 'top' | 'center' | 'bottom';
  show: boolean;
  stylesDialog?: CSSObject;
  type?: 'form' | 'slideUp' | 'slideLeft' | 'fade' | 'default';
  withoutTemplate?: boolean;
  redirectURL?: string;
}

export interface IDialogTakePhoto {
  type?: string;
  clickOutside?: boolean;
  customMaxWidth?: number;
  handleClickDialogButton?: (params: string) => void;
  handleShowDialog?: () => void;
  showDialog?: boolean;
}

export interface IOtpVerificationDialog extends RouteComponentProps {
  onFilledPersonal?: () => void;
}
