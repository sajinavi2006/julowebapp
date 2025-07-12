import { useEffect } from 'react';

import { useFormContext } from 'hooks/react-hook-form';

import { useRGetProfile } from 'repositories/merchant/auth';

function useHandleAutofillFields() {
  const { data, isSuccess } = useRGetProfile();
  const { setValue } = useFormContext();

  useEffect(() => {
    if (!data) return;

    setValue('nik', data.data.nik);
    setValue('emailDirector', data.data.email);
  }, [isSuccess]);
}

export default useHandleAutofillFields;
