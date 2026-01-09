/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-01-07 09:52:46
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-01-09 10:03:37
 * @Description: 监控卡片
 */
import dayjs from 'dayjs';
import { Link } from "lucide-react";
import { type FC } from 'react';

import { RippleButton } from "@/components/animate-ui/components/buttons/ripple";
import DailyAvailability from '@/components/DailyAvailability';
import IncidentModal from '@/components/IncidentModal';
import MonitorThumbnail from '@/components/MonitorThumbnail';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardToolbar } from '@/components/ui/card';
import { CountingNumber } from '@/components/ui/counting-number';
import { Status, StatusIndicator, StatusLabel } from "@/components/ui/status";
import { STATUS } from '@/enums';
import { cn, get, SECTION_CLASSNAME } from '@/lib/utils';

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
  const raw = STATUS.raw(status);
  return (
    <Card>
      <CardHeader className="items-start">
        <CardTitle>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold truncate text-gray-800 dark:text-gray-100">
              {String.fromCharCode(65 + index)}•{friendlyName}
            </span>
            <RippleButton variant="ghost" radius="full" mode="icon" size='sm' onClick={() => window.open(url)}>
              <Link />
            </RippleButton>
          </div>
          {tags?.length ? (
            <div className="flex items-center gap-1 flex-wrap mt-1.5">
              {tags.map(({ id, name }) => (
                <Badge key={id} variant="secondary" size="sm">{name}</Badge>
              ))}
            </div>
          ) : null}
        </CardTitle>
        <CardToolbar>
          <Status variant={get(raw, 'status', 'default')}>
            <StatusIndicator />
            <StatusLabel>{get(raw, 'label', '未知')}</StatusLabel>
          </Status>
        </CardToolbar>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {/* 监控缩略图 */}
        <MonitorThumbnail url={url} friendlyName={friendlyName} />
        {/* 运行时间和可用性 */}
        <div className="grid grid-cols-2 gap-4">
          <div className={cn(SECTION_CLASSNAME, "flex flex-col gap-1")}>
            <div>已运行</div>
            <div className="flex items-center gap-1">
              <CountingNumber
                to={dayjs().diff(dayjs(createDateTime), 'day')}
                className="text-xl font-bold text-gray-900 dark:text-gray-100"
                format={(value) => `${Number((value || 0)).toFixed(0)}`}
              />
              <span>天</span>
            </div>
            <div>{dayjs(createDateTime).format('YYYY年MM月DD日')}</div>
          </div>
          <div className={cn(SECTION_CLASSNAME, "flex flex-col gap-1")}>
            <div>可用性</div>
            <CountingNumber
              to={Number(get(monitor, '30dRatio.ratio', 0))}
              className="text-xl font-bold text-gray-900 dark:text-gray-100"
              format={(value) => `${Number((value || 0)).toFixed(0)}%`}
            />
            <div>最近 30 天</div>
          </div>
        </div>
        {/* 可用率 图表 */}
        <DailyAvailability status={status} type={type} interval={interval} data={monitor?.dailyRatios || []} />
        {/* 最近一次故障 */}
        <IncidentModal lastIncident={lastIncident} />
      </CardContent>
    </Card>
  )
}
export default MonitorCard;