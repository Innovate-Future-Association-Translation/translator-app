'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getUserProfile } from '@/lib/api';
import Sidebar from '../module/dashboard/sidebar';
import { Flex, Box, Spinner, Center } from '@chakra-ui/react';
import { useUser } from '../../context/userContext';
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const { setUser } = useUser();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromURL = urlParams.get('token');
    const tokenFromLocalStorage = localStorage.getItem('IFA_AuthToken');
    if (tokenFromURL) {
      localStorage.setItem('IFA_AuthToken', tokenFromURL);
      setToken(tokenFromURL);
      router.replace('/dashboard');
    } else if (tokenFromLocalStorage) {
      setToken(tokenFromLocalStorage);
    } else {
      setLoading(false);
    }
  }, [router]);
  useEffect(() => {
    if (!token) return;
    const fetchUserData = async () => {
      try {
        const response = await getUserProfile(token);
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        setUser(data);
      } catch (err) {
        console.error('Failed to fetch user data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [token, setUser]);
  if (loading) {
    return (
      <Center height="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }
  return (
    <div>
      <Flex
        display={{ base: 'none', md: 'flex' }}
        bgImage="url('/dashboard-bg.png')"
        bgSize="cover"
      >
        <Sidebar />
        <Flex flex="1" justify={'center'} h="100vh">
          {children}
        </Flex>
      </Flex>
      <Box display={{ base: 'block', md: 'none' }}>{children}</Box>
    </div>
  );
}
