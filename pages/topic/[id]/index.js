import { useCallback, useMemo } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import ErrorPage from 'next/error'
import Layout from '@/components/Layout'
import Comment from '@/components/Comment'
import dayjs from 'dayjs'
import { useGlobalState } from '/store'
import markdownToHtml from '/lib/markdownToHtml'
import useUser from '/data/useUser'
import useTopic from '/data/useTopic'
import '/styles/topic.module.css'

const LinkList = ({ list }) => {
  if (!list) {
    return (
      <>
        <div className="h-6 my-2 bg-gray-200 animate-pulse" />
        <div className="h-6 my-2 bg-gray-200 animate-pulse" />
        <div className="h-6 my-2 bg-gray-200 animate-pulse" />
        <div className="h-6 my-2 bg-gray-200 animate-pulse" />
        <div className="h-6 my-2 bg-gray-200 animate-pulse" />
      </>
    )
  }
  return list.length === 0 ? (
    <div className="text-center text-gray-500 py-8">无话题</div>
  ) : (
    <ul>
      {list.map((item) => (
        <li key={item.id} className="py-2">
          <Link href="/topic/[id]" as={`/topic/${item.id}`}>
            <a
              title={item.title}
              className="text-gray-600 hover:text-gray-700 text-sm truncate max-w-full block"
            >
              {item.title}
            </a>
          </Link>
        </li>
      ))}
    </ul>
  )
}
const UserAside = ({ user }) => {
  return (
    <aside className="hidden md:block flex-shrink-0 ml-4">
      <div className="mb-4">
        <div className="bg-gray-200 text-sm px-2 py-2 rounded-t-md">作者</div>
        <div className="bg-white px-2 py-2 rounded-b-md">
          <div className="flex items-center">
            {user ? (
              <>
                <Link href={`/user/${user.loginname}`}>
                  <a title={user.loginname}>
                    <img
                      alt="avatar"
                      src={user.avatar_url}
                      className="w-12 h-12 rounded"
                    />
                  </a>
                </Link>
                <Link href={`/user/${user.loginname}`}>
                  <a>
                    <span className="ml-3 text-gray-600">{user.loginname}</span>
                  </a>
                </Link>
              </>
            ) : (
              <>
                <div className="animate-pulse w-12 h-12 rounded bg-gray-200"></div>
                <div className="animate-pulse ml-3 bg-gray-200 w-24 h-6"></div>
              </>
            )}
          </div>
          {user ? (
            <>
              <div className="mt-3 text-sm">积分：{user.score}</div>
              <div className="italic text-gray-700 text-xs mt-2">
                “
                {user.signature
                  ? user.signature
                  : '这家伙很懒，什么个性签名都没有留下。'}
                ”
              </div>
            </>
          ) : (
            <>
              <div className="animate-pulse mt-3 h-4 w-24 bg-gray-200"></div>
              <div className="animate-pulse mt-3 h-4 bg-gray-200"></div>
            </>
          )}
        </div>
      </div>
      <div className="mb-4">
        <div className="bg-gray-200 text-sm px-2 py-2 rounded-t-md">
          作者其他话题
        </div>
        <div className="bg-white px-2 py-2 rounded-b-md">
          <LinkList list={user?.recent_topics?.slice(0, 5)} />
        </div>
      </div>
      <div className="mb-4">
        <div className="bg-gray-200 text-sm px-2 py-2 rounded-t-md">
          最近参与的话题
        </div>
        <div className="bg-white px-2 py-2 rounded-b-md">
          <LinkList list={user?.recent_replies?.slice(0, 5)} />
        </div>
      </div>
    </aside>
  )
}
const Topic = ({ topic }) => {
  const router = useRouter()
  const { token, user: currentUser } = useGlobalState()
  const user = useUser(topic?.author?.loginname)
  const { data, mutateTopic } = useTopic(topic?.id)
  const replies = useMemo(() => {
    return data ? data.replies : []
  }, [data])
  const getTabName = (tab) => {
    if (tab === 'share') {
      return '分享'
    } else if (tab === 'good') {
      return '精华'
    } else if (tab === 'job') {
      return '招聘'
    } else if (tab === 'ask') {
      return '问答'
    } else if (tab === 'dev') {
      return '测试'
    }
    return ''
  }
  const onUp = useCallback(
    (reply) => {
      fetch(`https://cnodejs.org/api/v1/reply/${reply.id}/ups`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `accesstoken=${token}`,
      })
        .then((res) => res.json())
        .then((res) => {
          mutateTopic({
            replies: replies.map((item) =>
              item.id === reply.id
                ? {
                    ...item,
                    is_uped: res.action === 'up',
                    // TODO:
                    ups:
                      res.action === 'up'
                        ? [...item.ups, true]
                        : [...item.ups.slice(0, item.ups.length - 1)],
                  }
                : item
            ),
          })
        })
    },
    [mutateTopic, replies, token]
  )
  if (!router.isFallback && !topic.id) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <>
      {topic?.title && (
        <Head>
          <title>{topic.title}</title>
        </Head>
      )}
      {router.isFallback ? (
        <div className="text-center py-8 text-gray-600">拼命加载中...</div>
      ) : (
        <div className="max-w-3xl mx-auto xl:max-w-7xl grid grid-cols-1 md:grid-cols-main">
          <div>
            <article className="bg-white rounded flex-grow">
              <div className="py-2 px-2 border-b border-gray-300 border-solid">
                <h1 className="text-xl font-bold my-2">
                  {topic.top && (
                    <span className="bg-green-500 text-white px-2 py-1 align-middle text-xs rounded mr-2 flex-shrink-0">
                      置顶
                    </span>
                  )}
                  {topic.title}
                </h1>
                <div className="text-xs text-gray-600">
                  • 发布于 {dayjs(topic.create_at).fromNow()}• 作者{' '}
                  <Link href={`/user/${topic.author.loginname}`}>
                    <a className="hover:text-blue-600">
                      {topic.author.loginname}{' '}
                    </a>
                  </Link>
                  • {topic.visit_count} 次浏览 • 最后一次编辑是{' '}
                  {dayjs(topic.last_reply_at).fromNow()}• 来自{' '}
                  <Link href="/[tab]" as={`/${topic.tab}`}>
                    <a className="text-blue-600">{getTabName(topic.tab)}</a>
                  </Link>
                </div>
                {currentUser?.id === topic.author_id && (
                  <div>
                    <Link href={`/topic/${topic.id}/edit`}>
                      <a>编辑</a>
                    </Link>
                  </div>
                )}
              </div>
              <section className="px-4 md:px-0">
                <div
                  className="prose prose-sm md:px-8 md:py-4 max-w-none mx-auto"
                  dangerouslySetInnerHTML={{ __html: topic.content }}
                ></div>
              </section>
            </article>
            <div className="mt-4 mb-8">
              <div className="bg-gray-200 rounded-t-md px-2 py-2 text-gray-600">
                {replies?.length} 回复
              </div>
              {replies?.length === 0 && (
                <div className="bg-white text-center leading-relaxed text-gray-600 py-12">
                  暂无回复
                </div>
              )}
              <ul className="bg-white">
                {!replies && (
                  <>
                    {new Array(2).fill(true).map((_, index) => (
                      <li
                        className="px-3 py-3 border-solid border-b border-gray-200 flex last:border-b-0"
                        key={index}
                      >
                        <div className="w-8 h-8 rounded mr-3 bg-gray-200 animate-pulse" />
                        <div className="flex-grow">
                          <div className="w-24 h-4 bg-gray-200 animate-pulse"></div>
                          <div className="h-4 mt-6 bg-gray-200 animate-pulse"></div>
                          <div className="h-4 mt-3 bg-gray-200 animate-pulse"></div>
                          <div className="w-48 h-4 mt-3 bg-gray-200 animate-pulse"></div>
                        </div>
                      </li>
                    ))}
                  </>
                )}
                {replies?.map((item, index) => (
                  <Comment
                    comment={item}
                    key={item.id}
                    index={index}
                    onUpClick={onUp}
                  />
                ))}
              </ul>
            </div>
          </div>
          <UserAside user={user} />
        </div>
      )}
    </>
  )
}
Topic.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  }
}
export async function getStaticProps({ params }) {
  try {
    const topicResponse = await fetch(
      `https://cnodejs.org/api/v1/topic/${params.id}?mdrender=false`
    )
    const result = await topicResponse.json()
    if (result.success) {
      const content = await markdownToHtml(result.data.content)
      return {
        props: {
          topic: {
            ...result.data,
            content,
          },
        },
        revalidate: 1,
      }
    }
    return {
      notFound: true,
    }
  } catch (error) {
    console.error(error)
    throw new Error('请求异常')
  }
}
export default Topic
