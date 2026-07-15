/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-01-07 17:28:12
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-07-15 09:49:45
 * @Description: 监控状态
 */
import { Calendar, CircleFill } from '@gravity-ui/icons';
import { cn, Description, Tooltip, Typography } from "@heroui/react";
import dayjs from 'dayjs';
import { motion } from 'motion/react';
import { FC, useCallback } from 'react';

import { STATUS } from '@/enums';
import { get, SECTION_CLASSNAME } from '@/lib/utils';
import type { Monitor } from '@/types'

type MonitorAvailabilityProps = {
  raw: ReturnType<typeof STATUS.raw>;
} & Pick<Monitor, 'status' | 'dailyUptimes' | 'createDateTime'>

const DAYS = 30;

const uptimeStatuses = [
  {
    label: '正常',
    content: '可用率 = 100%',
    color: 'text-success'
  },
  {
    label: '波动',
    content: '可用率 90% - 99%',
    color: 'text-warning'
  },
  {
    label: '故障',
    content: '可用率 < 90%',
    color: 'text-danger'
  }
]

const MonitorAvailability: FC<MonitorAvailabilityProps> = ({
  raw,
  status,
  dailyUptimes = [],
  createDateTime
}) => {
  const getBoxColor = useCallback(
    (ratio: number, time: string) => {
      if (dayjs(time).isBefore(dayjs(createDateTime), 'day')) {
        return 'scrollbar'
      }
      if (status !== STATUS.UP) return get(raw, 'color', 'scrollbar');
      if (!ratio) return 'scrollbar';
      if (ratio >= 1) return 'success';
      if (ratio >= 0.90) return 'warning';
      return 'danger';
    },
    [status, raw, createDateTime]
  );

  const renderTip = useCallback(
    (ratio: number, time: string) => {
      if (dayjs(time).isBefore(dayjs(createDateTime), 'day')) {
        return '暂无数据'
      }
      if (status !== STATUS.UP) return get(raw, 'label', '不可用');
      if (!ratio) return '无数据';
      return `可用率: ${(ratio * 100).toFixed(2)}%`;
    },
    [status, raw, createDateTime]
  );
  return (
    <div className={cn(SECTION_CLASSNAME, 'space-y-3')}>
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-1">
          <Calendar className="text-muted" />
          <Typography type="body-xs">最近 {DAYS} 天状态</Typography>
        </div>
        <div className="flex items-center gap-2 text-sm">
          {uptimeStatuses.map(({ label, content, color }, index) => (
            <Tooltip key={index} delay={0}>
              <Tooltip.Trigger aria-label={label}>
                <div className="flex items-center gap-1">
                  <CircleFill width={8} className={color} />
                  <Description>{label}</Description>
                </div>
              </Tooltip.Trigger>
              <Tooltip.Content showArrow>
                <Tooltip.Arrow />
                <Description>{content}</Description>
              </Tooltip.Content>
            </Tooltip>
          ))}
        </div>
      </div>
      {/* Heatmap */}
      <div className="grid gap-0.75 grid-cols-[repeat(30,1fr)]">
        {dailyUptimes.map(d => (
          <Tooltip key={d.time} delay={0}>
            <Tooltip.Trigger>
              <motion.div
                className='aspect-square rounded-full'
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                style={{ backgroundColor: `var(--${getBoxColor(d.value, d.time)})` }}
              />
            </Tooltip.Trigger>
            <Tooltip.Content showArrow>
              <Tooltip.Arrow />
              <div className="text-xs space-y-1">
                <div className="font-semibold">{d.time}</div>
                <div className="flex items-center gap-1">
                  <CircleFill width={8} style={{ color: `var(--${getBoxColor(d.value, d.time)})` }} />
                  <Description>{renderTip(d.value, d.time)}</Description>
                </div>
              </div>
            </Tooltip.Content>
          </Tooltip>
        ))}
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center gap-4">
        <Description>{dayjs().subtract(29, 'day').format('MM-DD')}</Description>
        <Description>{dayjs().format('MM-DD')}</Description>
      </div>
    </div>
  );
};

export default MonitorAvailability;
