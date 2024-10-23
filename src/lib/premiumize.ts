import { env } from "~/env";
import type {
  Account_Info,
  Authorize_Preflight,
  Authorize_Token,
} from "./premiumize.types";

async function apiCall<T>(apikey: string, path: string, options?: RequestInit) {
  const url = "https://www.premiumize.me/api";
  let finalUrl = `${url}/${path}`;
  if (apikey.length > 0) {
    finalUrl += `${path.includes("?") ? "&" : "?"}apikey=${apikey}`;
  }
  console.info(`Fetching [${options?.method ?? "GET"}] ${finalUrl}`);
  const res = await fetch(finalUrl, options);
  return res.json() as T;
}

/** Premiumize API */
export function premiumize(apikey: string) {
  return {
    authorize: {
      authInfo: () => {
        // generate alphanumeric string, max length 16
        const state = Math.random().toString(36).substring(2, 16).toUpperCase();
        return {
          url: `https://www.premiumize.me/authorize?response_type=token&client_id=${env.NEXT_PUBLIC_PREMIUMIZE_CLIENT_ID}&redirect_uri=${env.NEXT_PUBLIC_PREMIUMIZE_REDIRECT_URL}&scope=full&state=${state}`,
          state,
        };
      },
    },
    account: {
      info: () => apiCall<Account_Info>(apikey, "account/info"),
    },
  };
}
