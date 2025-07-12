//import getLabel from './getLabelByKey';
import getLabel from "./getConstantByKey";
export default (key, val) => {
  const radioKey = ["sex", "isPersonalPhone"];
  const spinnerKey = [
    //'birthPlace',
    "language",
    "province",
    "regency",
    "village",
    "subdistrict",
    "domicileStatus",
    "civilStatus",
    "dependencyNum",
    ///
    "relation",
    ///
    "jobField",
    "job",
    "payrollDate",
    "lastEducation",
    "majors",
    ///
    "ownership",
    "loanPurposeCategory",
    ///
    "model",
    "year",

    ///
    //'birthPlaceSearch',
    "companiesSearch",
    "collegeSearch",
    "bankSearch",
    "majorsHead"
  ];
  const dateKey = ["dob", "occupiedSince", "dobSpouse", "startWorkingDate"];
  const label = getLabel(key);
  if (radioKey.indexOf(key) != -1) {
    if (key == "sex") {
      return `RadioButton: "${label}: ${
        val == 1 ? "Pria" : "Wanita"
      }", clicked: Checked`;
    } else {
      return `RadioButton: "${label}: ${val}", clicked: Checked`;
    }
  } else if (spinnerKey.indexOf(key) != -1) {
    return `List : "${label}", clicked item: ${val}`;
  } else if (dateKey.indexOf(key) != -1) {
    return `"${label}", date picked: ${val}`;
  } else {
    return `Typed in: "${label}", typed text: ${val}`;
  }
};
