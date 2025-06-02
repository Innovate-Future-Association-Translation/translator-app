'use client';

import { createContext, useState, useContext, ReactNode } from 'react';

interface Meeting {
  roomId: string;
  meetingURL: string;
}

interface MeetingContextType {
  meeting: Meeting | undefined;
  setMeeting: (meeting: Meeting) => void;
}

const MeetingContext = createContext<MeetingContextType | undefined>(undefined);

export function MeetingProvider({ children }: { children: ReactNode }) {
  const [meeting, setMeeting] = useState<Meeting>();

  return (
    <MeetingContext.Provider value={{ meeting, setMeeting }}>{children}</MeetingContext.Provider>
  );
}

export function useMeetingContext() {
  const context = useContext(MeetingContext);
  if (!context) {
    throw new Error('useMeetingContext must be used within a MeetingProvider');
  }
  return context;
}
