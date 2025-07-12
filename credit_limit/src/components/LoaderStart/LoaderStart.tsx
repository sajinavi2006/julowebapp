import { TextLoader } from './styles';
import themeDefault from 'themes/Partner/default';
import { Div } from 'assets/css/styled';

const LoaderStart = ({
  text = 'JULO',
  color = themeDefault?.text?.blue,
  glowColor = themeDefault?.text?.glowBlue,
}) => {
  return (
    <TextLoader textAlign='center' textColor={color} glowColor={glowColor}>
      <Div styles={{ fontFamily: 'galano-regular, sans-serif' }}>{text}</Div>
    </TextLoader>
  );
};

export default LoaderStart;
