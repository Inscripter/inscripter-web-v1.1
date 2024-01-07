"use client";

import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react'

import { WagmiConfig } from 'wagmi'
import { arbitrum, mainnet } from 'viem/chains'
import { evmChains } from '../config/evmChains';

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = '06e07513e594a4ace9e4ddacbe54e3a0'

// 2. Create wagmiConfig
const metadata = {
  name: 'inscripter',
  description: 'Interpreter For Web3 Inscriptions',
  url: 'https://inscripter.com',
  icons: ['https://inscripter.com/android-chrome-512x512.png']
}

const chains = evmChains
const wagmiConfig = defaultConfig({ chains, projectId, metadata })

// 3. Create modal

createWeb3Modal({ 
  wagmiConfig, 
  projectId, 
  chains,
  themeMode: 'dark',
  themeVariables: {
    '--w3m-font-family': 'ProtoMono-SemiBold',
    '--w3m-accent': '#45d620',

  }
})

export function Web3Modal({ children }) {
  return <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>;
}