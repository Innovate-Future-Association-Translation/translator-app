import axios from 'axios';

const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    timeout: 10000,
});

export type ErrorType = 'expired' | 'invalid' | 'server' | null;

export const tokenVerification = async(token: String) => {

  return await apiClient.get(`/users/verify-email?token=${token}`);
}

export const handleRetry = async(email: String) => {
    try {
      if (!email) throw new Error('Email not found');

      await apiClient.post('/users/resend-verification', { email });
      alert('New verification email sent! Check your inbox.');
    } catch (error) {
      console.log(error);
      alert('Failed to resend verification email. Please try signing up again.');
    }
};

export function getErrorMessage(errorType: ErrorType) {
    if (errorType === 'server') return 'Server error. Please try again later.';
    if (errorType === 'expired') return 'Verification link has expired';
    if (errorType === 'invalid') return 'Invalid verification link';
    return 'Email verification failed. You can try again.';
};