/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-09-10 15:37:41
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-07-09 10:13:18
 * @Description: 请求站点列表
 */
import dayjs from 'dayjs'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'

import { uptimerobotFetch } from '@/lib/uptimerobot'
import { withApiHandler } from '@/lib/withApiHandler'
import type { Incident, Monitor } from '@/types'

dayjs.extend(isSameOrAfter)

const DAY30 = 30 * 24 * 60 * 60 * 1000
const DAY_SECONDS = 24 * 60 * 60

/**
 * @description: 计算可用率
 * @param {Incident} incidents
 */
function calcUptime(incidents: Incident[]) {
  const totalSeconds = DAY30 / 1000

  const downtime = incidents.reduce(
    (sum, item) => sum + (item.duration ?? 0),
    0
  )

  return Math.max(
    (totalSeconds - downtime) / totalSeconds,
    0
  )
}

/**
 * @description: 计算每日可用率
 * @param {Incident} incidents
 * @return {Array<{time: string, value: number}>}
 */
function calcDailyUptimes(incidents: Incident[]) {
  const dailyMap = new Map<string, number>()
  const daySeconds = DAY_SECONDS

  // 初始化过去30天的日期（从昨天开始往前推30天）
  for (let i = 1; i <= 30; i++) {
    const date = dayjs().subtract(i, 'day')
    const dateStr = date.format('YYYY-MM-DD')
    dailyMap.set(dateStr, 0)
  }

  // 累加每天的故障时长
  for (const incident of incidents) {
    if (!incident.startedAt) continue
    const dateStr = dayjs(incident.startedAt).format('YYYY-MM-DD')

    if (dailyMap.has(dateStr)) {
      dailyMap.set(dateStr, (dailyMap.get(dateStr) || 0) + (incident.duration ?? 0))
    }
  }

  // 计算每天的可用率
  return Array.from(dailyMap.entries())
    .map(([date, downtime]) => ({
      time: date,
      value: Math.max((daySeconds - downtime) / daySeconds, 0)
    }))
    .sort((a, b) => a.time.localeCompare(b.time))
}

/**
 * @description: 合并故障记录
 * @param {Incident} list
 */
function mergeIncidents(list: Incident[]) {
  const map = new Map()
  for (const item of list) {
    const id = item.monitor?.id
    if (id) {
      if (!map.has(id)) map.set(id, [])
      map.get(id).push(item)
    }
  }
  return map
}

/**
 * @description: 过滤出最近30天内的故障记录
 * @param {Incident[]} incidents
 * @return {Incident[]}
 */
function filterIncidentsByLast30Days(incidents: Incident[]): Incident[] {
  const thirtyDaysAgo = dayjs().subtract(30, 'day')
  return incidents.filter((incident) => {
    if (!incident.startedAt) return false
    return dayjs(incident.startedAt).isSameOrAfter(thirtyDaysAgo)
  })
}

export const GET = withApiHandler(async () => {
  const result = await uptimerobotFetch('/monitors')
  const monitors: Monitor[] = result?.data ?? []

  // 最近30天
  const since = dayjs().subtract(30, 'day').toISOString()
  const incidentsResult = await uptimerobotFetch(
    `/incidents?started_after=${encodeURIComponent(since)}`
  )

  let incidents: Incident[] = incidentsResult?.data ?? []
  incidents = filterIncidentsByLast30Days(incidents)

  const byMonitor = mergeIncidents(incidents)

  let totalIncidents = 0
  let totalDowntime = 0
  let affectedMonitors = 0

  const monitorList = monitors.map((m) => {
    const monitorIncidents: Incident[] = byMonitor.get(m.id) || []

    const downtime = monitorIncidents.reduce(
      (sum, item) => sum + (item.duration ?? 0),
      0
    )

    const incidentCount = monitorIncidents.length

    totalDowntime += downtime
    totalIncidents += incidentCount

    if (incidentCount > 0) {
      affectedMonitors++
    }

    return {
      ...m,
      incidents: monitorIncidents,
      overallUptime: calcUptime(monitorIncidents),
      totalIncidents: incidentCount,
      totalIncidentsDuration: downtime,
      dailyUptimes: calcDailyUptimes(monitorIncidents),
    }
  })

  const totalSeconds = DAY30 / 1000
  const totalAvailableTime = monitors.length * totalSeconds
  const totalUptimeDuration = Math.max(totalAvailableTime - totalDowntime, 0)
  const overallUptime = totalAvailableTime > 0 ? totalUptimeDuration / totalAvailableTime : 0

  return {
    monitors: monitorList,
    uptimeStatistics: {
      overallUptime,
      totalIncidents,
      totalUptimeDuration,
      affectedMonitors,
    },
  }
})