import { memo } from 'react'
import Link from 'next/link'
import dayjs from 'dayjs'
import { getTabName } from '../../lib/helper'
const Topics = (props) => {
  const tab = props.tab
  return <ul>
    {
      props.list.map(item => (
        <li className="flex flex-col md:flex-row md:items-center items-start md:justify-between justify-start hover:bg-gray-100 px-4 py-4 border-b border-solid border-gray-200 last:border-b-0" key={item.id}>
          <div className="flex items-center">
            <Link href="/user/[name]" as={`/user/${item.author.loginname}`}>
              <a title={item.author.loginname} className="flex-shrink-0 pr-2 md:pr-0">
                <img className="w-8 h-8 rounded-sm" src={item.author.avatar_url} alt="avatar" />
              </a>
            </Link>
            {item.visit_count > -1 && (
              <span className="text-center w-20 flex-shrink-0 hidden md:inline-block" >
                <span title="回复数" className="text-sm">{item.reply_count}</span>
                <span className="text-xs text-gray-700">/</span>
                <span title="总点击数" className="text-xs text-gray-700">{item.visit_count}</span>
              </span>
            )}
            {
              item.top
                ? <span className="bg-green-500 px-1 py-0 text-xs rounded-sm text-white flex-shrink-0">置顶</span>
                : item.good
                  ? <span className="bg-green-500 px-1 py-0 text-xs rounded-sm text-white flex-shrink-0">精华</span>
                  : !tab && <span className="bg-gray-200 px-1 py-0 text-xs rounded-sm text-gray-600 flex-shrink-0">{getTabName(item.tab)}</span>
            }
            <Link href={`/topic/[id]`} as={`/topic/${item.id}`}>
              <a className="text-gray-700 md:pl-1 hover:underline ">{item.title}</a>
            </Link>

          </div>
          <div className="flex-shrink-0 flex justify-between w-full md:w-auto items-center">
            <span className="md:hidden text-center flex-shrink-0" >
              <span title="回复数" className="text-xs">{item.reply_count}</span>
              <span className="text-xs text-gray-700">/</span>
              <span title="总点击数" className="text-xs text-gray-700">{item.visit_count}</span>
            </span>
            <span className="text-xs text-gray-700">最后回复：{dayjs(item.last_reply_at).fromNow()}</span>
          </div>
        </li>
      ))
    }
  </ul>
}

export default memo(Topics)