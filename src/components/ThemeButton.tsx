/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-09-13 20:45:16
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-09-13 21:14:06
 * @Description: 主题切换按钮
 */
import { Icon } from "@iconify/react";
import { useTheme } from "next-themes";
import { type FC } from "react";

import { cn, THEME } from "@/lib/utils";

const ThemeButton: FC = () => {
  // 主题切换
  const { theme, setTheme } = useTheme();

  const isDark = theme === THEME.Dark;

  // 切换主题
  const toggleTheme = () => {
    setTheme(isDark ? THEME.Light : THEME.Dark);
  };
  return (
    <button
      onClick={toggleTheme}
      className="flex items-center justify-center w-9 h-9 rounded-full transition-all duration-200
              bg-white dark:bg-gray-800
              text-gray-600 dark:text-gray-300
              shadow-sm shadow-gray-200/50 dark:shadow-gray-900/30
              hover:bg-gray-50 dark:hover:bg-gray-700
              group overflow-hidden cursor-pointer"
    >
      <div className="relative h-5 w-5">
        <Icon
          icon="bi:sun"
          className={cn(
            "w-5 h-5 absolute transition-all duration-500 transform",
            isDark ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
          )}
        />
        <Icon
          icon="bi:moon"
          className={cn(
            "w-5 h-5 absolute transition-all duration-500 transform",
            isDark ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"
          )}
        />
      </div>
    </button>
  );
};
export default ThemeButton;
