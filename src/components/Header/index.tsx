/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-01-05 17:01:34
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-03-16 17:29:38
 * @Description: 头部
 */
"use client"
import { Button, Tooltip } from "@heroui/react";
import { House } from "lucide-react"
import Image from 'next/image';
import Link from "next/link";
import { type FC, type ReactNode } from 'react';

import CountDownButton from '@/components/CountDownButton';
import { ShimmeringText } from '@/components/ShimmeringText';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import { GithubIcon } from '@/lib/icons';
import pkg from '#/package.json';

type HeaderProps = {
  refresh: VoidFunction;
  loading: boolean;
}

type Social = {
  name: string;
  url: string;
  icon: ReactNode;
}

const socials: Social[] = [
  {
    name: "GitHub",
    url: pkg.repository.url,
    icon: <GithubIcon />
  }
]

const Header: FC<HeaderProps> = ({ refresh, loading = false }) => {
  return (
    <header className="sticky top-0 border-b border-default h-15 z-20 backdrop-blur-sm" id="header">
      <div className="flex justify-between items-center container mx-auto h-full px-4">
        {/* 左侧 Logo */}
        <div className="flex gap-2 items-center">
          <Image src='/logo.svg' width={36} height={36} alt="Logo" />
          <ShimmeringText
            text={process.env.NEXT_PUBLIC_COPYRIGHT!}
            className="text-xl font-black hidden sm:block"
            duration={1.5}
            repeatDelay={1}
            color="var(--foreground)"
            shimmerColor="var(--background)"
          />
        </div>
        {/* 右侧区域 */}
        <div className="flex items-center gap-1">
          <CountDownButton refresh={refresh} loading={loading} />
          {/* 主题切换按钮 */}
          <ThemeSwitcher />
          {socials.map(({ name, url, icon }) => (
            <Tooltip key={name} delay={0}>
              <Link href={url} aria-label={name} target="_blank">
                <Button variant="ghost" isIconOnly size='sm' className="rounded-full">
                  {icon}
                </Button>
              </Link>
              <Tooltip.Content showArrow>
                <Tooltip.Arrow />
                {name}
              </Tooltip.Content>
            </Tooltip>
          ))}
          <Tooltip>
            <Link href={pkg.author.url} aria-label="主页" target="_blank">
              <Button variant="ghost" isIconOnly size='sm' className="rounded-full">
                <House />
              </Button>
            </Link>
            <Tooltip.Content showArrow>
              <Tooltip.Arrow />
              博客
            </Tooltip.Content>
          </Tooltip>
        </div>
      </div>
    </header>
  )
}
export default Header;