/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-01-05 17:01:34
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-07-08 10:37:21
 * @Description: 头部
 */
"use client"
import { HouseFill, LogoGithub } from "@gravity-ui/icons"
import { Button, Chip, Description, Skeleton, Tooltip } from "@heroui/react";
import Image from 'next/image';
import Link from "next/link";
import { type FC, type ReactNode } from 'react';
import useSWR from 'swr';

import CountDownButton from '@/components/CountDownButton';
import { ShimmeringText } from '@/components/ShimmeringText';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import TimeAndLunar from '@/components/TimeAndLunar';
import { fetcher } from '@/lib/utils';
import type { User } from '@/types'
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
  // 获取用户信息
  const { data: user, error, isLoading } = useSWR<User>(
    '/api/me',
    fetcher,
    { revalidateOnFocus: false }
  );

  // 渲染用户信息
  const renderUserInfo = () => {
    if (error || !user) {
      return (
        <Chip color="danger" variant="soft">账户信息获取失败</Chip>
      )
    }
    if (isLoading) {
      return (
        <div className="space-y-2">
          <Skeleton className="h-3 w-30 rounded-lg" />
          <Skeleton className="h-3 w-40 rounded-lg" />
        </div>
      )
    }
    return (
      <div>
        <ShimmeringText
          text={user.fullName}
          className="text-lg font-black hidden sm:block"
          duration={1.5}
          repeatDelay={1}
          color="var(--foreground)"
          shimmerColor="var(--background)"
        />
        <Description className="hidden sm:block">{user.email}</Description>
      </div>
    )
  };
  return (
    <header className="sticky top-0 z-20 backdrop-blur-sm p-4 container max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 items-center" id="header">
      {/* 左侧 Logo */}
      <div className="flex gap-2 items-center justify-self-start">
        <div className="size-9 relative">
          <Image src="/logo.svg" fill alt="Logo" />
        </div>
        {renderUserInfo()}
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