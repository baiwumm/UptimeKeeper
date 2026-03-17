/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-01-09 10:30:48
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-03-17 13:42:03
 * @Description: 监控卡片头部
 */
import { Card, Chip, Link } from "@heroui/react";
import { type FC } from 'react';

import { Status, StatusIndicator, StatusLabel } from "@/components/ui/status";
import { STATUS } from '@/enums';
import { get } from '@/lib/utils';

type MonitorHeaderProps = {
  index: number;
  raw: ReturnType<typeof STATUS.raw>;
} & Pick<App.Monitor, 'friendlyName' | 'url' | 'tags'>

const MonitorHeader: FC<MonitorHeaderProps> = ({ index, friendlyName, url, tags, raw }) => {
  return (
    <Card.Header className="items-start pb-0">
      <Card.Title className="w-full">
        <div className="flex justify-between items-center">
          <Link className="text-xl font-bold truncate text-default-foreground no-underline hover:underline underline-offset-5" href={url}>
            {String.fromCharCode(65 + (index % 26))}•{friendlyName}
            <Link.Icon />
          </Link>
          <Status variant={get(raw, 'color', 'default')}>
            <StatusIndicator />
            <StatusLabel>{get(raw, 'label', '未知')}</StatusLabel>
          </Status>
        </div>
      </Card.Title>
      {tags?.length ? (
        <Card.Description className="flex items-center gap-1 flex-wrap mt-1.5">
          {tags.map(({ id, name }) => (
            <Chip key={id} variant="soft" size="sm">{name}</Chip>
          ))}
        </Card.Description>
      ) : null}
    </Card.Header>
  )
}
export default MonitorHeader;