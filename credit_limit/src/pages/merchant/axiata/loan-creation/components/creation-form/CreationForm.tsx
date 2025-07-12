import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { yupResolver } from '@hookform/resolvers/yup';

import Chip from 'components/Chip';
import NumberFormatCustom from 'components/forms/number-format-custom';
import LoaderText from 'components/LoaderText';
import { Button, Input, Select } from 'new-components/elements';
import { useForm, FormProvider } from 'hooks/react-hook-form';
import { LoanCreationParam } from 'repositories/merchant/loan';

import { useHandleInstallmentNumber } from './usecase/use-handle-installment-number';
import { useHandleFormSubmit } from './usecase/use-handle-form-submit';
import { useHandleOnFocus } from './usecase/use-handle-on-focus';
import UploadDoc from './components/upload-doc';

import { creationFormCx, selectOptionCx } from './styles';
import { loanCreationScheme } from './constants';

const CreationForm = () => {
  const form = useForm<LoanCreationParam>({
    resolver: yupResolver(loanCreationScheme),
  });

  const { handleSubmit, fieldsRef } = form;

  const {
    isDisabled,
    selectOptions: installmentNumberOptions,
  } = useHandleInstallmentNumber({ form });

  const { isLoading, error, onCloseSnackbar, onSubmit, onError } =
    useHandleFormSubmit({
      form,
    });

  const { onFocus, onBlur, isFocus } = useHandleOnFocus();

  return (
    <FormProvider {...form}>
      <form css={creationFormCx} onSubmit={handleSubmit(onSubmit, onError)}>
        <Select
          css={selectOptionCx}
          ref={(e) => (fieldsRef.current['loanType'] = e)}
          name='loanType'
          label='Jenis Pendanaan'
          options={[
            { label: 'Supply Chain Financing', value: 'SCF' },
            { label: 'Invoice Financing', value: 'IF' },
          ]}
          disableUnderline
          disabled={isLoading}
          placeholder='Pilih jenis pendanaan'
        />

        <Input
          leftElement={<div>Rp</div>}
          ref={(e) => (fieldsRef.current['loanAmount'] = e)}
          name='loanAmount'
          label='Jumlah Pinjaman'
          placeholder='Masukkan jumlah pinjaman'
          helperText={
            isFocus['loanAmount']
              ? 'Harap diisi dengan angka saja, nominal maks. 2.000.000.000'
              : ''
          }
          disabled={isLoading}
          InputProps={{
            inputComponent: NumberFormatCustom,
            onFocus: () => onFocus('loanAmount'),
            onBlur: () => onBlur('loanAmount'),
          }}
        />

        <div className='two-rows'>
          <Input
            name='loanDuration'
            type='number'
            label='Tenor (Hari)'
            placeholder='Masukkan tenor (dalam hari)'
            disabled={isLoading}
          />

          <Select
            css={selectOptionCx}
            ref={(e) => (fieldsRef.current['installmentNumber'] = e)}
            name='installmentNumber'
            label='Pilih Tagihan'
            options={installmentNumberOptions}
            disableUnderline
            disabled={isLoading || isDisabled}
            placeholder='Pilih tagihan'
          />
        </div>
        <UploadDoc
          name='invoiceFile'
          label='Dokumen Invoice'
          infoText='Harap upload dalam format PDF, JPG, PNG, CSV, XLS, DOC, ZIP, RAR dengan ukuran maksimum 2MB.'
          required
        />

        <Input
          name='invoiceNumber'
          label='Nomor Invoice'
          helperText={
            isFocus['invoiceNumber']
              ? 'Harap masukkan nomor invoice yang ada di dokumen pembelian barang'
              : ''
          }
          placeholder='Masukkan nomor invoice'
          disabled={isLoading}
          InputProps={{
            onFocus: () => onFocus('invoiceNumber'),
            onBlur: () => onBlur('invoiceNumber'),
          }}
        />

        <UploadDoc
          name='bilyetFile'
          label='Berkas Giro'
          infoText='Harap upload dalam format PDF, JPG, PNG, CSV, XLS, DOC, ZIP, RAR dengan ukuran maksimum 2MB.'
          labelIndicator={<Chip label='Tidak Wajib' />}
        />

        <Button fullWidth type='submit' disabled={isLoading}>
          {isLoading ? <LoaderText /> : 'Kirim'}
        </Button>
      </form>

      <Snackbar
        open={!!error}
        autoHideDuration={5000}
        onClose={onCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={onCloseSnackbar} severity='error'>
          {error}
        </Alert>
      </Snackbar>
    </FormProvider>
  );
};

export default CreationForm;
