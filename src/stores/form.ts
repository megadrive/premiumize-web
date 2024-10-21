import { create } from "zustand";

type Page = "error" | "loading" | "setup";
type AppState = {
  page: Page;
  setPage: (page: Page) => void;
};

export const useAppState = create<AppState>((set) => ({
  page: "loading",
  setPage: (page: Page) => set((state) => ({ ...state, page })),
}));
