/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-09-11 15:43:42
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-09-13 22:15:19
 * @Description: 顶部信息
 */
import Image from 'next/image';
import { type FC } from 'react';

import CountDownButton from './CountDownButton';
import ThemeButton from './ThemeButton';

type HeaderProps = {
  fetchData: VoidFunction;
  loading: boolean;
}

const Header: FC<HeaderProps> = ({ fetchData, loading = false }) => {
  return (
    <header className="flex justify-between items-center">
      {/* 左侧标题 */}
      <div className="flex items-center gap-3">
        <Image
          src="/logo.svg"
          alt="Logo"
          width={40}
          height={40}
        />
        <h1 className="text-lg sm:text-2xl font-bold text-gray-800 dark:text-gray-100">
          {process.env.NEXT_PUBLIC_SITE_TITLE}
        </h1>
      </div>
      <div className="flex items-center gap-3">
        {/* 倒计时按钮 */}
        <CountDownButton fetchData={fetchData} loading={loading} />
        {/* 主题按钮 */}
        <ThemeButton />
      </div>
    </header>
  )
}
export default Header;