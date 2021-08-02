import useSWR from 'swr'
import {useGlobalState} from '/store'
const useReplies = topicId => {
  const {token} = useGlobalState()
  const {data, mutate: mutateReplies} = useSWR(`/api/topic/${topicId}?accesstoken=${token}`)
  return data ? {replies: data.replies, mutateReplies} : {replies: data, mutateReplies}
}

export default useReplies