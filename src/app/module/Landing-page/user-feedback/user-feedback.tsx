import React from 'react';
import CardList from './user-feedback-cardlist/user-feedback-card-list';

import { Stack } from '@chakra-ui/react';
import UserFeedbackTitle from './user-feedback-title/user-feedback-title';

const messages = [
  {
    id: 1,
    name: 'David',
    role: 'International Student',
    text: 'The meeting translation feature ensures I never worry about understanding foreign-language meetings again!',
    avatarImg: '/image/arab_professional.jpg',
  },
  {
    id: 2,
    name: 'Amy',
    role: 'Cross-Border E-commerce Seller',
    text: 'The live lecture subtitles are amazing—my learning efficiency has increased by 200%!',
    avatarImg: '/image/japan_pro.jpg',
  },
  {
    id: 3,
    name: 'Kevin',
    role: 'Cross-Border E-commerce Seller',
    text: 'Email and phone translation have made communication with my customers so much smoother!',
    avatarImg: '/image/chinese_professional.jpg',
  },
];

function UserFeedback() {
  return (
    <Stack justifyContent="center" justifyItems="center" alignItems="center" gap={4}>
      <UserFeedbackTitle />
      <CardList users={messages} />
    </Stack>
  );
}

export default UserFeedback;
