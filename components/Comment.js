import { memo } from 'react';
import Link from 'next/link'
import dayjs from "dayjs";

import ThumbUpIcon from "@/components/svg/ThumbUp";

const Comment = ({ comment, index, onUpClick }) => {
  return (
    <li
      key={comment.id}
      className="px-3 py-3 border-solid border-b border-gray-200 flex last:border-b-0"
      id={comment.id}
    >
      <Link href={`/user/${comment.author.loginname}`}>
        <a className="flex-shrink-0">
          <img
            src={comment.author.avatar_url}
            className="w-8 h-8 rounded mr-3"
            alt="avatar"
          />
        </a>
      </Link>
      <div className="flex-grow">
        <div className="flex justify-between">
          <div>
            <Link href={`/user/${comment.author.loginname}`}>
              <a className="font-semibold text-xs">{comment.author.loginname}</a>
            </Link>
            <a
              href={`#${comment.id}`}
              className="text-xs text-blue-500 ml-2 hover:underline"
            >
              {index + 1}楼•{dayjs(comment.create_at).fromNow()}
            </a>
          </div>
          <span
            className="flex comments-center cursor-pointer"
            onClick={() => onUpClick(comment)}
          >
            <ThumbUpIcon
              className="w-4 h-4 text-gray-600 hover:text-gray-700 cursor-pointer"
              title="喜欢"
            />
            <span className="text-xs ml-1">{comment.ups.length}</span>
          </span>
        </div>
        <div className="prose prose-sm max-w-none mb-4">
          <div dangerouslySetInnerHTML={{ __html: comment.content }}></div>
        </div>
      </div>
    </li>
  )
}

export default memo(Comment)

