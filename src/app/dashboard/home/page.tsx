'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/userContext';
import LogoutUser from '../../module/dashboard/logout-user';
import LoadingUser from '../../module/dashboard/loading-user';
import { createInstantMeeting, getUserProfile } from '@/lib/api';
import FunctionBox from '@/app/module/dashboard/function-box';
import { Flex } from '@chakra-ui/react';
import { functionList } from './function-list';
import { useMeetingContext } from '@/context/meetingContext';
export default function Home() {
  const router = useRouter();
  const { user, setUser } = useUser();
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { setMeeting } = useMeetingContext();
  const handleCreateMeeting = async () => {
    if (!user) return;
    try {
      const data = await createInstantMeeting(user.id);
      if (data.redirectMeetingRoomUrl) {
        console.log(data);
        setMeeting({
          roomId: data.roomId,
          meetingURL: data.redirectMeetingRoomUrl,
          participant: data.participant,
        });
        router.push(data.redirectMeetingRoomUrl);
      }
    } catch (error) {
      console.error('Failed to create meeting:', error);
      alert('Failed to start meeting.');
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromURL = urlParams.get('token');
    if (tokenFromURL) {
      localStorage.setItem('IFA_AuthToken', tokenFromURL);
      setToken(tokenFromURL);
      router.replace('/dashboard/home ');
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
        } finally {
          setLoading(false);
        }
      };
      fetchUserData();
    } else {
      setLoading(false);
    }
  }, [token, user, setUser]);

  if (loading) return <LoadingUser />;
  if (!user) return <LogoutUser />;

  return (
    <Flex wrap="wrap" gap={8} justify="center" p={8}>
      {functionList.map((item, index) =>
        index === 0 ? (
          <FunctionBox key={index} {...item} onClickApi={handleCreateMeeting} />
        ) : (
          <FunctionBox key={index} {...item} />
        )
      )}
    </Flex>
  );
}
