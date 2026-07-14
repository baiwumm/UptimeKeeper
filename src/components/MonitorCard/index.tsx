/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-01-07 09:52:46
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-07-14 16:12:13
 * @Description: 监控卡片
 */
import { Card } from "@heroui/react";
import { type FC, useMemo } from 'react';

import MonitorAvailability from './MonitorAvailability';
import MonitorHeader from './MonitorHeader';
import MonitorStats from './MonitorStats';
import ResponseTimeContent from './ResponseTimeContent'

import { STATUS } from '@/enums';
import type { Monitor } from '@/types'

const MonitorCard: FC<Monitor> = ({
  id,
  friendlyName,
  url,
  status,
  tags,
  type,
  createDateTime,
  currentStateDuration,
  incidents = [],
  overallUptime = 0,
  totalIncidents = 0,
  totalIncidentsDuration = 0,
  dailyUptimes = []
}) => {
  // 获取原配置
  const raw = useMemo(() => STATUS.raw(status), [status]);
  return (
    <Card>
      {/* 头部 */}
      <MonitorHeader
        friendlyName={friendlyName}
        url={url}
        tags={tags}
        raw={raw}
        currentStateDuration={currentStateDuration}
        type={type}
      />
      <Card.Content className="flex flex-col gap-4">
        {/* 监控统计指标 */}
        <MonitorStats
          createDateTime={createDateTime}
          overallUptime={overallUptime}
          totalIncidents={totalIncidents}
          totalIncidentsDuration={totalIncidentsDuration}
          incidents={incidents}
        />
        {/* 监控状态 */}
        <MonitorAvailability raw={raw} status={status} dailyUptimes={dailyUptimes} />
        {/* 响应时间统计 */}
        <ResponseTimeContent monitorId={id} />
      </Card.Content>
    </Card>
  )
}
export default MonitorCard;