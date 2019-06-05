import * as express from 'express'
import controller from './controller'

export default express
  .Router()
  .get('/batch', controller.processBatch)
  .get('/:id', controller.byId)
