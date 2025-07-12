const option = {
  nikBirthDayMonth:
    /^(([1-2][0-9])|([5-6][0-9])|([3][0-1])|([4][1-9])|([7][0-1])|([0][1-9]))(0[1-9]|1[0-2])$/,
  nikFamilyPosition: /^([0-9][0-9][0-9][0-9])/,
  nikLength: /^[0-9]{16}$/,
  nikComplete:
    /^(1[1-9]|21|[37][1-6]|5[1-3]|6[1-5]|[89][12])\d{2}\d{2}([04][1-9]|[1256][0-9]|[37][01])(0[1-9]|1[0-2])\d{2}\d{4}$/,
  email:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  pin: /^[0-9]{6}$/,
  name: /^([a-zA-Z0-9-,''"":~!#*&()@|; ]{5,})$/,
  phone: /^08[0-9]{8,13}$/,
  num: /^[0-9]{5}$/,
  housePhone: /^(0)([2-7]|9)\d(\d)?[2-9](\d){6,10}$/,
  doubleSpace: /^.*\s{2,}.*$/,
  alphaAndNumberOnly: /^[a-zA-Z0-9]*$/,
  englishCharacters:
    /^(?!\d+$)(?:[a-zA-Z0-9][a-zA-Z0-9 ~`!@#$%^&*()\-\_+=[\]{}|\/\\;':",.<>?]*)?$/,
  leadingZero: /^(0|[1-9][0-9]*)$/,
  currency: /^(?!0\d)(\d{1,3}(.\d{3})*|\d+)(\,\d{2})?$/,
  gmail: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
  juloEmail: /^[a-zA-Z0-9._%+-]+@julofinance\.com$/,
};

const validator = {
  loginValidator: (value) => {
    return (
      (option.nikBirthDayMonth.test(value.substring(6, 10)) &&
        option.nikFamilyPosition.test(value.substring(12, 16)) &&
        option.nikLength.test(value)) ||
      option.email.test(value)
    );
  },
  signUpValidator: (value) => {
    return (
      option.nikBirthDayMonth.test(value.substring(6, 10)) &&
      option.nikFamilyPosition.test(value.substring(12, 16)) &&
      option.nikLength.test(value)
    );
  },
  emailValidator: (value) => {
    return option.email.test(value);
  },
  gmailValidator: (value) => {
    return option.gmail.test(value);
  },
  juloEmailValidator: (value) => {
    return option.juloEmail.test(value);
  },
  pinValidator: (value) => {
    return option.pin.test(value);
  },
  nameValidator: (value) => {
    return option.name.test(value);
  },
  phoneValidator: (value) => {
    return option.phone.test(value);
  },
  housePhoneValidator: (value) => option.housePhone.test(value),
  numberValidator: (value) => {
    return option.num.test(value);
  },
  phoneEmailValidator: (value) => {
    return option.email.test(value);
  },
  doubleSpaceValidator: (value) => option.doubleSpace.test(value),
  alphaAndNumberOnlyValidator: (value) => option.alphaAndNumberOnly.test(value),
  leadingZeroValidator: (value) => option.leadingZero.test(value),
  englishOnlyValidator: (value) => option.englishCharacters.test(value),
  currencyValidator: (value) => option.currency.test(value),
  nikValidator: (value) => {
    // this logic based on BE logic
    const birth_day = Number.parseInt(value.slice(6, 8));
    if (value.length !== 16) {
      return false;
    }

    if (
      !(1 <= Number.parseInt(value.slice(0, 2))) ||
      !(1 <= Number.parseInt(value.slice(2, 4))) ||
      !(1 <= Number.parseInt(value.slice(4, 6)))
    ) {
      return false;
    }

    if (
      !(
        (1 <= birth_day && birth_day <= 31) ||
        (41 <= birth_day && birth_day <= 71)
      )
    ) {
      return false;
    }

    if (
      !(
        1 <= Number.parseInt(value.slice(8, 10)) &&
        Number.parseInt(value.slice(8, 10)) <= 12
      )
    ) {
      return false;
    }

    if (!(1 <= Number.parseInt(value.slice(12)))) {
      return false;
    }

    return true;
  },
};

export default validator;
