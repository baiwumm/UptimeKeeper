/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-01-07 17:28:12
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-01-08 09:53:58
 * @Description: 网络状态
 */
import { motion } from 'motion/react';
import { FC, useCallback } from 'react';

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/animate-ui/components/animate/tooltip';
import { Badge, BadgeDot } from '@/components/ui/badge';
import { STATUS } from '@/enums';
import { useHeatmapDays } from '@/hooks/use-heatmap-days'
import { cn, get } from '@/lib/utils';

type Props = Pick<App.Monitor, 'status' | 'type' | 'interval'> & {
  data: App.Ratio[];
};

const DAYS = 30;

const DailyAvailability: FC<Props> = ({
  status,
  type,
  interval,
  data = []
}) => {
  const raw = STATUS.raw(status);

  const days = useHeatmapDays({ days: 30, data });

  const getBoxColor = useCallback(
    (ratio: number) => {
      if (status !== STATUS.UP) return get(raw, 'bg', 'bg-gray-300');
      if (!ratio) return 'bg-gray-300';
      if (ratio >= 99.99) return 'bg-green-500';
      if (ratio >= 90) return 'bg-yellow-500';
      return 'bg-red-500';
    },
    [status, raw]
  );

  const renderTip = useCallback(
    (ratio: number) => {
      if (status !== STATUS.UP) return get(raw, 'label', '不可用');
      if (!ratio) return '无数据';
      return `可用率 ${ratio}%`;
    },
    [status, raw]
  );
  return (
    <div className="rounded-md bg-secondary p-4 text-gray-500 dark:text-gray-400 text-xs space-y-3">
      {/* Header */}
      <Badge variant={get(raw, 'badge', 'secondary')} appearance="ghost">
        <BadgeDot />
        <span className="text-gray-500 dark:text-gray-400">{type}/{Math.floor(interval / 60)}m</span>
        <div className="size-1.5 rounded-full bg-gray-300 dark:bg-gray-600" />
        <span>{get(raw, 'label', '未知')}</span>
      </Badge>

      {/* Heatmap */}
      <div className="grid gap-[3px] grid-cols-[repeat(30,1fr)]">
        {days.map((d, i) => (
          <Tooltip key={d.date ?? i}>
            <TooltipTrigger asChild>
              <motion.div
                className={cn('aspect-square rounded-[3px]', getBoxColor(Number(d.ratio)))}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              />
            </TooltipTrigger>

            <TooltipContent>
              <div className="text-xs space-y-1">
                <div className="font-semibold">{d.date}</div>
                <div>{renderTip(Number(d.ratio))}</div>
              </div>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center text-gray-400">
        <span>{DAYS} 天前</span>
        <span>今日</span>
      </div>
    </div>
  );
};

export default DailyAvailability;
