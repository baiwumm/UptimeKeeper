/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-01-07 17:28:12
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-07-13 10:28:36
 * @Description: 监控状态
 */
import { cn, Description, Tooltip } from "@heroui/react";
import { motion } from 'motion/react';
import { FC, useCallback } from 'react';

import { STATUS } from '@/enums';
import { formatTimeAgo, get, SECTION_CLASSNAME } from '@/lib/utils';
import type { Monitor } from '@/types'

type MonitorAvailabilityProps = {
  raw: ReturnType<typeof STATUS.raw>;
} & Pick<Monitor, 'status' | 'type' | 'interval' | 'dailyUptimes' | 'totalIncidents' | 'totalIncidentsDuration'>

const DAYS = 30;

const MonitorAvailability: FC<MonitorAvailabilityProps> = ({
  raw,
  status,
  type,
  interval,
  totalIncidents = 0,
  totalIncidentsDuration = 0,
  dailyUptimes = []
}) => {
  const color = get(raw, 'color', 'accent');

  const getBoxColor = useCallback(
    (ratio: number) => {
      if (status !== STATUS.UP) return raw?.color ? `bg-${raw.color}` : 'bg-default';
      if (!ratio) return 'bg-default';
      if (ratio >= 1) return 'bg-success';
      if (ratio >= 0.90) return 'bg-warning';
      return 'bg-danger';
    },
    [status, raw]
  );

  const renderTip = useCallback(
    (ratio: number) => {
      if (status !== STATUS.UP) return get(raw, 'label', '不可用');
      if (!ratio) return '无数据';
      return `可用率 ${(ratio * 100).toFixed(2)}%`;
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
      <div className="grid gap-0.75 grid-cols-[repeat(30,1fr)]">
        {dailyUptimes.map(d => (
          <Tooltip key={d.time} delay={0}>
            <Tooltip.Trigger>
              <motion.div
                className={cn('aspect-square rounded-sm', getBoxColor(Number(d.value)))}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              />
            </Tooltip.Trigger>
            <Tooltip.Content showArrow>
              <Tooltip.Arrow />
              <div className="text-xs space-y-1">
                <div className="font-semibold">{d.time}</div>
                <div>{renderTip(d.value)}</div>
              </div>
            </Tooltip.Content>
          </Tooltip>
        ))}
      </div>

      {/* Footer */}
      <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4">
        <Description className="whitespace-nowrap">{DAYS}天前</Description>
        <Description className="justify-self-center w-fit">
          {totalIncidents > 0 ? `最近${DAYS}天 ${totalIncidents} 次故障，总计${formatTimeAgo(totalIncidentsDuration)}` : '运行正常'}
        </Description>
        <Description className="whitespace-nowrap">{'  '}今日</Description>
      </div>
    </div>
  );
};

export default MonitorAvailability;
