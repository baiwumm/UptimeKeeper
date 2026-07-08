/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-01-09 10:30:48
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-07-08 10:17:10
 * @Description: 监控卡片头部
 */
import { Card, Chip, cn, Link } from "@heroui/react";
import { type FC } from 'react';

import { STATUS } from '@/enums';

type MonitorHeaderProps = {
  raw: ReturnType<typeof STATUS.raw>;
} & Pick<App.Monitor, 'friendlyName' | 'url' | 'tags'>

const MonitorHeader: FC<MonitorHeaderProps> = ({ friendlyName, url, tags, raw }) => {
  return (
    <Card.Header className="items-start pb-0">
      <Card.Title className="w-full">
        <div className="flex justify-between items-center">
          <Link
            className="text-lg font-bold truncate text-default-foreground no-underline hover:underline underline-offset-5"
            href={url}
            target="_blank"
          >
            {friendlyName}
            <Link.Icon />
          </Link>
          <Chip variant='soft' color={raw?.color}>
            <div
              className={cn(
                "relative flex size-2.5 shrink-0 rounded-full",
                "before:absolute before:inset-0 before:animate-ping before:rounded-full before:bg-inherit",
                "after:absolute after:inset-0.5 after:rounded-full after:bg-inherit",
                `bg-${raw?.color ?? 'default'}`
              )}
            />
            <Chip.Label>{raw?.label}</Chip.Label>
          </Chip>
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