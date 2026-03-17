/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-09-10 15:24:53
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-03-16 18:11:24
 * @Description: 入口文件
 */
"use client"
import { useState } from 'react';
import useSWR from 'swr';

import BlurFade from '@/components/BlurFade';
import EmptyPage from '@/components/EmptyPage';
import ErrorPage from '@/components/ErrorPage';
import Footer from '@/components/Footer';
import Header from "@/components/Header";
import LoadingContent from "@/components/LoadingContent";
import MonitorCard from '@/components/MonitorCard';
import MonitorHealthDialog from '@/components/MonitorHealthDialog';
import StatisticCard from "@/components/StatisticCard";
import { Empty } from "@/components/ui/empty";
import { useAvailableHeight } from '@/hooks/use-available-height';
import { fetcher } from '@/lib/utils';

export default function Home() {
  // 统计卡片刷新标识
  const [refreshKey, setRefreshKey] = useState(0);
  // 监控 id
  const [monitorId, setMonitorId] = useState<number | null>(null);

  // 计算主体内容高度
  const mainHeight = useAvailableHeight({
    elementIds: ['header', 'footer'],
    debounceMs: 150,
  });

  // 请求站点接口
  const { data, error, isValidating, isLoading, mutate } = useSWR('/api/uptimerobot', fetcher, {
    revalidateOnFocus: false,
    onSuccess: (data) => {
      if (data) {
        setRefreshKey(prev => prev + 1);
      }
    }
  });
  const loading = isValidating || isLoading;
  const monitors: App.Monitor[] = data?.data || [];
  const statistics = data?.statistics;

  // 手动刷新函数
  const refresh = () => {
    mutate()
  }

  // 渲染主体内容
  const renderContent = () => {
    // 加载中
    if (loading) {
      return (
        <Empty>
          <LoadingContent />
        </Empty>
      )
    }
    // 加载错误
    if (error) {
      return (
        <ErrorPage refresh={refresh} />
      )
    }
    // 没数据
    if (!monitors.length) {
      return (
        <EmptyPage />
      )
    }
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {monitors.map((monitor, index) => (
          <BlurFade key={monitor.id} inView>
            <MonitorCard index={index} {...monitor} onShowResponse={() => setMonitorId(monitor.id)} />
          </BlurFade>
        ))}
      </div>
    )
  }
  return (
    <>
      {/* 头部 */}
      <Header refresh={refresh} loading={loading} />
      {/* 主体内容 */}
      <main className="container max-w-320 mx-auto p-4 flex flex-col gap-4" style={{ minHeight: mainHeight }}>
        {/* 统计卡片 */}
        <StatisticCard statistics={statistics} refreshKey={refreshKey} />
        {renderContent()}
      </main>
      {/* 底部版权 */}
      <Footer />
      {/* 监控健康概览 */}
      <MonitorHealthDialog
        monitorId={monitorId}
        open={!!monitorId}
        onOpenChange={(open) => {
          if (!open) setMonitorId(null);
        }} />
    </>
  );
}
