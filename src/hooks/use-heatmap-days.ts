import dayjs from 'dayjs';
import { useMemo } from 'react';

interface UseHeatmapDaysOptions {
  days?: number;
  data?: App.Ratio[];
}

export function useHeatmapDays({
  days = 30,
  data = []
}: UseHeatmapDaysOptions): App.Ratio[] {
  return useMemo(() => {
    // 1️⃣ 最近 N 天日期
    const dateList = Array.from({ length: days }, (_, i) =>
      dayjs()
        .subtract(days - 1 - i, 'day')
        .format('YYYY-MM-DD')
    );

    // 2️⃣ 原始数据 Map 化
    const dataMap = new Map(
      data.map(item => [item.date, Number(item.ratio)])
    );

    // 3️⃣ 补齐
    return dateList.map(date => {
      const ratio = dataMap.get(date);
      return {
        date,
        ratio: ratio ?? 0,
      };
    });
  }, [data, days]);
}
