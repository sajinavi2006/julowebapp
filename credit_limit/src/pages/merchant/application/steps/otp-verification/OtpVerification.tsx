import { useFormContext } from 'hooks/react-hook-form';
import { Arrow, ClockIcon } from 'new-components/shapes';
import { Button, OtpInput } from 'new-components/elements';
import { VerifyOtpParam } from 'repositories/merchant/application';

import { useStepContext, useTimer } from '../../hooks';
import { otpVerificationCx } from './styles';
import { Badge } from './components';
import useHandleOtp from './usecase';
import { formatTime } from './utils';

const OtpVerification = () => {
  const {
    watch,
    fieldsRef,
    getValues,
    handleSubmit,
    formState: { isSubmitting },
  } = useFormContext<VerifyOtpParam>();

  const { onPrevStep } = useStepContext();
  const { time } = useTimer();

  const phoneNumber = getValues('primaryPhoneNumber');
  const otpInputValue = watch('otp');

  const {
    isLoadingValidateOtp,
    isLoadingReRequestOtp,
    onSubmitOtp,
    handleReRequestOtp,
  } = useHandleOtp();

  return (
    <div css={otpVerificationCx} className='otp-verification'>
      <div className='otp-verification-header'>
        <div className='arrow-icon' onClick={onPrevStep}>
          <Arrow fill='#616161' />
        </div>
        <p>Verifikasi</p>
      </div>
      <div className='otp-verification-body'>
        <div className='otp-verification-title'>
          <p>
            Harap masukkan kode verifikasi yang telah kami kirim ke nomor{' '}
            <b>{phoneNumber}</b> untuk melanjutkan proses
          </p>
        </div>
        <div className='otp-verification-input'>
          <form onSubmit={handleSubmit(onSubmitOtp)} noValidate>
            <OtpInput
              ref={(e) => (fieldsRef.current['otp'] = e)}
              className='otp-input-field'
              isInputNum
              isDisabled={isLoadingValidateOtp}
              name='otp'
              numInputs={6}
            />
            <div className='otp-timer'>
              <Badge className='otp-badge'>
                <ClockIcon width={14} height={14} />
                <p>{formatTime(time)}</p>
              </Badge>
            </div>
            <div className='otp-actions'>
              <div className='otp-resend-action'>
                <p>Tidak menerima kode?</p>
                <a
                  aria-disabled={
                    Boolean(time) ||
                    isLoadingReRequestOtp ||
                    isLoadingValidateOtp
                  }
                  onClick={handleReRequestOtp}
                >
                  Kirim Ulang
                </a>
              </div>
              <Button
                disabled={
                  otpInputValue?.length !== 6 ||
                  isSubmitting ||
                  isLoadingReRequestOtp
                }
                type='submit'
                fullWidth
                variant='primary'
              >
                Verifikasi
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;
