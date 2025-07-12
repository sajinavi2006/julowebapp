import React from 'react';
import { Button } from 'assets/css/styled';
import { CSSObject } from '@emotion/react';

interface Props {
  style?: CSSObject | string[];
  className?: string;
  color?: string;
  disabled?: boolean;
  variant?: string;
  small?: boolean;
  children?: React.ReactNode;
  onClick: () => void;
}

const ApplicationButtonForm: React.FC<Props> = (props) => {
  const style = { ...props.style };
  return (
    <Button
      style={style}
      className={props.className}
      types={props.color ? 'primary' : props.disabled ? 'grey' : 'primary'}
      onClick={props.onClick}
      disabled={props.disabled}
      fluid={props.small ? false : true}
    >
      {props.children}
    </Button>
  );
};

export default ApplicationButtonForm;
