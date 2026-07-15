import { CircleCheckFill, CircleXmarkFill, DisplayPulse } from "@gravity-ui/icons";
import { Enum } from 'enum-plus';

/**
 * @description: 请求状态
 */
export const RESPONSE = Enum({
  SUCCESS: { value: 200, label: '请求成功' },
  ERROR: { value: 500, label: '请求失败' }
})

/**
 * @description: 主题模式
 */
export const THEME_MODE = Enum({
  LIGHT: { value: 'light', label: 'Light', icon: 'sun' },
  DARK: { value: 'dark', label: 'Dark', icon: 'moon' },
  SYSTEM: { value: 'system', label: 'System', icon: 'laptop' }
});

/**
 * @description: 站点状态
 */
export const STATUS = Enum({
  UP: { value: 'UP', label: '在线', color: 'success', textColor: 'text-success', bgColor: 'bg-success' },
  DOWN: { value: 'DOWN', label: '已离线', color: 'danger', textColor: 'text-danger', bgColor: 'bg-danger' },
  LOOKS_DOWN: { value: 'LOOKS_DOWN', label: '疑似宕机', color: 'danger', textColor: 'text-danger', bgColor: 'bg-danger' },
  PAUSED: { value: 'PAUSED', label: '已暂停', color: 'warning', textColor: 'text-warning', bgColor: 'bg-warning' },
  STARTED: { value: 'STARTED', label: '准备中', color: 'warning', textColor: 'text-warning', bgColor: 'bg-warning' },
});

/**
 * @description: 站点统计
 */
export const MONITOR_STATISTICS = Enum({
  TOTAL: { value: 'total', label: '监控网站', desc: '全部网站', color: 'text-success bg-success-soft', icon: DisplayPulse },
  NORMAL: { value: 'normal', label: '正常网站', desc: '访问正常', color: 'text-success bg-success-soft', icon: CircleCheckFill },
  ABNORMAL: { value: 'abnormal', label: '异常网站', desc: '访问异常', color: 'text-danger bg-danger-soft', icon: CircleXmarkFill },
});