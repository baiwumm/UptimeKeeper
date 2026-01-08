import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
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
 * @description: 截取域名
 * @param {string} url
 */
export const extractDomainPart = (url: string) => {
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