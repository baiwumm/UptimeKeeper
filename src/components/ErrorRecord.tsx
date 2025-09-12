/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-09-12 08:52:46
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-09-12 14:01:34
 * @Description: 故障记录
 */
import { Icon } from '@iconify/react';
import { AnimatePresence, motion } from 'motion/react';
import { type FC, useEffect, useMemo, useRef, useState } from 'react';

import type { Log } from '@/lib/type'
import { cn, LOGS_TYPE } from '@/lib/utils';

type ErrorRecordPops = {
  id: number; // 主键
  logs: Log[]; // 日志列表
}

const ErrorRecord: FC<ErrorRecordPops> = ({ id, logs = [] }) => {
  // 当前打开的 id
  const [currentId, setCurrentId] = useState('');
  // 判断当前是否打开
  const isOpen = currentId === id.toString();
  // 用于检测点击外部
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 是否打开故障记录
  const toggleRecord = () => {
    setCurrentId(isOpen ? '' : id.toString())
  }

  // 过滤宕机的日志
  const downRecords = useMemo(() => {
    const thirtyDaysAgo = Math.floor((Date.now() - 30 * 24 * 60 * 60 * 1000) / 1000);
    return logs
      .filter((v) => v.type === LOGS_TYPE.Down && v.datetime >= thirtyDaysAgo)
      .sort((a, b) => b.datetime - a.datetime);
  }, [logs]); // 只有当 logs 变化时，才重新执行这个函数

  /**
 * 错误消息映射
 */
  const ERROR_MESSAGES: Record<string, string> = {
    333333: "连接超时",
    444444: "无响应",
    100001: "DNS解析失败",
    98: "离线状态",
    99: "失联状态",
    default: "连接异常",
  };

  /**
   * 获取错误消息
   */
  const getErrorMessage = (reason: Log['reason'] | number) => {
    const errorCode = typeof reason === "object" ? reason.code : reason;
    return ERROR_MESSAGES[errorCode] || ERROR_MESSAGES.default;
  };

  /**
   * 将 Unix 时间戳（秒）转换为 "MM-dd HH:mm" 格式字符串
   * @param timestamp - Unix 时间戳（单位：秒）
   * @returns 格式化后的字符串，例如 "07-03 14:23"
   */
  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp * 1000); // 转为毫秒
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    // 补零函数
    const pad = (n: number): string => n.toString().padStart(2, '0');

    return `${pad(month)}-${pad(day)} ${pad(hours)}:${pad(minutes)}`;
  }

  /**
   * @param ms - 毫秒数
   * @returns 格式化后的字符串，如 "1小时9分钟" 或 "45秒"
   */
  const formatDuration = (s: number): string => {
    if (s < 60) return `${s}秒`;
    const d = Math.floor(s / 86400);
    const h = Math.floor((s % 86400) / 3600);
    const m = Math.floor((s % 3600) / 60);
    return (d ? `${d}天` : '') + (h ? `${h}小时` : '') + (m ? `${m}分钟` : '');
  };

  // 🔥 点击外部关闭逻辑
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (dropdownRef.current && !dropdownRef.current.contains(target)) {
        setCurrentId('');
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setCurrentId('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside, true);
    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside, true);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen]);
  return (
    <div className="relative" ref={dropdownRef}>
      {/* 按钮 */}
      <button
        onClick={toggleRecord}
        className="w-full px-4 py-3 flex items-center justify-between text-left bg-gray-50 dark:bg-gray-800/50 rounded-lg transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-700/50 focus:outline-none cursor-pointer"
      >
        <span className="text-xs text-gray-500 dark:text-gray-400">故障记录</span>
        <Icon
          icon="bi:chevron-up"
          className={cn('w-4 h-4 text-gray-400 transition-transform duration-200', isOpen ? 'rotate-180' : '')}
        />
      </button>

      {/* 列表弹窗 */}
      <AnimatePresence>
        {isOpen && (
          // 🔴 外层只负责定位，不参与动画
          <div className="absolute bottom-full left-0 right-0 mb-2 pointer-events-none">
            {/* ✅ 动画交给内层容器 */}
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{
                duration: 0.2,
                ease: [0.25, 0.1, 0.25, 1], // 使用数组形式，TS 安全
              }}
              className="transform-gpu pointer-events-auto bg-white dark:bg-gray-800 border-[1.5px] border-gray-200 dark:border-gray-700 rounded-lg shadow-lg"
            >
              <div className="p-4 max-h-[280px] overflow-y-auto">
                {downRecords.length ? (
                  <div className="flex flex-col gap-2">
                    {downRecords.map(({ id, reason, datetime, duration }) => (
                      <div
                        key={id}
                        className="p-3 bg-red-50/90 dark:bg-red-900/20 rounded-lg border border-red-200/80 dark:border-red-800/80"
                      >
                        <div className="flex justify-between">
                          <span className="text-red-600/90 dark:text-red-400/90 text-xs">
                            {getErrorMessage(reason)}
                          </span>
                          <span className="text-red-600/80 dark:text-red-400/80 text-xs">
                            {formatTime(datetime)}
                          </span>
                        </div>
                        <div className="mt-1 text-red-600/80 dark:text-red-400/80 text-xs">
                          持续时间: {formatDuration(duration)}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-3xs text-gray-400">近期无故障记录</div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
export default ErrorRecord;