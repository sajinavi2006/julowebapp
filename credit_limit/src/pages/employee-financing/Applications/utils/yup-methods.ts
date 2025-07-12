import { TestContext } from 'yup';
import { AnyObject } from 'yup/lib/types';

export function validatePhoneWithPersonalIdentityEF(
  this: TestContext<AnyObject>,
  value: string,
) {
  const { path, createError } = this;
  let isValid = true;
  let message = '';
  const phoneNumber = this.options.context?.phone_number;
  if (phoneNumber === value) {
    isValid = false;
    message = 'Nomor HP harus berbeda dengan nomor HP utama';
  }

  return isValid || createError({ path, message });
}

export function phoneFamilyInformationEF(
  this: TestContext<AnyObject>,
  _: string,
) {
  const { path, createError } = this;
  let isValid = true;
  const motherPhoneNumber = this.parent.mother_phone_number;
  const couplePhoneNumber = this.parent.couple_phone_number;

  if (motherPhoneNumber === couplePhoneNumber) {
    isValid = false;
  }

  return isValid || createError({ path, message: 'Nomor HP harus berbeda' });
}
