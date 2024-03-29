import Head from 'next/head'
import { SWRConfig } from 'swr'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
import NProgress from '@/components/nprogress';
import GlobalProvider from '../store'
dayjs.locale('zh-cn')
dayjs.extend(relativeTime)

import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page)
  return <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no, viewport-fit=cover" />
    </Head>
    <NProgress />
    <SWRConfig 
      value={{
        fetcher: (...args) => fetch(...args).then(res => res.json())
      }}
    >
      <GlobalProvider>
        {getLayout(<Component {...pageProps} />)}
      </GlobalProvider>
    </SWRConfig>
    
  </>
}

export default MyApp
