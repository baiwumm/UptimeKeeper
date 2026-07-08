/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-01-09 10:44:18
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-07-08 17:43:19
 * @Description: 监控统计指标
 */
import { cn, Description } from "@heroui/react";
import NumberFlow from '@number-flow/react'
import { type Dayjs } from 'dayjs';
import { type FC, useEffect, useState } from 'react';

import { SECTION_CLASSNAME } from '@/lib/utils';
import type { Monitor } from '@/types'

type MonitorStatsProps = {
  runningDays: number;
  createdAt: Dayjs;
} & Pick<Monitor, 'overallUptime'>;

const MonitorStats: FC<MonitorStatsProps> = ({ runningDays = 0, createdAt, overallUptime = 0 }) => {
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    // 下一帧更新，触发 NumberFlow 动画
    requestAnimationFrame(() => {
      setShouldAnimate(true);
    })
  }, [])
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className={cn(SECTION_CLASSNAME, "flex flex-col gap-1")}>
        <Description>已运行</Description>
        <div className="flex items-center gap-1 font-bold text-foreground">
          <NumberFlow
            value={shouldAnimate ? runningDays ?? 0 : 0}
            transformTiming={{
              duration: 2000,
              easing: 'ease-out',
            }}
            className="text-xl"
          />
          <span>天</span>
        </div>
        <Description>{createdAt.format('YYYY年MM月DD日')}</Description>
      </div>
      <div className={cn(SECTION_CLASSNAME, "flex flex-col gap-1")}>
        <Description>可用率</Description>
        <NumberFlow
          value={shouldAnimate ? overallUptime ?? 0 : 0}
          willChange
          format={{
            style: 'percent',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }}
          transformTiming={{
            duration: 2000,
            easing: 'ease-out',
          }}
          className="text-xl font-bold"
        />
        <Description>最近 30 天</Description>
      </div>
    </div>
  )
}
export default MonitorStats;