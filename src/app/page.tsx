/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-09-10 15:24:53
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-07-13 09:56:21
 * @Description: 入口文件
 */
"use client"
import CountDownProgress from '@/components/CountDownProgress'
import Footer from '@/components/Footer';
import Header from "@/components/Header";
import MonitorContent from '@/components/MonitorContent'
import StatisticCard from "@/components/StatisticCard";
import { useAvailableHeight } from '@/hooks/use-available-height';
import { useMonitors } from '@/hooks/use-monitors'

export default function Home() {
  // 计算主体内容高度
  const mainHeight = useAvailableHeight({
    elementIds: ['header', 'footer'],
    debounceMs: 150,
  });

  // 获取站点列表
  const { monitors, loading, monitorsError, mutateMonitors, statistics, uptimeStatistics } = useMonitors();
  return (
    <>
      {/* 头部 */}
      <Header />
      {/* 主体内容 */}
      <main className="container max-w-7xl mx-auto p-4 flex flex-col gap-4" style={{ minHeight: mainHeight }}>
        <CountDownProgress refresh={mutateMonitors} loading={loading} />
        {/* 统计卡片 */}
        <StatisticCard statistics={statistics} loading={loading} uptimeStatistics={uptimeStatistics} />
        <MonitorContent monitors={monitors} loading={loading} error={monitorsError} refresh={mutateMonitors} />
      </main>
      {/* 底部版权 */}
      <Footer />
    </>
  );
}
