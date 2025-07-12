import * as validation from "./validation";

export const convertToFormData = data => {
  const form = new FormData();
  for (const key in data) {
    form.append(key, data[key]);
  }
  return form;
};

export const camelCaseToTitle = camelCase => {
  if (!camelCase) {
    return "";
  }
  var pascalCase = camelCase.charAt(0).toUpperCase() + camelCase.substr(1);
  return pascalCase
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1 $2")
    .replace(/([a-z])([0-9])/gi, "$1 $2")
    .replace(/([0-9])([a-z])/gi, "$1 $2");
};

export const validations = validation;
