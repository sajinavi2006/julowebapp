import { login } from "../enums/url";

export default {
  auth: {
    request: function(req, token) {
      req.headers["Authorization"] = `JWT ${token}`;
    },
    response: function(res) {
      if (res.data.data) {
        if (res.data.data.access_token) {
          return res.data.data.access_token;
        }
      }
    }
  },
  http: require("@websanova/vue-auth/drivers/http/axios.1.x.js"),
  router: require("@websanova/vue-auth/drivers/router/vue-router.2.x.js"),
  loginData: { url: login, fetchUser: false },
  refreshData: { enabled: false },
  authRedirect: { path: "/" },
  forbiddenRedirect: { path: "/" },
  rolesVar: "role",
  fetchData: { enabled: false }
};
