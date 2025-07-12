import { useState } from 'react';
import { AxiosError } from 'axios';
import OtpInput from 'react-otp-input';
import { useHistory } from 'react-router-dom';
import { cx } from '@emotion/css';
import { useTheme } from '@emotion/react';

import utils from 'utils';
import { MAX_WIDTH } from 'constant';
import { useUserContext } from 'providers/UserProvider';
import { linkAccountApi, validatePin } from 'services/webview/activation';

import LoaderText from 'components/LoaderText';

import { inputStyle, errorMessage, redColor } from './styles';
import { paddingBottom, text } from 'assets/css/stylesValue';
import { Container, Div, Wrapper } from 'assets/css/styled';
import { h100, h90, justifyCenter, mt3, my3, px3 } from 'assets/css/stylesFix';

const PinVerification = () => {
  const history = useHistory();
  const theme = useTheme();
  const themeColor = theme.colors;
  const themeText = theme.text;
  const { setDatas } = useUserContext();
  const [pin, setPin] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messageError, setMessageError] = useState('');
  const [showError, setShowError] = useState(false);

  const linkAccount = async () => {
    const payload = {
      partner_origin_name: utils.store.get('partner_origin_name'),
    };
    try {
      const result = await linkAccountApi(payload);

      if (result?.data?.is_linked) {
        setDatas((prev) => ({
          ...prev,
          linkAccountStatus: true,
        }));
        history.replace('activation-success', { from: 'pin-verification' });
      }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setShowError(true);
      setMessageError((error as AxiosError)?.response?.data?.errors?.[0]);
    }
  };

  const fetchAndSet = async (value: string) => {
    if (utils.string.stringOnlyContainsNumber(value)) {
      setPin(value);
      setShowError(false);
      setMessageError('');

      if (value.length === 6) {
        try {
          const payload = {
            pin: value,
          };
          setIsLoading(true);
          const result = await validatePin(payload);

          if (result?.success) {
            linkAccount();
          } else {
            setIsLoading(false);
            setShowError(true);
            setMessageError(result?.content?.message);
          }
        } catch (error) {
          setIsLoading(false);
          setShowError(true);
          setMessageError((error as AxiosError)?.response?.data?.errors?.[0]);
        }
      } else {
        setIsLoading(false);
        setShowError(false);
        setMessageError('');
      }
    } else {
      setPin('');
    }
  };

  return (
    <Container
      height='100%'
      position='relative'
      background={themeColor?.white}
      className={cx(paddingBottom('6rem'))}
    >
      <Wrapper maxWidth={MAX_WIDTH} className={cx(h90, px3)}>
        <Div className={cx(h100)}>
          <Div
            className={cx(text({ color: themeText?.primary }))}
            textAlign='center'
          >
            <Div className={cx(text({ size: 14, weight: 'bold' }))}>
              Ketik PIN
            </Div>
            <Div className={cx(text({ size: 12 }))}>Masukkan PIN JULO Kamu</Div>
          </Div>
          <Div className={mt3}>
            <OtpInput
              isDisabled={isLoading}
              value={pin}
              onChange={fetchAndSet}
              numInputs={6}
              isInputNum
              separator={<span>&nbsp; &nbsp;</span>}
              containerStyle={`d-flex ${justifyCenter} w-100`}
              inputStyle={`${inputStyle} ${showError ? redColor : ''}`}
              shouldAutoFocus={true}
            />
          </Div>
          <Div>
            <Div className={cx(errorMessage, my3)} textAlign='center'>
              {showError ? messageError : <>&nbsp;&nbsp;</>}
            </Div>
            {isLoading ? <LoaderText /> : null}
          </Div>
        </Div>
      </Wrapper>
    </Container>
  );
};

export default PinVerification;
