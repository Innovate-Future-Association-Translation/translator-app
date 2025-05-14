'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ErrorContextType {
  errorMessage: string | null;
  setErrorMessage: (message: string | null) => void;
}

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export const ErrorProvider = ({ children }: { children: ReactNode }) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  return (
    <ErrorContext.Provider value={{ errorMessage, setErrorMessage }}>
      {children}
    </ErrorContext.Provider>
  );
};

export const useErrorContext = (): ErrorContextType => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error('useErrorContext must be used within a ErrorProvider');
  }
  return context;
};
