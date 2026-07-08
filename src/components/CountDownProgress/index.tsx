/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-07-08 13:43:46
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-07-08 17:46:07
 * @Description: 工具栏
 */
import { ArrowsRotateRight, PauseFill, PlayFill } from '@gravity-ui/icons';
import { Button, ProgressBar, Spinner, toast, Typography } from "@heroui/react";
import NumberFlow from '@number-flow/react'
import { type FC, useCallback, useEffect, useState } from 'react';

import { getIntervalMinutes } from '@/lib/utils'

const INTERVAL_MINUTES = getIntervalMinutes();
const INTERVAL_SECONDS = INTERVAL_MINUTES * 60;

type CountDownProgressProps = {
  refresh: VoidFunction;
  loading: boolean;
}

const CountDownProgress: FC<CountDownProgressProps> = ({ refresh, loading = false }) => {
  const [remainingSeconds, setRemainingSeconds] = useState(INTERVAL_SECONDS);
  const [isPaused, setIsPaused] = useState(false);
  const [lastRefreshTime, setLastRefreshTime] = useState(new Date());

  /**
   * 暂停/恢复
   */
  const handlePause = () => {
    toast.info(`自动刷新已${isPaused ? '恢复' : '暂停'}`)
    setIsPaused(prev => !prev)
  };


  /**
   * 刷新逻辑
   */
  const handleRefresh = useCallback(() => {
    setLastRefreshTime(new Date());

    refresh();

    setIsPaused(false)

    // loading结束后会重新计时
  }, [refresh]);

  /**
   * 倒计时
   */
  useEffect(() => {
    if (isPaused || loading) return;

    const timer = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          handleRefresh();
          return INTERVAL_SECONDS;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPaused, loading, handleRefresh]);

  /**
   * 手动刷新
   */
  const handleImmediateRefresh = () => {
    handleRefresh();
    setRemainingSeconds(INTERVAL_SECONDS);
  };
  return (
    <div className="space-y-2 shrink-0">
      <div className="flex items-center justify-between gap-2">
        <ProgressBar aria-label="Accent" color="accent" value={remainingSeconds} isIndeterminate={loading} maxValue={INTERVAL_SECONDS}>
          <ProgressBar.Track>
            <ProgressBar.Fill />
          </ProgressBar.Track>
        </ProgressBar>
        <Button variant="secondary" size='sm' isDisabled={loading} onPress={handlePause}>
          {isPaused ? <PlayFill /> : <PauseFill />}
          {isPaused ? '恢复' : '暂停'}
        </Button>
        <Button size='sm' onPress={handleImmediateRefresh} isDisabled={loading} isPending={loading}>
          {({ isPending }) => (
            <>
              {isPending ? <Spinner color="current" size="sm" /> : <ArrowsRotateRight />}
              {isPending ? "刷新中..." : "立即刷新"}
            </>
          )}
        </Button>
      </div>
      <div className="flex items-center justify-between gap-2">
        <Typography type="body-xs" className="text-muted">
          上次刷新:
          {' '}
          {lastRefreshTime.toLocaleString()}
        </Typography>
        <NumberFlow
          value={loading ? 0 : remainingSeconds}
          format={{
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }}
          prefix='将在 '
          suffix=' 秒后刷新'
          className="text-xs text-muted"
        />
      </div>
    </div>
  )
}
export default CountDownProgress;