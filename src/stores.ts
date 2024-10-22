import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// --- App Store

type Page = "error" | "loading" | "setup" | "app";
type AppState = {
  page: Page;
  setPage: (page: Page) => void;
};

export const useAppState = create<AppState>((set) => ({
  page: "loading",
  setPage: (page: Page) => set((state) => ({ ...state, page })),
}));

// --- User Store

type UserState = {
  apikey: string;
  setApiKey: (apikey: string) => void;
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      apikey: "",
      setApiKey: (apikey: string) => set((state) => ({ ...state, apikey })),
    }),
    {
      name: "user-store",
    },
  ),
);
