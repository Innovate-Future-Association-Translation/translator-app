import { create } from 'zustand';

interface User {
  name: string;
  email: string;
  language: string;
  mobile: string;
  selfDescription: string;
  id: string;
}

export interface UserState {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
