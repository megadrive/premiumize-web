import { useUserStore } from "~/stores";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { premiumize } from "~/lib/premiumize";
import Head from "next/head";
import type { Account_Info } from "~/lib/premiumize.types";
import { useState } from "react";

const formSchema = z.object({
  apikey: z.string().min(1),
});
type FormData = z.infer<typeof formSchema>;

export default function Setup() {
  const { apikey, setApiKey } = useUserStore();
  const { handleSubmit, register, formState } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });
  const [account, setAccount] = useState<string>();

  const onSubmit = async (data: FormData) => {
    try {
      const info = await premiumize(data.apikey).account.info();
      if (info.status !== "success") {
        alert("Error occurred! Double-check your API key.");
        throw new Error("Potentially invalid API Key.");
      }

      setAccount(info.customer_id);
      setApiKey(data.apikey);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <Head>
        <title>Premiumize - Setup</title>
      </Head>
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold">Setup</h2>
        <h3>
          Enter your API key below.{" "}
          <a href="https://www.premiumize.me/account">Find it here.</a>
        </h3>
        <h3>{account}</h3>
        <div className="flex flex-row gap-1">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <input
                type="password"
                placeholder="API Key"
                {...register("apikey")}
                className="border-slate w-full rounded border px-4 py-2 text-2xl"
              />
              <div className="text-red-500">
                {formState.errors.apikey?.message}
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="hover:bg w-full rounded border border-zinc-700 bg-zinc-700 px-2 py-1 text-lg text-white"
              >
                {formState ? "Update" : "Create"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
