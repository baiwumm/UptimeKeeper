/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-09-12 10:23:30
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-09-12 11:46:18
 * @Description: 全局 Loading
 */
'use client';

import { useEffect, useState } from 'react';

const FullLoading = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 方案一：等待页面关键资源加载完成
    if (document.readyState === 'complete') {
      setIsLoading(false);
    } else {
      window.addEventListener('load', () => setIsLoading(false));
    }

    // 清理事件监听
    return () => {
      window.removeEventListener('load', () => setIsLoading(false));
    };
  }, []);

  // 判断组件是否挂载
  if (isLoading) {
    return (
      <div className="fixed flex w-screen h-screen justify-center items-center flex-col z-[99] overflow-hidden bg-white dark:bg-slate-900">
        <div className="relative w-12 h-12 rotate-[165deg] before:content-[''] after:content-[''] before:absolute after:absolute before:top-2/4 after:top-2/4 before:left-2/4 after:left-2/4 before:block after:block before:w-[.5em] after:w-[.5em] before:h-[.5em] after:h-[.5em] before:rounded after:rounded before:-translate-x-1/2 after:-translate-x-1/2 before:-translate-y-2/4 after:-translate-y-2/4 before:animate-[loaderBefore_2s_infinite] after:animate-[loaderAfter_2s_infinite]"></div>
      </div>
    );
  }
  return null;
};
export default FullLoading;