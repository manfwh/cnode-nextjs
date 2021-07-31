import useSWR from 'swr'

const useUser = username => {
  const {data} = useSWR(username ? `https://cnodejs.org/api/v1/user/${username}` : null)
  return data ? data.data : data
}

export default useUser