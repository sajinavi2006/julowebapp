import Vue from "vue";
import getConstantByKey from "./navlog/getConstantByKey";
import saveTxtNavlog from "./saveTextInputNavlog";

export default ($event, page) => {
  //accepted
  const number = /^[0-9]+$/;
  if (!$event.key.match(number)) {
    $event.preventDefault();
    return false;
  }
  Vue.nextTick(function() {
    const label = getConstantByKey($event.target.getAttribute("id"));
    saveTxtNavlog(label, $event.target.value, page);
  });
  // setTimeout(() => {
  //   saveTxtNavlog(
  //     $event.target.getAttribute("data-vv-name"),
  //     $event.target.value,
  //     page
  //   );
  // });

  return true;
};
