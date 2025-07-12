import { Button } from 'new-components/elements';
import LongFormBackground from 'assets/img/partner/axiata/longform_background.svg';

import { useHandleApplicationForm, useHandleSuccessDialog } from './usecase';
import { ApplicationFormField, SuccessDialog } from './components';
import { applicationFormCx } from './styles';

const ApplicationForm = () => {
  const { onOpen, isOpen } = useHandleSuccessDialog();
  const { onSubmit } = useHandleApplicationForm({
    onSuccessSubmitApplication: onOpen,
  });

  return (
    <div css={applicationFormCx} className='application-form'>
      <div className="application-form-background">
        <img src={LongFormBackground} alt='application-form-background' />
      </div>
      <div className="application-form-fields">
        <div className='application-header'>
          <h4 className='title'>Formulir Pengajuan JULO Partner</h4>
          <h6 className='description'>
            Isi semua data yang ada di formulir ini dengan benar, ya!
          </h6>
        </div>
        <form onSubmit={onSubmit} noValidate>
          <ApplicationFormField />
          <Button type='submit' fullWidth variant='primary'>
            Lanjutkan
          </Button>
        </form>
      </div>
      <SuccessDialog isOpen={isOpen} />
    </div>
  );
};

export default ApplicationForm;