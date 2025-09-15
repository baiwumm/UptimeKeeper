import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * 智能合并 Tailwind CSS 类名
 * - 支持条件判断
 * - 自动去重
 * - 智能覆盖（如 p-4 p-8 → p-8）
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * @description: 网站状态
 */
export const WEBSITE_STATUS = {
  Up: 2, // 在线
  Paused: 0, // 暂停
  Prepare: 1, // 准备中
  Down: 9, // 离线
} as const;

/**
 * @description: 监控类型
 */
export const MONITOR_TYPE = {
  Https: 1,
  Keyword: 2,
  Ping: 3,
  Port: 4,
  Heartbeat: 5,
} as const;

/**
 * @description: 日志类型
 */
export const LOGS_TYPE = {
  Down: 1,
  Up: 2,
  Paused: 99,
  Started: 8,
} as const;

/**
 * @description: 主题模式
 */
export const THEME = {
  Light: 'light',
  Dark: 'dark',
} as const;

/**
 * @description: 生成近30天的查询字符串
 */
export function generateTimeRanges() {
  return Array.from({ length: 30 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - i)
    const start = new Date(date).setHours(0, 0, 0, 0)
    const end = new Date(date).setHours(23, 59, 59, 999)
    return `${Math.floor(start / 1000)}_${Math.floor(end / 1000)}`
  }).join('-')
}

/**
 * 计算时间戳距离当前的天数，不足一天也按一天算（向上取整），最大返回 30
 * @param timestamp - 时间戳（秒 或 毫秒）
 * @returns 天数（0 ~ 30）
 */
export const daysAgo = (timestamp: number): number => {
  const ms = timestamp < 10_000_000_000 ? timestamp * 1000 : timestamp;
  const diffMs = Date.now() - ms;

  if (diffMs < 0) return 0;
  if (diffMs === 0) return 0;

  const days = Math.ceil(diffMs / 86400000); // 86400000 = 24 * 60 * 60 * 1000
  return Math.min(days, 30);
}

/**
   * @param ms - 毫秒数
   * @returns 格式化后的字符串，如 "1小时9分钟" 或 "45秒"
   */
export const formatTimeAgo = (s: number): string => {
  if (s < 60) return `${s}秒`;
  const d = Math.floor(s / 86400);
  const h = Math.floor((s % 86400) / 3600);
  const m = Math.floor((s % 3600) / 60);
  return (d ? `${d}天` : '') + (h ? `${h}小时` : '') + (m ? `${m}分钟` : '');
};
