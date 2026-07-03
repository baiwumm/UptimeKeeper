/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-01-05 18:01:01
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-07-03 11:08:52
 * @Description: 统计卡片
 */
import { ChartLineArrowUp, CircleCheckFill, CircleFill, CircleXmarkFill, DisplayPulse } from "@gravity-ui/icons";
import { Card, Chip, cn, Description } from "@heroui/react";
import NumberFlow from '@number-flow/react'
import { type FC, useMemo } from 'react';

import { STATUS } from '@/enums';
import { get } from '@/lib/utils'
import type { Monitor, Status, UptimeStatistics } from '@/types'

// 正常状态
const normalStatus = new Set<Status>([
  STATUS.UP,
  STATUS.STARTED,
])
// 异常状态
const abnormalStatus = new Set<Status>([
  STATUS.DOWN,
  STATUS.LOOKS_DOWN
])

type StatisticCardProps = {
  monitors: Monitor[];
  uptimeStatistics: UptimeStatistics;
  loading: boolean;
}

const StatisticCard: FC<StatisticCardProps> = ({ monitors = [], uptimeStatistics, loading = false }) => {
  const stats = useMemo(() => {
    let normal = 0
    let abnormal = 0

    for (const m of monitors) {
      if (normalStatus.has(m.status)) {
        normal++
      } else if (abnormalStatus.has(m.status)) {
        abnormal++
      }
    }

    const total = monitors.length

    return {
      total,
      normal,
      abnormal,
    }
  }, [monitors])
  // 卡片统计
  const overallUptime = useMemo(() => get(uptimeStatistics, 'overallUptime', 0), [uptimeStatistics])
  const statisticItems = useMemo(() => [
    { label: '监控网站', value: stats.total, desc: '全部网站', color: 'success', icon: DisplayPulse },
    { label: '正常网站', value: stats.normal, desc: '访问正常', color: 'success', icon: CircleCheckFill },
    { label: '异常网站', value: stats.abnormal, desc: '访问异常', color: 'danger', icon: CircleXmarkFill },
  ], [stats])
  const overallUptimeChip = useMemo(() => {
    return overallUptime >= 0.99 ? {
      label: '优秀',
      color: 'success' as const
    } : overallUptime >= 0.1 ? {
      label: '良好',
      color: 'warning' as const
    } : {
      label: '糟糕',
      color: 'danger' as const
    }
  }, [overallUptime])
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      {statisticItems.map(({ value, label, desc, color, icon: Icon }, index) => (
        <Card key={index} className='gap-0'>
          <Card.Header>
            <div className="flex justify-between items-center">
              <Card.Description>{label}</Card.Description>
              <div className={cn("rounded-lg p-2", `bg-${color}-soft`)}>
                <Icon className={cn('size-6', `text-${color}`)} />
              </div>
            </div>
          </Card.Header>
          <Card.Content>
            <NumberFlow
              value={loading ? 0 : value}
              format={{
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }}
              className="text-2xl font-bold"
            />
          </Card.Content>
          <Card.Footer>
            <Description>{desc}</Description>
          </Card.Footer>
        </Card>
      ))}
      <Card className='gap-0'>
        <Card.Header>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1">
              <Card.Description>系统可用率</Card.Description>
              <Chip variant="soft" size='sm' color={overallUptimeChip.color}>
                <CircleFill width={6} />
                <Chip.Label>{overallUptimeChip.label}</Chip.Label>
              </Chip>
            </div>
            <div className="rounded-lg p-2 bg-warning-soft">
              <ChartLineArrowUp className='text-warning size-6' />
            </div>
          </div>
        </Card.Header>
        <Card.Content>
          <NumberFlow
            value={loading ? 0 : overallUptime}
            format={{
              style: 'percent' as const,
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }}
            className="text-2xl font-bold"
          />
        </Card.Content>
        <Card.Footer>
          <Description>最近 30 天</Description>
        </Card.Footer>
      </Card>
    </div>
  )
}
export default StatisticCard;