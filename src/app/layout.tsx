/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-09-10 15:24:53
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-09-10 15:27:02
 * @Description: 布局文件
 */
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "UptimeKeeper",
  description: "一个优雅的站点状态监控面板",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* 引入字体文件 */}
      <head>
        <link rel="stylesheet" href="https://cdn.baiwumm.com/fonts/MapleMono-CN-Regular/result.css" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
