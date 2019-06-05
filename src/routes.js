import visualRouter from './api/modules/visual/router'

const baseUri = ''

export default function routes(app) {
  app.use(`${baseUri}/visual`, visualRouter)
}
