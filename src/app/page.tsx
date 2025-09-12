/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-09-10 15:24:53
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-09-12 10:13:22
 * @Description: 入口文件
 */
'use client';
import { Icon } from '@iconify/react'
import { useRequest } from 'ahooks';

import Header from '@/components/Header'
import StatisticalCard from '@/components/StatisticalCard'
import WebSiteCard from '@/components/WebSiteCard';
import type { WebsiteItem } from '@/lib/type';

export default function Home() {
  // 请求站点接口
  const { data, loading, run } = useRequest(async () => {
    const res = await fetch('/api/uptimerobot');
    const result = await res.json();
    return result;
  })
  return (
    <div className="flex flex-col justify-center gap-6">
      {/* 顶部标题栏 */}
      <Header run={run} loading={loading} />
      {/* 统计卡片 */}
      <StatisticalCard
        status={data?.length ? data.map((v: WebsiteItem) => v.status) : []}
        averageResponseTimes={data?.length ? data.map((v: WebsiteItem) => v.average_response_time) : []}
        loading={loading}
      />
      <div className="flex flex-col gap-6">
        {/* 加载状态 */}
        {loading ? (
          <div className="flex items-center justify-center p-12">
            <Icon
              icon="svg-spinners:180-ring-with-bg"
              className="w-12 h-12 text-gray-400 dark:text-gray-300 animate-spin"
            />
          </div>
        ) : data?.length ? (
          // 站点卡片
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
            {data.map((v: WebsiteItem, i: number) => (
              <WebSiteCard {...v} index={i} key={v.url} />
            ))}
          </div>
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
                获取监控数据失败，请稍后重试
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
