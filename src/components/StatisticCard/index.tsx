/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-01-05 18:01:01
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-03-17 11:09:53
 * @Description: 统计卡片
 */
import { Card, Description } from "@heroui/react";
import { DynamicIcon } from 'lucide-react/dynamic';
import { type FC } from 'react';

import { CountingNumber } from '@/components/ui/counting-number';
import { STATISTICS } from '@/enums';
import { get } from '@/lib/utils';

type StatisticCardProps = {
  statistics: App.Statistic;
  refreshKey: number;
}

const StatisticCard: FC<StatisticCardProps> = ({ statistics, refreshKey }) => {
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      {STATISTICS.items.map(({ value, label, raw }) => (
        <Card key={value} className="shadow-md border">
          <Card.Header>
            <div className="flex justify-between items-center">
              <Card.Title>{label}</Card.Title>
              <div className="bg-surface-secondary text-surface-foreground rounded-2xl p-2">
                <DynamicIcon name={raw.icon} size={20} className={`text-${raw.status}`} />
              </div>
            </div>
          </Card.Header>
          <Card.Content>
            <CountingNumber
              key={refreshKey}
              to={Number(get(statistics, raw.text, 0))}
              className="text-xl font-bold"
              format={(value) => `${Number((value || 0)).toFixed(0)}${raw.suffix}`}
            />
          </Card.Content>
          <Card.Footer>
            <Description>{raw.badge}</Description>
          </Card.Footer>
        </Card>
      ))}
    </div>
  )
}
export default StatisticCard;