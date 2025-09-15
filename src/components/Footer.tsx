/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-09-15 10:14:44
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-09-15 10:51:03
 * @Description: 底部版权
 */
import { Icon } from '@iconify/react';
import { type FC } from 'react';

import { CountDownTime } from '@/lib/utils';

import pkg from "../../package.json";

const Footer: FC = () => {
  return (
    <footer>
      <div className="flex flex-col items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-2">
          <a
            href={pkg.repository.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center p-1.5 rounded-full transition-colors duration-200 text-gray-400 hover:text-gray-600 hover:bg-gray-200 dark:text-gray-500 dark:hover:text-gray-400 dark:hover:bg-gray-700 box-content"
          >
            <Icon icon="ri:github-line" className="w-5 h-5" />
          </a>
          <a
            href="https://api.baiwumm.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center p-1.5 rounded-full transition-colors duration-200 text-gray-400 hover:text-gray-600 hover:bg-gray-200 dark:text-gray-500 dark:hover:text-gray-400 dark:hover:bg-gray-700 box-content"
          >
            <Icon icon="eos-icons:api-outlined" className="w-5 h-5" />
          </a>
          <a
            href={pkg.author.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center p-1.5 rounded-full transition-colors duration-200 text-gray-400 hover:text-gray-600 hover:bg-gray-200 dark:text-gray-500 dark:hover:text-gray-400 dark:hover:bg-gray-700 box-content"
          >
            <Icon icon="carbon:home" className="w-5 h-5" />
          </a>
          <a
            href={`mailto:${pkg.author.email}`}
            className="inline-flex items-center justify-center p-1.5 rounded-full transition-colors duration-200 text-gray-400 hover:text-gray-600 hover:bg-gray-200 dark:text-gray-500 dark:hover:text-gray-400 dark:hover:bg-gray-700 box-content"
          >
            <Icon icon="carbon:email" className="w-5 h-5" />
          </a>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div>
            基于
            <a
              href="https://uptimerobot.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors"
            > UptimeRobot </a>
            接口 | 检测频率 {CountDownTime} 分钟
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-1">
            <a
              href="https://beian.miit.gov.cn/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors"
            >
              粤ICP备2023007649号
            </a>
            <span className="hidden sm:block">|</span>
            <a
              href="https://beian.mps.gov.cn/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors"
            >
              粤公网安备44030402006402号
            </a>
          </div>
          <div>
            Copyright © {new Date().getFullYear()} by&nbsp;
            <a
              href={pkg.author.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors"
            >
              {process.env.NEXT_PUBLIC_SITE_TITLE}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
export default Footer;