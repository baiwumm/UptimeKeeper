/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-07-08 16:01:53
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-07-08 16:19:36
 * @Description: 空数据
 */
import { Plus } from '@gravity-ui/icons';
import { Alert, Button } from "@heroui/react";
import Link from "next/link";
import { type FC } from 'react';

const EmptyContent: FC = () => {
  const renderButton = (className: string) => (
    <Link href='https://dashboard.uptimerobot.com/monitors' target="_blank" className={className}>
      <Button size="sm" variant="primary" >
        <Plus />
        添加站点
      </Button>
    </Link>
  )
  return (
    <div className="flex-1 flex items-center justify-center">
      <Alert status="accent" className='max-w-xl'>
        <Alert.Indicator />
        <Alert.Content>
          <Alert.Title>一切安静如常 🕊️</Alert.Title>
          <Alert.Description>目前没有站点被监控。您可以随时添加一个！</Alert.Description>
          {renderButton("mt-2 sm:hidden")}
        </Alert.Content>
        {renderButton("hidden sm:block")}
      </Alert>
    </div>
  )
}
export default EmptyContent;