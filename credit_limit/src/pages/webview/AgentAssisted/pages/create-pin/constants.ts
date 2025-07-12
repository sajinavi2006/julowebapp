import * as yup from 'yup';

import { ConfirmPin, NewPin } from './steps';
import { CreatePinParam } from './types';

export const PIN_LENGTH = 6;

export const createPinSteps = [NewPin, ConfirmPin];

export const scheme: Record<keyof CreatePinParam, unknown> = {
  pin: yup.string(),
  confirmPin: yup.string().test(function (value) {
    const { pin } = this.parent;

    if (pin !== PIN_LENGTH && !value) return true;

    return (
      pin === value ||
      value?.length !== PIN_LENGTH ||
      this.createError({
        path: this.path,
        message: 'PIN yang kamu masukkan tidak sesuai',
      })
    );
  }),
};

export const createPinScheme = yup.object<CreatePinParam>(scheme);
