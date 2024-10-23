import { useUserStore } from "~/stores";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const { token } = useUserStore();

  if (!router.isReady) {
    return <>Loading...</>;
  }

  if (!token || token.length === 0) {
    router.push("/setup").catch((err) => {
      console.error(err);
    });
  } else {
    router.push("/app").catch((err) => {
      console.error(err);
    });
  }

  return <small>Figuring out where to go...</small>;
}
