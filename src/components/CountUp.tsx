/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-09-12 10:09:14
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-09-18 10:58:16
 * @Description: 数字动画组件
 */
import { useMotionValue, useSpring } from 'motion/react';
import { useEffect, useRef } from 'react';

interface CountUpProps {
  to: number;
  from?: number;
  direction?: 'up' | 'down';
  delay?: number;
  duration?: number;
  className?: string;
  startWhen?: boolean;
  separator?: string;
  onStart?: () => void;
  onEnd?: () => void;
}

export default function CountUp({
  to,
  from = 0,
  direction = 'up',
  delay = 0,
  duration = 2,
  className = '',
  startWhen = true,
  separator = '',
  onStart,
  onEnd,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(direction === 'down' ? to : from);

  const damping = 20 + 40 * (1 / duration);
  const stiffness = 100 * (1 / duration);

  const springValue = useSpring(motionValue, { damping, stiffness });

  const getDecimalPlaces = (num: number): number => {
    const str = num.toString();
    if (str.includes('.')) {
      const decimals = str.split('.')[1];
      if (parseInt(decimals) !== 0) {
        return decimals.length;
      }
    }
    return 0;
  };

  const maxDecimals = Math.max(getDecimalPlaces(from), getDecimalPlaces(to));

  // 初始化文本
  useEffect(() => {
    if (ref.current) {
      ref.current.textContent = String(direction === 'down' ? to : from);
    }
  }, [from, to, direction]);

  // 动画触发逻辑
  useEffect(() => {
    if (!startWhen) return;

    if (typeof onStart === 'function') onStart();

    const timeoutId = setTimeout(() => {
      motionValue.set(direction === 'down' ? from : to);
    }, delay * 1000);

    const durationTimeoutId = setTimeout(() => {
      if (typeof onEnd === 'function') onEnd();
    }, delay * 1000 + duration * 1000);

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(durationTimeoutId);
    };
  }, [startWhen, motionValue, direction, from, to, delay, onStart, onEnd, duration]);

  // 数字变化监听
  useEffect(() => {
    const unsubscribe = springValue.on('change', latest => {
      if (ref.current) {
        const hasDecimals = maxDecimals > 0;

        const options: Intl.NumberFormatOptions = {
          useGrouping: !!separator,
          minimumFractionDigits: hasDecimals ? maxDecimals : 0,
          maximumFractionDigits: hasDecimals ? maxDecimals : 0
        };

        const formattedNumber = Intl.NumberFormat('zh-CN', options).format(latest);

        ref.current.textContent = separator
          ? formattedNumber.replace(/,/g, separator)
          : formattedNumber;
      }
    });

    return () => unsubscribe();
  }, [springValue, separator, maxDecimals]);

  return <span className={className} ref={ref} />;
}

