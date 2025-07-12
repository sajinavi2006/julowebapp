import { Dialog, DialogActions, DialogContent } from '@material-ui/core';

import { Button, Input } from 'new-components/elements';
import { useFormContext } from 'hooks/react-hook-form';
import { ChangeEmailDialogProps } from './types';

const ChangeEmailDialog = (props: ChangeEmailDialogProps) => {
  const { open, onOk, onCancel } = props;
  const form = useFormContext();

  return (
    <Dialog open={open} maxWidth='lg'>
      <DialogContent>
        <Input
          name='tempEmail'
          label='Email'
          defaultValue={form.getValues('email')}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button variant='tertiary' onClick={onOk}>
          OK
        </Button>
        <Button variant='tertiary' onClick={onCancel}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChangeEmailDialog;
