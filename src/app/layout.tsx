/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-09-10 15:24:53
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-01-21 14:57:52
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
  authors: [{ name: process.env.NEXT_PUBLIC_COPYRIGHT, url: pkg.author.url }],
  creator: process.env.NEXT_PUBLIC_COPYRIGHT,
  publisher: process.env.NEXT_PUBLIC_COPYRIGHT,
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: process.env.NEXT_PUBLIC_APP_NAME,
    description: process.env.NEXT_PUBLIC_APP_DESC,
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: process.env.NEXT_PUBLIC_APP_NAME,
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_APP_URL}/og.png`,
        width: 1200,
        height: 630,
      }
    ],
    locale: 'zh_CN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: process.env.NEXT_PUBLIC_APP_NAME,
    description: process.env.NEXT_PUBLIC_APP_DESC,
    creator: 'baiwumm',
    images: [`${process.env.NEXT_PUBLIC_APP_URL}/og.png`],
  },
  manifest: `${process.env.NEXT_PUBLIC_APP_URL}/manifest.json`
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
        <meta name="apple-mobile-web-app-title" content="UptimeKeeper" />
        <link rel="stylesheet" href="https://cdn.baiwumm.com/fonts/MapleMono-CN-Regular/result.css" />
      </head>
      <body className="bg-gradient-to-br from-slate-100 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Vercel 统计 */}
        <Analytics />
        <ThemeProvider attribute="class" enableSystem={false}>
          <TooltipProvider>
            {children}
            <FullLoading />
            <BackTop />
          </TooltipProvider>
        </ThemeProvider>
        {/* 装饰光斑 */}
        <div className="pointer-events-none fixed -top-40 -right-40 size-80 rounded-full bg-blue-200/30 dark:bg-blue-900/20 blur-lg -z-1" />
        <div className="pointer-events-none fixed -bottom-20 -left-20 size-60 rounded-full bg-violet-200/30 dark:bg-violet-900/20 blur-lg -z-1" />
        <div className="pointer-events-none fixed -bottom-25 -right-25 size-60 rounded-full bg-amber-100/30 dark:bg-amber-800/10 blur-lg -z-1" />
      </body>
    </html>
  );
}
