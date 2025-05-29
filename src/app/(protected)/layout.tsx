'use client';
import React, { useEffect } from 'react';
import { useUserStore } from '@/store/userStore';
import { useRedirectStore } from '@/store/redirectStore';
import { useRouter, usePathname } from 'next/navigation';
import { getUserProfile } from '@/lib/api';

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const setRedirectPath = useRedirectStore((state) => state.setRedirectPath);
  const token = typeof window !== 'undefined' ? localStorage.getItem('IFA_AuthToken') : null;

  useEffect(() => {
    if (!token) {
      setRedirectPath(pathname);
      router.replace('/sign-in');
      return;
    }

    if (token && !user) {
      const fetchUser = async () => {
        const response = await getUserProfile(token);
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          localStorage.removeItem('IFA_AuthToken');
          setRedirectPath(pathname);
          router.replace('/sign-in');
        }
      };
      fetchUser();
    }
  }, [token, user, setUser, setRedirectPath, router, pathname]);

  if (!token) {
    return null;
  }

  return <>{children}</>;
}
