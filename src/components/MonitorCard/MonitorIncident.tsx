/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-09-12 08:52:46
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-07-08 15:45:36
 * @Description: 监控故障
 */
"use client"
import { Alert, cn, Description, Popover } from "@heroui/react";
import dayjs from 'dayjs';
import { ChevronUp, ThumbsUp } from "lucide-react";
import { type FC, useState } from 'react';

import { formatTimeAgo, SECTION_CLASSNAME } from '@/lib/utils';
import type { Monitor } from '@/types'

type MonitorIncidentPops = {
  lastIncident: Monitor['lastIncident'];
}

const MonitorIncident: FC<MonitorIncidentPops> = ({ lastIncident }) => {
  const [open, setOpen] = useState(false);
  // 是否仍在发生
  const isOngoing = lastIncident?.status === 'Ongoing';
  return (
    <Popover isOpen={open} onOpenChange={setOpen}>
      <Popover.Trigger>
        <div className={cn(SECTION_CLASSNAME, 'cursor-pointer flex justify-between items-center')} >
          <span>{lastIncident ? '最近一次故障' : '运行状态'}</span>
          <ChevronUp
            size={16}
            className={cn(
              'transition-transform',
              open ? 'rotate-180' : ''
            )}
          />
        </div>
      </Popover.Trigger>
      <Popover.Content className="w-(--trigger-width)">
        <Popover.Dialog>
          <Popover.Arrow />
          {lastIncident ? (
            <Alert status="danger" className="border border-danger">
              <Alert.Indicator />
              <Alert.Content>
                <Alert.Title className="font-bold">{lastIncident.reason}</Alert.Title>
                <Alert.Description>
                  <ul className="mt-1 list-inside list-disc space-y-1 text-xs">
                    <li>开始于 {dayjs(lastIncident.startedAt).format('YYYY-MM-DD HH:mm')}</li>
                    <li>{isOngoing ? '已持续' : '影响时长'}: {lastIncident?.duration ? formatTimeAgo(lastIncident?.duration) : '--'}</li>
                  </ul>
                </Alert.Description>
              </Alert.Content>
            </Alert>
          ) : (
            <Description className="flex items-center justify-center gap-2">
              <ThumbsUp size={16} />
              <span>太棒了，近期无故障记录!</span>
            </Description>
          )}
        </Popover.Dialog>
      </Popover.Content>
    </Popover>
  )
}
export default MonitorIncident;