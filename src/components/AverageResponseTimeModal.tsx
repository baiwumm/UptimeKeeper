/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-09-11 13:49:51
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-09-11 15:34:44
 * @Description: 响应时间模态框
 */
import { Line, type LineConfig } from '@ant-design/charts'
import { Icon } from '@iconify/react';
import { type FC } from 'react';

import type { ResponseTime } from '@/lib/type'

type AverageResponseTimeModalProps = {
  isOpen: boolean;
  onClose: () => void;
  response_times: ResponseTime[];
}

const AverageResponseTimeModal: FC<AverageResponseTimeModalProps> = ({
  isOpen,
  onClose,
  response_times = []
}) => {
  if (!isOpen) return null;
  // 时间戳转 “HH分MM秒”
  function formatTimestamp(timestamp: number) {
    const date = new Date(timestamp * 1000);
    const h = date.getHours().toString().padStart(2, '0');
    const m = date.getMinutes().toString().padStart(2, '0');
    return `${h}:${m}`;
  }
  const data = response_times.map(v => ({
    value: v.value,
    label: formatTimestamp(v.datetime)
  }))
  // 折线图配置项
  const config: LineConfig = {
    data: data.reverse(),
    xField: 'label',
    yField: 'value',
    shapeField: 'smooth',
    axis: {
      y: {
        labelFormatter: (d: number) => `${d} ms`,
        tick: false
      },
      x: {
        tick: false,
      }
    },
    colorField: 'Symbol',
    scale: {
      y: {
        domainMin: 0,
      },
      color: {
        range: ['#10B981']
      }
    },
    interaction: {
      tooltip: {
        marker: false,
      },
    },
    tooltip: {
      items: [
        (d) => ({
          name: '响应时间',
          value: `${d.value} ms`
        }),
      ]
    },
    style: {
      lineWidth: 2,
    },
    animate: {
      enter: {
        type: "growInX"
      }
    }
  };
  return (
    <div className="fixed inset-0 z-50 overflow-y-hidden">
      {/* 背景遮罩 */}
      <div
        className="fixed inset-0 transition-opacity duration-300 backdrop-blur-sm bg-black/10 dark:bg-black/40"
        onClick={onClose}
      />
      {/* 模态框容器 */}
      <div className="flex items-center justify-center min-h-screen px-4 py-6">
        {/* 模态框内容 */}
        <div className='relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl transform transition-all duration-300 w-full max-h-[90vh] overflow-hidden max-w-4xl'>
          {/* 内容区域 */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)] bg-white dark:bg-gray-800">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">响应时间趋势</h3>
              <button
                onClick={onClose}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors duration-200"
              >
                <Icon icon="carbon:close" className="w-5 h-5 text-gray-500 dark:text-gray-400 cursor-pointer" />
              </button>
            </div>
            <div className="h-[300px]">
              {response_times?.length ? (
                <Line {...config} />
              ) : (
                <div
                  className="h-full flex flex-col items-center justify-center gap-4"
                >
                  <Icon icon="carbon:chart-line" className="w-12 h-12 text-gray-400 dark:text-gray-500" />
                  <div className="text-gray-500 dark:text-gray-400 text-sm">暂无数据</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AverageResponseTimeModal;