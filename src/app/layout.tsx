/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-09-10 15:24:53
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-01-09 17:19:19
 * @Description: 布局文件
 */
import { Analytics } from "@vercel/analytics/next"
import type { Metadata } from "next";
import { ThemeProvider } from 'next-themes'

import "./globals.css";
import { TooltipProvider } from '@/components/animate-ui/components/animate/tooltip';
import BackTop from '@/components/BackTop';
import FullLoading from '@/components/FullLoading';
import pkg from '#/package.json'

export const metadata: Metadata = {
  title: `${process.env.NEXT_PUBLIC_APP_NAME} | ${process.env.NEXT_PUBLIC_APP_DESC}`,
  description: process.env.NEXT_PUBLIC_APP_DESC,
  keywords: process.env.NEXT_PUBLIC_APP_KEYWORDS,
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: pkg.repository.url,
    title: process.env.NEXT_PUBLIC_APP_NAME,
    description: process.env.NEXT_PUBLIC_APP_DESC,
    siteName: process.env.NEXT_PUBLIC_APP_DESC,
  },
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
        <meta name="version" content={pkg.version} />
        <link rel="stylesheet" href="https://cdn.baiwumm.com/fonts/MapleMono-CN-Regular/result.css" />
      </head>
      <body className="bg-[radial-gradient(80%_50%_at_50%_0%,hsl(var(--primary)/0.08),transparent_70%)] dark:bg-[radial-gradient(80%_50%_at_50%_0%,hsl(var(--primary)/0.12),transparent_70%)]">
        {/* Vercel 统计 */}
        <Analytics />
        <ThemeProvider attribute="class" enableSystem={false}>
          <TooltipProvider>
            {children}
            <FullLoading />
            <BackTop />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
