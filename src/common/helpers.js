// import l from './logger'

export function getEnv(name, defaultValue) {
  return process.env[name] || defaultValue
}
