'use client';
import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { authErrorMessages } from '../../../lib/authErrorMessage';
import { getUserProfile } from '@/lib/api';
import { useErrorStore } from '@/store/errorStore';
import { useRedirectStore } from '@/store/redirectStore';

export default function AuthCallBack() {
  const router = useRouter();
  const redirectPath = useRedirectStore((state) => state.redirectPath);
  const clearRedirectPath = useRedirectStore((state) => state.clearRedirectPath);
  const setErrorMessage = useErrorStore((state) => state.setErrorMessage);
  const [failAuth, setFailAuth] = useState<boolean>(false);

  useEffect(() => {
    if (failAuth) {
      router.push(`/auth-error-page`);
    }
  }, [failAuth, router]);

  const validateToken = useCallback(
    async (token: string) => {
      try {
        const response = await getUserProfile(token);
        if (!response.ok) throw new Error(authErrorMessages.INVALID_AUTH_TOKEN);
        localStorage.setItem('IFA_AuthToken', token);

        if (redirectPath) {
          clearRedirectPath();
          router.replace(redirectPath);
        } else {
          router.replace('/dashboard');
        }
      } catch (err) {
        setErrorMessage(authErrorMessages.INVALID_AUTH_TOKEN);
        localStorage.removeItem('IFA_AuthToken');
        setFailAuth(true);
        throw err;
      }
    },
    [router, setErrorMessage, clearRedirectPath, redirectPath]
  );

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromURL = urlParams.get('token');
    const authError = urlParams.get('authError') === 'true';
    if (authError) {
      setErrorMessage(authErrorMessages.INVALID_THIRD_PARTY_AUTHENTICATION);
      setFailAuth(true);
      return;
    }
    if (tokenFromURL) {
      validateToken(tokenFromURL);
    } else {
      const tokenFromLocalStorage = localStorage.getItem('IFA_AuthToken');
      if (tokenFromLocalStorage) {
        validateToken(tokenFromLocalStorage);
      } else {
        setErrorMessage(authErrorMessages.INVALID_AUTH_TOKEN);
        setFailAuth(true);
      }
    }
  }, [router, setErrorMessage, validateToken]);
}
