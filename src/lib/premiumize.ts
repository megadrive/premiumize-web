import type { Account_Info } from "./premiumize.types";

async function apiCall<T>(apikey: string, path: string, options?: RequestInit) {
  const url = "https://www.premiumize.com/api";

  const finalUrl = `${url}/${path}${path.includes("?") ? "&" : "?"}apikey=${apikey}`;

  const res = await fetch(finalUrl, options);

  return res.json() as T;
}

/** Premiumize API */
export function premiumize(apikey: string) {
  return {
    account: {
      info: () => apiCall<Account_Info>(apikey, "account/info"),
    },
  };
}
