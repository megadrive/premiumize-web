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
  token: string;
  expires_in: number;
  is_expired: () => boolean;
  setUserAuth: (token: string, expires_in: number) => void;
};

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      is_expired() {
        return (
          Date.now() > new Date(Date.now() + get().expires_in * 1000).getTime()
        );
      },
      token: "",
      expires_in: 0,
      setUserAuth: (token: string, expires_in: number) =>
        set((state) => ({ ...state, token, expires_in })),
    }),
    {
      name: "user-store",
    },
  ),
);
