/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-09-15 16:25:50
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-09-17 14:20:13
 * @Description: 响应时间轴
 */
import { motion } from 'motion/react';
import { type FC } from 'react';

import type { WebsiteStatus } from '@/lib/type';
import { cn } from '@/lib/utils';
import { ResponseDays, WEBSITE_STATUS } from '@/lib/utils';

import Tooltip from './ToolTip'

type DownRecord = {
  date: string; // 日期，格式 'YYYY-MM-DD'
  value: number; // 响应时间值，0 或 100
}

type ResponseTimeLineProps = {
  create_datetime: number; // 创建时间
  status: WebsiteStatus; // 站点状态
  custom_uptime_ranges: string; // 宕机可用率
}

const ResponseTimeLine: FC<ResponseTimeLineProps> = ({ create_datetime, status, custom_uptime_ranges = '' }) => {
  /**
 * 将日期格式化为 'YYYY-MM-DD' 字符串
 */
  function formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // 生成日期数据的函数
  function generateDateData(): DownRecord[] {
    const result: DownRecord[] = [];
    const now = new Date();
    const customRanges = custom_uptime_ranges.split('-');
    for (let i = ResponseDays - 1; i >= 0; i--) {
      // 从当前日期开始，往前推 i 天
      const date = new Date(now);
      date.setDate(now.getDate() - i);

      const dateString = formatDate(date); // 转为 'YYYY-MM-DD' 格式

      // 判断该日期是否早于 create_datetime
      const isBeforeCreate = date.getTime() < create_datetime * 1000;
      const value = isBeforeCreate ? 0 : Number(customRanges[i]);

      result.push({
        date: dateString,
        value
      });
    }

    return result;
  }

  // 设置每个小方块的颜色
  function getBoxColor(value: number): string {
    // 暂停，黄色
    if (status === WEBSITE_STATUS.Paused) {
      return 'bg-yellow-500';
    }
    // 离线，红色
    if (status === WEBSITE_STATUS.Down) {
      return 'bg-red-500';
    }
    if (value === 0) {
      return 'bg-gray-300'; // 灰色
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
    <div className='grid gap-1 w-full' style={{ gridTemplateColumns: 'repeat(30, 1fr)' }}>{generateDateData().map((v, i) => (
      <Tooltip key={i} text={(
        <div className="text-xs text-black dark:text-white">
          <div className="font-bold">{v.date}</div>
          <div>{renderAvailability(v.value)}</div>
        </div>
      )}
      >
        <div className="relative w-full" style={{ paddingBottom: '100%' }}>
          <motion.div className={cn('absolute inset-0 rounded overflow-hidden', getBoxColor(v.value))}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.85 }}
          />
        </div>
      </Tooltip>
    ))}</div>
  );
}
export default ResponseTimeLine;