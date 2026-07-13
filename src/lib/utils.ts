/**
 * @description: swr 请求
 * @param {string} url
 */
export const fetcher = async (url: string) => {
  const res = await fetch(url)

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.message || `HTTP ${res.status}`)
  }

  return data
}

/**
 * Dynamically get a nested value from an array or
 * object with a string.
 *
 * @example get(person, 'friends[0].name')
 */
export const get = <TDefault = unknown>(
  value: unknown,
  path: string,
  defaultValue?: TDefault
): TDefault => {
  const segments = path.split(/[\.\[\]]/g)
  let current: any = value
  for (const key of segments) {
    if (current === null) return defaultValue as TDefault
    if (current === undefined) return defaultValue as TDefault
    const dequoted = key.replace(/['"]/g, '')
    if (dequoted.trim() === '') continue
    current = current[dequoted]
  }
  if (current === undefined) return defaultValue as TDefault
  return current
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

export const formatTime = (seconds: number) => {
  const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
  const ss = String(seconds % 60).padStart(2, '0');
  return `${mm}:${ss}`;
};

// 统一样式
export const SECTION_CLASSNAME = "bg-surface-secondary text-surface-secondary-foreground rounded-xl text-xs p-4"

/**
 * @description: 检测频率
 */
export const getIntervalMinutes = (): number => {
  const raw = process.env.NEXT_PUBLIC_INTERVAL;

  // 1. 尝试转换为数字
  let value = Number(raw);

  // 2. 检查是否为有效数字（NaN、Infinity 等情况）
  if (!Number.isFinite(value)) {
    value = 5; // 默认值
  }

  // 3. 限制范围：1-60
  value = Math.min(Math.max(value, 1), 60);

  // 4. 确保是整数（如果输入是小数）
  value = Math.floor(value);

  return value;
};