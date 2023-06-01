import ConfigProvider from './components/ConfigProvider'
import ConnectBtn from './components/ConnectBtn'
import './globals.css'
import '@rainbow-me/rainbowkit/styles.css'
import { Nunito } from 'next/font/google'

const nunito = Nunito({ subsets: ['latin'] })

export const metadata = {
  title: 'next template',
  description: 'next.js template for web3 frontend',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={nunito.className}>
        <div className='md:container md:mx-auto p-4'>
          <ConfigProvider>
            <div className='flex flex-row items-center justify-end'>
              <ConnectBtn />
            </div>
            {children}
          </ConfigProvider>
        </div>
      </body>
    </html>
  )
}
