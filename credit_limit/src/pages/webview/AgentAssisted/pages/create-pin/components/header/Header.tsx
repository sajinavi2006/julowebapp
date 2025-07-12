import { Arrow } from 'new-components/shapes';
import { headerCx } from './styles';
import { HeaderProps } from './types';

const Header = (props: HeaderProps) => {
  const { onBack } = props;
  return (
    <header css={headerCx}>
      <div onClick={onBack} className='back-btn'>
        <Arrow className='arrow' />
        <span>Buat PIN</span>
      </div>
    </header>
  );
};

export default Header;
