import { create } from 'zustand';

interface ErrorState {
  errorMessage: string | null;
  setErrorMessage: (message: string | null) => void;
}

export const useErrorStore = create<ErrorState>((set) => ({
  errorMessage: null,
  setErrorMessage: (message) => set({ errorMessage: message }),
}));
