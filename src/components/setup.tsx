import { useUserStore } from "~/stores/user";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const formSchema = z.object({
  apikey: z.string().min(1),
});
type FormData = z.infer<typeof formSchema>;

export default function Setup() {
  const { apikey, setApiKey } = useUserStore();
  const { handleSubmit, register, formState } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormData) => {
    setApiKey(data.apikey);
    alert("Set API Key");
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold">Setup</h2>
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
