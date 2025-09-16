/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-09-15 09:43:22
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-09-16 11:58:20
 * @Description: 回到顶部
 */
'use client'

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react';
import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

interface BackToTopProps {
  threshold?: number;
  duration?: number;
  className?: string;
}

const BackToTop: React.FC<BackToTopProps> = ({
  threshold = 300,
  duration = 800,
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0); // 0~100%
  const { scrollYProgress } = useScroll()

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setScrollProgress(v * 100); // 更新状态
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      setIsVisible(scrollTop > threshold);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // 初始化

    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  const scrollToTop = () => {
    const startPosition = window.pageYOffset;
    const startTime = performance.now();

    if (duration <= 0 || !startPosition) {
      window.scrollTo(0, 0);
      return;
    }

    const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

    const animateScroll = (currentTime: number) => {
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const easeProgress = easeInOut(progress);
      window.scrollTo(0, startPosition * (1 - easeProgress));

      if (timeElapsed < duration) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  };

  // SVG 进度环配置
  const radius = 48; // 圆环半径
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className={cn('fixed bottom-6 right-6 z-50', className)}
        >
          {/* SVG 进度环 */}
          <svg
            className="absolute inset-0 w-12 h-12 transform -rotate-90 z-50 pointer-events-none"
            viewBox="0 0 100 100"
          >
            {/* 背景环 */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              strokeWidth="6"
              fill="none"
              strokeDashoffset={0}
              className="stroke-gray-200 dark:stroke-gray-500"
            />
            {/* 前景进度环 */}
            <motion.circle
              cx="50"
              cy="50"
              r={radius}
              strokeWidth="6"
              fill="none"
              strokeDashoffset={0}
              className="stroke-green-500"
              style={{ pathLength: scrollYProgress }}
            />
          </svg>

          {/* 按钮主体 */}
          <button
            onClick={scrollToTop}
            aria-label="回到顶部"
            className="relative flex h-12 w-12 items-center justify-center
              rounded-full
              bg-white dark:bg-gray-800
              text-gray-600 dark:text-gray-300
              border border-gray-300 dark:border-gray-700
              shadow-sm hover:shadow
              hover:bg-gray-50 dark:hover:bg-gray-700
              active:scale-95 cursor-pointer
              "
          >
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {Math.round(scrollProgress)}
              </span>
            </div>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;