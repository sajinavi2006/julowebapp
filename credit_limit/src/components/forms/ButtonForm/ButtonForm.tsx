import { IButtonProps } from './type';
import Button from 'react-bootstrap/Button';

const ButtonForm = (props: IButtonProps) => {
  const { children, ...restProps } = props;

  return <Button {...restProps}>{children}</Button>;
};

export default ButtonForm;
