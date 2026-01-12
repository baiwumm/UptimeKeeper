/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-01-12 10:03:50
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-01-12 10:13:48
 * @Description: 倒计时按钮
 */
"use client"
import { RefreshCcw } from "lucide-react";
import { type FC, useEffect, useState } from 'react';

import { RippleButton } from "@/components/animate-ui/components/buttons/ripple";
import { formatTime } from '@/lib/utils';

type CountDownButtonProps = {
  refresh: VoidFunction;
  loading: boolean;
}

const INTERVAL_MINUTES = Number(process.env.NEXT_PUBLIC_INTERVAL || 5);
const INTERVAL_SECONDS = INTERVAL_MINUTES * 60;

const CountDownButton: FC<CountDownButtonProps> = ({ refresh, loading = false }) => {
  // 倒计时时间
  const [countdown, setCountdown] = useState(INTERVAL_SECONDS);
  // 倒计时是否正在运行
  const [isActive, setIsActive] = useState(true);

  // 处理重新开始倒计时
  const handleReset = () => {
    setCountdown(INTERVAL_SECONDS); // 重置为5分钟
    // 延迟调用父组件 refresh，避免渲染冲突
    setTimeout(() => refresh(), 0);
    if (!isActive && !loading) setIsActive(true); // 如果未激活，启动倒计时
  };

  useEffect(() => {
    if (!isActive || loading) return;

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          // 延迟调用父组件刷新
          setTimeout(() => refresh(), 0);
          return INTERVAL_SECONDS;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, loading, refresh]);
  return (
    <RippleButton variant="outline" size='sm' onClick={handleReset} disabled={loading}>
      <RefreshCcw className={loading ? 'animate-spin' : ''} />
      {formatTime(countdown)}后刷新
    </RippleButton>
  )
}
export default CountDownButton;