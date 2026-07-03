import 'server-only'

function requireEnv(name: string, value: string | undefined) {
  if (!value) throw new Error(`Missing ${name} in environment variables`)
  return value
}

const API_KEY = requireEnv('UPTIMEROBOT_API_KEY', process.env.UPTIMEROBOT_API_KEY)

const API_URL =
  process.env.UPTIMEROBOT_API_URL || 'https://api.uptimerobot.com/v3'

export const uptimerobotConfig = {
  apiKey: API_KEY,
  apiUrl: API_URL,
} as const