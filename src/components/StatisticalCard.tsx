/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-09-11 17:36:05
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-09-16 15:33:33
 * @Description: 统计卡片
 */
import { Icon } from '@iconify/react';
import { motion } from 'motion/react';
import { type FC } from 'react';

import type { WebsiteStatus } from '@/lib/type'
import { cn } from '@/lib/utils';
import { WEBSITE_STATUS } from '@/lib/utils';

import CountUp from './CountUp'

type StatisticalCardProps = {
  status: WebsiteStatus[]; // 全部网站状态
  averageResponseTimes: string[]; // 平均响应时间
  loading: boolean; // 是否加载中
}

const StatisticalCard: FC<StatisticalCardProps> = ({ status = [], averageResponseTimes = [], loading = false }) => {
  // 网站个数
  const total = status.length;
  // 计算正常网站个数
  const normalNums = status.filter(v => v === WEBSITE_STATUS.Up || v === WEBSITE_STATUS.Prepare).length;
  // 计算平均响应时长
  function calculateAverage(arr: string[]) {
    // 检查是否为空数组
    if (arr.length === 0) {
      return 0; // 或者返回 null, undefined, NaN，根据你的业务需求
    }

    // 转成数字并求和
    const sum = arr.map(Number).reduce((acc, val) => acc + val, 0);
    return (sum / arr.length).toFixed(0);
  }
  /**
 * 概览项
 */
  const overviewItems = [
    {
      label: '监控网站',
      value: status.length,
      desc: '全部网站',
      icon: 'bi:check-circle',
      iconColor: 'text-emerald-500',
      containerClass: 'after:border-emerald-500/50 dark:after:border-emerald-400/50'
    },
    {
      label: '正常网站',
      value: normalNums,
      desc: '访问正常',
      icon: 'bi:check-circle-fill',
      iconColor: 'text-green-500',
      containerClass: 'after:border-green-500/50 dark:after:border-green-400/50'
    },
    {
      label: '异常网站',
      value: total - normalNums,
      desc: '访问异常',
      icon: 'bi:x-circle-fill',
      iconColor: 'text-red-500',
      containerClass: 'after:border-red-500/50 dark:after:border-red-400/50'
    },
    {
      label: '平均响应',
      value: calculateAverage(averageResponseTimes),
      unit: 'ms',
      desc: '网络延迟',
      icon: 'bi:clock',
      iconColor: 'text-blue-500',
      containerClass: 'after:border-blue-500/50 dark:after:border-blue-400/50'
    }
  ]
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {overviewItems.map((v, index) => (
        <motion.div
          key={index}
          className={cn('card-base animated-border animate-fade', v.containerClass)}
          onMouseEnter={(e) => {
            e.currentTarget.classList.add('hovered');
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1 }}
          transition={{
            duration: 0.35,
            ease: "easeOut"
          }}
        >
          <div className="flex items-start justify-between relative">
            <div>
              <div className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
                {v.label}
              </div>
              <div className="mt-2 text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">
                <CountUp
                  from={0}
                  to={Number(v.value)}
                  separator=","
                  direction={loading ? "down" : "up"}
                  duration={1}
                />
                <span v-if="item.unit">{v.unit}</span>
              </div>
              <div className="mt-1.5 text-xs text-gray-500 dark:text-gray-400">
                {v.desc}
              </div>
            </div>
            <div className="p-2.5 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <Icon
                icon={v.icon}
                className={cn('w-6 h-6 transition-colors duration-200', v.iconColor)}
              />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
export default StatisticalCard;