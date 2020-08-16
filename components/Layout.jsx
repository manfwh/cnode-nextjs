import Link from 'next/link'

const Layout = ({children }) => {
  return (
    <>
    <header className="bg-gray-800">
      <div className="container md:container mx-auto flex items-center justify-between">
        <Link href="/">
          <a><img src='/cnodejs_light.svg' className="w-32 h-8 my-2" /></a>
        </Link>
        {/* <ul className="flex">
          <li><Link href="/"><a className="text-gray-400 transition duration-75 ease-in hover:text-gray-100 mx-2 text-sm">首页</a></Link></li>
          <li><Link href="/"><a className="text-gray-400 transition duration-75 ease-in hover:text-gray-100 mx-2 text-sm">未读消息</a></Link></li>
          <li><Link href="/"><a className="text-gray-400 transition duration-75 ease-in hover:text-gray-100 mx-2 text-sm">新手入门</a></Link></li>
          <li><Link href="/"><a className="text-gray-400 transition duration-75 ease-in hover:text-gray-100 mx-2 text-sm">API</a></Link></li>
          <li><Link href="/"><a className="text-gray-400 transition duration-75 ease-in hover:text-gray-100 mx-2 text-sm">关于</a></Link></li>
          <li><Link href="/"><a className="text-gray-400 transition duration-75 ease-in hover:text-gray-100 mx-2 text-sm">设置</a></Link></li>
          <li><Link href="/"><a className="text-gray-400 transition duration-75 ease-in hover:text-gray-100 mx-2 text-sm">退出</a></Link></li>
        </ul> */}
      </div>
      
    </header>
    <main className="bg-gray-100 pt-4">{children}</main>
    </>
  )
}

export default Layout