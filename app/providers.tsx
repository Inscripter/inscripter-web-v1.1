"use client";
import * as React from "react";
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';

import { WagmiConfig } from 'wagmi';
import { chains, config } from '../config/wagmiConfig';

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  
  return (
      <WagmiConfig config={config}>
        <RainbowKitProvider
          locale="en-US"
          theme={darkTheme({
            accentColor: '#b1e8a2',
            accentColorForeground: 'white',
            // borderRadius: 'small',
            fontStack: 'rounded',
            overlayBlur: 'small',
          })}
          chains={chains}
        >
          {mounted && children}
        </RainbowKitProvider>
      </WagmiConfig>
  );
}
