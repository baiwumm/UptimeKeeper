/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-01-09 10:44:18
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-07-08 15:42:12
 * @Description: 监控统计指标
 */
import { cn, Description } from "@heroui/react";
import NumberFlow from '@number-flow/react'
import { type Dayjs } from 'dayjs';
import { type FC } from 'react';

import { SECTION_CLASSNAME } from '@/lib/utils';

type MonitorStatsProps = {
  runningDays: number;
  createdAt: Dayjs;
};

const MonitorStats: FC<MonitorStatsProps> = ({ runningDays = 0, createdAt }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className={cn(SECTION_CLASSNAME, "flex flex-col gap-1")}>
        <Description>已运行</Description>
        <div className="flex items-center gap-1 font-bold text-foreground">
          <NumberFlow value={runningDays} className="text-xl" />
          <span>天</span>
        </div>
        <Description>{createdAt.format('YYYY年MM月DD日')}</Description>
      </div>
      <div className={cn(SECTION_CLASSNAME, "flex flex-col gap-1")}>
        <Description>可用性</Description>
        <NumberFlow
          value={0.2}
          className="text-xl font-bold"
          format={{
            style: 'percent',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }}
        />
        <Description>最近 30 天</Description>
      </div>
    </div>
  )
}
export default MonitorStats;