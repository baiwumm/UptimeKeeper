/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-01-06 17:55:48
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-03-16 17:54:14
 * @Description: 暂无数据
 */
import { Button } from "@heroui/react";
import { Inbox, Plus } from 'lucide-react';
import { type FC } from 'react';

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
    <Empty className="border">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Inbox />
        </EmptyMedia>
        <EmptyTitle>一切安静如常 🕊️</EmptyTitle>
        <EmptyDescription>目前没有站点被监控。您可以随时添加一个！</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button>
          <Plus data-icon="inline-start" />
          添加站点
        </Button>
      </EmptyContent>
    </Empty>
  )
}
export default EmptyPage;