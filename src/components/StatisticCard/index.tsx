/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-01-05 18:01:01
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-01-07 17:45:32
 * @Description: 统计卡片
 */
import { DynamicIcon } from 'lucide-react/dynamic';
import { type FC } from 'react';

import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardToolbar } from '@/components/ui/card';
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
        <Card key={value}>
          <CardHeader className="py-2">
            <CardTitle className="text-muted-foreground text-sm font-medium">{label}</CardTitle>
            <CardToolbar className="bg-secondary text-secondary-foreground rounded-md p-2" >
              <DynamicIcon name={raw.icon} size={20} className={raw.iconClass} />
            </CardToolbar>
          </CardHeader>
          <CardContent className="py-0">
            <CountingNumber
              key={refreshKey}
              to={Number(get(statistics, raw.text, 0))}
              className="text-xl font-bold"
              format={(value) => `${Number((value || 0)).toFixed(0)}${raw.suffix}`}
            />
          </CardContent>
          <CardFooter className="py-2 mt-2">
            <span className="text-muted-foreground text-sm font-medium">{raw.badge}</span>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
export default StatisticCard;