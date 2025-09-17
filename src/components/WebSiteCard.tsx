/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-09-10 17:06:55
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-09-15 16:27:29
 * @Description: 站点卡片
 */
import { Icon } from '@iconify/react';
import Image from 'next/image';
import { useMemo, useState } from 'react';

import type { WebsiteItem, WebsiteStatus } from '@/lib/type';
import { cn, daysAgo, formatTimeAgo, LOGS_TYPE, ResponseDays, WEBSITE_STATUS } from '@/lib/utils';

import AverageResponseTimeModal from './AverageResponseTimeModal';
import CountUp from './CountUp'
import ErrorRecord from './ErrorRecord'
import ResponseTimeLine from './ResponseTimeLine';

type StatusConfig = Record<WebsiteStatus, {
  text: string; // 状态文案
  color: string; // 状态颜色
  hoverBorderColor: string; // 鼠标移入边框动画
  classes: string;
  dot: string; // 状态 Dot
  chartClasses: string; // 响应时间图标样式
}>

type WebSiteCardProps = {
  index: number; // 索引
} & WebsiteItem;

export default function WebSiteCard({
  id,
  status,
  friendly_name,
  index,
  url,
  custom_uptime_ratio,
  average_response_time,
  interval,
  type,
  response_times = [],
  logs,
  create_datetime,
  custom_uptime_ranges
}: WebSiteCardProps) {
  const [open, setOpen] = useState(false);
  /**
 * 状态配置映射
 */
  const STATUS_CONFIG: StatusConfig = {
    [WEBSITE_STATUS.Up]: {
      text: "在线",
      color: "text-green-500",
      hoverBorderColor: "after:border-green-500/50 dark:after:border-green-400/50",
      classes: "bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400",
      dot: "bg-green-500 dark:bg-green-400",
      chartClasses: "text-green-500 hover:text-green-600 dark:hover:text-green-300 hover:bg-green-50 dark:hover:bg-green-900/30",
    },
    [WEBSITE_STATUS.Paused]: {
      text: "暂停",
      color: "text-yellow-500",
      hoverBorderColor: "after:border-yellow-500/50 dark:after:border-yellow-400/50",
      classes: "bg-yellow-50 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400",
      dot: "bg-yellow-500 dark:bg-yellow-400",
      chartClasses: "text-yellow-500 hover:text-yellow-600 dark:hover:text-yellow-300 hover:bg-yellow-50 dark:hover:bg-yellow-900/30",
    },
    [WEBSITE_STATUS.Prepare]: {
      text: "准备中",
      color: "text-yellow-500",
      hoverBorderColor: "after:border-yellow-500/50 dark:after:border-yellow-400/50",
      classes: "bg-yellow-50 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400",
      dot: "bg-yellow-500 dark:bg-yellow-400",
      chartClasses: "text-yellow-500 hover:text-yellow-600 dark:hover:text-yellow-300 hover:bg-yellow-50 dark:hover:bg-yellow-900/30",
    },
    [WEBSITE_STATUS.Down]: {
      text: "离线",
      color: "text-red-500",
      hoverBorderColor: "after:border-red-500/50 dark:after:border-red-400/50",
      classes: "bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400",
      dot: "bg-red-500 dark:bg-red-400",
      chartClasses: "text-red-500 hover:text-red-600 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/30",
    },
  };
  const statusConfig = STATUS_CONFIG[status];

  // 截取域名
  const extractDomainPart = (url: string) => {
    // 创建一个URL对象
    const urlObj = new URL(url);

    // 获取主机名(hostname)
    const hostname = urlObj.hostname;

    // 分割主机名部分
    const parts = hostname.split(".");

    // 处理不同的域名情况
    if (parts.length === 3 && parts[0] !== "www") {
      // 类似 https://react.baiwumm.com 的情况 - 返回第一个部分
      return parts[0];
    } else if (parts.length === 2 || (parts.length === 3 && parts[0] === "www")) {
      // 类似 https://baiwumm.com 或 https://www.baiwumm.com 的情况 - 返回 'www'
      return "www";
    }

    // 默认情况
    return hostname;
  }

  // 监控类型映射
  const monitorTypeMap = ['', 'HTTPS', 'KEYWORD', 'PING', 'PORT', 'HEARTBEAR'];

  // 过滤宕机的日志
  const downRecords = useMemo(() => {
    const thirtyDaysAgo = Math.floor((Date.now() - ResponseDays * 24 * 60 * 60 * 1000) / 1000);
    return logs
      .filter((v) => v.type === LOGS_TYPE.Down && v.datetime >= thirtyDaysAgo)
      .sort((a, b) => b.datetime - a.datetime);
  }, [logs]); // 只有当 logs 变化时，才重新执行这个函数

  /**
 * 获取宕机统计信息
 */
  const getDowntimeStats = () => {
    const downtimeCount = downRecords.length;
    const totalDowntime = downRecords.reduce((total, log) => total + (log.duration || 0), 0);
    const validDays = daysAgo(create_datetime);

    if (validDays <= 0) return "暂无数据";

    if (downtimeCount > 0 || status === WEBSITE_STATUS.Down) {
      if (downtimeCount > 0) {
        return `最近${validDays}天 ${downtimeCount} 次故障，总计${formatTimeAgo(totalDowntime)}`;
      }
      return "当前离线";
    }
    return `最近${validDays}天运行正常`;
  };
  return (
    <>
      <div
        className={cn(
          'card-base animated-border p-6 rounded-2xl backdrop-blur-sm animate-fade',
          'after:absolute after:inset-0 after:rounded-2xl after:border after:pointer-events-none',
          // 动态边框颜色
          statusConfig.hoverBorderColor
        )}
        onMouseEnter={(e) => {
          e.currentTarget.classList.add('hovered');
        }}
      >
        <div className="flex flex-col gap-4">
          {/* 卡片头部：标题和状态指示器 */}
          <div className="flex items-center justify-between">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold truncate text-gray-800 dark:text-gray-100">
                  {String.fromCharCode(65 + index)}•{friendly_name}
                </h2>
                <Icon
                  icon="bi:link-45deg"
                  className="w-5 h-5 p-1.5 rounded-full transition-colors duration-200 text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-500 dark:hover:text-gray-400 dark:hover:bg-gray-700/50 box-content cursor-pointer"
                  onClick={() => window.open(url)}
                />
              </div>
            </div>
            <div className="shrink-0">
              <div
                className={cn('inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-medium text-sm whitespace-nowrap', STATUS_CONFIG[status]?.classes)}
              >
                <div className="relative flex">
                  <div className={cn('w-3 h-3 rounded-full', statusConfig.dot)} />
                  <div className={cn('absolute inset-0 w-3 h-3 rounded-full animate-ping opacity-75', statusConfig.dot)} />
                </div>
                <span>{STATUS_CONFIG[status]?.text}</span>
              </div>
            </div>
          </div>
          {/* 图片容器 - 带精致边框和悬浮动画 */}
          <div
            className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 p-5"
          >
            {/* 主图 */}
            <Image
              src={`/${extractDomainPart(url)}.png`}
              alt="网站缩略图"
              width={1052}
              height={548}
              priority
              className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105 aspect-[526/274]"
            />

            {/* 图片底部装饰条 */}
            <div
              className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/60 to-transparent flex items-end p-1 pl-4"
            >
              <span className="text-white font-medium text-sm tracking-wider">{url}</span>
            </div>

            {/* 悬浮时显示的半透明蒙层 */}
            <div
              className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
            >
              <button
                className="px-6 py-2 bg-white/90 rounded-full text-gray-800 font-medium shadow-lg flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 cursor-pointer"
                onClick={() => window.open(url)}
              >
                <Icon icon="ri:eye-line" className="w-5 h-5" />
                去看看
              </button>
            </div>
          </div>
          {/* 响应时间和运行时间统计卡片 */}
          <div className="grid grid-cols-2 gap-4">
            <div className="inner-card relative">
              <Icon
                icon="ri:line-chart-line"
                onClick={() => setOpen(true)}
                className={cn('absolute top-3 right-3 w-4 h-4 p-1 rounded-full transition-colors duration-200 box-content cursor-pointer', statusConfig.chartClasses)}
              />
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">平均响应时间</div>
              <div className="text-xl font-bold text-gray-900 dark:text-gray-100">
                <CountUp
                  from={0}
                  to={Number(Number(average_response_time).toFixed(0))}
                  separator=","
                  direction="up"
                  duration={1}
                />
                <span>ms</span>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">最近24小时</div>
            </div>
            <div className="inner-card">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">正常运行时间比率</div>
              <div className="text-xl font-bold text-gray-900 dark:text-gray-100">
                <CountUp
                  from={0}
                  to={Number(Number(custom_uptime_ratio).toFixed(2))}
                  separator=","
                  direction="up"
                  duration={1}
                />
                <span>%</span>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">最近{daysAgo(create_datetime)}天</div>
            </div>
          </div>
          {/* 状态时间线图表 */}
          <div className="inner-card">
            {/* 监控类型和状态指示器 */}
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-4">
              <div className="flex items-center gap-1">
                <div className="relative flex">
                  <div className={cn('w-2 h-2 rounded-full', statusConfig.dot)} />
                  <div className={cn('absolute inset-0 w-2 h-2 rounded-full animate-ping opacity-75', statusConfig.dot)} />
                </div>
                <span className="text-xs">{monitorTypeMap[type] || 'HTTP'} / {Math.floor(interval / 60)}m</span>
                <div className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600" />
                <span className={cn('text-xs font-medium', statusConfig.color)}>
                  {statusConfig?.text}
                </span>
              </div>
            </div>
            {/* 响应时间轴 */}
            <ResponseTimeLine create_datetime={create_datetime} status={status} custom_uptime_ranges={custom_uptime_ranges} />
            <div className="flex justify-between text-xs text-gray-400 mt-2">
              <span>{ResponseDays}天前</span>
              <span className="text-gray-500">{getDowntimeStats()}</span>
              <span>今日</span>
            </div>
          </div>
          {/* 故障记录列表 */}
          <ErrorRecord id={id} logs={logs} />
        </div>
      </div>
      {/* 响应时间模态框 */}
      <AverageResponseTimeModal isOpen={open} onClose={() => setOpen(false)} response_times={response_times} />
    </>
  )
}