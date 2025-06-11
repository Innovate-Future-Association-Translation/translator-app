'use client';

import { useMediaQuery } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

export function useIsomorphicMediaQuery(query: string): boolean | null {
  const [isClient, setIsClient] = useState(false);
  const [matches] = useMediaQuery([query]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient ? matches : null;
}
