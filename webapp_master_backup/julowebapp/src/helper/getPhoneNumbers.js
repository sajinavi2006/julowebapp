import { execFile } from "child_process";

export default (exclude, data = {}) => {
  let numbers = Object.values(data);
  let keys = [
"hpnum",
"hpnum2",
"spouseNo",
"parentsNo",
"kinNo"
];

  keys = keys.filter(x => x !== exclude && !Object.keys(data).includes(x));
  for (let i = 1; i <= 4; i++) {
    let formLocalStorage = localStorage.getItem(`form${i}`);
    if (formLocalStorage) {
      let formData = JSON.parse(formLocalStorage);
      for (let j in keys) {
        if (formData[keys[j]]) {
          numbers.push(formData[keys[j]]);
        }
      }
    }
  }
  return numbers;
};
