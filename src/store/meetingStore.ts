import { create } from 'zustand';

interface Meeting {
  roomId: string;
  meetingURL: string;
}

export interface MeetingState {
  meeting: Meeting | undefined;
  setMeeting: (meeting: Meeting | undefined) => void;
}

export const useMeetingStore = create<MeetingState>((set) => ({
  meeting: undefined,
  setMeeting: (meeting) => set({ meeting }),
}));
