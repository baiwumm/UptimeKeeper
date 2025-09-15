/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-09-13 21:50:56
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-09-13 22:51:36
 * @Description: 倒计时按钮
 */
import { Icon } from '@iconify/react';
import { type FC, useEffect, useState } from 'react';

import { cn, CountDownTime } from '@/lib/utils';

type CountDownButtonProps = {
  fetchData: VoidFunction;
  loading: boolean;
}

const CountDownSeconds = CountDownTime * 60; // 默认5分钟，转换为秒

const CountDownButton: FC<CountDownButtonProps> = ({ fetchData, loading = false }) => {
  // 倒计时时间
  const [countdown, setCountdown] = useState(CountDownSeconds);
  // 倒计时是否正在运行
  const [isActive, setIsActive] = useState(true);

  // 格式化时间
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  // 处理重新开始倒计时
  const handleReset = () => {
    setCountdown(CountDownSeconds); // 重置为5分钟
    fetchData();
    if (!isActive && !loading) setIsActive(true); // 如果未激活，启动倒计时
  };

  // 使用 useEffect 管理倒计时逻辑
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && !loading && countdown > 0) {
      // 每1000ms（1秒）执行一次
      interval = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }

    // 清理函数：组件卸载或依赖变化时清除定时器
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isActive, countdown, loading]);

  // 单独监听 countdown 是否归零
  useEffect(() => {
    if (countdown === 0) {
      // 自动重置
      setCountdown(300);
      fetchData();
      // 注意：这里不需要 setIsActive(true)，因为下次循环会自然开始
    }
  }, [countdown, fetchData]);
  return (
    <button
      onClick={handleReset}
      disabled={loading}
      className="flex items-center gap-2 px-3 h-9 rounded-full transition-all duration-200
              bg-emerald-50 dark:bg-emerald-900/30 
              text-emerald-600 dark:text-emerald-400
              shadow-sm shadow-emerald-500/10 dark:shadow-emerald-900/20
              hover:bg-emerald-100 dark:hover:bg-emerald-900/40
              disabled:opacity-75 disabled:cursor-not-allowed disabled:shadow-none cursor-pointer"
    >
      <Icon
        icon="ph:arrows-counter-clockwise-bold"
        className={cn('w-4 h-4 transition-all', loading ? 'animate-spin' : '')}
      />
      <span className="hidden sm:block text-sm font-medium">
        {`${formatTime(countdown)}后刷新`}
      </span>
    </button>
  )
}
export default CountDownButton;