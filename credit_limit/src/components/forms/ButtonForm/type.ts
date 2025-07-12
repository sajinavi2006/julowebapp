import { ButtonProps } from 'react-bootstrap';

export interface IButtonProps extends ButtonProps {
  className?: string;
  color?: string;
  onClick?: () => void;
  children: React.ReactNode;
}
