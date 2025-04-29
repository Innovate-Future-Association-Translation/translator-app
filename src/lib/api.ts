const API_BASE_URL = 'http://localhost:8000/api/v1';

export async function getUserProfile(token: string) {
  const response = await fetch(`${API_BASE_URL}/users/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
}
