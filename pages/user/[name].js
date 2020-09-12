import Link from 'next/link'
import Head from 'next/head'
import ErrorPage from 'next/error'
import dayjs from 'dayjs'
import Layout from '@/components/Layout'
import TopicsList from '@/components/TopicsList'

const User = ({ user }) => {
  if (!user) {
    return <ErrorPage statusCode={404} title="该用户不存在" />
  }
  return (
    <Layout>
      <Head>
        <title>@{user.loginname}的个人主页 - 仿Cnode技术社区</title>
      </Head>
      <div className="container md:container mx-auto grid grid-cols-1 md:grid-cols-main">
        <div>
          <div className="mb-6">
            <div className="bg-gray-200 text-sm px-2 py-2 rounded-t-md text-gray-400">
              <Link href="/"><a className="text-green-500">主页</a></Link> /
            </div>
            <div className="bg-white px-2 py-2 rounded-b-md">
              <div className="flex">
                <img className="w-10 h-10 rounded" src={user.avatar_url} />
                <span className="text-gray-600 ml-2">{user.loginname}</span>
              </div>
              <div className="text-sm mt-3">{user.score} 积分</div>
              <div className="text-gray-600 text-sm mt-3">注册时间 {dayjs(user.create_at).fromNow()}</div>
            </div>
          </div>
          <div className="mb-6">
            <div className="bg-gray-200 text-sm px-2 py-2 rounded-t-md">
              最近创建的话题
            </div>
            <div className="bg-white rounded-b-md">
              <TopicsList list={user.recent_topics.slice(0, 5)} />
            </div>
          </div>
          <div className="mb-6">
            <div className="bg-gray-200 text-sm px-2 py-2 rounded-t-md">
              最近参与的话题
            </div>
            <div className="bg-white rounded-b-md">
              <TopicsList list={user.recent_replies.slice(0, 5)} />
            </div>
          </div>
        </div>
        <div>1</div>
      </div>
    </Layout>
  )
}
export async function getServerSideProps(context) {
  const { name } = context.params;
  const response = await fetch(`https://cnodejs.org/api/v1/user/${name}`)
  const result = await response.json()
  return {
    props: { user: result.data ? result.data : null }
  }
}
export default User