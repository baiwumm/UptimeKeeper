/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-01-09 10:30:48
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-01-12 14:22:18
 * @Description: 监控卡片头部
 */
import { Link } from "lucide-react";
import { type FC } from 'react';

import { RippleButton } from "@/components/animate-ui/components/buttons/ripple";
import { Badge } from '@/components/ui/badge';
import { CardHeader, CardTitle, CardToolbar } from '@/components/ui/card';
import { Status, StatusIndicator, StatusLabel } from "@/components/ui/status";
import { STATUS } from '@/enums';
import { get } from '@/lib/utils';

type MonitorHeaderProps = {
  index: number;
  raw: ReturnType<typeof STATUS.raw>;
} & Pick<App.Monitor, 'friendlyName' | 'url' | 'tags'>

const MonitorHeader: FC<MonitorHeaderProps> = ({ index, friendlyName, url, tags, raw }) => {
  return (
    <CardHeader className="items-start pb-0">
      <CardTitle>
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold truncate text-gray-800 dark:text-gray-100">
            {String.fromCharCode(65 + (index % 26))}•{friendlyName}
          </span>
          <RippleButton asChild variant="ghost" radius="full" mode="icon" size='sm'>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`打开 ${friendlyName}`}
            >
              <Link />
            </a>
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
  )
}
export default MonitorHeader;