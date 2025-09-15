/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-09-10 15:24:53
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-09-15 09:47:09
 * @Description: 布局文件
 */
import "./globals.css";

import type { Metadata } from "next";
import { ThemeProvider } from 'next-themes'

import BackToTop from '@/components/BackToTop'; // 回到顶部按钮
import FullLoading from '@/components/FullLoading'; // 全局 Loading

export const metadata: Metadata = {
  title: `${process.env.NEXT_PUBLIC_SITE_NAME} | ${process.env.NEXT_PUBLIC_SITE_DESCRIPTION}`,
  description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION,
  keywords: process.env.NEXT_PUBLIC_SITE_KEYWORDS,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      {/* 引入字体文件 */}
      <head>
        <link rel="stylesheet" href="https://cdn.baiwumm.com/fonts/MapleMono-CN-Regular/result.css" />
      </head>
      <body className='bg-gradient-to-br from-gray-100 to-blue-50 dark:from-gray-900 dark:to-gray-900'>
        <ThemeProvider attribute="class" enableSystem={false}>
          {/* 全局 Loading */}
          <FullLoading />
          {/* 回到顶部 */}
          <BackToTop />
          {/* 主体内容 */}
          <div className="max-w-7xl mx-auto p-4 flex flex-col gap-6 min-h-screen">
            <main>
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
