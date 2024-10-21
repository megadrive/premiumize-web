import { create } from "zustand";

type UserState = {
  apikey: string;
  setApiKey: (apikey: string) => void;
};

export const useUserStore = create<UserState>((set) => ({
  apikey: "",
  setApiKey: (apikey: string) => set((state) => ({ ...state, apikey })),
}));
