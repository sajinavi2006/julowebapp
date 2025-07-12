import Vue from "vue";
import saveTxtNavlog from "../saveTextInputNavlog";
import getConstantByKey from "./getConstantByKey";

export default ($event, page) => {
  Vue.nextTick(function() {
    const label = getConstantByKey($event.target.getAttribute("id"));
    saveTxtNavlog(label, $event.target.value, page);
  });
  return true;
};
