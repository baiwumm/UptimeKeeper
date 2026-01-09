/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-01-09 10:44:18
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-01-09 10:47:01
 * @Description: 监控统计指标
 */
import { type Dayjs } from 'dayjs';
import { type FC } from 'react';

import { CountingNumber } from '@/components/ui/counting-number';
import { cn, get, SECTION_CLASSNAME } from '@/lib/utils';

type MonitorStatsProps = {
  runningDays: number;
  createdAt: Dayjs;
} & Pick<App.Monitor, 'monitor'>;

const MonitorStats: FC<MonitorStatsProps> = ({ runningDays = 0, createdAt, monitor }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className={cn(SECTION_CLASSNAME, "flex flex-col gap-1")}>
        <div>已运行</div>
        <div className="flex items-center gap-1">
          <CountingNumber
            to={runningDays}
            className="text-xl font-bold text-gray-900 dark:text-gray-100"
            format={(value) => `${Number((value || 0)).toFixed(0)}`}
          />
          <span>天</span>
        </div>
        <div>{createdAt.format('YYYY年MM月DD日')}</div>
      </div>
      <div className={cn(SECTION_CLASSNAME, "flex flex-col gap-1")}>
        <div>可用性</div>
        <CountingNumber
          to={Number(get(monitor, '30dRatio.ratio', 0))}
          className="text-xl font-bold text-gray-900 dark:text-gray-100"
          format={(value) => `${Number((value ?? 0)).toFixed(2)}%`}
        />
        <div>最近 30 天</div>
      </div>
    </div>
  )
}
export default MonitorStats;