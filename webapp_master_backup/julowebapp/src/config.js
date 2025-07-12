let BASE_URL = "https://api-dev.julofinance.com";
if (process.env.NODE_ENV === "prod") {
  BASE_URL = "https://api.julofinance.com";
} else if (process.env.NODE_ENV === "staging") {
  BASE_URL = "https://api-staging.julofinance.com";
} else if (process.env.NODE_ENV === "uat") {
  BASE_URL = "https://api-uat.julofinance.com";
}

let ANA_BASE_URL = "https://ana-dev.julofinance.com";
if (process.env.NODE_ENV === "prod") {
  ANA_BASE_URL = "https://ana-prod.julofinance.com";
} else if (process.env.NODE_ENV === "staging") {
  ANA_BASE_URL = "https://ana-staging.julofinance.com";
} else if (process.env.NODE_ENV === "uat") {
  ANA_BASE_URL = "https://ana-uat.julofinance.com";
}

let GOOGLE_CLIENT_ID =
  //"895680187609-go7pn1lknuo1h9i4i563eq18hlk0kkp2.apps.googleusercontent.com";
  "895680187609-m65krlgiskr46tst8e3hjfkcj4dvl6ua.apps.googleusercontent.com";
if (process.env.NODE_ENV === "prod") {
  GOOGLE_CLIENT_ID =
    "241517909084-4mrdgtb4knen35hutivmflldlrv4feng.apps.googleusercontent.com";
} else if (process.env.NODE_ENV === "staging") {
  GOOGLE_CLIENT_ID =
    "895680187609-18ddhdn42tt0uk95euc2qpb3r7ciri7l.apps.googleusercontent.com";
} else if (process.env.NODE_ENV === "uat") {
  GOOGLE_CLIENT_ID =
    "895680187609-18ddhdn42tt0uk95euc2qpb3r7ciri7l.apps.googleusercontent.com";
}

export default { BASE_URL, ANA_BASE_URL, GOOGLE_CLIENT_ID };
