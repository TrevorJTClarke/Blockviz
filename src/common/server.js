import Express from 'express'
import * as path from 'path'
import * as bodyParser from 'body-parser'
import * as http from 'http'
import * as os from 'os'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import l from './logger'

const app = new Express()

export default class Server {
  constructor() {
    const root = path.normalize(`${__dirname}/../..`)
    app.use(bodyParser.json({ limit: '1mb' }))
    app.use(bodyParser.urlencoded({ limit: '1mb', extended: true }))
    app.use(cookieParser(process.env.SESSION_SECRET))
    app.use(Express.static(`${root}/public`))
    app.use(cors())
    app.disable('x-powered-by')
    app.enable('case sensitive routing')
    app.enable('strict routing')
  }

  router(routes) {
    routes(app)
    return this
  }

  listen(port = parseInt(process.env.PORT, 10)) {
    const welcome = p => () =>
      l.info(
        `up and running in ${process.env.NODE_ENV ||
          'development'} @: ${os.hostname()} on port: ${p}}`,
      )
    http.createServer(app).listen(port, welcome(port))
    return app
  }
}
