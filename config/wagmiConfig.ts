// scripts/wagmi.ts
import { getDefaultWallets } from '@rainbow-me/rainbowkit';
import { configureChains, createConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { evmChains } from './evmChains';

const walletConnectProjectId = 'd3a2c43068be5f9fb281b80b05c799c9';

const { chains, publicClient, webSocketPublicClient } = configureChains(
  evmChains,
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'inscripter',
  chains,
  projectId: walletConnectProjectId,
});

export const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

export { chains };
