/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-01-05 17:01:34
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-01-12 10:09:21
 * @Description: 头部
 */
"use client"
import { House, Moon, Sun } from "lucide-react"
import { AnimatePresence, motion } from 'motion/react';
import Image from 'next/image';
import Link from "next/link";
import { useTheme } from "next-themes";
import { type FC, type ReactNode } from 'react';

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/animate-ui/components/animate/tooltip"
import { RippleButton } from "@/components/animate-ui/components/buttons/ripple"
import { type Resolved, type ThemeSelection, ThemeToggler as ThemeTogglerPrimitive } from '@/components/animate-ui/primitives/effects/theme-toggler';
import CountDownButton from '@/components/CountDownButton';
import { THEME_MODE } from '@/enums';
import { GithubIcon } from '@/lib/icons';
import pkg from '#/package.json';

type Social = {
  name: string;
  url: string;
  icon: ReactNode;
}

type HeaderProps = {
  refresh: VoidFunction;
  loading: boolean;
}

const socials: Social[] = [
  {
    name: "GitHub",
    url: `https://github.com/${pkg.repository.url}`,
    icon: <GithubIcon />
  }
]

const Header: FC<HeaderProps> = ({ refresh, loading = false }) => {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const isDark = theme === THEME_MODE.DARK;

  return (
    <header className="sticky top-0 border-b border-default h-15 z-20 backdrop-blur-sm" id="header">
      <div className="flex justify-between items-center container mx-auto h-full px-4">
        {/* 左侧 Logo */}
        <div className="flex gap-2 items-center">
          <Image src='/logo.svg' width={36} height={36} alt="Logo" />
          <h1 className="font-black text-base">{process.env.NEXT_PUBLIC_APP_NAME}</h1>
        </div>
        {/* 右侧区域 */}
        <div className="flex items-center gap-1">
          <CountDownButton refresh={refresh} loading={loading} />
          <ThemeTogglerPrimitive
            theme={theme as ThemeSelection}
            resolvedTheme={resolvedTheme as Resolved}
            setTheme={setTheme}
            direction='ltr'
          >
            {({ toggleTheme }) => (
              <Tooltip>
                <TooltipTrigger asChild>
                  <RippleButton
                    aria-label="ThemeToggle"
                    variant="ghost"
                    radius="full"
                    mode="icon" size='sm'

                    onClick={() => toggleTheme(isDark ? THEME_MODE.LIGHT : THEME_MODE.DARK)}
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      {isDark ? (
                        <motion.div
                          key="moon"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.2, ease: 'easeInOut' }}
                          className="text-neutral-800 dark:text-neutral-200"
                        >
                          <Moon className="h-[1.2rem] w-[1.2rem]" />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="sun"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.2, ease: 'easeInOut' }}
                          className="text-neutral-800 dark:text-neutral-200"
                        >
                          <Sun className="h-[1.2rem] w-[1.2rem]" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </RippleButton>
                </TooltipTrigger>
                <TooltipContent>
                  <p>主题模式</p>
                </TooltipContent>
              </Tooltip>
            )}
          </ThemeTogglerPrimitive>
          {socials.map(({ name, url, icon }) => (
            <Tooltip key={name}>
              <TooltipTrigger asChild>
                <Link href={url} aria-label={name} target="_blank">
                  <RippleButton variant="ghost" radius="full" mode="icon" size='sm'>
                    {icon}
                  </RippleButton>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>{name}</p>
              </TooltipContent>
            </Tooltip>
          ))}
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href={pkg.author.url} aria-label="主页" target="_blank">
                <RippleButton variant="ghost" radius="full" mode="icon" size='sm'>
                  <House />
                </RippleButton>
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>博客</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </header>
  )
}
export default Header;