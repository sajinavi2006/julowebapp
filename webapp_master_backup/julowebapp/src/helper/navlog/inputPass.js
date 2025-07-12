import saveTxtNavlog from "../saveTextInputNavlog";
import getConstantByKey from "./getConstantByKey";

export default ($event, page) => {
  const label = getConstantByKey($event.target.getAttribute("id"));
  saveTxtNavlog(label, "*".repeat($event.target.value.length + 1), page);
  return true;
};
