import { useState, useContext } from 'react'
import Link from 'next/link'
import Router from 'next/router'
import Layout from '@/components/Layout'
import { GlobalContext } from '../store'
const Signin = () => {
  const [token, setToken] = useState('')
  const {token:accesstoken, setToken: setAccesstoken, setLoginname} = useContext(GlobalContext)
  const onSubmit = event => {
    event.preventDefault();
    if(token) {
      fetch(`https://cnodejs.org/api/v1/accesstoken`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `accesstoken=${token}`
      })
      .then(res => res.json())
      .then(res => {
        if(res.success) {
          localStorage.setItem('accesstoken', token)
          localStorage.setItem('loginname', res.loginname)
          setAccesstoken(token)
          setLoginname(res.loginname)

        } else {
          alert(res.error_msg)
        }
      })
      .catch(err => {
        console.log(err)
      })
    }
  }
  if(accesstoken) {
    Router.back()
  }
  return (
    <Layout>
      <div className="container mx-auto md:flex px-4">
        <div className="flex-grow md:mr-8">
          <div className="bg-gray-200 text-sm px-2 py-2 rounded-t-md text-gray-600">
            <Link href="/"><a className="text-green-500">主页</a></Link> / 登录
        </div>
          <div className="bg-white pt-12 flex justify-center p-8">
            <form className="w-full" onSubmit={onSubmit}>
              <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                  <label className="block md:text-right  mr-4 text-gray-500 font-bold mb-1 md:mb-0">accessToken:</label>
                </div>
                <div className="md:w-2/3 md:flex">
                  <input type="text" placeholder="请输入您的accessToken" className="transition-colors duration-100 ease-in-out border-transparent border-gray-300 placeholder-gray-600  rounded border-2 focus:outline-none focus:border-green-500  py-1 px-4   appearance-none leading-normal ds-input" name="token" onChange={e => setToken(e.target.value)} value={token} />
                </div>
              </div>
              <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3"></div>
                <div className="md:w-2/3">
                  <button className="shadow bg-green-500 hover:bg-green-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-8 rounded" type="submit">登录</button>
                </div>
              </div>
              <div className="md:flex md:items-center mb-6">
                <p className="text-sm text-gray-500">如何获取 accessToken？ <a className="text-blue-500 font-bold" target="_blank" href="https://cnodejs.org">cnode</a> 社区登录后在设置页面可以看到自己的 accessToken。 </p>
              </div>
              
            </form>
          </div>
        </div>
        <div className="md:w-64 mt-4 md:mt-0">
          <div className="bg-gray-200 text-sm px-2 py-2 rounded-t-md text-gray-600">关于</div>
          <div className="bg-white p-4">
            <p className="text-sm mb-4">CNode：Node.js专业中文社区</p>
            <p className="text-sm mb-4">在这里你可以：</p>
            <ul className="list-disc list-inside text-sm text-gray-700">
              <li className="mb-2">向别人提出你遇到的问题</li>
              <li className="mb-2">帮助遇到问题的人</li>
              <li className="mb-2">分享自己的知识</li>
              <li className="mb-2">和其它人一起进步</li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Signin