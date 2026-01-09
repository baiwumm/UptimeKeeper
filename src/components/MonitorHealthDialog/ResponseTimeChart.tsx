/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-01-09 15:42:16
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-01-09 16:36:08
 * @Description: 响应时间趋势
 */
import dayjs from 'dayjs';
import { type FC } from 'react';
import { Area, AreaChart, XAxis, YAxis } from 'recharts';

import BlurFade from '@/components/BlurFade';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

const chartConfig = {
  value: {
    label: '响应时间',
    color: 'var(--chart-2)',
  },
} satisfies ChartConfig;

type ResponseTimeChartProps = {
  data: {
    datetime: string;
    value: number;
  }[];
}

const ResponseTimeChart: FC<ResponseTimeChartProps> = ({ data = [] }) => {
  return (
    <BlurFade className="h-80 w-full" delay={0.4}>
      <ChartContainer
        config={chartConfig}
        className="h-full w-full overflow-visible [&_.recharts-curve.recharts-tooltip-cursor]:stroke-initial"
      >
        <AreaChart data={data} accessibilityLayer>
          {/* SVG Pattern for chart area */}
          <defs>
            {/* Grid pattern */}
            <pattern id="gridPattern" x="0" y="0" width="20" height="40" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="var(--input)" strokeWidth="0.5" strokeOpacity="1" />
            </pattern>
            {/* Area gradient fill */}
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={chartConfig.value.color} stopOpacity={0.3} />
              <stop offset="100%" stopColor={chartConfig.value.color} stopOpacity={0.05} />
            </linearGradient>
            {/* Shadow filters for dots */}
            <filter id="dotShadow" x="-100%" y="-100%" width="300%" height="300%">
              <feDropShadow dx="2" dy="2" stdDeviation="3" floodColor="rgba(0,0,0,0.4)" />
            </filter>
            <filter id="activeDotShadow" x="-100%" y="-100%" width="300%" height="300%">
              <feDropShadow dx="3" dy="3" stdDeviation="4" floodColor="rgba(0,0,0,0.5)" />
            </filter>
          </defs>
          {/* Background pattern for chart area only */}
          <rect
            x="0px"
            y="-20px"
            width="calc(100% - 75px)"
            height="calc(100% - 10px)"
            fill="url(#gridPattern)"
            style={{ pointerEvents: 'none' }}
          />
          <XAxis
            dataKey="datetime"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }}
            tickMargin={8}
            interval='preserveStartEnd'
            includeHidden={true}
            tickFormatter={(value) => value.slice(-4)}
          />
          <YAxis
            hide={true}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }}
            tickFormatter={(value) => `${value}ms`}
            tickMargin={8}
            domain={[0, 'dataMax']}
            ticks={[0]}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent
              indicator="dot"
              labelFormatter={(value) => dayjs(value).format('YYYY-MM-DD HH:mm')}
              valueFormatter={(value) => `${value}ms`}
            />}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke={chartConfig.value.color}
            strokeWidth={2}
            fill="url(#areaGradient)"
            activeDot={{
              r: 6,
              fill: chartConfig.value.color,
              stroke: 'white',
              strokeWidth: 2,
              filter: 'url(#dotShadow)',
            }}
          />
        </AreaChart>
      </ChartContainer>
    </BlurFade>
  )
}
export default ResponseTimeChart;