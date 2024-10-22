import { Layout } from "./layout";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  if (!router.isReady) {
    return <>Loading...</>;
  }

  router.push("/setup").catch((err) => {
    console.error(err);
  });

  return (
    <Layout>
      <small>Figuring out where to go...</small>
    </Layout>
  );
}
