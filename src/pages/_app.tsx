// pages/_app.tsx
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Provider } from 'react-redux'
import { store } from '../store/store'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Layout from '@/components/Layout';

import Layout from '@/components/Layout'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>TicketGo</title>
        <meta name='description' content='歡迎來到 TicketGo, 趕快購買專屬於你的 tickets!' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        {/* <link rel='icon' href='/favicon.ico' /> */}
      </Head>
      <Provider store={store}>
        <ToastContainer
          position='top-right'
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='light'
        />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </>
  )
}
