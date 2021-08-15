import useSWR from 'swr'
import {useGlobalState} from '/store'
const useTopic = (topicId, options = {}) => {
  const {token} = useGlobalState()
  const {data, mutate: mutateTopic} = useSWR(`/api/topic/${topicId}?accesstoken=${token}`, options)
  return {data, mutateTopic}
}

export default useTopic