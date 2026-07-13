/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-07-10 13:41:54
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-07-13 10:31:25
 * @Description: 响应时间统计
 */
import { Tabs } from "@heroui/react";
import { type FC } from 'react';

import ResponseTimeChart from './ResponseTimeChart'

const TABS_LIST = [
  { id: 'DAY', value: 1, label: '过去 24 小时' },
  { id: 'WEEK', value: 7, label: '近 7 天' },
  { id: 'MONTH', value: 30, label: '近 30 天' },
];

type ResponseTimeContentProps = {
  monitorId: number;
}

const ResponseTimeContent: FC<ResponseTimeContentProps> = ({ monitorId }) => {
  return (
    <Tabs>
      <Tabs.ListContainer>
        <Tabs.List aria-label="近 24 小时">
          {TABS_LIST.map(({ id, label }) => (
            <Tabs.Tab key={id} id={id}>
              {label}
              <Tabs.Indicator />
            </Tabs.Tab>
          ))}
        </Tabs.List>
      </Tabs.ListContainer>
      {TABS_LIST.map(({ id, value }) => (
        <Tabs.Panel key={id} id={id} className="pb-0">
          <ResponseTimeChart monitorId={monitorId} days={value} />
        </Tabs.Panel>
      ))}
    </Tabs>
  )
}
export default ResponseTimeContent;