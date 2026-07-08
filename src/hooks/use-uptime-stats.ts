/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-07-08 11:00:04
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-07-08 11:50:01
 * @Description: 获取统计信息
 */
import useSWR, { type KeyedMutator } from 'swr';

import { TIME_FRAME } from '@/enums'
import { fetcher } from '@/lib/utils';
import type { UptimeStatistics } from '@/types'


export interface UptimeStatsResult {
  uptimeStatistics: UptimeStatistics;
  statsLoading: boolean;
  mutateStats: KeyedMutator<UptimeStatistics>;
}

export function useUptimeStats(timeFrame = TIME_FRAME.MONTH): UptimeStatsResult {
  const {
    data: uptimeStatistics,
    isLoading,
    isValidating,
    mutate: mutateStats
  } = useSWR<UptimeStatistics>(
    `/api/uptimerobot/uptime-stats?timeFrame=${timeFrame}`,
    fetcher,
    { revalidateOnFocus: false }
  );

  return {
    uptimeStatistics,
    statsLoading: isLoading || isValidating,
    mutateStats
  };
}