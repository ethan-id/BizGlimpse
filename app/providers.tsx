'use client';

import * as React from 'react';
import { NextUIProvider } from '@nextui-org/system';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ThemeProviderProps } from 'next-themes/dist/types';
import { SessionProvider } from 'next-auth/react'; // Import SessionProvider

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
  session?: any; // Optionally include session prop type
}

export function Providers({ children, themeProps, session }: ProvidersProps) {
  return (
    <SessionProvider session={session}> {/* Wrap existing providers with SessionProvider */}
      <NextUIProvider>
        <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
      </NextUIProvider>
    </SessionProvider>
  );
}
