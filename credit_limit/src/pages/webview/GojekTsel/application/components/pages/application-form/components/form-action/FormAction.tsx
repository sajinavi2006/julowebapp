import { Snackbar } from '@material-ui/core';

import { ApplicationParams } from 'pages/webview/GojekTsel/application/types';
import { useFormContext } from 'hooks/react-hook-form';
import { Button } from 'new-components/elements';

import { formActionCx } from './styles';
import { useHandleFormFields } from './usecase';
import { FormActionProps } from './types';

const FormAction = (props: FormActionProps) => {
  const {
    showSnackbar: { isOpen, message },
    onSnackbarClose,
  } = props;

  const {
    formState: { isSubmitting },
  } = useFormContext<ApplicationParams>();
  const { isFormFieldsHasError, isAllFormFieldValid } = useHandleFormFields();

  return (
    <div css={formActionCx} className='form-action'>
      <Snackbar
        open={isOpen}
        onClose={onSnackbarClose}
        message={message}
        autoHideDuration={4000}
      />
      <div className='button-submit-wrapper'>
        <Button
          type='submit'
          disabled={
            !isAllFormFieldValid || isFormFieldsHasError || isSubmitting
          }
          fullWidth
        >
          Kirim
        </Button>
      </div>
    </div>
  );
};

export default FormAction;
