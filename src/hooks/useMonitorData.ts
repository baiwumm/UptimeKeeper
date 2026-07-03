import useSWR from 'swr';

import { fetcher } from '@/lib/utils';
import type { Monitor, UptimeStatistics } from '@/types'

interface MonitorData {
  monitors: Monitor[];
  uptimeStatistics: UptimeStatistics;
  loading: boolean;
  error: any;
  refresh: () => void;
}

export function useMonitorData(): MonitorData {
  // 分别请求，但不互相影响
  const {
    data: monitors = [],
    error: monitorsError,
    isLoading: monitorsLoading,
    isValidating: monitorsValidating,
    mutate: mutateMonitors
  } = useSWR<Monitor[]>(
    '/api/uptimerobot',
    fetcher,
    { revalidateOnFocus: false, fallbackData: [] }
  );

  const {
    data: uptimeStatistics,
    isLoading: statsLoading,
    isValidating: statsValidating,
    mutate: mutateStats
  } = useSWR<UptimeStatistics>(
    '/api/uptimerobot/uptime-stats',
    fetcher,
    { revalidateOnFocus: false }
  );

  return {
    monitors,
    uptimeStatistics,
    loading: monitorsLoading || monitorsValidating || statsLoading || statsValidating,
    error: monitorsError,
    refresh: () => {
      mutateMonitors();
      mutateStats();
    }
  };
}