/**
 * src/app/providers.tsx
 * Chakra UI Provider Component
 *
 * This component provides Chakra UI context for the application
 * All pages using Chakra UI components need to be wrapped by this provider
 */

'use client';

import { ChakraProvider, createSystem, defaultConfig } from '@chakra-ui/react';
import React from 'react';
// Create custom system
const system = createSystem(defaultConfig);

/**
 * Provider Component
 * Wraps the application to provide Chakra UI context
 *
 * @param children - Child components
 * @returns Component containing Chakra provider
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return <ChakraProvider value={system}>{children}</ChakraProvider>;
}
