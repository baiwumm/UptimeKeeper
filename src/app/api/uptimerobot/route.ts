/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-09-10 15:37:41
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-07-08 17:32:14
 * @Description: 请求站点列表
 */
import { uptimerobotFetch } from '@/lib/uptimerobot'
import { withApiHandler } from '@/lib/withApiHandler'
import type { Incident, Monitor } from '@/types'

const DAY30 = 30 * 24 * 60 * 60 * 1000

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
 * @description: 合并故障记录
 * @param {Incident} list
 * @param {Monitor} monitors
 * @return {*}
 */
function mergeIncidents(list: Incident[], monitors: Monitor[]) {
  const map = new Map()
  for (const item of list) {
    const id = item.monitor?.id
    if (id) (map.get(id) ?? (map.set(id, []), map.get(id))).push(item)
  }
  for (const m of monitors) {
    if (!m.lastIncident) continue
    const arr = map.get(m.id) || []
    if (!arr.some((x: Incident) => String(x.id) === String(m?.lastIncident?.id))) {
      map.set(m.id, [...arr, m.lastIncident])
    }
  }
  return map
}

export const GET = withApiHandler(async () => {
  const result = await uptimerobotFetch('/monitors')

  const monitors: Monitor[] = result?.data ?? []


  // 最近30天
  const since = new Date(
    Date.now() - DAY30
  ).toISOString()


  const incidentsResult = await uptimerobotFetch(
    `/incidents?started_after=${encodeURIComponent(since)}`
  )

  const incidents: Incident[] =
    incidentsResult?.data ?? []


  const byMonitor = mergeIncidents(
    incidents,
    monitors
  )


  let totalIncidents = 0
  let totalDowntime = 0
  let affectedMonitors = 0


  const monitorList = monitors.map((m) => {
    const monitorIncidents: Incident[] = byMonitor.get(m.id) || []

    const downtime =
      monitorIncidents.reduce(
        (sum, item) =>
          sum + (item.duration ?? 0),
        0
      )


    totalDowntime += downtime
    totalIncidents += monitorIncidents.length


    if (monitorIncidents.length > 0) {
      affectedMonitors++
    }


    return {
      ...m,
      incidents: monitorIncidents,
      overallUptime: calcUptime(
        monitorIncidents
      ),
    }
  })


  const totalSeconds =
    DAY30 / 1000


  // 所有监控器理论运行总时间
  const totalAvailableTime =
    monitors.length * totalSeconds


  // 正常运行累计时间
  const totalUptimeDuration =
    Math.max(
      totalAvailableTime - totalDowntime,
      0
    )


  // 综合可用率
  const overallUptime =
    totalAvailableTime > 0
      ? totalUptimeDuration /
      totalAvailableTime
      : 0


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