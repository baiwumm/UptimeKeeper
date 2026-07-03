
import { uptimerobotConfig } from '@/config'

export async function uptimerobotFetch(path: string) {
  const { apiKey, apiUrl } = uptimerobotConfig

  try {
    const res = await fetch(`${apiUrl}${path}`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
      signal: AbortSignal.timeout(10_000),
    })

    if (!res.ok) {
      throw new Error(await res.text())
    }

    return await res.json()
  } catch (error) {
    throw error
  }
}