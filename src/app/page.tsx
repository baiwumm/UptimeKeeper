/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-09-10 15:24:53
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-07-08 14:48:45
 * @Description: 入口文件
 */
"use client"
import { useMemo, useState } from 'react';

import BlurFade from '@/components/BlurFade';
import CountDownProgress from '@/components/CountDownProgress'
import EmptyPage from '@/components/EmptyPage';
import ErrorPage from '@/components/ErrorPage';
import Footer from '@/components/Footer';
import Header from "@/components/Header";
import LoadingContent from "@/components/LoadingContent";
import MonitorCard from '@/components/MonitorCard';
import MonitorHealthDialog from '@/components/MonitorHealthDialog';
import StatisticCard from "@/components/StatisticCard";
import { Empty } from "@/components/ui/empty";
import { TIME_FRAME } from '@/enums'
import { useAvailableHeight } from '@/hooks/use-available-height';
import { useMonitors } from '@/hooks/use-monitors'
import { useUptimeStats } from '@/hooks/use-uptime-stats'

export default function Home() {
  // 监控 id
  const [monitorId, setMonitorId] = useState<number | null>(null);
  const [timeFrame] = useState(TIME_FRAME.MONTH);

  // 计算主体内容高度
  const mainHeight = useAvailableHeight({
    elementIds: ['header', 'footer'],
    debounceMs: 150,
  });

  // 获取站点列表
  const { monitors, monitorsLoading, monitorsError, mutateMonitors, statistics } = useMonitors();
  // 获取统计信息
  const { uptimeStatistics, statsLoading, mutateStats } = useUptimeStats(timeFrame);

  const loading = useMemo(() => monitorsLoading || statsLoading, [monitorsLoading, statsLoading])

  // 渲染主体内容
  const renderContent = () => {
    // 加载中
    if (monitorsLoading) {
      return (
        <Empty>
          <LoadingContent />
        </Empty>
      )
    }
    // 加载错误
    if (monitorsError) {
      return (
        <ErrorPage refresh={mutateMonitors} />
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

  // 刷新数据
  const handleRefresh = () => {
    mutateMonitors()
    mutateStats()
  }
  return (
    <>
      {/* 头部 */}
      <Header refresh={handleRefresh} loading={loading} />
      {/* 主体内容 */}
      <main className="container max-w-7xl mx-auto p-4 space-y-4" style={{ minHeight: mainHeight }}>
        <CountDownProgress refresh={handleRefresh} loading={loading} />
        {/* 统计卡片 */}
        <StatisticCard
          statistics={statistics}
          monitorsLoading={monitorsLoading}
          statsLoading={statsLoading}
          uptimeStatistics={uptimeStatistics}
        />
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
