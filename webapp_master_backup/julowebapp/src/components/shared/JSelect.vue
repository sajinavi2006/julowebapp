<script>
import { VSelect } from "vuetify";
import navlog from "../../helper/navlog";
export default {
  ...VSelect,
  render(createElement, context) {
    context.data.on.focus = function() {
      let label = navlog.getConstantByKey(context.data.attrs["id"]);
      const action = `List : "${label}" clicked`;
      const obj = navlog.mappingObj(context.parent.$route.name, action);
      navlog.save(obj);
    };
    return VSelect.render(createElement, context);
  }
};
</script>
