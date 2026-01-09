/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-09-12 08:52:46
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-01-09 10:19:15
 * @Description: 监控故障
 */
"use client"
import dayjs from 'dayjs';
import { ChevronUp, ThumbsUp, TriangleAlert } from "lucide-react";
import { type FC, useState } from 'react';

import { Alert, AlertIcon, AlertTitle, AlertToolbar } from '@/components/ui/alert';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn, formatTimeAgo, SECTION_CLASSNAME } from '@/lib/utils';

type MonitorIncidentPops = {
  lastIncident: App.Monitor['lastIncident'];
}

const ERROR_MESSAGES: Record<number, string> = {
  333333: "连接超时",
  444444: "无响应",
  100001: "DNS 解析失败",
  98: "离线状态",
  99: "失联状态",
};

const DEFAULT_ERROR_MESSAGE = "连接异常";
const MonitorIncident: FC<MonitorIncidentPops> = ({ lastIncident }) => {
  const [open, setOpen] = useState(false);
  // 是否仍在发生
  const isOngoing = lastIncident?.status === 'Ongoing';
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
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
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)]">
        {lastIncident ? (
          <Alert variant="destructive" appearance="light">
            <AlertIcon>
              <TriangleAlert />
            </AlertIcon>
            <AlertTitle>
              <div className="font-bold">{ERROR_MESSAGES[lastIncident?.cause] || DEFAULT_ERROR_MESSAGE}</div>
              <div className="mt-1 text-xs text-muted-foreground">{isOngoing ? '已持续' : '影响时长'}: {lastIncident?.duration ? formatTimeAgo(lastIncident?.duration) : '--'}</div>
            </AlertTitle>
            <AlertToolbar className="text-xs text-muted-foreground">
              开始于 {dayjs(lastIncident.startedAt).format('YYYY-MM-DD HH:mm')}
            </AlertToolbar>
          </Alert>
        ) : (
          <div className="text-xs text-muted-foreground flex items-center justify-center gap-2">
            <ThumbsUp size={16} />
            <span>太棒了，近期无故障记录!</span>
          </div>
        )}
      </PopoverContent>
    </Popover>
  )
}
export default MonitorIncident;