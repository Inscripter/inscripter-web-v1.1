'use client';
import * as React from "react";
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';

import { WagmiConfig } from 'wagmi';
import { chains, config } from '../config/wagmiConfig';

export function Web3Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  return (
      <WagmiConfig config={config}>
        <RainbowKitProvider
          locale="en-US"
          theme={darkTheme({
            accentColor: '#45D620',
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
