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
export default { BASE_URL, ANA_BASE_URL };
