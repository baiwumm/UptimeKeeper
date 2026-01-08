/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-01-06 17:59:51
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-01-06 18:04:11
 * @Description: 错误页面
 */
import { TriangleAlert } from 'lucide-react';
import { type FC } from 'react';

const ErrorPage: FC = () => {
  return (
    <div className="flex items-center py-12 backdrop-blur-sm">
      <div
        className="flex flex-col items-center gap-4 p-8 rounded-xl bg-red-50/50 dark:bg-red-900/20 border-2 border-red-100 dark:border-red-800/50 amax-w-90 mx-auto"
      >
        <div className="relative">
          <TriangleAlert className="size-12 text-red-500/90 dark:text-red-400/90" />
          <div className="absolute inset-0 w-12 h-12 bg-red-500/20 dark:bg-red-400/20 rounded-full animate-ping" />
        </div>
        <div className="text-center">
          <div className="text-red-600 dark:text-red-400 font-medium mb-1">
            获取监控数据失败，请稍后重试
          </div>
        </div>
      </div>
    </div>
  )
}
export default ErrorPage;