import * as Sentry from "@sentry/browser";
import Raven from "raven-js";
//import { Raven } from 'vue-raven';
//Raven.config('https://4b74ba2a5d7f4f4287f3dff08b98ab7b@sentry.io/1419595').install();
export default (err, additional) => {
  let message = err.message;
  console.log(err.status);
  if (err.response) {
    if (err.response.status == 500) {
      message = "Terjadi Kesalahan. Segera hubungi costumer service";
    } else if (err.response.data) {
      const {data} = err.response;
      // Sentry.configureScope(scope => {
      // 	scope.setUser(data);
      // });

      Sentry.configureScope(scope => {
        scope.setTag("application_id", localStorage.appId);
        scope.setTag("costumer_id", localStorage.custId);
        scope.setExtra("response", JSON.stringify(data));
      });
      if (err.response.data.errors) {
        message = err.response.data.errors.join(", ");
      } else if (err.response.data.error) {
        message = err.response.data.error;
      } else if (err.response.data.error_message) {
        message = err.response.data.error_message;
      } else {
        let messages = [];
        for (let x in err.response.data) {
          messages = messages.concat(err.response.data[x]);
        }
        message = messages.join(", ");
      }
    }
  }
  console.log(err);
  if (additional) {
    Sentry.configureScope(scope => {
      scope.setExtra("additional", JSON.stringify(additional));
    });
  }

  Sentry.captureException(err);
  return message;
};
