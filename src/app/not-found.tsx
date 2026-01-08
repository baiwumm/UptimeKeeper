/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-11-28 17:18:04
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-12-21 18:07:25
 * @Description: 404 页面
 */
"use client"
import { useRouter } from 'next/navigation'
import { type FC } from 'react';

import { RippleButton } from "@/components/animate-ui/components/buttons/ripple"

const NotFound: FC = () => {
  const router = useRouter();
  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <div className="text-center">
        <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">404</h1>
        <p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">看来这个页面去环球旅行了，还没寄明信片回来。</p>
        <div className="flex items-center justify-center mt-10">
          <RippleButton onClick={() => router.push('/')}>回到首页</RippleButton>
        </div>
      </div>
    </div>
  )
}
export default NotFound;