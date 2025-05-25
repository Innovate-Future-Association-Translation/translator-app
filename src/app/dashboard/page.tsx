'use client';
import React from 'react';
import { Box } from '@chakra-ui/react';
import DesktopHomePage from '@/app/module/dashboard/home/desktopHomePage';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/userContext';
import { getUserProfile } from '@/lib/api';
import Sidebar from '../module/dashboard/sidebar';
import dynamic from 'next/dynamic';
const MobileHomePage = dynamic(() => import('../module/dashboard/home/mobileHomePage'), {
  ssr: false,
});

export default function HomePage() {
  const router = useRouter();
  const { user, setUser } = useUser();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromURL = urlParams.get('token');
    if (tokenFromURL) {
      localStorage.setItem('IFA_AuthToken', tokenFromURL);
      setToken(tokenFromURL);
      router.replace('/dashboard');
    }
  }, [router]);

  useEffect(() => {
    const tokenFromLocalStorage = localStorage.getItem('IFA_AuthToken');
    if (tokenFromLocalStorage) {
      setToken(tokenFromLocalStorage);
    }
  }, []);

  useEffect(() => {
    if (token && !user) {
      const fetchUserData = async () => {
        try {
          const response = await getUserProfile(token);
          if (!response.ok) throw new Error('Failed to fetch user data');
          const data = await response.json();
          setUser(data);
        } catch (err) {
          console.error(err);
        }
      };
      fetchUserData();
    }
  }, [token, user, setUser]);
  return (
    <>
      <Box
        display={{ base: 'none', md: 'flex' }}
        gap="60px"
        flexDir="row"
        bgImage={{ base: 'none', md: "url('/dashboard/dashboard-background-img-small.png')" }}
        bgSize="cover"
      >
        <Sidebar />
        <Box mt="20px" ml="30px">
          <DesktopHomePage />
        </Box>
      </Box>
      <Box display={{ base: 'block', md: 'none' }}>
        <MobileHomePage />
      </Box>
    </>
  );
}
