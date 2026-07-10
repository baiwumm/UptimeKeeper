/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-07-08 10:56:01
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-07-10 16:23:08
 * @Description: 获取站点列表
 */
import { useMemo } from 'react'
import useSWR, { type KeyedMutator } from 'swr';

import { STATUS } from '@/enums';
import { fetcher, get } from '@/lib/utils';
import type { Monitor, Status, UptimeStatistics } from '@/types'

export interface MonitorResult {
  monitors: Monitor[];
  uptimeStatistics: UptimeStatistics,
  loading: boolean;
  monitorsError: any;
  mutateMonitors: KeyedMutator<Monitor[]>;
  statistics: {
    total: number;
    normal: number;
    abnormal: number;
  }
}

// 正常状态
const normalStatus = new Set<Status>([
  STATUS.UP,
  STATUS.STARTED,
])
// 异常状态
const abnormalStatus = new Set<Status>([
  STATUS.DOWN,
  STATUS.LOOKS_DOWN
])

export function useMonitors(): MonitorResult {
  const {
    data,
    error,
    isLoading,
    isValidating,
    mutate: mutateMonitors
  } = useSWR(
    '/api/monitors',
    fetcher,
    { revalidateOnFocus: false }
  );
  const monitors: Monitor[] = get(data, 'monitors', [])
  const uptimeStatistics: UptimeStatistics = get(data, 'uptimeStatistics', null)

  const statistics = useMemo(() => {
    let normal = 0
    let abnormal = 0

    for (const m of monitors) {
      if (normalStatus.has(m.status)) {
        normal++
      } else if (abnormalStatus.has(m.status)) {
        abnormal++
      }
    }

    const total = monitors.length

    return {
      total,
      normal,
      abnormal,
    }
  }, [monitors])
  return {
    monitors,
    uptimeStatistics,
    loading: isLoading || isValidating,
    monitorsError: error,
    mutateMonitors,
    statistics
  };
}