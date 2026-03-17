/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-01-06 17:59:51
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-03-16 18:06:46
 * @Description: 错误页面
 */
import { Alert, Button } from "@heroui/react";
import { type FC } from 'react';

import { Empty, EmptyContent } from "@/components/ui/empty";


type ErrorPageProps = {
  refresh: VoidFunction;
}

const ErrorPage: FC<ErrorPageProps> = ({ refresh }) => {
  return (
    <Empty className="border">
      <EmptyContent className="max-w-lg">
        <Alert status="danger">
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>获取监控数据失败，请稍后重试</Alert.Title>
            <Alert.Description>
              <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-left">
                <li>当前无法获取监控数据，</li>
                <li>可能由于网络异常或服务暂时不可用</li>
                <li>请稍后重试</li>
              </ul>
            </Alert.Description>
            <Button className="mt-2 sm:hidden" size="sm" variant="danger" onPress={refresh}>
              重试
            </Button>
          </Alert.Content>
          <Button className="hidden sm:block" size="sm" variant="danger" onPress={refresh}>
            重试
          </Button>
        </Alert>
      </EmptyContent>
    </Empty>
  )
}
export default ErrorPage;