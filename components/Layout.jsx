import { memo } from 'react'
import Link from 'next/link'
import Head from 'next/head'

const Layout = ({children }) => {
  return (
    <>
    <Head>
      <title>仿cnode社区</title>
    </Head>
    <header className="bg-gray-800">
      <div className="container md:container mx-auto flex items-center justify-between">
        <Link href="/">
          <a><img src='/cnodejs_light.svg' className="w-32 h-8 my-2" /></a>
        </Link>
      </div>
      
    </header>
    <main className="bg-gray-100 pt-4">{children}</main>
    </>
  )
}

export default memo(Layout)