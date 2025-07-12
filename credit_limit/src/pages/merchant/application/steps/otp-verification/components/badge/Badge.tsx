
import { badgeCx } from './styles';
import { BadgeProps } from './types';

const Badge = (props: BadgeProps) => {
  const { children, ...resProps } = props;

  return (
    <div css={badgeCx} {...resProps}>
      {children}
    </div>
  );
};

export default Badge;
