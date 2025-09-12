/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-09-11 13:49:51
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-09-12 11:03:30
 * @Description: 响应时间模态框
 */
import { Line, type LineConfig } from '@ant-design/charts';
import { Icon } from '@iconify/react';
import { AnimatePresence, motion } from 'motion/react';
import { type FC } from 'react';

import type { ResponseTime } from '@/lib/type';

type AverageResponseTimeModalProps = {
  isOpen: boolean;
  onClose: () => void;
  response_times: ResponseTime[];
};

const AverageResponseTimeModal: FC<AverageResponseTimeModalProps> = ({
  isOpen,
  onClose,
  response_times = [],
}) => {
  // 时间戳转 “HH:mm”
  function formatTimestamp(timestamp: number) {
    const date = new Date(timestamp * 1000);
    const h = date.getHours().toString().padStart(2, '0');
    const m = date.getMinutes().toString().padStart(2, '0');
    return `${h}:${m}`;
  }

  const data = response_times.map((v) => ({
    value: v.value,
    label: formatTimestamp(v.datetime),
  }));

  // 折线图配置项
  const config: LineConfig = {
    data: data.reverse(),
    xField: 'label',
    yField: 'value',
    shapeField: 'smooth',
    axis: {
      y: {
        labelFormatter: (d: number) => `${d} ms`,
        tick: false,
      },
      x: {
        tick: false,
      },
    },
    colorField: 'Symbol',
    scale: {
      y: {
        domainMin: 0,
      },
      color: {
        range: ['#10B981'],
      },
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
          value: `${d.value} ms`,
        }),
      ],
    },
    style: {
      lineWidth: 2,
    },
    animate: {
      enter: {
        type: 'growInX',
      },
    },
  };

  return (
    <AnimatePresence> {/* 👈 包裹整个模态框 */}
      {isOpen && (
        <motion.div
          key="modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 overflow-y-hidden"
        >
          {/* ✅ 背景遮罩：使用 motion 控制 opacity 和 backdropFilter */}
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(4px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{
              duration: 0.3,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            // 移除 backdrop-blur-sm 和 bg 类，由 motion 控制
            className="fixed inset-0 bg-black/10 dark:bg-black/40"
            onClick={onClose}
          />
          {/* 模态框容器 */}
          <motion.div
            initial={{ y: 40 }}        // 👈 从下方进入
            animate={{ y: 0 }}          // 到达正常位置
            exit={{ y: 40 }}            // 退出时滑下
            transition={{
              duration: 0.3,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="flex items-center justify-center min-h-screen px-4 py-6"
          >
            {/* 模态框内容 */}
            <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
              {/* 内容区域 */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)] bg-white dark:bg-gray-800">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                    响应时间趋势
                  </h3>
                  <button
                    onClick={onClose}
                    className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors duration-200"
                  >
                    <Icon
                      icon="carbon:close"
                      className="w-5 h-5 text-gray-500 dark:text-gray-400 cursor-pointer"
                    />
                  </button>
                </div>

                <div className="h-[300px] overflow-hidden">
                  {response_times.length > 0 ? (
                    <Line {...config} />
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center gap-4">
                      <Icon
                        icon="carbon:chart-line"
                        className="w-12 h-12 text-gray-400 dark:text-gray-500"
                      />
                      <div className="text-gray-500 dark:text-gray-400 text-sm">暂无数据</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AverageResponseTimeModal;