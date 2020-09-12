import { memo } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import clnx from 'classnames'

const Nav = ({ tabs }) => {
  const router = useRouter()
  return (
    <nav>
      {
        tabs.map(item => (
          <Link key={item.tab} href={item.tab === 'all' ? '/' : '/[tab]'} as={ item.tab === 'all' ? '/' : `/${item.tab}`}>
            <a className={clnx(
              'px-2 py-1 rounded',
              {
                'mx-2 text-green-500': item.tab === 'all' ? router.pathname !== '/' : router.query.tab !== item.tab,
                'text-white bg-green-500': router.query.tab === item.tab || (router.pathname === '/' && item.tab === 'all')
              }
            )}>{item.name}</a>
          </Link>
        ))
      }
    </nav>
  )
}

export default memo(Nav)