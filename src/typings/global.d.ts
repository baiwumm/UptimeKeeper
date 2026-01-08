declare namespace App {

  type Statistic = {
    uptime?: {
      l1: {
        label: string;
        radio: string;
      },
      l7: {
        label: string;
        radio: string;
      },
      30: {
        label: string;
        radio: string;
      },
      90: {
        label: string;
        radio: string;
      }
    }
    counts?: {
      total: number;
      down: number;
      up: number;
      paused: number;
    };
  }

  /** @description: 监控卡片 */
  type Tag = {
    id: number;
    color: string;
    name: string;
  }
  type Ratio = {
    data?: string;
    label?: string;
    date: string;
    ratio: string | number;
  }
  type MonitorStatistics = {
    monitorId: number;
    dailyRatios: Ratio[];
    '30dRatio': Ratio;
    '90dRatio': Ratio;
  }
  type Monitor = {
    id: number;
    status: typeof import('@/enums').STATUS.valueType; // 状态
    createDateTime: string; // 创建时间
    tags: Tag[]; // 标签
    type: string;
    url: string;
    friendlyName: string;
    monitor: MonitorStatistics;
    lastIncident: null | {
      status: 'Resolved' | 'Started';
      startedAt: string;
      duration: number;
      reason: string;
    };
    interval: number;
  }
}