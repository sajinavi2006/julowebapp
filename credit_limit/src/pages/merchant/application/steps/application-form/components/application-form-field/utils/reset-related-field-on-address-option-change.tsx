import { FieldValues, UseFormSetValue } from 'react-hook-form';

/*
 * Reset the field value by the fields parameter
 * In this case's to handle when the address changed
 */
function resetRelatedFieldOnAddressOptionChange(
  fields: string[],
  setValue: UseFormSetValue<FieldValues>,
) {
  fields.forEach((name) => {
    setValue(name, '');
  });
}

export default resetRelatedFieldOnAddressOptionChange;
