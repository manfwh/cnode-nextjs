import React, { useState, useEffect, useContext } from 'react'

const GlobalContext = React.createContext()


const useGlobalState = () => {
  return useContext(GlobalContext)
}
export { GlobalContext, useGlobalState }

export default function Provider(props) {
  const [token, setToken] = useState()
  const [loginname , setLoginname] = useState(null)
  const [user, setUser] = useState(null)
  useEffect(() => {
    const accesstoken = localStorage.getItem('accesstoken')
    if(accesstoken) {
      fetch('https://cnodejs.org/api/v1/accesstoken', {
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `accesstoken=${accesstoken}`
      })
        .then((res) => res.json())
        .then(res => {
          if(res.success) {
            setUser({
              avatar_url: res.avatar_url,
              id: res.id,
              loginname: res.loginname
            })
            setToken(accesstoken)
            setLoginname(localStorage.getItem('loginname'))
          }
        })
    }
  }, [])
  const state = {
    token,
    user,
    setUser,
    setToken,
    loginname,
    setLoginname
  }
  return <GlobalContext.Provider value={state}>{props.children}</GlobalContext.Provider>
}

