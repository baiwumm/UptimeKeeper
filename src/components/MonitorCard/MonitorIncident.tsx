/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-09-12 08:52:46
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-03-17 13:45:51
 * @Description: 监控故障
 */
"use client"
import { Alert, cn, Description, Popover } from "@heroui/react";
import dayjs from 'dayjs';
import { ChevronUp, ThumbsUp } from "lucide-react";
import { type FC, useState } from 'react';

import { formatTimeAgo, SECTION_CLASSNAME } from '@/lib/utils';

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
      <Popover.Content className="w-[var(--trigger-width)]">
        <Popover.Dialog>
          <Popover.Arrow />
          {lastIncident ? (
            <Alert status="danger" className="border border-danger">
              <Alert.Indicator />
              <Alert.Content>
                <Alert.Title className="font-bold">{ERROR_MESSAGES[lastIncident?.cause] || DEFAULT_ERROR_MESSAGE}</Alert.Title>
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