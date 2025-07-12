import * as yup from 'yup';

import utils from 'utils';

yup.addMethod(yup.string, 'phoneFormat', function (errorMessage) {
  return this.test(`test-phone-format`, errorMessage, function (value) {
    const { path, createError } = this;
    const isValid = value ? utils.validator.phoneValidator(value) : true;
    return isValid || createError({ path, message: errorMessage });
  });
});

yup.addMethod(yup.string, 'emailFormat', function (errorMessage) {
  return this.test(`test-email-format`, errorMessage, function (value) {
    const { path, createError } = this;
    const isValid = value ? utils.validator.emailValidator(value) : true;
    return isValid || createError({ path, message: errorMessage });
  });
});

yup.addMethod(yup.string, 'nikValidator', function (errorMessage) {
  return this.test(`test-nik`, errorMessage, function (value) {
    const { path, createError } = this;
    const isValid = value ? utils.validator.nikValidator(value) : true;
    return isValid || createError({ path, message: errorMessage });
  });
});

yup.addMethod(yup.string, 'currencyValidator', function (errorMessage) {
  return this.test(`test-no-zero`, errorMessage, function (value) {
    const { path, createError } = this;

    const isValid = value ? utils.validator.currencyValidator(value) : true;
    return isValid || createError({ path, message: errorMessage });
  });
});

yup.addMethod(yup.string, 'noMoreThan20mil', function (errorMessage) {
  return this.test(`test-more-than-20-mil`, errorMessage, function (value = '0') {
    const { path, createError } = this;
    let isValid = true;
    const covertedValue = parseInt(value);
    if (covertedValue > 20000000) {
      isValid = false;
    }
    return isValid || createError({ path, message: errorMessage });
  });
});

yup.addMethod(yup.string, 'noMoreThan2bil', function (errorMessage) {
  return this.test(`test-more-than-2-bil`, errorMessage, function (value = '0') {
    const { path, createError } = this;
    let isValid = true;
    const covertedValue = parseInt(value);
    if (covertedValue > 2000000000) {
      isValid = false;
    }
    return isValid || createError({ path, message: errorMessage });
  });
});

yup.addMethod(yup.string, 'englishCharacters', function (errorMessage) {
  return this.test(`test-english-char`, errorMessage, function (value) {
    const { path, createError } = this;
    const isValid = value ? utils.validator.englishOnlyValidator(value) : true;
    return isValid || createError({ path, message: errorMessage });
  });
});

yup.addMethod(yup.string, 'doubleSpace', function (errorMessage) {
  return this.test(`test-double-space`, errorMessage, function (value) {
    const { path, createError } = this;
    const isValid = value ? !utils.validator.doubleSpaceValidator(value) : true;
    return isValid || createError({ path, message: errorMessage });
  });
});
