import { memo, useContext } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { GlobalContext } from '../store'
const Layout = ({children }) => {
  const { token, setToken } = useContext(GlobalContext)
  const onLogout = () => {
    localStorage.removeItem('accesstoken')
    setToken('')
  }
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
        <ul className="flex">
          <li><Link href="/"><a className="text-gray-500 hover:text-white text-sm mx-3">首页</a></Link></li>
          <li><Link href="/"><a className="text-gray-500 hover:text-white text-sm mx-3">新手入门</a></Link></li>
          <li><Link href="/"><a className="text-gray-500 hover:text-white text-sm mx-3">API</a></Link></li>
          <li><Link href="/"><a className="text-gray-500 hover:text-white text-sm mx-3">关于</a></Link></li>
          {
            !token 
              ? <li><Link href="/signin"><a className="text-gray-500 hover:text-white text-sm mx-3">登录</a></Link></li>
              : <li><span className="text-gray-500 hover:text-white text-sm mx-3 cursor-pointer" onClick={onLogout}>退出</span></li>
          }
        </ul>
      </div>
      
    </header>
    <main className="pt-4">{children}</main>
    </>
  )
}

export default memo(Layout)