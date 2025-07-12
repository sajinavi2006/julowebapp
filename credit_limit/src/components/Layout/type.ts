import { IActionsMenu } from 'components/BarBack/type';

export interface LayoutProps {
  barBackTitle?: string;
  barBackbackgroundColor?: string;
  barBackborderBottom?: string;
  barBackColor?: string;
  barBackImage?: string;
  barBackHideImage?: boolean;
  children: React.ReactNode;
  contentBackground?: string;
  disableBarBackRedirect?: boolean;
  disableClickLogo?: boolean;
  fullWidth?: boolean;
  hideBarBack?: boolean;
  hideNavbar?: boolean;
  hideNavbarMenu?: boolean;
  layoutBackground?: string;
  layoutContainer?: React.CSSProperties;
  mainWrapperStyles?: React.CSSProperties;
  onClickActionsMenu?: (value: IActionsMenu) => void;
  barBackType?: 'primary' | 'secondary';
  barBackActions?: {
    type: string;
    menu: IActionsMenu[];
    menuStyle: object;
  };
}

export interface ThemeProps {
  colors: {
    boxShadow: string;
    backgroundColorPrimary: string;
    white: string;
  };
  text: {
    primary: string;
  };
}
