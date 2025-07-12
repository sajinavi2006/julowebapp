export interface Props {
  type?: string;
  isLoading?: boolean;
  image?: string;
  disabled?: boolean;
  onClick?: () => void;
  margin?: string;
  style?: React.CSSProperties;
  error?: string;
}
