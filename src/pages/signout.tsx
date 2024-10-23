import { useRouter } from "next/router";
import { useUserStore } from "~/stores";

export default function SignOut() {
  const router = useRouter();
  const { setUserAuth } = useUserStore();

  if (!router.isReady) {
    return <>Signing out</>;
  }

  setUserAuth("", 0);
  router.push("/").catch(console.error);
}
