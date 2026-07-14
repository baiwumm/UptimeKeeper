/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-07-08 13:43:46
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-07-14 15:19:19
 * @Description: 工具栏
 */
import { ArrowsRotateRight, HourglassStart, PauseFill, PlayFill } from '@gravity-ui/icons';
import { Button, ProgressBar, Spinner, toast, Typography } from "@heroui/react";
import NumberFlow, { NumberFlowGroup } from '@number-flow/react'
import { motion } from 'motion/react';
import { type FC, useCallback, useEffect, useMemo, useState } from 'react';

import { getIntervalMinutes } from '@/lib/utils'

const INTERVAL_MINUTES = getIntervalMinutes();
const INTERVAL_SECONDS = INTERVAL_MINUTES * 60;
const COOLDOWN_SECONDS = 60; // 冷却时间 60 秒

const MotionHourglassStart = motion.create(HourglassStart);

type CountDownProgressProps = {
  refresh: VoidFunction;
  loading: boolean;
}

const CountDownProgress: FC<CountDownProgressProps> = ({ refresh, loading = false }) => {
  const [remainingSeconds, setRemainingSeconds] = useState(INTERVAL_SECONDS);
  const [isPaused, setIsPaused] = useState(false);
  const [lastRefreshTime, setLastRefreshTime] = useState(new Date());
  const [coolDownSeconds, setCoolDownSeconds] = useState(COOLDOWN_SECONDS);

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

  const isInCoolDown = useMemo(() => coolDownSeconds > 0, [coolDownSeconds]);

  /**
   * 倒计时
   */
  useEffect(() => {
    if (isPaused || loading || isInCoolDown) return;

    const timer = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          handleRefresh();
          setCoolDownSeconds(COOLDOWN_SECONDS);
          return INTERVAL_SECONDS;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPaused, loading, handleRefresh, isInCoolDown]);

  /**
   * 手动刷新
   */
  const handleImmediateRefresh = () => {
    handleRefresh();
    setRemainingSeconds(INTERVAL_SECONDS);
    setCoolDownSeconds(COOLDOWN_SECONDS);
  };

  // 冷却倒计时
  useEffect(() => {
    if (coolDownSeconds <= 0 || loading) return;

    const timer = setInterval(() => {
      setCoolDownSeconds(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [coolDownSeconds, loading]);

  const minutes = useMemo(() => Math.floor(remainingSeconds / 60), [remainingSeconds]);
  const seconds = useMemo(() => Math.floor(remainingSeconds % 60), [remainingSeconds]);
  return (
    <div className="space-y-2 shrink-0">
      <div className="flex items-center justify-between gap-2">
        <ProgressBar
          aria-label="刷新倒计时"
          color='accent'
          value={isInCoolDown ? INTERVAL_SECONDS : remainingSeconds}
          isIndeterminate={loading}
          maxValue={INTERVAL_SECONDS}
        >
          <ProgressBar.Track>
            <ProgressBar.Fill className="transition-all duration-1000 ease-linear" />
          </ProgressBar.Track>
        </ProgressBar>
        <Button variant="secondary" size='sm' isDisabled={loading || isInCoolDown} onPress={handlePause}>
          {isPaused || isInCoolDown ? <PlayFill /> : <PauseFill />}
          {isInCoolDown ? '冷却中' : isPaused ? '恢复' : '暂停'}
        </Button>
        <Button size='sm' onPress={handleImmediateRefresh} isDisabled={loading || isInCoolDown} isPending={loading}>
          {({ isPending }) => (
            <>
              {isPending ?
                <Spinner color="current" size="sm" /> :
                isInCoolDown ?
                  <MotionHourglassStart
                    animate={{
                      rotate: [0, 180, 180, 360],
                    }}
                    transition={{
                      duration: 5,
                      times: [0, 0.3, 0.75, 1],
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  : <ArrowsRotateRight />}
              {isPending ? "刷新中..." : isInCoolDown ? (
                <NumberFlow value={loading ? 0 : coolDownSeconds} format={{ minimumIntegerDigits: 2 }} suffix='秒后可刷新' />
              ) : "立即刷新"}
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
        {!isInCoolDown && (
          <NumberFlowGroup>
            <div className="flex items-center text-xs text-muted">
              <NumberFlow value={loading ? 0 : minutes} format={{ minimumIntegerDigits: 2 }} prefix='将在 ' suffix="分" />
              <NumberFlow value={loading ? 0 : seconds} format={{ minimumIntegerDigits: 2 }} suffix='秒 后刷新' />
            </div>
          </NumberFlowGroup>
        )}
      </div>
    </div>
  )
}
export default CountDownProgress;