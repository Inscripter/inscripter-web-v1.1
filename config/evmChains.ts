// scripts-kroma/evmChains.ts
import { Chain } from 'wagmi/chains';

const kromaMainnet: Chain = {
  id: 255, // Chain ID for Kroma Mainnet
  network: 'kroma',
  name: 'Kroma Mainnet',
  nativeCurrency: {
    name: 'Ether',
    symbol: 'ETH', // Currency Symbol
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['https://api.kroma.network'], // RPC URL
    },
    public: {
      http: ['https://api.kroma.network'], // RPC URL
    },
  },
  blockExplorers: {
    default: {
      name: 'KromaScan',
      url: 'https://kromascan.com', // Block Explorer URL
    },
  },
};

export const evmChains = [kromaMainnet];
