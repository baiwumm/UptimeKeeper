/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-01-09 10:44:18
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-07-14 16:49:52
 * @Description: 监控统计指标
 */
import { CircleCheckFill, ClockFill, TriangleExclamationFill } from "@gravity-ui/icons";
import { Alert, Button, cn, Description, Modal, Typography, useOverlayState } from "@heroui/react";
import NumberFlow from '@number-flow/react'
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc'
import { type FC, useEffect, useState } from 'react';

import { formatTimeAgo, SECTION_CLASSNAME } from '@/lib/utils';
import type { Monitor } from '@/types'

dayjs.extend(utc)

type MonitorStatsProps = Pick<Monitor, 'overallUptime' | 'totalIncidents' | 'totalIncidentsDuration' | 'createDateTime' | 'incidents'>;

const MonitorStats: FC<MonitorStatsProps> = ({
  createDateTime,
  overallUptime = 0,
  totalIncidents = 0,
  totalIncidentsDuration = 0,
  incidents = []
}) => {
  const state = useOverlayState();
  const [shouldAnimate, setShouldAnimate] = useState(false);

  // 已运行时间
  const runningDays = Math.max(
    0,
    dayjs().diff(dayjs(createDateTime), 'day')
  );

  // 点击故障详情
  const handleClickIncident = () => {
    if (!totalIncidents) {
      return
    }
    state.open()
  }

  useEffect(() => {
    // 下一帧更新，触发 NumberFlow 动画
    requestAnimationFrame(() => {
      setShouldAnimate(true);
    })
  }, [])
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className={cn(SECTION_CLASSNAME, "flex flex-col gap-1")}>
          <div className="flex items-center gap-1">
            <CircleCheckFill className="text-success" />
            <Typography type="body-xs">总体可用率</Typography>
          </div>
          <NumberFlow
            value={shouldAnimate ? overallUptime ?? 0 : 0}
            willChange
            format={{
              style: 'percent',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }}
            transformTiming={{
              duration: 2000,
              easing: 'ease-out',
            }}
            className="text-lg font-bold"
          />
          <Description>最近 30 天</Description>
        </div>
        <div className={cn(SECTION_CLASSNAME, "flex flex-col gap-1")}>
          <div className="flex items-center gap-1">
            <ClockFill className="text-accent" />
            <Typography type="body-xs">已连续运行</Typography>
          </div>
          <div className="flex items-center gap-1 font-bold text-foreground">
            <NumberFlow
              value={shouldAnimate ? runningDays ?? 0 : 0}
              transformTiming={{
                duration: 2000,
                easing: 'ease-out',
              }}
              className="text-lg"
            />
            <span>天</span>
          </div>
          <Description>{dayjs(createDateTime).format('YYYY年MM月DD日')}</Description>
        </div>
        <div className={cn(SECTION_CLASSNAME, "flex flex-col gap-1")}>
          <div className="flex items-center gap-1">
            <TriangleExclamationFill className="text-danger" />
            <Typography type="body-xs">故障总数</Typography>
          </div>
          <NumberFlow
            value={shouldAnimate ? totalIncidents ?? 0 : 0}
            transformTiming={{
              duration: 2000,
              easing: 'ease-out',
            }}
            className={cn("text-lg font-bold", totalIncidents && 'cursor-pointer text-danger')}
            onClick={handleClickIncident}
          />
          <Description>{totalIncidents > 0 ? `总计${formatTimeAgo(totalIncidentsDuration)}` : '运行正常'}</Description>
        </div>
      </div>
      <Modal.Backdrop isOpen={state.isOpen} onOpenChange={state.setOpen} variant="blur">
        <Modal.Container size="lg">
          <Modal.Dialog>
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Icon className="bg-danger-soft text-danger-soft-foreground">
                <TriangleExclamationFill className="size-5" />
              </Modal.Icon>
              <Modal.Heading>故障记录</Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              <div className="space-y-2">
                {incidents.map(incident => (
                  <Alert key={incident.id} status="danger" className="border border-danger">
                    <Alert.Indicator>
                      <TriangleExclamationFill />
                    </Alert.Indicator>
                    <Alert.Content>
                      <Alert.Title className="font-bold">{incident.reason}</Alert.Title>
                      <Alert.Description>
                        <ul className="mt-1 list-inside list-disc space-y-1 text-xs">
                          <li>开始于 {dayjs.utc(incident.startedAt).format('YYYY-MM-DD HH:mm')}</li>
                          <li>持续时间: {incident?.duration ? formatTimeAgo(incident?.duration) : '-'}</li>
                        </ul>
                      </Alert.Description>
                    </Alert.Content>
                  </Alert>
                ))}
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button className="w-full" slot="close">
                关闭
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </>
  )
}
export default MonitorStats;