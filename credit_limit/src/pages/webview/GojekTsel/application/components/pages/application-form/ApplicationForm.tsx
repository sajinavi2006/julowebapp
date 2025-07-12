import { PersonalIdentity, Contact, OtherPhone, Agreement } from './forms';
import { FormAction, FormFooter, FormHeader } from './components';
import { useHandleApplication } from './usecase';
import { applicationFormCx } from './styles';

const ApplicationForm = () => {
  const { showSnackbar, onSubmit, onSnackbarClose } = useHandleApplication();

  return (
    <div css={applicationFormCx} className='application-form'>
      <form onSubmit={onSubmit}>
        <FormHeader />
        <PersonalIdentity />
        <Contact />
        <OtherPhone />
        <Agreement />
        <FormFooter />
        <FormAction
          showSnackbar={showSnackbar}
          onSnackbarClose={onSnackbarClose}
        />
      </form>
    </div>
  );
};

export default ApplicationForm;
