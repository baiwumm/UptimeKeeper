import { MONITOR_TYPE, WEBSITE_STATUS } from '@/lib/utils';


/**
 * @description: 网站状态
 */
export type WebsiteStatus = typeof WEBSITE_STATUS[keyof typeof WEBSITE_STATUS];

/**
 * @description: 监控类型
 */
export type MonitorType = typeof MONITOR_TYPE[keyof typeof MONITOR_TYPE];

/**
 * @description: 标签
 */
export type Tag = {
  id: string;
  name: string;
  color: string;
}

/**
 * @description: 响应时间
 */
export type ResponseTime = {
  datetime: number;
  value: number;
}

/**
 * @description: 网站列表
 */
export type WebsiteItem = {
  status: WebsiteStatus; // 网站状态
  friendly_name: string; // 网站名称
  url: string; // 网站地址
  custom_uptime_ratio: string; // 正常运行时间比率(3位小数)
  response_times: ResponseTime[]; // 响应时间数据
  average_response_time: string; // 响应时间的平均值(3位小数)
  interval: number; // 监控检查的时间间隔（默认为300秒）
  type: MonitorType; // 监控类型
}