/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-01-08 10:02:47
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-01-09 10:20:52
 * @Description: 监控缩略图
 */
import { Eye } from 'lucide-react';
import Image from 'next/image';
import { type FC } from 'react';

import { extractDomainPart } from '@/lib/utils';

type MonitorThumbnailProps = {
  url: string;
  friendlyName: string;
};

const MonitorThumbnail: FC<MonitorThumbnailProps> = ({ url, friendlyName }) => {
  const domain = extractDomainPart(url);

  return (
    <div
      className="group relative aspect-[2026/1107] rounded-2xl shadow-xl focus-within:shadow-2xl transition-[box-shadow] duration-500 overflow-hidden">
      <Image
        src={`/${domain}.png`}
        alt={`${friendlyName} 网站预览图`}
        fill
        loading="lazy"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-95 scale-90"
      />

      {/* 图片底部信息条 */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/60 dark:from-white/60 to-transparent flex items-end px-4 pb-2">
        <span className="text-white dark:text-black text-sm font-medium tracking-wider drop-shadow-sm">
          {url}
        </span>
      </div>

      {/* Hover / Focus 蒙层 */}
      <div
        className="absolute inset-0 bg-black/10 dark:bg-white/10 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-2 bg-white/90 rounded-full text-gray-800 font-medium shadow-lg flex items-center gap-2 transform translate-y-4 transition-transform duration-300 group-hover:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
          <Eye size={20} />
          去看看
        </a>
      </div>
    </div>
  );
};

export default MonitorThumbnail;
