import { getDefaultWallets } from '@rainbow-me/rainbowkit';
import { configureChains, createConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { evmChains } from './evmChains';

const walletConnectProjectId = '06e07513e594a4ace9e4ddacbe54e3a0';

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
