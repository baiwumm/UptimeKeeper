/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-01-05 18:01:01
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-07-13 16:32:47
 * @Description: 统计卡片
 */
import { ChartLineArrowUp, CircleFill } from "@gravity-ui/icons";
import { Card, Chip, cn, Description, Spinner } from "@heroui/react";
import NumberFlow from '@number-flow/react'
import { type FC, useMemo } from 'react';

import { MONITOR_STATISTICS } from '@/enums';
import type { MonitorResult } from '@/hooks/use-monitors'
import { get } from '@/lib/utils'
import type { UptimeStatistics } from '@/types'


type StatisticCardProps = {
  statistics: MonitorResult['statistics'];
  uptimeStatistics: UptimeStatistics;
  loading: boolean;
}

const StatisticCard: FC<StatisticCardProps> = ({ statistics, uptimeStatistics, loading = false }) => {
  // 卡片统计
  const overallUptime = useMemo(() => get(uptimeStatistics, 'overallUptime', 0), [uptimeStatistics])
  const overallUptimeChip = useMemo(() => {
    return overallUptime >= 0.99 ? {
      label: '优秀',
      color: 'success' as const
    } : overallUptime >= 0.9 ? {
      label: '良好',
      color: 'warning' as const
    } : {
      label: '糟糕',
      color: 'danger' as const
    }
  }, [overallUptime])
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 shrink-0">
      {MONITOR_STATISTICS.items.map(({ value, label, desc, color, icon: Icon }) => (
        <Card key={value} className='gap-0'>
          <Card.Header>
            <div className="flex justify-between items-center">
              <Card.Description>{label}</Card.Description>
              <div className={cn("rounded-lg p-2", color)}>
                <Icon className='size-6' />
              </div>
            </div>
          </Card.Header>
          <Card.Content>
            <NumberFlow
              value={loading ? 0 : get(statistics, value, 0)}
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
              {loading ? <Spinner size="sm" /> : overallUptime ? (
                <Chip variant="soft" size='sm' color={overallUptimeChip.color}>
                  <CircleFill width={6} />
                  <Chip.Label>{overallUptimeChip.label}</Chip.Label>
                </Chip>
              ) : null}
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
              style: 'percent',
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