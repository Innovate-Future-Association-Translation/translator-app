import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface RedirectState {
  redirectPath: string | null;
  setRedirectPath: (path: string | null) => void;
  clearRedirectPath: () => void;
}

export const useRedirectStore = create<RedirectState>()(
  persist(
    (set) => ({
      redirectPath: null,
      setRedirectPath: (path) => {
        set({ redirectPath: path });
      },
      clearRedirectPath: () => {
        set({ redirectPath: null });
      },
    }),
    {
      name: 'IFA_RedirectPath',
    }
  )
);
