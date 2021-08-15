import { useState, Fragment, memo } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useGlobalState } from '/store'
import Editor, { serializeToMd } from '@/components/Editor'
import { Dialog, Button } from '@/components/ui'
import { Listbox, Transition } from '@headlessui/react'
import { ArrowDropDown } from '@styled-icons/material/ArrowDropDown'
const topics = [
  { name: '分享' },
  { name: '问答' },
  { name: '招聘' },
  { name: '客户端测试' },
]
const SelectTab = memo(() => {
  const [selected, setSelected] = useState(topics[0])

  return (
    <div className="z-50 w-32">
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full py-2 pl-3 pr-5 text-left bg-white cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
            <span className="block truncate text-gray-600 text-xl">{selected.name}</span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <ArrowDropDown
                className="w-5 h-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-sm shadow-md max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {topics.map((topic, index) => (
                <Listbox.Option
                  key={index}
                  className={({ active, selected }) =>
                    `${active || selected ? 'text-green-900 bg-green-200' : 'text-gray-900'}
                          cursor-default select-none relative py-2 px-2`
                  }
                  value={topic}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`${
                          selected ? 'font-medium' : 'font-normal'
                        } block truncate`}
                      >
                        {topic.name}
                      </span>
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
})
SelectTab.displayName = 'SelectTab'
const EditTopic = () => {
  const [value, setValue] = useState([{ children: [{ text: '' }] }])
  const [title, setTitle] = useState('')
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const disabled = !title || loading
  const { token } = useGlobalState()
  const [openDialog, setOpenDialog] = useState(false)
  const [errMsg, setErrMsg] = useState('')
  // const editor = useStoreEditorRef(useEventEditorId('focus'));
  const onSubmit = async (e) => {
    console.log(value, '\nfdfd\ngfgf')
    e.preventDefault()
    const content = value
      .map((v) => serializeToMd(v))
      .filter((v) => v)
      .join('')
    console.log(content)
    setLoading(true)
    const response = await fetch('https://cnodejs.org/api/v1/topics', {
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body:
        'accesstoken=' +
        token +
        '&title=' +
        title +
        '&tab=dev&content=' +
        content,
    })
    const res = await response.json()
    setLoading(false)
    if (res.success) {
      router.push('/topic/' + res.topic_id)
    } else {
      setErrMsg(res.error_msg)
      setOpenDialog(true)
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
          <Button
            size="large"
            disabled={disabled}
            onClick={onSubmit}
            loading={loading}
          >
            发布
          </Button>
          {/* <button disabled={disabled} onClick={onSubmit} className={
            clnx('focus:outline-none text-white font-bold py-2 px-8 rounded', {
              'bg-green-500 hover:bg-green-400 active:bg-green-600 focus:bg-green-600': !disabled,
              'bg-gray-200 text-gray-500 cursor-not-allowed': disabled
            })
          }>
            发布
          </button> */}
        </div>
      </header>
      <main className="py-4">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 xl:max-w-5xl xl:px-0">
          <form onSubmit={onSubmit}>
            {/* <div>标题<input value={title} onChange={e => setTitle(e.target.value)} /></div> */}

            <div className="bg-white p-4">
              <div className="py-3 flex">
                {/* <SelectTab /> */}
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="outline-none leading-10 text-3xl font-bold"
                  placeholder="在此输入标题"
                />
              </div>
              <Editor value={value} onChange={(e) => setValue(e)} />
            </div>
            <button>提交</button>
          </form>
        </div>
        <Dialog
          type="warn"
          open={openDialog}
          title={errMsg}
          onClose={() => setOpenDialog(false)}
        />
      </main>
    </>
  )
}
// EditTopic.getLayout = function getLayout(page) {
//   return <Layout>{page}</Layout>
// }

export default EditTopic
