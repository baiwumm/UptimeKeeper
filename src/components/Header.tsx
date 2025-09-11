/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-09-11 15:43:42
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-09-11 16:30:26
 * @Description: 顶部信息
 */
import { Icon } from '@iconify/react';
import Image from 'next/image';
import { useTheme } from 'next-themes'
import { type FC, useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

type HeaderProps = {
  run: VoidFunction;
  loading: boolean;
}

const Header: FC<HeaderProps> = ({ run, loading = false }) => {
  // 主题切换
  const { theme, setTheme } = useTheme();
  // 倒计时时间
  const [countdown, setCountdown] = useState(300);
  // 倒计时是否正在运行
  const [isActive, setIsActive] = useState(true);

  const isDark = theme === 'dark';

  // 切换主题
  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  }

  // 格式化时间
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  // 处理重新开始倒计时
  const handleReset = () => {
    setCountdown(300); // 重置为5分钟
    run();
    if (!isActive && !loading) setIsActive(true); // 如果未激活，启动倒计时
  };

  // 使用 useEffect 管理倒计时逻辑
  useEffect(() => {
    let interval = null;

    if (isActive && countdown > 0) {
      // 每1000ms（1秒）执行一次
      interval = setInterval(() => {
        setCountdown((prevTime) => prevTime - 1);
      }, 1000);
    } else if (countdown === 0) {
      // 倒计时结束，重新开始
      handleReset();
    }

    // 清理函数：组件卸载或依赖变化时清除定时器
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isActive, countdown,]);
  return (
    <header className="flex justify-between items-center">
      {/* 左侧标题 */}
      <div className="flex items-center gap-3">
        <Image
          src="/logo.svg"
          alt="Logo"
          width={40}
          height={40}
        />
        <h1 className="text-lg sm:text-2xl font-bold text-gray-800 dark:text-gray-100">
          {process.env.NEXT_PUBLIC_SITE_NAME}
        </h1>
      </div>
      <div className="flex items-center gap-3">
        {/* 倒计时按钮 */}
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
        {/* 主题按钮 */}
        <button
          onClick={toggleTheme}
          className="flex items-center justify-center w-9 h-9 rounded-full transition-all duration-200
          bg-white dark:bg-gray-800
          text-gray-600 dark:text-gray-300
          shadow-sm shadow-gray-200/50 dark:shadow-gray-900/30
          hover:bg-gray-50 dark:hover:bg-gray-700
          group overflow-hidden cursor-pointer"
        >
          <div className="relative h-5 w-5">
            <Icon
              icon="bi:sun"
              className={cn('w-5 h-5 absolute transition-all duration-500 transform', isDark ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0')}
            />
            <Icon
              icon="bi:moon"
              className={cn('w-5 h-5 absolute transition-all duration-500 transform', isDark ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100')}
            />
          </div>
        </button>
      </div>
    </header>
  )
}
export default Header;