import { useState } from 'react'
import { useGlobalState } from '/store'
const EditTopic = () => {
  const [value, setValue] = useState()
  const [title, setTitle] = useState()
  const {token} = useGlobalState()
  const onSubmit = (e) => {
    e.preventDefault()
    fetch('https://cnodejs.org/api/v1/topics', {
      method: 'post',
      body: JSON.stringify({
        accessToken: token,
        title,
        tab: 'dev',
        content: value
      })
    })
  }
  return (
    <div>
      <form onSubmit={onSubmit}>
      标题<input value={title} onChange={e => setTitle(e.target.value)} />
      内容<textarea value={value} onChange={e => setValue(e.target.value)} />
      <button>提交</button>
      </form>
    </div>
  )
}

export default EditTopic