import Head from 'next/head'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
import NProgress from '@/components/nprogress';
dayjs.locale('zh-cn')
dayjs.extend(relativeTime)

import '../styles/globals.css'
import 'highlight.js/styles/github.css';

function MyApp({ Component, pageProps }) {
  return <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no, viewport-fit=cover" />
    </Head>
    <NProgress />
    <Component {...pageProps} />
  </>
}

export default MyApp
