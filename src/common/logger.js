import pino from 'pino'

const l = pino({
  name: process.env.APP_ID || 'APP',
  level: process.env.LOG_LEVEL || 1,
})

export default l
