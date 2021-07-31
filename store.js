import React, { useState, useEffect, useContext } from 'react'
import useSWR from 'swr'

const GlobalContext = React.createContext()


const useGlobalState = () => {
  return useContext(GlobalContext)
}
export { GlobalContext, useGlobalState }

export default function Provider(props) {
  const [token, setToken] = useState()
  const [loginname , setLoginname] = useState(null)
  useEffect(() => {
    setToken(localStorage.getItem('accesstoken'))
    setLoginname(localStorage.getItem('loginname'))
  }, [])
  const state = {
    token,
    setToken,
    loginname,
    setLoginname
  }
  return <GlobalContext.Provider value={state}>{props.children}</GlobalContext.Provider>
}

