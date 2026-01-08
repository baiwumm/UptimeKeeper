/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-01-08 10:02:47
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-01-08 10:04:35
 * @Description: 监控缩略图
 */
import { Eye } from "lucide-react";
import Image from "next/image";
import { type FC } from 'react';

import { extractDomainPart } from '@/lib/utils';

type MonitorThumbnailProps = {
  url: string;
}

const MonitorThumbnail: FC<MonitorThumbnailProps> = ({ url }) => {
  return (
    <div className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 p-5">
      {/* 主图 */}
      <Image
        src={`/${extractDomainPart(url)}.png`}
        alt="网站缩略图"
        width={1052}
        height={548}
        priority
        className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105 aspect-[526/274]"
      />

      {/* 图片底部装饰条 */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/60 dark:from-white/60 to-transparent flex items-end p-1 pl-4">
        <span className="text-white font-medium text-sm tracking-wider">{url}</span>
      </div>

      {/* 悬浮时显示的半透明蒙层 */}
      <div className="absolute inset-0 bg-black/10 dark:bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <button
          className="px-6 py-2 bg-white/90 rounded-full text-gray-800 font-medium shadow-lg flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 cursor-pointer"
          onClick={() => window.open(url)}
        >
          <Eye size={20} />
          去看看
        </button>
      </div>
    </div>
  )
}
export default MonitorThumbnail;