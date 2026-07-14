/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-07-08 16:01:53
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-07-14 18:14:53
 * @Description: 空数据
 */
import { DatabaseFill, Plus } from '@gravity-ui/icons';
import { Button, Typography } from "@heroui/react";
import Link from "next/link";
import { type FC } from 'react';

const EmptyContent: FC = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      <div className="flex-1 size-full max-w-xl max-h-100 border-border p-6 rounded-2xl border border-dashed text-center flex justify-center items-center">
        <div className="flex flex-col gap-2 items-center">
          <div className="bg-default text-foreground p-4 rounded-full">
            <DatabaseFill className="size-5" />
          </div>
          <Typography type="h5">一切安静如常 🕊️</Typography>
          <Typography type="body-sm">目前没有站点被监控。您可以随时添加一个！</Typography>
          <Link href='https://dashboard.uptimerobot.com/monitors' target="_blank">
            <Button size="sm" variant="primary" >
              <Plus />
              添加站点
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
export default EmptyContent;