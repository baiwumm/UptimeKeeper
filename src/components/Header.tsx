/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-09-11 15:43:42
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-09-13 20:49:23
 * @Description: 顶部信息
 */
import { Icon } from '@iconify/react';
import Image from 'next/image';
import { type FC, useEffect, useState } from 'react';
import ThemeButton from './ThemeButton';

import { cn } from '@/lib/utils';

type HeaderProps = {
  fetchData: VoidFunction;
  loading: boolean;
}

const Header: FC<HeaderProps> = ({ fetchData, loading = false }) => {
  // 倒计时时间
  const [countdown, setCountdown] = useState(300);
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
    setCountdown(300); // 重置为5分钟
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
        <ThemeButton />
      </div>
    </header>
  )
}
export default Header;