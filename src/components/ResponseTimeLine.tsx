/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-09-15 16:25:50
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-09-16 10:07:37
 * @Description: 响应时间轴
 */
import { type FC } from 'react';

import type { Log, WebsiteStatus } from '@/lib/type';
import { cn } from '@/lib/utils';
import { ResponseDays, WEBSITE_STATUS } from '@/lib/utils';

import Tooltip from './Tooltip'

type DownRecord = {
  date: string; // 日期，格式 'YYYY-MM-DD'
  value: number; // 响应时间值，0 或 100
}

type ResponseTimeLineProps = {
  downRecords: Log[]; // 宕机日志
  create_datetime: number; // 创建时间
  status: WebsiteStatus; // 站点状态
}

const ResponseTimeLine: FC<ResponseTimeLineProps> = ({ downRecords = [], create_datetime, status }) => {
  /**
 * 将日期格式化为 'YYYY-MM-DD' 字符串
 */
  function formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  /**
 * 计算每天的 duration 占全天时间（86400 秒）的百分比
 * 返回：{ 'YYYY-MM-DD': number }
 */
  function calculateDailyDurationPercentage(): Record<string, number> {
    const SECONDS_PER_DAY = 24 * 60 * 60; // 86400 秒

    // 用于按天聚合 duration
    const dailyTotal: Record<string, number> = {};

    downRecords.forEach(record => {
      const dateKey = formatDate(new Date(record.datetime * 1000)); // 转为 'YYYY-MM-DD' 格式
      if (!dailyTotal[dateKey]) {
        dailyTotal[dateKey] = 0;
      }
      dailyTotal[dateKey] += record.duration; // 累加当天所有请求的 duration
    });

    // 转换为百分比，保留两位小数
    const result: Record<string, number> = {};
    for (const date in dailyTotal) {
      const totalDuration = dailyTotal[date];
      const percentage = (totalDuration / SECONDS_PER_DAY) * 100;
      result[date] = Math.round(percentage * 100) / 100; // 保留两位小数
    }

    return result;
  }

  // 生成日期数据的函数
  function generateDateData(): DownRecord[] {
    const result: DownRecord[] = [];
    const percentages: Record<string, number> = calculateDailyDurationPercentage();
    const now = new Date();

    for (let i = 0; i < ResponseDays; i++) {
      // 从当前日期开始，往前推 i 天
      const date = new Date(now);
      date.setDate(now.getDate() - i);

      const dateString = formatDate(date); // 转为 'YYYY-MM-DD' 格式

      // 判断该日期是否早于 create_datetime
      const isBeforeCreate = date.getTime() < create_datetime * 1000;
      const value = isBeforeCreate ? 0 : (percentages[dateString] ? 100 - percentages[dateString] : 100);

      result.push({
        date: dateString,
        value
      });
    }

    return result;
  }

  // 设置每个小方块的颜色
  function getBoxColor(value: number): string {
    if (value === 0) {
      return 'bg-gray-300'; // 灰色
    }
    // 暂停，黄色
    if (status === WEBSITE_STATUS.Paused) {
      return 'bg-yellow-500';
    }
    // 离线，红色
    if (status === WEBSITE_STATUS.Down) {
      return 'bg-red-500';
    }
    if (value >= 99.99) {
      return 'bg-green-500'; // 绿色
    }
    if (value >= 90) {
      return 'bg-yellow-500'; // 黄色
    }
    return 'bg-red-500'; // 红色
  }

  // 计算可用率
  const renderAvailability = (value: number): string => {
    if (status === WEBSITE_STATUS.Paused) {
      return '已暂停';
    }
    if (status === WEBSITE_STATUS.Down) {
      return '已离线';
    }
    return value === 0 ? '无数据' : `可用率:${value}%`
  }
  return (
    <div className='grid gap-1 w-full' style={{ gridTemplateColumns: 'repeat(30, 1fr)' }}>{generateDateData().reverse().map((v, i) => (
      <Tooltip key={i} text={(
        <div className="text-xs text-black dark:text-white">
          <div className="font-bold">{v.date}</div>
          <div>{renderAvailability(v.value)}</div>
        </div>
      )}>
        <div className="relative w-full" style={{ paddingBottom: '100%' }}>
          <div className={cn('absolute inset-0 rounded overflow-hidden transform transition-transform duration-300 hover:scale-120', getBoxColor(v.value))} />
        </div>
      </Tooltip>
    ))}</div>
  );
}
export default ResponseTimeLine;