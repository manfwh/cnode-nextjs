import { useRouter } from 'next/router'
import Link from 'next/link'
import useSWR from 'swr'
import Nav from '@/components/Nav'
import TopicList from './TopicsList'
const fetcher = (...args) => fetch(...args).then(res => res.json())
const Topics = () => {
  const router = useRouter()
  const limit = 40;
  const { tab, page: pageIndex = 1 } = router.query
  const page = Number(pageIndex)
    ? Number(pageIndex) > 0 ? Number(pageIndex) : 1
    : 1
  const { data } = useSWR(`https://cnodejs.org/api/v1/topics?mdrender=false&tab=${tab || 'all'}&page=${page || 1}&limit=${limit}`, fetcher)
  const tabs = [
    { name: '全部', tab: 'all' },
    { name: '精华', tab: 'good' },
    { name: '分享', tab: 'share' },
    { name: '问答', tab: 'ask' },
    { name: '招聘', tab: 'job' },
    { name: '客户端测试', tab: 'dev' },
  ]
  return (
    <div className="mb-4">
      <div className="bg-gray-200 text-sm px-2 py-3 rounded-t-md">
        <Nav tabs={tabs} />
      </div>
      <div className="bg-white rounded-b-md">
        {!data
          ? <div className="text-center py-8 text-gray-600">拼命加载中...</div>
          : data.data?.length === 0 ? <div>暂无数据</div> : (
            <>
              <TopicList list={data.data} tab={tab} />
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
            </>
          )

        }

      </div>
    </div>
  )
}

export default Topics