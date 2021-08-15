import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import clnx from 'classnames'
// import { useStoreEditorRef, useEventEditorId} from '@udecode/plate'
import { useGlobalState } from '/store'
// import Layout from '@/components/Layout'
import Editor, { serializeToMd } from '@/components/Editor'
import useTopic from '/data/useTopic'
// import { serialize } from 'remark-slate';
const EditTopic = () => {
  const [value, setValue] = useState([{ children: [{ text: '' }] }])
  const [title, setTitle] = useState('')
  const router = useRouter()
  console.log(router)
  const {data} = useTopic(router.query.id, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  })
  console.log(data)
  const disabled  = !title
  const { token } = useGlobalState()
  useEffect(() => {
    if(data) {
      setTitle(data.title)
    }
  }, [data])
  // const editor = useStoreEditorRef(useEventEditorId('focus'));
  const onSubmit = async (e) => {
    e.preventDefault()
    const content = value.map((v) => serializeToMd(v)).filter(v => v).join('')
    console.log(content)
    const response = await fetch('https://cnodejs.org/api/v1/topics' , {
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'accesstoken=' + token + '&title=' + title + '&tab=dev&content=' + content
    })
    const res = await response.json()
    if(res.success) {
      router.push('/topic/' + res.topic_id)
    }
  }
  return (
    <>
      <header className="bg-gray-800">
        <div className="max-w-3xl mx-auto xl:max-w-7xl flex items-center justify-between">
          <Link href="/">
            <a>
              <img
                src="/cnodejs_light.svg"
                alt="logo"
                width={96}
                height={32}
                className="w-24 h-7 my-2"
              />
            </a>
          </Link>
          <button disabled={disabled} onClick={onSubmit} className={
            clnx('focus:outline-none text-white font-bold py-2 px-8 rounded', {
              'bg-green-500 hover:bg-green-400 active:bg-green-600 focus:bg-green-600': !disabled,
              'bg-gray-200 text-gray-500 cursor-not-allowed': disabled
            })
          }>
            发布
          </button>
        </div>
      </header>
      <main className="py-4">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 xl:max-w-5xl xl:px-0">
          <form onSubmit={onSubmit}>
            {/* <div>标题<input value={title} onChange={e => setTitle(e.target.value)} /></div> */}

            <div className="bg-white p-4">
              <div className="py-3 ">
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full outline-none leading-10 text-3xl font-bold"
                  placeholder="在此输入标题"
                />
              </div>
              <Editor value={value} onChange={(e) => setValue(e)} />
            </div>
            <button>提交</button>
          </form>
        </div>
      </main>
    </>
  )
}
// EditTopic.getLayout = function getLayout(page) {
//   return <Layout>{page}</Layout>
// }

export default EditTopic
