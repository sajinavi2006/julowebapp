import 'yup';

declare module 'yup' {
  interface StringSchema<T extends string | null | undefined = string> {
    phoneFormat(message: string): StringSchema<T>;
    emailFormat(message: string): StringSchema<T>;
    currencyValidator(message: string): StringSchema<T>;
    noMoreThan20mil(message: string): StringSchema<T>;
    noMoreThan2bil(message: string): StringSchema<T>;
    nikValidator(message: string): StringSchema<T>;
    englishCharacters(message: string): StringSchema<T>;
    doubleSpace(message: string): StringSchema<T>;
  }
}
