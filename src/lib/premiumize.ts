export function premiumize() {
  const url = "https://www.premiumize.com/api";

  return function (apikey: string) {
    return function (path: string) {
      const finalUrl = `${url}/${path}${path.includes("?") ? "&" : "?"}apikey=${apikey}`;

      return fetch(finalUrl).then((res) => res.json());
    };
  };
}
