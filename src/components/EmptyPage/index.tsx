/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-01-06 17:55:48
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-01-06 17:59:30
 * @Description: 暂无数据
 */
import { Inbox, Plus } from 'lucide-react';
import { type FC } from 'react';

import { RippleButton } from "@/components/animate-ui/components/buttons/ripple";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

const EmptyPage: FC = () => {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Inbox />
        </EmptyMedia>
        <EmptyTitle>一切安静如常 🕊️</EmptyTitle>
        <EmptyDescription>
          目前没有站点被监控。您可以随时添加一个！
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <RippleButton size="sm" onClick={() => window.open('https://uptimerobot.com/', '_blank')}>
          <Plus />
          添加站点
        </RippleButton>
      </EmptyContent>
    </Empty>
  )
}
export default EmptyPage;