import { CSSProperties } from 'react';

export interface ActionsMenu {
  text: string;
}

export interface BarBackStyledProps {
  background?: string;
  borderBottom?: string;
}

export interface BarBackProps {
  classBarBack?: string;
  customBack?: boolean;
  goTo?: string;
  title?: string;
  color?: string;
  img?: string;
  listMenuImage?: string;
  backgroundColor?: string;
  borderBottom?: string;
  withNavbar?: boolean;
  hideImage?: boolean;
  disableRedirect?: boolean;
  type?: 'secondary' | 'primary'; // secondary or primary
  handleClickBackMenu?: () => void;
  handleClickActionsMenu?: (value: ActionsMenu) => void;
  actions?: {
    type: string;
    menu: ActionsMenu[];
    menuStyle: CSSProperties;
  };
}
