import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import ErrorPage from 'next/error'
import Layout from '@/components/Layout'
import ThumbUpIcon from '@/components/svg/ThumbUp'
import dayjs from 'dayjs'
import markdownToHtml from '../../lib/markdownToHtml'
import '../../styles/topic.module.css'

const Topic = ({ topic, user }) => {
  const router = useRouter()
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
  if (!router.isFallback && !topic.id) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <Layout>
      {topic?.title && <Head>
        <title>{topic.title}</title>
      </Head>}
      {
        router.isFallback
          ? <div className="text-center py-8 text-gray-600">拼命加载中...</div>
          : <div className="container md:container mx-auto grid grid-cols-1 md:grid-cols-main">
            <div>
              <article className="bg-white rounded flex-grow">
                <div className="py-2 px-2 border-b border-gray-300 border-solid">
                  <h1 className="text-xl font-bold my-2">
                    {topic.top && <span className="bg-green-500 text-white px-2 py-1 align-middle text-xs rounded mr-2 flex-shrink-0">置顶</span>}{topic.title}</h1>
                  <div className="text-xs text-gray-600">
                    •  发布于 {dayjs(topic.create_at).fromNow()}
                •  作者 <Link href={`/user/${topic.author.loginname}`}><a className="hover:text-blue-600">{topic.author.loginname} </a></Link>
                •  {topic.visit_count} 次浏览 •  最后一次编辑是 {dayjs(topic.last_reply_at).fromNow()}
                •  来自 <Link href="/[tab]" as={`/${topic.tab}`}><a className="text-blue-600">{getTabName(topic.tab)}</a></Link>
                  </div>
                  
                </div>
                <section className="px-4 md:px-0">
                  <div className="prose prose-sm md:px-8 md:py-4 max-w-none mx-auto" dangerouslySetInnerHTML={{ __html: topic.content }}></div>
                </section>
              </article>
              <div className="mt-4 mb-8">
                <div className="bg-gray-200 rounded-t-md px-2 py-2 text-gray-600">{topic.replies.length} 回复</div>
                <ul className="bg-white">
                  {
                    topic.replies.map((item, index) => (
                      <li key={item.id} className="px-3 py-3 border-solid border-b border-gray-200 flex last:border-b-0" id={item.id}>
                        <Link href={`/user/${item.author.loginname}`}>
                          <a className="flex-shrink-0"><img src={item.author.avatar_url} className="w-8 h-8 rounded mr-3" /></a>
                        </Link>
                        <div className="flex-grow">
                          <div className="flex justify-between">
                            <div>
                              <Link href={`/user/${item.author.loginname}`}>
                                <a className="font-semibold text-xs">{item.author.loginname}</a>
                              </Link>
                              <a href={`#${item.id}`} className="text-xs text-blue-500 ml-2 hover:underline">
                                {index + 1}楼•{dayjs(item.create_at).fromNow()}
                              </a>
                            </div>
                            <span className="flex items-center">
                              <ThumbUpIcon className="w-4 h-4 text-gray-600 hover:text-gray-700 cursor-pointer" title="喜欢" />
                              <span className="text-xs ml-1">{item.ups.length}</span>
                            </span>
                          </div>
                          <div className="prose prose-sm max-w-none mb-4">
                            <div dangerouslySetInnerHTML={{ __html: item.content }}></div>
                          </div>
                        </div>
                      </li>
                    ))
                  }
                </ul>
              </div>
            </div>
            <aside className="hidden md:block flex-shrink-0 ml-4">
              <div className="mb-4">
                <div className="bg-gray-200 text-sm px-2 py-2 rounded-t-md">作者</div>
                <div className="bg-white px-2 py-2 rounded-b-md">
                  <div className="flex items-center">
                    <Link href={`/user/${user.loginname}`}>
                      <a title={user.loginname}><img src={user.avatar_url} className="w-12 h-12 rounded" /></a>
                    </Link>
                    <Link href={`/user/${user.loginname}`}>
                      <a><span className="ml-3 text-gray-600">{user.loginname}</span></a>
                    </Link>
                  </div>
                  <div className="mt-3 text-sm">积分：{user.score}</div>
                  <div className="italic text-gray-700 text-xs mt-2">
                    “
                    {user.signature ? user.signature : "这家伙很懒，什么个性签名都没有留下。"}
                  ”
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <div className="bg-gray-200 text-sm px-2 py-2 rounded-t-md">作者其他话题</div>
                <div className="bg-white px-2 py-2 rounded-b-md">
                  {
                    user.recent_topics.length === 0
                      ? <div className="text-center text-gray-500 py-8">无话题</div>
                      : <ul>
                        {
                          user.recent_topics.slice(0, 5).map(item => (
                            <li key={item.id} className="py-2">
                              <Link href="/topic/[id]" as={`/topic/${item.id}`}>
                                <a title={item.title} className="text-gray-600 hover:text-gray-700 text-sm truncate max-w-full block">{item.title}</a>
                              </Link>
                            </li>
                          ))
                        }
                      </ul>
                  }

                </div>
              </div>
              <div className="mb-4">
                <div className="bg-gray-200 text-sm px-2 py-2 rounded-t-md">最近参与的话题</div>
                <div className="bg-white px-2 py-2 rounded-b-md">
                  {user.recent_replies.length === 0
                    ? <div className="text-center text-gray-500 py-8">无话题</div>
                    : <ul>
                      {
                        user.recent_replies.slice(0, 5).map(item => (
                          <li key={item.id} className="py-2">
                            <Link href="/topic/[id]" as={`/topic/${item.id}`}>
                              <a title={item.title} className="text-gray-600 hover:text-gray-700 text-sm truncate max-w-full block">{item.title}</a>
                            </Link>
                          </li>
                        ))
                      }
                    </ul>
                  }

                </div>
              </div>
            </aside>
          </div>
      }
    </Layout>

  )
}
export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true
  }
}
export async function getStaticProps({ params }) {
  const topicResponse = await fetch(`https://cnodejs.org/api/v1/topic/${params.id}?mdrender=false`)
  const result = await topicResponse.json()
  if (result.success) {
    const userResponse = await fetch(`https://cnodejs.org/api/v1/user/${result.data.author.loginname}`)
    const userResult = await userResponse.json()
    const content = await markdownToHtml(result.data.content)
    const replies = await Promise.all(result.data.replies.map(async item => ({ ...item, content: await markdownToHtml(item.content) })))
    return {
      props: {
        topic: {
          ...result.data,
          content,
          replies
        },
        user: userResult.data
      },
      revalidate: 1
    }
  }
  throw new Error('请求异常')

}
export default Topic