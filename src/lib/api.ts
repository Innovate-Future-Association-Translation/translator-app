export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getUserProfile(token: string) {
  const response = await fetch(`${API_BASE_URL}/users/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
}
