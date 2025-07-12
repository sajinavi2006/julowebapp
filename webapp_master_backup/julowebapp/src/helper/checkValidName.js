import Vue from "vue";
import saveTxtNavlog from "./saveTextInputNavlog";
import getConstantByKey from "./navlog/getConstantByKey";

export default ($event, page) => {
  //accepted
  const alpha = /^[A-Za-z]+$/;
  if (
    !(
      $event.key.match(alpha) ||
      $event.code === "Space" ||
      $event.keyCode === 39
    )
  ) {
    $event.preventDefault();
    return false;
  }
  Vue.nextTick(function() {
    const label = getConstantByKey($event.target.getAttribute("id"));
    saveTxtNavlog(label, $event.target.value, page);
  });
  //setTimeout(() => {});
  return true;
};
