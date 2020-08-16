import { useRouter } from 'next/router'
import Link from 'next/link'
import useSWR from 'swr'
import dayjs from 'dayjs'

const fetcher = (...args) => fetch(...args).then(res => res.json())
const Topics = () => {
  const router = useRouter()
  const limit = 40;
  const { tab, page: pageIndex = 1 } = router.query
  const page = Number(pageIndex)
    ? Number(pageIndex) > 0 ? Number(pageIndex) : 1
    : 1
  const { data } = useSWR(`https://cnodejs.org/api/v1/topics?mdrender=false&tab=${tab || 'all'}&page=${page || 1}&limit=${limit}`, fetcher)
  const getTabName = tab => {
    if (tab === 'share') {
      return '分享'
    } else if (tab === 'good') {
      return '精华'
    } else if (tab === 'job') {
      return '招聘'
    } else if (tab === 'ask') {
      return '问答'
    }
    return ''
  }
  if (!data) return <div className="text-center py-8 text-gray-600">拼命加载中...</div>
  return <div>
    { data.data.length === 0 && <div>暂无数据</div>}
    <ul>
      {
        data.data.map(item => (
          <li className="flex flex-col md:flex-row md:items-center items-start md:justify-between justify-start hover:bg-gray-100 px-4 py-4 border-b border-solid border-gray-200" key={item.id}>
            <div className="flex items-center">
              <Link href={`/user/${item.author.loginname}`}>
                <a title={item.author.loginname} className="flex-shrink-0 pr-2 md:pr-0">
                  <img className="w-8 h-8 rounded-sm" src={item.author.avatar_url} />
                </a>
              </Link>
              <span className="text-center w-20 flex-shrink-0 hidden md:inline-block" >
                <span title="回复数" className="text-sm">{item.reply_count}</span>
                <span className="text-xs text-gray-700">/</span>
                <span title="总点击数" className="text-xs text-gray-700">{item.visit_count}</span>
              </span>
              {
                item.top
                  ? <span className="bg-green-500 px-1 py-0 text-xs rounded-sm text-white flex-shrink-0">置顶</span>
                  : item.good
                    ? <span className="bg-green-500 px-1 py-0 text-xs rounded-sm text-white flex-shrink-0">精华</span>
                    : !tab && <span className="bg-gray-200 px-1 py-0 text-xs rounded-sm text-gray-600 flex-shrink-0">{getTabName(item.tab)}</span>
              }
              <Link href={`/topic/[id]`} as={`/topic/${item.id}`}>
                <a className="text-gray-700 md:pl-1 hover:underline ">{item.title}</a>
              </Link>

            </div>
            <div className="flex-shrink-0 flex justify-between w-full md:w-auto items-center">
              <span className="md:hidden text-center flex-shrink-0" >
                <span title="回复数" className="text-xs">{item.reply_count}</span>
                <span className="text-xs text-gray-700">/</span>
                <span title="总点击数" className="text-xs text-gray-700">{item.visit_count}</span>
              </span>
              <span className="text-xs text-gray-700">最后回复：{dayjs(item.last_reply_at).fromNow()}</span>
            </div>
          </li>
        ))
      }
    </ul>
    <div className="flex px-2 py-3">
      <Link href={{ pathname: router.pathname }} as={{ pathname: `/${tab || ''}` }}>
        <a className="border border-green-500 border-solid px-2 py-1 text-sm rounded text-gray-700 mx-2">首页</a>
      </Link>
      {
        page > 1 && <Link href={{ pathname: router.pathname, query: { page: Number(page) - 1 } }} as={{ pathname: `/${tab || ''}`, query: { page: Number(page) - 1 } }}>
          <a className="border border-green-500 border-solid px-2 py-1 text-sm rounded text-gray-700 mx-2">上一页</a>
        </Link>
      }
      {
        data.data.length === limit && (
          <Link href={{ pathname: router.pathname, query: { page: Number(page) + 1 } }} as={{ pathname: `/${tab || ''}`, query: { page: Number(page) + 1 } }}>
            <a className="border border-green-500 border-solid px-2 py-1 text-sm rounded text-gray-700 mx-2">下一页</a>
          </Link>
        )
      }

    </div>
  </div>
}

export default Topics