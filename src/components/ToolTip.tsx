import { AnimatePresence, motion } from 'motion/react';
import { type FC, useState } from 'react';

type TooltipProps = {
  text: React.ReactNode;
  children: React.ReactNode;
}

const Tooltip: FC<TooltipProps> = ({ children, text }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <AnimatePresence>
        {showTooltip && (
          <motion.div key="tooltip" className='absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-3 py-2 bg-[rgba(255,255,255,.75)] text-white text-xs rounded-lg shadow-lg z-10 dark:bg-[rgba(24,24,27,.75)] whitespace-nowrap max-w-xs border border-solid border-gray-200 dark:border-gray-500'
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{
              duration: 0.35,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            {text}
          </motion.div>
        )}
      </AnimatePresence>
      <div>{children}</div>
    </div>
  );
};

export default Tooltip;
