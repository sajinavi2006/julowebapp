<script>
import { VBtn } from "vuetify";
import navlog from "../../helper/navlog";
export default {
  name: "j-btn",
  extends: VBtn,
  methods: {
    genContent() {
      return this.$createElement(
        "div",
        {
          class: "v-btn__content",
          on: {
            click: e => {
              // console.log(this.$slots);
              // console.log(this.$children[0].$slots.default[0].text);

              let label = this.$slots.default[0].text;

              if (!label) {
                if (this.$slots.default[0].children) {
                  label = this.$slots.default[0].children[0].text;
                } else {
                  const iconText = this.$slots.default[0].componentOptions
                    .children[0].text;
                  if (iconText === "arrow_back") {
                    label = "backbutton";
                  } else if (iconText == "more_horiz") {
                    label = "menu";
                  } else if (iconText == "close") {
                    label = "closebutton";
                  } else {
                    label = iconText;
                  }
                }
              }

              const action = `Button : "${label}" clicked`;
              const obj = navlog.mappingObj(this.$route.name, action, "");
              navlog.save(obj);
            }
          }
        },
        [this.$slots.default]
      );
    }
  }
};
</script>
