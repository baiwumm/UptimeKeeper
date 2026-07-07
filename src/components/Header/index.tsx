/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-01-05 17:01:34
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-07-07 18:13:13
 * @Description: 头部
 */
"use client"
import { HouseFill, LogoGithub } from "@gravity-ui/icons"
import { Button, Tooltip } from "@heroui/react";
import Image from 'next/image';
import Link from "next/link";
import { type FC, type ReactNode } from 'react';

import CountDownButton from '@/components/CountDownButton';
import { ShimmeringText } from '@/components/ShimmeringText';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import TimeAndLunar from '@/components/TimeAndLunar';
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
    icon: <LogoGithub />
  }
]

const Header: FC<HeaderProps> = ({ refresh, loading = false }) => {
  return (
    <header className="sticky top-0 z-20 backdrop-blur-sm p-4 container max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 items-center" id="header">
      {/* 左侧 Logo */}
      <div className="flex gap-2 items-center justify-self-start">
        <div className="size-9 relative">
          <Image src="/logo.svg" fill alt="Logo" />
        </div>
        <ShimmeringText
          text={process.env.NEXT_PUBLIC_COPYRIGHT!}
          className="text-xl font-black hidden sm:block"
          duration={1.5}
          repeatDelay={1}
          color="var(--foreground)"
          shimmerColor="var(--background)"
        />
      </div>
      <TimeAndLunar />
      {/* 右侧区域 */}
      <div className="flex items-center gap-1 justify-self-end">
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
              <HouseFill />
            </Button>
          </Link>
          <Tooltip.Content showArrow>
            <Tooltip.Arrow />
            个人主页
          </Tooltip.Content>
        </Tooltip>
      </div>
    </header>
  )
}
export default Header;