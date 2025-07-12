import { forwardRef } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { Typography } from '@material-ui/core';

import { _noop, mergeRefs } from '@julofinance/web-helpers/dist/fn';

import { FieldGroup } from 'new-components/elements';
import { DocumentIcon, RemoveIcon } from 'new-components/shapes';

import { acceptedExtensions } from '../../constants';

import { uploadBoxCx, uploadedBoxCx, uploadDocCx } from './styles';
import { UploadDocProps } from './types';
import { useFileChange } from './usecase';

const UploadDoc = forwardRef<HTMLDivElement, UploadDocProps>((props, ref) => {
  const {
    name,
    label,
    labelIndicator,
    infoText,
    onChange = _noop,
    required,
  } = props;

  const { control } = useFormContext();

  const {
    fieldState: { error, invalid },
    field: { ref: uploadDocControlRef, onChange: uploadDocControllerOnChange },
  } = useController({
    control,
    name,
    rules: {
      ...(required && { required: 'This field is required' }),
    },
  });

  const { handleOnFileChange, handleOnFileRemove, selectedFile, selectedName } =
    useFileChange({
      onChange,
      onChangeController: uploadDocControllerOnChange,
    });

  return (
    <div css={uploadDocCx}>
      <FieldGroup
        ref={mergeRefs(ref, uploadDocControlRef)}
        name={name}
        label={label}
        labelIndicator={labelIndicator}
        error={error}
        invalid={invalid}
      >
        {infoText && (
          <Typography variant='caption' className='info-text'>
            {infoText}
          </Typography>
        )}
        {selectedFile && selectedName ? (
          <div css={uploadedBoxCx(invalid)}>
            <RemoveIcon
              onClick={handleOnFileRemove}
              className='remove-button'
            />
            <DocumentIcon className='margin-right-10' fill='#006790' />
            <Typography variant='caption'>{selectedName}</Typography>
          </div>
        ) : (
          <div css={uploadBoxCx(invalid)}>
            <input
              type='file'
              accept={acceptedExtensions}
              onChange={handleOnFileChange}
            />
            <DocumentIcon
              width={25}
              height={25}
              className='margin-bottom-10s'
              fill='#006790'
            />

            <Typography variant='caption'>Upload Dokumen</Typography>
          </div>
        )}
      </FieldGroup>
    </div>
  );
});

export default UploadDoc;
