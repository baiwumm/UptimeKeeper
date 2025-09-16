import { motion } from 'motion/react';
import { type FC, useState } from 'react';

import { cn } from '@/lib/utils';

type TooltipProps = {
  text: React.ReactNode;
  children: React.ReactNode;
  borderColor: string; // 边框颜色
}

const Tooltip: FC<TooltipProps> = ({ children, text, borderColor }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Tooltip */}
      {showTooltip && (
        <motion.div className={cn('absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-3 py-2 bg-[rgba(255,255,255,.75)] text-white text-xs rounded-lg shadow-lg z-10 dark:bg-[rgba(0,0,0,.75)] whitespace-nowrap max-w-xs border border-solid', borderColor)}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{
            duration: 0.35,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          {text}
        </motion.div>
      )}
      {/* Trigger element */}
      <div>{children}</div>
    </div>
  );
};

export default Tooltip;
