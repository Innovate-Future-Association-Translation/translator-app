import { create } from 'zustand';

interface Meeting {
  roomId: string;
  meetingURL: string;
}

export interface MeetingState {
  meeting: Meeting | undefined;
  setMeeting: (meeting: Meeting | undefined) => void;
  meetingParticipants: number;
  setMeetingParticipants: (meetingParticipants: number) => void;
}

export const useMeetingStore = create<MeetingState>((set) => ({
  meeting: undefined,
  meetingParticipants: 0,
  setMeeting: (meeting) => set({ meeting }),
  setMeetingParticipants: (meetingParticipants) => set({ meetingParticipants }),
}));
