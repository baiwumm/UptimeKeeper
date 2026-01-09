/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-01-09 14:47:26
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-01-09 17:28:05
 * @Description: 监控健康概览
 */
import { TriangleAlert } from "lucide-react";
import { type FC } from 'react';
import useSWR from 'swr';

import ResponseTimeChart from './ResponseTimeChart';

import BlurFade from '@/components/BlurFade';
import { Alert, AlertIcon, AlertTitle } from '@/components/ui/alert';
import { Badge, BadgeDot } from '@/components/ui/badge';
import { CountingNumber } from '@/components/ui/counting-number';
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Spinner } from "@/components/ui/spinner";
import { cn, fetcher, get, SECTION_CLASSNAME } from '@/lib/utils';

type MonitorHealthDialogProps = {
  monitorId: number | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type MetricItem = {
  label: string;
  key: string;
}

// 总体可用率
const OVERALL_UPTIME: MetricItem[] = [
  { label: '近 24 小时', key: '1dRatio' },
  { label: '近 7 天', key: '7dRatio' },
  { label: '近 30 天', key: '30dRatio' },
  { label: '近 90 天', key: '90dRatio' },
]

// 响应时间
const RESPONSE_TIME: MetricItem[] = [
  { label: '平均响应时间', key: 'avg_response_time' },
  { label: '最短响应时间', key: 'min_response_time' },
  { label: '最长响应时间', key: 'max_response_time' },
]

const MonitorHealthDialog: FC<MonitorHealthDialogProps> = ({
  monitorId,
  open,
  onOpenChange,
}) => {
  // 请求站点接口
  const swrKey = open && monitorId ? `/api/uptimerobot/${monitorId}` : null;
  const { data, error, isValidating, isLoading } = useSWR(swrKey, fetcher, {
    revalidateOnFocus: false
  });
  const loading = open && (isLoading || isValidating);
  const shouldShowError = open && !loading && error;
  const { monitor = {} } = data || {};

  // 渲染主体内容
  const renderContent = () => {
    // 加载中
    if (loading) {
      return (
        <div className="flex items-center justify-center h-40">
          <div className="flex flex-col items-center gap-2">
            <Spinner className="size-6" variant="circle" />
            <span className="text-sm font-bold">加载中...</span>
          </div>
        </div>
      )
    }
    // 加载错误
    if (shouldShowError) {
      return (
        <Alert variant="destructive" appearance="outline">
          <AlertIcon>
            <TriangleAlert />
          </AlertIcon>
          <AlertTitle>获取监控详情失败，请稍后重试</AlertTitle>
        </Alert>
      )
    }

    return (
      <div className="flex flex-col gap-4">
        {/* 总体可用率 */}
        <BlurFade className="flex flex-col gap-2">
          <h1 className="text-muted-foreground text-sm font-medium">总体可用率</h1>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {OVERALL_UPTIME.map(({ label, key }) => (
              <div key={key} className={cn(SECTION_CLASSNAME, "flex flex-col items-center justify-center gap-1")}>
                <CountingNumber
                  to={Number(get(monitor, `${key}.ratio`, 0))}
                  className="text-xl font-bold text-gray-900 dark:text-gray-100"
                  format={(value) => `${Number((value ?? 0)).toFixed(2)}%`}
                />
                <div>{label}</div>
              </div>
            ))}
          </div>
        </BlurFade>
        {/* 响应时间趋势 */}
        <div className="flex flex-col gap-2">
          <BlurFade className="flex gap-2 items-center" delay={0.2}>
            <h1 className="text-muted-foreground text-sm font-medium">响应时间趋势</h1>
            <Badge appearance="light" size="sm">近 2 天</Badge>
          </BlurFade>
          {/* 响应时间趋势图表 */}
          <ResponseTimeChart data={monitor?.responseTimes || []} />
          <BlurFade className="grid gap-4 grid-cols-1 md:grid-cols-3" delay={0.6}>
            {RESPONSE_TIME.map(({ label, key }) => (
              <div key={key} className={cn(SECTION_CLASSNAME, "flex flex-col items-center justify-center gap-1")}>
                <CountingNumber
                  to={Number(get(monitor?.responseTimeStats, key, 0))}
                  className="text-xl font-bold text-gray-900 dark:text-gray-100"
                  format={(value) => `${value.toFixed(0)}ms`}
                />
                <div>{label}</div>
              </div>
            ))}
          </BlurFade>
        </div>
      </div>
    )
  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0">
        <DialogHeader className="pt-5 pb-3 m-0 border-b border-border">
          <div className="px-6 flex items-center gap-2">
            <DialogTitle>监控健康概览</DialogTitle>
            {monitor?.name && (
              <Badge variant="success" appearance="light">
                <BadgeDot />
                {monitor.name}
              </Badge>
            )}
          </div>
        </DialogHeader>
        <DialogBody className="p-4">
          {renderContent()}
        </DialogBody>
      </DialogContent>
    </Dialog>
  )
}
export default MonitorHealthDialog;