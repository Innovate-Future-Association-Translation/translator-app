// signup-style.ts
import { SystemStyleObject } from '@chakra-ui/react';

// outerBoxProps
export const outerBoxProps = {
  w: '100%',
  h: '100vh',
  overflow: 'hidden',
  bg: 'white',
};

// scrollBoxProps
export const scrollBoxProps = {
  maxW: 'md',
  mx: 'auto',
  overflowY: 'auto',
  maxH: 'calc(100vh - 60px - 4rem)',
  pr: 4,
  css: {
    '&::-webkit-scrollbar': {
      width: '5px',
    },
    '&::-webkit-scrollbar-track': {
      background: 'transparent',
    },
    '&::-webkit-scrollbar-thumb': {
      'background': 'gray.100',
      'borderRadius': '5px',
      '&:hover': {
        background: 'gray.200',
      },
    },
  } as SystemStyleObject,
};
