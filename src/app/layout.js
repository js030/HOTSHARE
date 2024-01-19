import '@/styles/globals.css'
import TanstackProvider from '@/context/TanstackProvider'
import { ToastContainer } from 'react-toastify'
import Navbar from '@/components/NavBar'
import { Providers } from '@/app/providers'

export const metadata = {
  title: {
    default: 'HOTSIX',
    template: '%s | HOTSIX',
  },
  description: 'home',
}

export default function RootLayout({ children }) {
  return (
    <html lang='ko'>
      <body className='font-jalnan'>
        <Providers>
          <ToastContainer
            position='top-center'
            autoClose={2000}
            pauseOnHover={false}
            pauseOnFocusLoss={false}
          />
          <TanstackProvider>
            <header className='fixed top-0 w-full mx-auto bg-white dark:border-slate-600/40 z-[999] dark:bg-base-100 py-7'>
              <div className='max-w-screen-xl mb-3 mx-auto'>
                <Navbar />
              </div>
              <hr />
            </header>
            <main className='w-full h-auto order-1 max-w-screen-xl mx-auto pt-[100px] pb-20 mt-10'>
              {children}
            </main>
            <div id='portal'></div>
          </TanstackProvider>
        </Providers>
      </body>
    </html>
  )
}
