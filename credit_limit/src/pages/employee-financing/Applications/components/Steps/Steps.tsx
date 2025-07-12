import { useParams } from 'react-router-dom';
import { Div, Img } from 'assets/css/styled';
import EllipseBlue from 'assets/img/icon/ic-ellipse-blue.svg';
import EllipseGrey from 'assets/img/icon/ic-ellipse-grey.svg';
import CheckBlue from 'assets/img/icon/ic-checked_blue.svg';
import { IParams } from '../../types';

const Steps = () => {
  const { page } = useParams<IParams>();

  const Bullet = ({
    title,
    isActive,
    isFocus,
  }: {
    title: string;
    isActive?: boolean;
    isFocus?: boolean;
  }) => {
    const image = isActive ? CheckBlue : isFocus ? EllipseBlue : EllipseGrey;

    return (
      <Div display='flex' flex='10%' flexDirection='column'>
        <Img marginBottom='5px' height='20px' src={image} />
        <Div textAlign='center' color='#616161' fontSize={'14px'}>
          {title}
        </Div>
      </Div>
    );
  };

  const Divider = () => {
    return <Div marginTop='10px' flex='20%' borderTop='1px dashed #9E9E9E' />;
  };

  return (
    <Div marginTop='30px' padding='0 5px' display='flex' flexDirection='row'>
      <Bullet
        title='Identitas Diri'
        isFocus={page === 'personal_identity'}
        isActive={page !== 'personal_identity'}
      />
      <Divider />
      <Bullet
        title='Informasi Keluarga'
        isFocus={page === 'family_information'}
        isActive={page !== 'personal_identity' && page !== 'family_information'}
      />
      <Divider />
      <Bullet title='Keuangan' isFocus={page === 'financial'} />
    </Div>
  );
};

export default Steps;
