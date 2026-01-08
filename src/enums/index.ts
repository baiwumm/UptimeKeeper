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
 * @description: 统计数据
 */
export const STATISTICS = Enum({
  TOAL: {
    value: 'total',
    label: '全部网站',
    icon: 'monitor',
    iconClass: 'text-green-500',
    text: 'counts.total',
    suffix: '',
    badge: '已纳入监控'
  },
  UP: {
    value: 'up',
    label: '正常网站',
    icon: 'circle-check',
    iconClass: 'text-green-500',
    text: 'counts.up',
    suffix: '',
    badge: '访问正常'
  },
  DOWN: {
    value: 'down',
    label: '异常网站',
    icon: 'circle-x',
    iconClass: 'text-red-500',
    text: 'counts.down',
    suffix: '',
    badge: '存在异常'
  },
  RADIO: {
    value: 'radio',
    label: '可用性',
    icon: 'activity',
    iconClass: 'text-blue-500',
    text: 'uptime.l7.ratio',
    suffix: '%',
    badge: '近 7 天统计'
  }
});

/**
 * @description: 站点状态
 */
export const STATUS = Enum({
  UP: { value: 'UP', label: '在线', status: 'success', badge: 'success', bg: 'bg-green-500' },
  DOWN: { value: 'DOWN', label: '已离线', status: 'error', badge: 'destructive', bg: 'bg-red-500' },
  PAUSED: { value: 'PAUSED', label: '已暂停', status: 'warning', badge: 'warning', bg: 'bg-yellow-500' },
  STARTED: { value: 'STARTED', label: '准备中', status: 'warning', badge: 'warning', bg: 'bg-yellow-500' },
});