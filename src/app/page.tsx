/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-09-10 15:24:53
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-09-11 09:34:24
 * @Description: 入口文件
 */
'use client';
import { Icon } from '@iconify/react'
import { useRequest } from 'ahooks';

import WebSiteCard from '@/components/WebSiteCard';
import type { WebsiteItem } from '@/lib/type';

export default function Home() {
  // 请求站点接口
  const { data, loading, run, error } = useRequest(async () => {
    const res = await fetch('/api/uptimerobot');
    const result = await res.json();
    return result;
  })
  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-6 p-4">
      {/* 站点卡片 */}
      {data?.length ? (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
          {data.map((v: WebsiteItem, i: number) => (
            <WebSiteCard {...v} index={i} key={v.url} />
          ))}
        </div>
      ) : (
        // 加载状态和错误提示
        <div className="flex items-center justify-center p-12">
          {loading ? (
            <Icon
              icon="svg-spinners:180-ring-with-bg"
              className="w-12 h-12 text-gray-400 dark:text-gray-300 animate-spin"
            />
          ) : (
            <div
              className="flex flex-col items-center gap-4 p-8 rounded-2xl bg-red-50/50 dark:bg-red-900/20 border-2 border-red-100 dark:border-red-800/50 backdrop-blur-sm animate-fade"
            >
              <div className="relative">
                <Icon icon="carbon:warning-filled" className="w-12 h-12 text-red-500/90 dark:text-red-400/90" />
                <div className="absolute inset-0 w-12 h-12 bg-red-500/20 dark:bg-red-400/20 rounded-full animate-ping" />
              </div>
              <div className="text-center">
                <div className="text-red-600 dark:text-red-400 font-medium mb-1">
                  {error?.message}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
