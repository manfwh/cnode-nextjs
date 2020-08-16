import Link from 'next/link'
import ErrorPage from 'next/error'
import { useRouter} from 'next/router'
import Layout from '@/components/Layout'
import Nav from '@/components/Nav'
import TopicsList from '@/components/TopicsList'

export default function Home() {
  const router = useRouter()
  const tabs = [
    { name: '全部', tab: '/' },
    { name: '精华', tab: '/good' },
    { name: '分享', tab: '/share' },
    { name: '问答', tab: '/ask' },
    { name: '招聘', tab: '/job' },
    // { name: '客户端测试', tab: 'dev' },
  ]
  if(!tabs.some(item => item.tab === '/' + router.query.tab)) {
    return <ErrorPage statusCode={404} />
  }
  return (

    <Layout>
      <div className="container md:container mx-auto grid grid-cols-1 md:grid-cols-main">
        <div className="mb-4">
          <div className="bg-gray-200 text-sm px-2 py-3 rounded-t-md">
            <Nav tabs={tabs} />
          </div>
          <div className="bg-white rounded-b-md">
            <TopicsList tab={tabs[0]} />
          </div>
        </div>
        {/* <div>123</div> */}
      </div>

    </Layout>


  )
}
