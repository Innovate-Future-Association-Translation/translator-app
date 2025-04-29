export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getUserProfile(token: string) {
  const response = await fetch(`${API_BASE_URL}/users/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
}

export async function createInstantMeeting(userId: string) {
  const response = await fetch(`${API_BASE_URL}/meetings/createNewRoom`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ creatorId: userId }),
  });

  const data = await response.json();
  return data;
}

export async function getMeetingParticipantInfo(roomId: string) {
  const response = await fetch(`${API_BASE_URL}/meetings/info`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ roomId: roomId }),
  });

  const data = await response.json();
  return data.participants;
}
