import React, { useState, useEffect } from 'react'

const GlobalContext = React.createContext()

export { GlobalContext }

export default function Provider(props) {
  const [token, setToken] = useState()
  useEffect(() => {
    setToken(localStorage.getItem('accesstoken'))
  }, [])
  const state = {
    token,
    setToken
  }
  return <GlobalContext.Provider value={state}>{props.children}</GlobalContext.Provider>
}