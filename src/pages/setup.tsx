import { useUserStore } from "~/stores";
import { premiumize } from "~/lib/premiumize";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

function useHash() {
  const [hash, setHash] = useState("");
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    setHash(hash);
  }, []);
  return hash;
}

export default function Setup() {
  const [authInfo] = useState<
    ReturnType<ReturnType<typeof premiumize>["authorize"]["authInfo"]>
  >(premiumize("").authorize.authInfo());
  const { setUserAuth } = useUserStore();
  const router = useRouter();

  const hash = useHash();
  useEffect(() => {
    if (hash.length > 0) {
      // hash to json
      const conv = Object.fromEntries(new URLSearchParams(hash));
      const auth = {
        token: conv.access_token,
        expires: conv.expires_in,
        type: conv.token_type, // Bearer
      };
      if (!auth.token || !auth.expires) {
        throw new Error("invalid auth");
      }

      setUserAuth(auth.token, +auth.expires);
      router.push("/app").catch(console.error);
    }
  }, [hash, setUserAuth, router]);
  if (!router.isReady) {
    return <>Loading...</>;
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <Head>
        <title>Premiumize - Setup</title>
      </Head>
      <div className="flex flex-col items-center justify-center">
        <Link href={authInfo.url}>
          <div className="w-full rounded-md border border-slate-900 bg-slate-900 px-6 py-2 text-center text-xl font-semibold text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
            Login via Premiumize -&gt;
          </div>
        </Link>
      </div>
    </div>
  );
}
