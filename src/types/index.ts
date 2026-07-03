import type { STATUS } from '@/enums';

/**
 * @description: 站点状态
 */
export type Status = typeof STATUS.valueType

/**
 * @description: 站点标签
 */
export type Tag = {
  id: number;
  color: string;
  name: string;
}

/**
 * @description: 站点
 */
export type Monitor = {
  id: number;
  status: Status; // 状态
  createDateTime: string; // 创建时间
  tags: Tag[]; // 标签
  type: string;
  url: string;
  friendlyName: string;
  lastIncident: null | {
    status: 'Resolved' | 'Ongoing';
    startedAt: string;
    duration?: number | null;
    reason: string;
    cause: number;
  };
  interval: number;
  stats?: {
    uptime: number
  }
}

/**
 * @description: 汇总运行时间统计
 */
export type UptimeLog = {
  type: string;
  datetime: string;
  duration: number | null;
}
export type UptimeStatistics = {
  overallUptime: number; // 所有监控器的综合可用率
  totalIncidents: number; // 故障事件总数
  totalTimeWithoutIncidents: number; // 所有监控器处于“正常运行”状态的累计总时长
  affectedMonitors: number; // 受影响的监控器数量
  mtbf: number; // 平均故障间隔时间
  logs: UptimeLog[];
} | undefined