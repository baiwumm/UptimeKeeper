/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-09-10 15:24:53
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-09-15 10:52:47
 * @Description: 布局文件
 */
import "./globals.css";

import type { Metadata } from "next";
import { ThemeProvider } from 'next-themes'

import BackToTop from '@/components/BackToTop'; // 回到顶部按钮
import Footer from '@/components/Footer'; // 底部版权
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
          <div className="flex flex-col gap-4 min-h-screen justify-between p-4">
            {/* 主体内容 */}
            <main className="max-w-7xl w-full mx-auto flex flex-col gap-6">
              {children}
            </main>
            {/* 底部版权 */}
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
