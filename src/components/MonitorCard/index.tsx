/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-01-07 09:52:46
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-01-09 10:48:10
 * @Description: 监控卡片
 */
import dayjs from 'dayjs';
import { type FC, useMemo } from 'react';

import MonitorThumbnail from './/MonitorThumbnail';
import MonitorAvailability from './MonitorAvailability';
import MonitorHeader from './MonitorHeader';
import MonitorIncident from './MonitorIncident';
import MonitorStats from './MonitorStats';

import { Card, CardContent } from '@/components/ui/card';
import { STATUS } from '@/enums';

type MonitorCardProps = {
  index: number;
} & App.Monitor;

const MonitorCard: FC<MonitorCardProps> = ({
  friendlyName,
  url,
  index,
  status,
  tags,
  monitor,
  type,
  interval,
  createDateTime,
  lastIncident
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
      <MonitorHeader index={index} friendlyName={friendlyName} url={url} tags={tags} raw={raw} />
      <CardContent className="flex flex-col gap-4">
        {/* 监控缩略图 */}
        <MonitorThumbnail url={url} friendlyName={friendlyName} />
        {/* 监控统计指标 */}
        <MonitorStats runningDays={runningDays} createdAt={createdAt} monitor={monitor} />
        {/* 监控状态 */}
        {monitor?.dailyRatios?.length ? (
          <MonitorAvailability status={status} type={type} interval={interval} data={monitor?.dailyRatios || []} />
        ) : null}
        {/* 监控故障 */}
        <MonitorIncident lastIncident={lastIncident} />
      </CardContent>
    </Card>
  )
}
export default MonitorCard;