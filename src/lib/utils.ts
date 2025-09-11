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
  Up: '2', // 在线
  Paused: '0', // 暂停
  Prepare: '1', // 准备中
  Down: '9', // 离线
} as const;

/**
 * @description: 监控类型
 */
export const MONITOR_TYPE = {
  Https: '1',
  Keyword: '2',
  Ping: '3',
  Port: '4',
  Heartbeat: '5',
} as const;
