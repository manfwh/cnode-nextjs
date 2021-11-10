import useSWR from 'swr'
import {useGlobalState} from '/store'
const useTopic = (topicId) => {
  const { token } = useGlobalState()
  const { data, mutate: mutateTopic } = useSWR(`/api/topic/${topicId}?accesstoken=${token}`)
  return { data, mutateTopic }
}

export default useTopic