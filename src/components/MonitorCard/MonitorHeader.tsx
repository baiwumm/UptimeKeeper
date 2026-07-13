/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-01-09 10:30:48
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-07-13 17:15:28
 * @Description: 监控卡片头部
 */
import { CircleFill } from "@gravity-ui/icons";
import { Card, Chip, cn, Link, Tooltip } from "@heroui/react";
import { type FC } from 'react';

import { STATUS } from '@/enums';
import { formatTimeAgo } from '@/lib/utils';
import type { Monitor } from '@/types'

type MonitorHeaderProps = {
  raw: ReturnType<typeof STATUS.raw>;
} & Pick<Monitor, 'friendlyName' | 'url' | 'tags' | 'currentStateDuration' | 'type'>

const MonitorHeader: FC<MonitorHeaderProps> = ({ friendlyName, url, tags, raw, currentStateDuration, type }) => {
  return (
    <Card.Header className="items-start pb-0">
      <Card.Title className="w-full">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1">
            <Link
              className="text-lg font-bold truncate text-default-foreground no-underline hover:underline underline-offset-5"
              href={url}
              target="_blank"
            >
              {friendlyName}
              <Link.Icon />
            </Link>
            {type && (
              <>
                <CircleFill width={6} className="text-accent" />
                <Chip variant='soft' color='accent' size='sm'>
                  <Chip.Label>{type}</Chip.Label>
                </Chip>
              </>
            )}
          </div>
          <Tooltip delay={0}>
            <Tooltip.Trigger aria-label="当前状态持续时间">
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
            </Tooltip.Trigger>
            <Tooltip.Content showArrow>
              <Tooltip.Arrow />
              {`当前状态已持续${formatTimeAgo(currentStateDuration)}`}
            </Tooltip.Content>
          </Tooltip>
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