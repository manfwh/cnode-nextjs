import useSWR from 'swr'

const useReplies = topicId => {
  const {data} = useSWR(`/api/topic/` + topicId)
  return data ? data.replies : data
}

export default useReplies