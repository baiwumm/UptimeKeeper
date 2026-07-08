/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-09-10 15:24:53
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-07-08 16:16:15
 * @Description: 入口文件
 */
"use client"
import { useMemo, useState } from 'react';

import CountDownProgress from '@/components/CountDownProgress'
import Footer from '@/components/Footer';
import Header from "@/components/Header";
import MonitorContent from '@/components/MonitorContent'
import MonitorHealthDialog from '@/components/MonitorHealthDialog';
import StatisticCard from "@/components/StatisticCard";
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

  // 刷新数据
  const handleRefresh = () => {
    mutateMonitors()
    mutateStats()
  }
  return (
    <>
      {/* 头部 */}
      <Header />
      {/* 主体内容 */}
      <main className="container max-w-7xl mx-auto p-4 flex flex-col gap-4" style={{ minHeight: mainHeight }}>
        <CountDownProgress refresh={handleRefresh} loading={loading} />
        {/* 统计卡片 */}
        <StatisticCard
          statistics={statistics}
          monitorsLoading={monitorsLoading}
          statsLoading={statsLoading}
          uptimeStatistics={uptimeStatistics}
        />
        <MonitorContent
          monitors={monitors}
          loading={monitorsLoading}
          error={monitorsError}
          refresh={mutateMonitors}
          setMonitorId={setMonitorId}
        />
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
