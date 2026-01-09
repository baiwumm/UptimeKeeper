/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-01-06 17:25:42
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-01-08 10:55:34
 * @Description: 底部版权
 */
import dayjs from 'dayjs';
import Image from 'next/image';
import { type FC, type ReactNode } from 'react';

import { RippleButton } from "@/components/animate-ui/components/buttons/ripple";
import { Separator } from "@/components/ui/separator";
import { Status, StatusIndicator, StatusLabel } from "@/components/ui/status";
import pkg from '#/package.json';

type Social = {
  icon?: ReactNode;
  image?: string;
  url: string;
  label: string;
}

// 备案信息
const IcpLinks: Social[] = [
  {
    image: '/icp.png',
    url: 'https://beian.miit.gov.cn/#/Integrated/index',
    label: process.env.NEXT_PUBLIC_SITE_ICP!
  },
  {
    image: '/gongan.png',
    url: 'https://beian.mps.gov.cn/#/query/webSearch',
    label: process.env.NEXT_PUBLIC_SITE_GUAN_ICP!
  },
]

const Footer: FC = () => {
  return (
    <footer className="flex w-full flex-col" id="footer">
      <Separator />
      <div className="mx-auto w-full container! px-6 py-2 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-center gap-3 md:justify-start">
            <div className="flex items-center gap-2">
              <Image src='/logo.svg' width={20} height={20} alt="Logo" />
              <span className="text-small font-bold">{process.env.NEXT_PUBLIC_APP_NAME}</span>
            </div>
            <Separator className="h-4" orientation="vertical" />
            <Status variant="success" className="px-1.5 py-1 text-[10px]">
              <StatusIndicator />
              <StatusLabel>服务状态正常</StatusLabel>
            </Status>
          </div>
          <p className="text-center text-xs text-slate-500/75 dark:text-slate-300/75">
            &copy; {dayjs().format('YYYY')} {" "}
            <a
              href={pkg.author.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              {process.env.NEXT_PUBLIC_COPYRIGHT}
            </a>
            . All rights reserved.
          </p>
        </div>
        <div className="flex flex-col gap-1 items-center text-xs text-slate-500/75 dark:text-slate-300/75 ">
          <div className="flex items-center gap-2">
            基于
            <a
              href="https://uptimerobot.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            > UptimeRobot </a>
            接口
            <Separator className="h-3" orientation="vertical" />
            检测频率 {process.env.NEXT_PUBLIC_INTERVAL} 分钟
          </div>
          <div className="flex items-center flex-col md:flex-row gap-2">
            {IcpLinks.map(({ image, url, label }) => (
              <div key={url} className="flex items-center gap-1">
                <Image src={image!} alt={label} width={14} height={14} />
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-center hover:text-foreground transition-colors"
                >
                  {label}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
export default Footer;