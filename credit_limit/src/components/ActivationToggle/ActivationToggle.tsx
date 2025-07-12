import { MaterialUISwitch } from './styles';
import { ActivationToggleProps } from './types';

const ActivationToggle = (props: ActivationToggleProps) => {
  const { checked = true, toggleChecked } = props;

  return (
    <MaterialUISwitch checked={checked} onChange={toggleChecked} {...props} />
  );
};

export default ActivationToggle;
