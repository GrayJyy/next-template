import { configureChains, createConfig } from 'wagmi'
import { mainnet, polygon, sepolia, hardhat } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { getDefaultWallets } from '@rainbow-me/rainbowkit'

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    mainnet,
    polygon,
    ...(process.env.NEXT_PUBLIC_ENABLE_LOCAL_NETWORK ? [hardhat] : []),
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS ? [sepolia] : []),
  ],
  [alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID! }), publicProvider()]
)

const { connectors } = getDefaultWallets({
  appName: process.env.NEXT_PUBLIC_APP_NAME!,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID!,
  chains,
})

const wagmiConfig = createConfig({ publicClient, webSocketPublicClient, connectors, autoConnect: true })

export { chains, wagmiConfig }
