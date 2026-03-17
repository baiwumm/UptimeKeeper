/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-01-07 17:28:12
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-03-17 10:37:42
 * @Description: 监控状态
 */
import { cn, Description, Tooltip } from "@heroui/react";
import { motion } from 'motion/react';
import { FC, useCallback } from 'react';

import { STATUS } from '@/enums';
import { useHeatmapDays } from '@/hooks/use-heatmap-days'
import { get, SECTION_CLASSNAME } from '@/lib/utils';

type MonitorAvailabilityProps = Pick<App.Monitor, 'status' | 'type' | 'interval'> & {
  data: App.Ratio[];
};

const DAYS = 30;

const MonitorAvailability: FC<MonitorAvailabilityProps> = ({
  status,
  type,
  interval,
  data = []
}) => {
  const raw = STATUS.raw(status);
  const color = get(raw, 'color', 'accent');

  const days = useHeatmapDays({ days: 30, data });

  const getBoxColor = useCallback(
    (ratio: number) => {
      if (status !== STATUS.UP) return 'bg-border';
      if (!ratio) return 'bg-border';
      if (ratio >= 99.99) return 'bg-success';
      if (ratio >= 90) return 'bg-warning';
      return 'bg-danger';
    },
    [status]
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
    <div className={cn(SECTION_CLASSNAME, 'space-y-3')}>
      {/* Header */}
      <div className="flex items-center gap-1">
        <div className={cn("size-1.5 rounded-full bg-border", `bg-${color}`)} />
        <span className="text-muted">{type}/{Math.floor(interval / 60)}m</span>
        <div className="size-1.5 rounded-full bg-border" />
        <span className={`text-${color}`}>{get(raw, 'label', '未知')}</span>
      </div>

      {/* Heatmap */}
      <div className="grid gap-[3px] grid-cols-[repeat(30,1fr)]">
        {days.map((d, i) => (
          <Tooltip key={d.date ?? i}>
            <Tooltip.Trigger>
              <motion.div
                className={cn('aspect-square rounded-[3px]', getBoxColor(Number(d.ratio)))}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              />
            </Tooltip.Trigger>
            <Tooltip.Content showArrow>
              <Tooltip.Arrow />
              <div className="text-xs space-y-1">
                <div className="font-semibold">{d.date}</div>
                <div>{renderTip(Number(d.ratio))}</div>
              </div>
            </Tooltip.Content>
          </Tooltip>
        ))}
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center">
        <Description>{DAYS} 天前</Description>
        <Description>今日</Description>
      </div>
    </div>
  );
};

export default MonitorAvailability;
