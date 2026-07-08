/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-07-08 15:53:32
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-07-08 17:18:54
 * @Description: 监控列表
 */
import { type Dispatch, type FC, type SetStateAction } from 'react';

import BlurFade from '@/components/BlurFade';
import EmptyContent from '@/components/EmptyContent';
import ErrorContent from '@/components/ErrorContent';
import LoadingContent from "@/components/LoadingContent";
import MonitorCard from '@/components/MonitorCard';
import type { Monitor } from '@/types'

type MonitorContentProps = {
  monitors: Monitor[];
  loading: boolean;
  error: any;
  refresh: VoidFunction;
  setMonitorId: Dispatch<SetStateAction<number | null>>;
}

const MonitorContent: FC<MonitorContentProps> = ({ monitors = [], loading = false, error, refresh, setMonitorId }) => {
  // 加载中
  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <LoadingContent />
      </div>
    )
  }
  // 加载错误
  if (error) {
    return (
      <ErrorContent refresh={refresh} />
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
      {monitors.map((monitor, index) => (
        <BlurFade key={monitor.id} inView>
          <MonitorCard index={index} {...monitor} onShowResponse={() => setMonitorId(monitor.id)} />
        </BlurFade>
      ))}
    </div>
  )
}
export default MonitorContent;