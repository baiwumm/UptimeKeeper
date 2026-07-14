/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-07-08 15:53:32
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-07-14 16:42:41
 * @Description: 监控列表
 */
import { Skeleton } from "@heroui/react";
import { type FC } from 'react';

import BlurFade from '@/components/BlurFade';
import EmptyContent from '@/components/EmptyContent';
import LoadingContent from "@/components/LoadingContent";
import MonitorCard from '@/components/MonitorCard';
import type { Monitor } from '@/types'

type MonitorContentProps = {
  monitors: Monitor[];
  loading: boolean;
}

const MonitorContent: FC<MonitorContentProps> = ({ monitors = [], loading = false }) => {
  // 加载中
  if (!loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <LoadingContent />
      </div>
    )
  }

  // 没数据
  if (!monitors.length) {
    return (
      <EmptyContent />
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {monitors.map((monitor) => (
        <BlurFade key={monitor.id} inView lazy fallback={<Skeleton className="h-100 rounded-lg" />}>
          <MonitorCard {...monitor} />
        </BlurFade>
      ))}
    </div>
  )
}
export default MonitorContent;