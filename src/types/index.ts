import type { STATUS } from '@/enums';

/**
 * @description: 用户信息
 */
export type User = {
  email: string; // 账户邮箱
  fullName: string; // 账户姓名
  monitorsCount: number; // 当前已经创建的监控数
  monitorLimit: number; // 站点创建限制
  activeSubscription: {
    plan: string,
    monitorLimit: 0,
    expirationDate: string,
    status: string
  }
}

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

export type Ratio = {
  data?: string;
  label?: string;
  date: string;
  ratio: string | number;
}

/**
 * @description: 故障列表
 */
export type Incident = {
  id: string;
  status: 'Resolved' | 'Ongoing';
  startedAt: string;
  duration?: number | null;
  reason: string;
  cause: number;
  monitor: {
    id: number;
    friendlyName: string;
  }
}

/**
 * @description: 站点
 */
export type Monitor = {
  id: number;
  status: Status; // 状态
  createDateTime: string; // 创建时间
  currentStateDuration: number; // 当前状态持续时间
  tags: Tag[]; // 标签
  type: string;
  url: string;
  friendlyName: string;
  lastIncident: null | Incident;
  incidents: Incident[];
  interval: number;
  overallUptime: number; // 可用率
}

/**
 * @description: 汇总运行时间统计
 */
export type UptimeStatistics = {
  overallUptime: number; // 所有监控器的综合可用率
  totalIncidents: number; // 故障事件总数
  totalUptimeDuration: number; // 所有监控器处于“正常运行”状态的累计总时长
  affectedMonitors: number; // 受影响的监控器数量
} | null