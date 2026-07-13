/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-07-10 13:41:54
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-07-13 16:30:06
 * @Description: 响应时间趋势
 */
import { ArrowsRotateRight } from '@gravity-ui/icons';
import { Button, Spinner, Typography } from "@heroui/react";
import dayjs from 'dayjs'
import { type FC, useMemo } from 'react';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import useSWR from 'swr';

import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { fetcher, get } from '@/lib/utils';

const chartConfig = {
  value: {
    label: '响应时间',
    color: 'var(--accent)',
  },
} satisfies ChartConfig;

type ResponseTimeChartProps = {
  monitorId: number;
  days: number;
}

const ResponseTimeChart: FC<ResponseTimeChartProps> = ({ monitorId, days }) => {
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    `/api/monitors/${monitorId}/stats/response-time?days=${days}`,
    fetcher,
    { revalidateOnFocus: false, shouldRetryOnError: false }
  );
  const loading = useMemo(() => isLoading || isValidating, [isLoading, isValidating]);
  return (
    <div className="relative w-full h-30">
      <ChartContainer config={chartConfig} className="size-full overflow-visible">
        <AreaChart data={get(data, 'time_series', [])} margin={{ left: 5, right: 5, top: 5, bottom: -10 }} accessibilityLayer className="[&_.recharts-surface]:outline-none">
          <defs>
            <linearGradient id="colorGradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="10%" stopColor='var(--accent)' stopOpacity={0.8} />
              <stop offset="100%" stopColor='var(--accent)' stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="var(--default)" strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="timestamp"
            axisLine={false}
            tickLine={false}
            interval='preserveStartEnd'
            domain={['dataMin', 'dataMax']}
            tickFormatter={(value) => dayjs(value).format('HH:mm')}
            minTickGap={30}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: 'var(--muted)' }}
            tickFormatter={(value) => `${value}ms`}
            tickMargin={8}
            domain={['dataMin', 'dataMax']}
            dx={-10}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent
              indicator="dot"
              labelFormatter={(value) => dayjs(value).format('YYYY-MM-DD HH:mm')}
              valueFormatter={(value) => `${value}ms`}
              className="bg-surface"
            />}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke={chartConfig.value.color}
            strokeWidth={2}
            fill="url(#colorGradient)"
            connectNulls
            activeDot={{
              r: 6,
              fill: chartConfig.value.color,
              stroke: 'white',
              strokeWidth: 2,
              filter: 'url(#dotShadow)',
            }}
            dot={false}
          />
        </AreaChart>
      </ChartContainer>
      {loading ? (
        <div className="absolute inset-0 flex items-center justify-center bg-background/20 backdrop-blur-[1px] pointer-events-auto">
          <Spinner />
        </div>
      ) : error ? (
        <div className="absolute inset-0 flex items-center justify-center bg-background/20 backdrop-blur-[1px]">
          <div className="flex flex-col justify-center items-center gap-1">
            <Button size="sm" variant="danger" onPress={mutate}>
              <ArrowsRotateRight />
              重新获取
            </Button>
            <Typography type='body-xs' className="text-danger">{error?.message ?? '获取响应时间统计失败'}</Typography>
          </div>
        </div>
      ) : null}
    </div>
  )
}
export default ResponseTimeChart;