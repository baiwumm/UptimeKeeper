"use client"

import { Skeleton } from "@heroui/react";
import {
  AnimatePresence,
  motion,
  MotionProps,
  useInView,
  UseInViewOptions,
  Variants,
} from "motion/react"
import { useEffect, useRef, useState } from "react"

type MarginType = UseInViewOptions["margin"]

interface BlurFadeProps extends MotionProps {
  children: React.ReactNode
  className?: string
  variant?: {
    hidden: { y: number }
    visible: { y: number }
  }
  duration?: number
  delay?: number
  offset?: number
  direction?: "up" | "down" | "left" | "right"
  inView?: boolean
  inViewMargin?: MarginType
  blur?: string
  // 👇 新增：懒加载相关
  lazy?: boolean // 是否开启懒加载
  fallback?: React.ReactNode // 占位内容
}

export default function BlurFade({
  children,
  className,
  variant,
  duration = 0.6,
  delay = 0,
  offset = 6,
  direction = "up",
  inView = false,
  inViewMargin = "-50px",
  blur = "6px",
  lazy = false, // 👈 默认不开启，保持向后兼容
  fallback = null,
  ...props
}: BlurFadeProps) {
  const ref = useRef<HTMLDivElement>(null)

  // 👇 useInView 用于检测元素是否在视口
  const inViewResult = useInView(ref, {
    once: true,
    margin: inViewMargin
  })

  const isInView = !inView || inViewResult

  // 👇 懒加载状态：是否已经渲染过
  const [hasRendered, setHasRendered] = useState(!lazy)
  const hasRenderedRef = useRef(!lazy)

  // 👇 当进入视口时，标记为已渲染
  useEffect(() => {
    if (lazy && isInView && !hasRenderedRef.current) {
      hasRenderedRef.current = true
      setHasRendered(true) // 触发重新渲染
    }
  }, [lazy, isInView])

  // 👇 判断是否应该渲染子组件
  const shouldRender = !lazy || hasRendered

  const defaultVariants: Variants = {
    hidden: {
      [direction === "left" || direction === "right" ? "x" : "y"]:
        direction === "right" || direction === "down" ? -offset : offset,
      opacity: 0,
      filter: `blur(${blur})`,
    },
    visible: {
      [direction === "left" || direction === "right" ? "x" : "y"]: 0,
      opacity: 1,
      filter: `blur(0px)`,
    },
  }

  const combinedVariants = variant || defaultVariants

  const getFallback = () => {
    if (fallback !== null) return fallback
    // 👇 默认占位
    return <Skeleton className="h-55 rounded-xl" />
  }

  return (
    <AnimatePresence>
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        exit="hidden"
        variants={combinedVariants}
        transition={{
          delay: 0.04 + delay,
          duration,
          ease: "easeOut",
        }}
        className={className}
        {...props}
      >
        {/* 👇 核心：条件渲染 */}
        {shouldRender ? children : getFallback()}
      </motion.div>
    </AnimatePresence>
  )
}