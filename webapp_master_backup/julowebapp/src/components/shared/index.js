/* import Vue from 'vue'

//import Profile from './Profile.vue'
import SetVal from './SetVal.vue'
//import SideBar from './SideBar.vue'
import SuperSetVal from './SuperSetVal.vue'

export {
  //Profile,
  SetVal,
  //SideBar,
  SuperSetVal
} */

// Globally register all base components for convenience, because they
// will be used very frequently. Components are registered using the
// PascalCased version of their file name.

import Vue from "vue";
import upperFirst from "lodash/upperFirst";
import camelCase from "lodash/camelCase";
import OtpInput from "@bachdgvn/vue-otp-input";
// https://webpack.js.org/guides/dependency-management/#require-context
const requireComponent = require.context(
  // Look for files in the current directory
  ".",
  // Do not look in subdirectories
  false,
  // Only include "_base-" prefixed .vue files
  /[\w-]+\.vue$/
);

// For each matching file name...
requireComponent.keys().forEach(fileName => {
  // Get the component config
  const componentConfig = requireComponent(fileName);
  // Get the PascalCase version of the component name
  const componentName = upperFirst(
    camelCase(
      fileName
        // Remove the "./_" from the beginning
        .replace(/^\.\/_/, "")
        // Remove the file extension from the end
        .replace(/\.\w+$/, "")
    )
  );
  // Globally register the component
  Vue.component(componentName, componentConfig.default || componentConfig);
});
  Vue.component("v-otp-input", OtpInput);
