/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-07-08 10:56:01
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-07-08 11:07:35
 * @Description: 获取站点列表
 */
import { useMemo } from 'react'
import useSWR, { type KeyedMutator } from 'swr';

import { STATUS } from '@/enums';
import { fetcher } from '@/lib/utils';
import type { Monitor, Status } from '@/types'

export interface MonitorResult {
  monitors: Monitor[];
  monitorsLoading: boolean;
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
    data: monitors = [],
    error,
    isLoading,
    isValidating,
    mutate: mutateMonitors
  } = useSWR<Monitor[]>(
    '/api/uptimerobot',
    fetcher,
    { revalidateOnFocus: false, fallbackData: [] }
  );

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
    monitorsLoading: isLoading || isValidating,
    monitorsError: error,
    mutateMonitors,
    statistics
  };
}