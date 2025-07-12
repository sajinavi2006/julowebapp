import { TransitionProps } from '@material-ui/core/transitions';

export type DialogTransitionProps = TransitionProps & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children?: React.ReactElement<any, any>;
};
