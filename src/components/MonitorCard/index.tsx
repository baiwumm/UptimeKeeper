/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-01-07 09:52:46
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-07-10 16:42:15
 * @Description: 监控卡片
 */
import { Card } from "@heroui/react";
import dayjs from 'dayjs';
import { type FC, useMemo } from 'react';

import MonitorAvailability from './MonitorAvailability';
import MonitorHeader from './MonitorHeader';
import MonitorIncident from './MonitorIncident';
import MonitorStats from './MonitorStats';
import ResponseTimeContent from './ResponseTimeContent'

import { STATUS } from '@/enums';
import type { Monitor } from '@/types'

type MonitorCardProps = {
  onShowResponse: VoidFunction;
} & Monitor;

const MonitorCard: FC<MonitorCardProps> = ({
  id,
  friendlyName,
  url,
  status,
  tags,
  type,
  interval,
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
  // 创建时间
  const createdAt = useMemo(
    () => dayjs(createDateTime),
    [createDateTime]
  );
  // 已运行时间
  const runningDays = Math.max(
    0,
    dayjs().diff(createdAt, 'day')
  );
  return (
    <Card>
      {/* 头部 */}
      <MonitorHeader friendlyName={friendlyName} url={url} tags={tags} raw={raw} currentStateDuration={currentStateDuration} />
      <Card.Content className="flex flex-col gap-4">
        {/* 监控统计指标 */}
        <MonitorStats runningDays={runningDays} createdAt={createdAt} overallUptime={overallUptime} />
        {/* 监控状态 */}
        <MonitorAvailability
          status={status}
          type={type}
          interval={interval}
          totalIncidents={totalIncidents}
          totalIncidentsDuration={totalIncidentsDuration}
          dailyUptimes={dailyUptimes}
        />
        {/* 响应时间统计 */}
        <ResponseTimeContent monitorId={id} />
        {/* 监控故障 */}
        <MonitorIncident incidents={incidents} />
      </Card.Content>
    </Card>
  )
}
export default MonitorCard;