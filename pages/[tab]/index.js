import React, { useContext } from "react";
import useSWR from "swr";
import Link from "next/link";
import Layout from "@/components/Layout";
import Topics from "@/components/Topics";

import { GlobalContext } from "store";
const fetcher = (...args) => fetch(...args).then((res) => res.json());
export default function Home() {
  const { token, loginname } = useContext(GlobalContext);
  const { data } = useSWR(
    loginname ? `https://cnodejs.org/api/v1/user/${loginname}` : null,
    fetcher
  );
  const user = data?.data;
  return (
    <Layout>
      <div className="container md:container mx-auto grid grid-cols-1 md:grid-cols-main">
        <Topics />
        <div className="ml-4">
          {token ? (
            user && (
              <>
                <div className="bg-gray-200 text-sm px-2 py-2 rounded-t-md text-gray-600">
                  个人信息
                </div>
                <div className="bg-white px-2 py-2 rounded-b-md">
                  <div className="flex items-center">
                    <Link href="/user/[name]" as={`/user/${user.loginname}`}>
                      <a title={user.loginname}>
                        <img
                          src={user.avatar_url}
                          className="w-12 h-12 rounded"
                          alt="avatar"
                        />
                      </a>
                    </Link>
                    <Link href="/user/[name]" as={`/user/${user.loginname}`}>
                      <a>
                        <span className="ml-3 text-gray-600">
                          {user.loginname}
                        </span>
                      </a>
                    </Link>
                  </div>
                  <div className="mt-3 text-sm">积分：{user.score}</div>
                  <div className="italic text-gray-700 text-xs mt-2">
                    “
                    {user.signature
                      ? user.signature
                      : "这家伙很懒，什么个性签名都没有留下。"}
                    ”
                  </div>
                </div>
              </>
            )
          ) : (
            <div className="bg-white px-2 py-4">
              <h1>CNode：Node.js专业中文社区</h1>
              <div className="my-4 text-sm text-gray-500">您可以</div>
              <Link href="/signin">
                <a className="shadow inline-block bg-green-500 hover:bg-green-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-8 rounded">
                  登录
                </a>
              </Link>
            </div>
          )}
          <div className="bg-gray-200 text-sm px-2 py-2 rounded-t-md text-gray-600 mt-4">
            关于
          </div>
          <div className="bg-white p-4">
            <p className="text-sm mb-4">本项目只用作学习与交流，源码地址：</p>
            <a
              className="text-sm"
              target="_blank"
              without="true"
              rel="noreferrer"
              href="https://github.com/manfwh/cnode-nextjs"
            >
              https://github.com/manfwh/cnode-nextjs
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
}
