const API_BASE_URL = 'http://translator-alb-1789479950.ap-southeast-2.elb.amazonaws.com/api/v1';

export async function getUserProfile(token: string) {
  const response = await fetch(`${API_BASE_URL}/users/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
}
