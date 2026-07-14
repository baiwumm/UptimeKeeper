/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-09-12 08:52:46
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-07-14 15:14:52
 * @Description: 监控故障
 */
"use client"
import { ChevronUp, ThumbsUpFill, TriangleExclamationFill } from '@gravity-ui/icons';
import { Alert, cn, Description, Popover, ScrollShadow } from "@heroui/react";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc'
import { type FC, useState } from 'react';

import { formatTimeAgo } from '@/lib/utils';
import type { Monitor } from '@/types'

dayjs.extend(utc)

type MonitorIncidentPops = {
  incidents: Monitor['incidents'];
}

const MonitorIncident: FC<MonitorIncidentPops> = ({ incidents = [] }) => {
  const [open, setOpen] = useState(false);
  return (
    <Popover isOpen={open} onOpenChange={setOpen}>
      <Popover.Trigger>
        <div className='rounded-xl p-4 bg-surface-secondary cursor-pointer flex justify-between items-center transition-transform hover:bg-default' >
          <Description>故障记录</Description>
          <ChevronUp className={cn('transition-transform text-muted', open ? 'rotate-180' : '')} />
        </div>
      </Popover.Trigger>
      <Popover.Content className="w-(--trigger-width)">
        <Popover.Dialog>
          <Popover.Arrow />
          {incidents.length ? (
            <ScrollShadow hideScrollBar className="max-h-80">
              <div className="space-y-2">
                {incidents.map(incident => (
                  <Alert key={incident.id} status="danger" className="border border-danger">
                    <Alert.Indicator>
                      <TriangleExclamationFill />
                    </Alert.Indicator>
                    <Alert.Content>
                      <Alert.Title className="font-bold">{incident.reason}</Alert.Title>
                      <Alert.Description>
                        <ul className="mt-1 list-inside list-disc space-y-1 text-xs">
                          <li>开始于 {dayjs.utc(incident.startedAt).format('YYYY-MM-DD HH:mm')}</li>
                          <li>持续时间: {incident?.duration ? formatTimeAgo(incident?.duration) : '-'}</li>
                        </ul>
                      </Alert.Description>
                    </Alert.Content>
                  </Alert>
                ))}
              </div>
            </ScrollShadow>
          ) : (
            <Description className="flex items-center justify-center gap-2">
              <ThumbsUpFill />
              <span>太棒了，近期无故障记录!</span>
            </Description>
          )}
        </Popover.Dialog>
      </Popover.Content>
    </Popover>
  )
}
export default MonitorIncident;